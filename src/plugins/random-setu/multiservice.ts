import axios from 'axios'
import { Base64 } from 'js-base64'
import { PoolConfig } from 'mysql'
import Bot, { CQLog, printTime } from '../../main'
import Mysql from '../../xianyu-robot/modules/mysql'
import IO = require('socket.io-client')
import { SetuConfig, SocketData } from './modules/utils'

export default class Multiservice {
  constructor(bot: Bot, mysqlConfig: PoolConfig, socketConfig: { url: string, token: string }, setuConfiig: SetuConfig) {
    /**
     * 创建链接池
     */
    if (mysqlConfig) this.Pool = bot.createPool(mysqlConfig)
    bot.config.setu = setuConfiig
    this.linkSocket(bot, socketConfig)
    printTime('[插件] 随机色图已载入', CQLog.LOG_INFO_SUCCESS)
    printTime('该插件为辅助插件，不推荐跟其它插件一起使用', CQLog.LOG_WARNING)
  }

  Pool: Mysql = null

  socket = null

  linkSocket(bot: Bot, socketConfig: { url: string; token: string }) {
    this.socket = IO(`${socketConfig.url}?token=${socketConfig.token}`, {
      reconnectionAttempts: 20
    })
    this.socket.on('setu', (data: SocketData) => {
      printTime('[setu] 已接受主服务任务', CQLog.LOG_INFO_RECV)
      bot.config.setu.default = data.default
      bot.config.setu.r18 = data.r18
      bot.config.setu.cache = data.cache
      bot.config.setu.new_pic = data.new_pic
      bot.CQ.setDebug(data.debug)
      this.setu(bot, data.from, data.fromQQ, data.fromType, data.keyword, data.num, data.insertId, data.tag, data.all)
    })
    this.socket.on('connect', () => {
      printTime('[socket.io] 已连接主服务', CQLog.LOG_INFO_SUCCESS)
    })
    this.socket.on('connect_error', (err: any) => {
      printTime(`[socket.io] ${err}`, CQLog.LOG_ERROR)
    })
    this.socket.on('connect_timeout', () => {
      printTime(`[socket.io] 连接超时`, CQLog.LOG_WARNING)
    })
    this.socket.on('error', (err: any) => {
      printTime(`[socket.io] ${err}`, CQLog.LOG_ERROR)
    })
    this.socket.on('disconnect', () => {
      printTime('[socket.io] 与主服务断开连接', CQLog.LOG_ERROR)
    })
    this.socket.on('reconnect_attempt', (times: any) => {
      printTime(`[socket.io] 正在第${times}尝试重连`, CQLog.LOG_WARNING)
    })
    this.socket.on('reconnect_failed', () => {
      printTime('[socket.io] 重连失败，请重启服务', CQLog.LOG_FATAL)
      this.socket.close()
      if (bot.adminData) bot.send(0, bot.adminData.qq, `${new Date().toLocaleString()}\n辅助服务连接失败`)
    })
  }

  /**
   * 将获取的图片信息存入数据库
   * @param {string} sql 图片的详细信息, 请先格式化为 (time, pid, uid, title, author, r18, url, width, height, tags)
   */
  saveSetu = async (sql: string) => {
    if (this.Pool === null) return
    await this.Pool.query(`INSERT INTO setu (time, pid, uid, title, author, r18, url, width, height, tags) values ${sql} ON DUPLICATE KEY UPDATE id = id`)
      .then(() => {
        printTime(`录入完成`, CQLog.LOG_INFO_SUCCESS)
      })
      .catch((err: any) => {
        if (err) {
          console.error(err)
        }
      })
  }

  /**
  * 从数据库随机获取图片
  * @param {number} num 需要获取的图数
  * @param {string} tag 可选参数，指定作者或者tag
  */
  getSetu = (bot: Bot, num: number = 1, tag?: string, all?: boolean) => {
    if (this.Pool === null) return
    return new Promise<Array<any>>((resolve, reject) => {
      let r18 = bot.config.setu.r18 === 0 ? ' and r18=0 ' : bot.config.setu.r18 === 1 ? ' and r18=1 ' : ''
      let cache = bot.config.setu.cache ? ' and \`cache\`=1 and \`404\`=0 ' : ''
      let newPic = bot.config.setu.new_pic && !all ? ' and num=0 ' : ''
      let tagSql = tag ? ` and (author like '%${tag}%' or from_base64(title) like '%${tag}%' or from_base64(tags) like '%${tag}%') ` : ''
      this.Pool.query(`SELECT title,pid,author,url FROM setu where id > 0${r18}${cache}${newPic}${tagSql}ORDER BY RAND() LIMIT ${num}`)
        .then((results: any[] | PromiseLike<any[]>) => {
          resolve(results)
        })
        .catch((err: any) => {
          console.error(err)
          reject()
        })
    })
  }

  /**
   * 往数据库记录图片被查看一次
   * @param {string} title 用于控制台输出的图片标题
   * @param {string} sql 用于数据库记录的sql语句
   * @param {number} insertId 记录ID
   * @param {number} source 图片来源
   * @param {number} num 图片数量
   */
  viewed = (title: string, sql: string, insertId: number, source: number, num: number) => {
    if (this.Pool === null) return
    this.Pool.query(`UPDATE setu SET num=num + 1 WHERE pid in (${sql});update record set num=${num}, success=1, setu='${sql.replace(/'/g, '')}', source=${source} where id=${insertId}`)
      .then(() => {
        printTime(`以下图片被查看了一次：\n${title}`, CQLog.LOG_DEBUG)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }


  /**
   * 从api或数据库获得的数据并发送到讨论组
   * @param {number} from 来源群号或讨论组ID
   * @param {number} fromQQ
   * @param {number} fromType 消息来源, 0为讨论组, 1为群
   * @param {string} keyword 关键字
   * @param {number} num 请求图数
   * @param {string} tag 可选参数，指定作者或者tag
   */
  setu = (bot: Bot, from: number, fromQQ: number, fromType: 1 | 2, keyword: string, num: number, insertId: number, tag?: string, all?: boolean) => {
    if (bot.config.setu.default === 1 && this.Pool) {
      this.getSetu(bot, num, tag, all)
        .then(res => {
          const data = this.formatData(bot, res, 1)
          if (res.length > 0) {
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}拿走你的${res.length}张${tag ? tag : ''}${keyword}\n${data.title}`)
            bot.send(fromType, from, data.img)
              .then(code => {
                if (code == -1 || code == -1100) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}发生了奇怪的事情所以发送失败了`)
                } else if (code == -11) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}这张图好像已经被删除了`)
                } else if (code > 0) {
                  if (!bot.CQ.getDebug()) this.viewed(data.title, data.sql, insertId, 1, res.length)
                }
              })
          } else {
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}好像没有符合要求的${keyword}`)
          }
        })
        .catch(err => {
          console.error(err)
          bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}出现了奇怪的问题`)
        })
    } else {
      let startTime = new Date()
      axios.get(`${bot.config.setu.api}?${bot.config.setu.apikey ? 'apikey=' + bot.config.setu.apikey : ''}${tag ? '&keyword=' + tag : ''}&size1200=1&num=${num}`)
        .then((res) => {
          if (res.data.code === 0) {
            const data = this.formatData(bot, res.data.data, 0)
            this.saveSetu(data.saveSql)
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}查询完成,用时${(data.endTime.getTime() - startTime.getTime()) / 1000}s\n剩余调用次数:${res.data.quota}\n${data.title}`)
            bot.send(fromType, from, data.img)
              .then(code => {
                if (code == -1 || code == -1100) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}发生了奇怪的事情所以发送失败了`)
                } else if (code == -11) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}这张图好像已经被删除了`)
                } else if (code > 0) {
                  if (!bot.CQ.getDebug()) this.viewed(data.title, data.sql, insertId, 0, res.data.length)
                }
              })
          } else {
            this.handleErr(bot, res.data.code, res.data.quota_min_ttl, from, fromQQ, fromType)
          }
        })
        .catch(err => {
          printTime(JSON.stringify(err), CQLog.LOG_ERROR)
          bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}查不到，就这样吧`)
        })
    }
  }

  /**
   * 处理api异常
   * @param {number} code 错误代码
   * @param {number} quotaMinTtl 配额恢复1次所需秒数
   * @param {number} from
   * @param {number} fromQQ
   * @param {number} fromType
   */
  handleErr = (bot: Bot, code: number, quotaMinTtl: number, from: number, fromQQ: number, fromType: 0 | 1 | 2) => {
    if (code === 401) {
      bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}APIKEY异常，暂时无法使用`)
    }
    else if (code === 429) {
      bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}达到调用额度限制\n距离下次可以调用还有${quotaMinTtl}s`)
    }
    else {
      bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}出了些奇怪的问题`)
      printTime(`错误代码：${code}`, CQLog.LOG_ERROR)
    }
  }

  formatData = (bot: Bot, data: Array<any>, type: 0 | 1) => {
    if (type === 0) {
      let endTime = new Date()
      let saveSql = ''
      let url = ''
      let title = ''
      let sql = ''
      const time = endTime.toLocaleString('chinese', { hour12: false })
      data.forEach((item: any, index: number) => {
        if (index === 0) {
          url += `${bot.CQCode.image(item.url)}`
          title += `${item.title} - ${item.author}`
          saveSql += `('${time}', '${JSON.stringify([item.pid, item.p])}', ${item.uid}, '${Base64.encode(item.title)}', '${item.author}', ${item.r18}, '${item.url}', ${item.width}, ${item.height}, '${Base64.encode(JSON.stringify(item.tags))}')`
          sql += `'[${item.pid},${item.p}]'`
        } else {
          url += `\n${bot.CQCode.image(item.url)}`
          title += `\n${item.title} - ${item.author}`
          saveSql += `,('${time}', '${JSON.stringify([item.pid, item.p])}', ${item.uid}, '${Base64.encode(item.title)}', '${item.author}', ${item.r18}, '${item.url}', ${item.width}, ${item.height}, '${Base64.encode(JSON.stringify(item.tags))}')`
          sql += `,'[${item.pid},${item.p}]'`
        }
      })
      return { endTime, saveSql, sql, url, title }
    } else {
      let img = ''
      let title = ''
      let sql = ''
      data.forEach((item: any, index: number) => {
        if (index === 0) {
          img += `${bot.config.setu.cache ? bot.CQCode.image(item.pid) : bot.CQCode.image(item.url)}`
          title += `${Base64.decode(item.title)} - ${item.author}`
          sql += `'${item.pid}'`
        } else {
          img += `\n${bot.config.setu.cache ? bot.CQCode.image(item.pid) : bot.CQCode.image(item.url)}`
          title += `\n${Base64.decode(item.title)} - ${item.author}`
          sql += `,'${item.pid}'`
        }
      })
      return { img, title, sql }
    }
  }
}