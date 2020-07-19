import axios from 'axios'
import { Base64 } from 'js-base64'
import Bot, { printTime } from "../../../main"
import { Database } from './database'
import { socketSetu } from "./socket"
import schedule = require('node-schedule')
import fs = require('fs')

export class Setu {
  Pool: Database = null

  restrictedList = {}

  clearRestrictedList = () => {
    schedule.scheduleJob('0 0 0 * * *', () => {
      this.restrictedList = {}
      printTime('调用次数已重置', 13)
    })
  }

  /**
   * 从api或数据库获得的数据并发送到讨论组
   * @param {number} from 来源群号或讨论组ID
   * @param {number} fromQQ
   * @param {number} num 请求图片数
   * @param {number} fromType 0-私聊消息, 1-群组消息, 2-讨论组消息
   * @param {string} tag 可选参数，指定作者或者tag
   */
  setu = async (bot: Bot, from: number, fromQQ: number, num: number, fromType: 0 | 1 | 2, tag?: string) => {
    const insertId = bot.CQ.getDebug ? 0 : await this.Pool.recoed(bot, fromQQ, from, fromType, num)
    if (fromType === 1 && fromQQ != bot.adminData.qq) {
      if (this.restrictedList[fromQQ]) {
        this.restrictedList[fromQQ] += 1
      } else {
        this.restrictedList[fromQQ] = 1
      }
      if (this.restrictedList[fromQQ] > bot.config.setu.limit) {
        if (this.restrictedList[fromQQ] > (bot.config.setu.limit + 3)) {
          bot.ban(fromType, from, fromQQ, 720)
        } else {
          bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}呵`)
        }
        return
      }
    }
    if (typeof num !== 'number') {
      bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}看不懂`)
      return
    }
    if (num > 10) {
      bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}太多了，不查`)
      return
    }
    if (bot.config.setu.multiservice) {
      if (await socketSetu(bot, from, fromQQ, fromType, fromType === 0 ? bot.config.setu.keyword_1 : bot.config.setu.keyword_2, num, insertId, tag)) {
        return
      }
    }

    if (bot.config.setu.default === 1) {
      this.Pool.getSetu(bot, num, tag)
        .then(res => {
          const data = this.formatData(bot, res, 1)
          if (res.length > 0) {
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}拿走你的${res.length}张${tag ? tag : ''}${fromType === 2 ? bot.config.setu.keyword_2 : bot.config.setu.keyword_1}\n${data.title}`)

            bot.send(fromType, from, data.img)
              .then(code => {
                if (code == -1 || code == -1100) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}发生了奇怪的事情所以发送失败了`)
                } else if (code == -11) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}这张图好像已经被删除了`)
                } else if (code > 0) {
                  if (!bot.CQ.getDebug) this.Pool.viewed(data.title, data.sql, insertId, 1, res.length)
                }
              })
          } else {
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}好像没有符合要求的${fromType === 2 ? bot.config.setu.keyword_2 : bot.config.setu.keyword_1}`)
          }
        })
        .catch(() => {
          bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}出现了奇怪的问题`)
        })
    } else {
      console.log(`${bot.config.setu.api}?${bot.config.setu.apikey ? 'apikey=' + bot.config.setu.apikey : ''}${tag ? '&keyword=' + tag : ''}&size1200=1&num=${num}`)
      let startTime = new Date()
      axios.get(`${bot.config.setu.api}?${bot.config.setu.apikey ? 'apikey=' + bot.config.setu.apikey : ''}${tag ? '&keyword=' + tag : ''}&size1200=1&num=${num}`, {
        timeout: 30 * 1000
      })
        .then((res) => {
          if (res.data.code === 0) {
            const data = this.formatData(bot, res.data.data, 0)
            this.Pool.saveSetu(data.saveSql)
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}查询完成,用时${(data.endTime.getTime() - startTime.getTime()) / 1000}s\n剩余调用次数:${res.data.quota}\n${data.title}`)
            bot.send(fromType, from, data.url)
              .then(code => {
                if (code == -1 || code == -1100) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}发生了奇怪的事情所以发送失败了`)
                } else if (code == -11) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}这张图好像已经被删除了`)
                } else if (code > 0) {
                  if (!bot.CQ.getDebug) this.Pool.viewed(data.title, data.sql, insertId, 0, res.data.data.length)
                }
              })
          } else {
            this.handleErr(bot, res.data.code, res.data.quota_min_ttl, from, fromQQ, fromType)
          }
        })
        .catch(err => {
          printTime(JSON.stringify(err), 30)
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
      printTime(`错误代码：${code}`, 30)
    }
  }

  /**
   * 格式化数据
   * @param {Array} data 数据库返回的数组
   * @param {0 | 1} type 数据来源，0为API，1为数据库
   */
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

  copying = false
  times = 1
  errTimes = 0
  initialNum = null
  startTime = null
  timeout = false

  startCopy = (bot: Bot, fromQQ?: number) => {
    if (!this.copying) {
      printTime(`第${this.times}次请求···`, 10)
      const url = `${bot.config.setu.api}?${bot.config.setu.apikey ? 'apikey=' + bot.config.setu.apikey : ''}&size1200=1&num=10&r18=2`
      axios({
        method: 'get',
        timeout: 1000 * 15,
        url: url
      })
        .then(async res => {
          printTime(`第${this.times}次请求成功 剩余次数：${res.data.quota}`, 20)
          if (res.data.code === 0) {
            await this.formatAndSave(res.data.data)
            if (res.data.quota <= 30) {
              bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}剩余次数过少`)
              this.copying = false
              return
            }
            this.initialNum = (await this.Pool.setuTotal())[0]
            bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}开始搬图，剩余次数${res.data.quota}`)
            this.copying = true
            this.startTime = new Date()
            schedule.scheduleJob('copy', new Date(Date.now() + 30 * 60 * 1000), () => {
              this.timeout = true
            })
            this.copySetu(bot, url, fromQQ)
          } else {
            bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}有些奇怪的问题不能开始`)
            printTime(JSON.stringify(res.data), 30)
          }
        })
        .catch(err => {
          printTime(err.toJSON().message, 30)
          bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}有些奇怪的问题不能开始`)
        })
    } else {
      bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}已在搬图`)
    }
  }

  stopCopy = () => {
    if (this.copying) {
      this.copying = false
      this.timeout = false
    }
  }

  /**
   * 自动从API搬运数据
   * @param {number} fromQQ
   */
  copySetu = async (bot: Bot, url: any, fromQQ?: number) => {
    if (this.times >= bot.config.setu.copy_times) {
      this.copyEnd(bot, 0, fromQQ)
      return
    }
    if (this.errTimes >= 5) {
      this.copyEnd(bot, 2, fromQQ)
      return
    }
    if (!this.copying) {
      this.copyEnd(bot, 4, fromQQ)
      return
    }
    if (this.timeout) {
      this.copyEnd(bot, 3, fromQQ)
      return
    }
    await bot.sleep(2)
    ++this.times
    printTime(`第${this.times}次请求···`, 10)
    axios({
      method: 'get',
      timeout: 1000 * 15,
      url: url
    })
      .then(async res => {
        printTime(`第${this.times}次请求成功 剩余次数：${res.data.quota}`, 20)
        if (res.data.code === 0) {
          await this.formatAndSave(res.data.data)
          if (res.data.quota <= 30) {
            this.copyEnd(bot, 1, fromQQ)
            return
          }
          this.copySetu(bot, url, fromQQ)
        } else {
          ++this.errTimes
          this.copySetu(bot, url, fromQQ)
        }
      })
      .catch(err => {
        ++this.errTimes
        printTime(err.toJSON().message, 30)
        this.copySetu(bot, url, fromQQ)
      })
  }

  /**
   * @param type 0-完成，1-额度不足，2-网络异常，3-超时，4-手动停止
   * @param fromQQ
   */
  copyEnd = async (bot: Bot, type: 0 | 1 | 2 | 3 | 4, fromQQ?: number) => {
    this.copying = false
    schedule.cancelJob('copy')
    const endTime = new Date()
    const setuNum = await this.Pool.setuTotal()
    const newNum = this.initialNum && setuNum ? `新增图量：${setuNum[0] - this.initialNum}\n` : ''
    const allNum = setuNum ? `总图量：${setuNum[0]}\n未浏览：${setuNum[1]}\n` : ''
    switch (type) {
      case 0:
        bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}搬完了\n${newNum}${allNum}调用次数：${this.times}\n用时：${(endTime.getTime() - this.startTime.getTime()) / 1000}s`)
        break
      case 1:
        bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}剩余次数过少，已停止搬图\n${newNum}${allNum}调用次数：${this.times}\n用时：${(endTime.getTime() - this.startTime.getTime()) / 1000}s`)
        break
      case 2:
        bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}网络异常，已停止搬图\n${newNum}${allNum}调用次数：${this.times}\n用时：${(endTime.getTime() - this.startTime.getTime()) / 1000}s`)
        break
      case 3:
        bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}任务超时，已停止搬图\n${newNum}${allNum}调用次数：${this.times}`)
        break
      case 4:
        bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}那不搬了\n${newNum}${allNum}调用次数：${this.times}\n用时：${(endTime.getTime() - this.startTime.getTime()) / 1000}s`)
        break
      default:
        bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}任务结束\n${newNum}${allNum}调用次数：${this.times}\n用时：${(endTime.getTime() - this.startTime.getTime()) / 1000}s`)
        break
    }
    this.times = 1
    this.errTimes = 0
    this.initialNum = null
    this.startTime = null
    this.timeout = false
    this.downloadCache(bot)
  }

  formatAndSave = async (data: any) => {
    const time = new Date().toLocaleString('chinese', { hour12: false })
    let sql = ''
    data.forEach((item: any, index: number) => {
      if (index === 0) {
        sql += `('${time}', '${JSON.stringify([item.pid, item.p])}', ${item.uid}, '${Base64.encode(item.title)}', '${item.author}', ${item.r18}, '${item.url}', ${item.width}, ${item.height}, '${Base64.encode(JSON.stringify(item.tags))}')`
      }
      else {
        sql += `,('${time}', '${JSON.stringify([item.pid, item.p])}', ${item.uid}, '${Base64.encode(item.title)}', '${item.author}', ${item.r18}, '${item.url}', ${item.width}, ${item.height}, '${Base64.encode(JSON.stringify(item.tags))}')`
      }
    })
    await this.Pool.saveSetu(sql)
  }

  setuStar = (bot: Bot, fromType: 1 | 2, id: number) => {
    this.Pool.setuWatchNum(id)
      .then(data => {
        if (data.length < 1) {
          if (fromType === 2) {
            bot.send(fromType, id, `今天还没有人看${bot.config.setu.keyword_2}`)
          } else if (fromType === 1) {
            bot.send(fromType, id, `今天还没有人看${bot.config.setu.keyword_1}`)
          }
          return
        }
        let temp = {}
        let qqList = []
        let numList = []
        data.forEach(item => {
          if (temp[item.qq]) {
            temp[item.qq] += item.num
          } else {
            temp[item.qq] = item.num
          }
        })
        for (let i in temp) {
          qqList.push(i)
          numList.push(temp[i])
        }
        var indexOfMax = numList.indexOf(Math.max(...numList))
        if (fromType === 2) {
          bot.send(fromType, id, `${bot.CQCode.at(qqList[indexOfMax])}今天看了${numList[indexOfMax]}张${bot.config.setu.keyword_2}荣获${bot.config.setu.star_2}`)
        } else if (fromType === 1) {
          bot.send(fromType, id, `${bot.CQCode.at(qqList[indexOfMax])}今天看了${numList[indexOfMax]}张${bot.config.setu.keyword_1}荣获${bot.config.setu.star_1}`)
        }
      })
      .catch(() => {
        if (fromType === 2) {
          bot.send(fromType, id, `我也不知道今天谁拿了${bot.config.setu.star_2}`)
        } else if (fromType === 1) {
          bot.send(fromType, id, `我也不知道今天谁拿了${bot.config.setu.star_1}`)
        }
      })
  }

  downliading = false

  /**
   * 把数据库里的图片下载到酷Q文件夹里
   */
  downloadCache = (bot: Bot) => {
    if (this.downliading) {
      bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.adminData.type !== 0 ? bot.CQCode.at(bot.adminData.qq) : ''}已在下载缓存`)
      return
    }
    this.Pool.cacheNum()
      .then(results => {
        this.downliading = true
        this.download(bot, results)
      })
      .catch(() => {
        bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.adminData.type !== 0 ? bot.CQCode.at(bot.adminData.qq) : ''}未缓存信息查询失败`)
        printTime('未缓存信息查询失败', 30)
      })
  }

  async download(bot: Bot, results: any) {
    if (results.length < 1) {
      bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.adminData.type !== 0 ? bot.CQCode.at(bot.adminData.qq) : ''}所有图片已经缓存`)
      return
    }
    bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.adminData.type !== 0 ? bot.CQCode.at(bot.adminData.qq) : ''}开始下载${results.length}张未缓存图片`)
    const startTime = new Date()
    let timeoutNum = 0
    let delNum = 0
    let errNum = 0
    for (let i = 0; i < results.length; i++) {
      let data = results[i]
      await axios.get(data.url, {
        responseType: 'arraybuffer',
        timeout: 1000 * 60
      })
        .then(res => {
          var dataBuffer = Buffer.from(res.data)
          fs.writeFile(`${bot.config.setu.dl_location}/${data.pid}`, dataBuffer, (err) => {
            if (err) {
              printTime(JSON.stringify(err), 30)
            } else {
              this.Pool.updateCache(data, 'cache')
            }
          })
        })
        .catch(err => {
          if (err.response.status) {
            this.Pool.updateCache(data, '404')
            ++delNum
          } else {
            printTime(`[${err.response.status}][ID:${data.id}] - ${data.url}`, 20)
            ++errNum
          }
        })
        .catch(() => {
          printTime(`[TIMEOUT][ID:${data.id}] - ${data.url}`, 20)
          ++timeoutNum
        })
    }
    const endTime = new Date()
    bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.adminData.type !== 0 ? bot.CQCode.at(bot.adminData.qq) : ''}缓存下载完成\n用时${(endTime.getTime() - startTime.getTime()) / 1000}s${timeoutNum ? `\n超时:${timeoutNum}` : ''}${errNum ? `\n异常:${errNum}` : ''}${delNum ? `\n被删除:${delNum}` : ''}`)
    this.downliading = false
  }
}
