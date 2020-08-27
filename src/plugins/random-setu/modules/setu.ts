import axios from 'axios'
import { Base64 } from 'js-base64'
import Bot, { CQLog, printTime } from '../../../main'
import { Database } from './database'
import SetuSocket from './socket'
import schedule = require('node-schedule')
import fs = require('fs')
import request = require('request')

export class Setu extends SetuSocket {
  Pool: Database = null

  restrictedList = {}

  createSchedule = (bot: Bot) => {
    schedule.scheduleJob('0 0 0 * * *', () => {
      this.restrictedList = {}
      printTime('[setu] 调用次数已重置', CQLog.LOG_INFO)
    })
    if (this.Pool) {
      if (bot.config.setu.copy) {
        if (bot.adminData) {
          schedule.scheduleJob('0 0 18 * * *', () => {
            bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.CQCode.image('dr.jpg')}\n我来自动搬图了`)
            this.startCopy(bot)
          })
        } else {
          printTime('[setu] 未配置管理员', CQLog.LOG_WARNING)
        }
      }
      if (bot.config.setu.star.length > 0) {
        bot.config.setu.star.forEach(item => {
          schedule.scheduleJob('0 59 23 * * *', () => {
            this.setuStar(bot, item.type, item.id)
          })
        })
      }
    }
  }

  restricted = (bot: Bot, from: number, fromQQ: number, fromType: 1 | 2) => {
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
      return true
    } else {
      return false
    }
  }

  /**
   * 从api或数据库获得的数据并发送到讨论组
   * @param {number} from 来源群号或讨论组ID
   * @param {number} fromQQ
   * @param {number} num 请求图片数
   * @param {number} fromType 0-私聊消息, 1-群组消息, 2-讨论组消息
   * @param {string} tag 可选参数，指定作者或者tag
   */
  setu = async (bot: Bot, from: number, fromQQ: number, num: number, fromType: 1 | 2, tag?: string, all?: boolean) => {
    const insertId = bot.CQ.getDebug() ? 0 : await this.Pool.record(bot, fromQQ, from, fromType, num)
    if (bot.adminData) {
      if (fromQQ != bot.adminData.qq && from != bot.adminData.id) {
        if (this.restricted(bot, from, fromQQ, fromType)) {
          return
        }
      }
    } else {
      if (this.restricted(bot, from, fromQQ, fromType)) {
        return
      }
    }
    if (fromQQ != bot.adminData.qq && from != bot.adminData.id) {
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
      if (await this.socketSetu(bot, from, fromQQ, fromType, bot.adminData && from === bot.adminData.id ? bot.config.setu.keyword_2 : bot.config.setu.keyword_1, num, insertId, tag, all)) {
        return
      }
    }

    if (bot.config.setu.default === 1) {
      this.Pool.getSetu(bot, num, tag, all)
        .then(async res => {
          if (res.length > 0) {
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}给你找到了${res.length}张${tag ? tag : ''}${bot.adminData && from === bot.adminData.id ? bot.config.setu.keyword_2 : bot.config.setu.keyword_1}`)
            let title = ''
            let sql = ''
            for (let i = 0; i < res.length; i++) {
              const item = res[i]
              const titleTemp = `${Base64.decode(item.title)} - ${item.author}`
              if (i === 0) {
                title += titleTemp
              } else {
                title += '\n' + titleTemp
              }
              const code = await bot.send(fromType, from, `${Base64.decode(item.title)} - ${item.author}\n${bot.config.setu.cache ? bot.CQCode.image(item.pid) : bot.CQCode.image(item.url)}`)
              if (code == -1 || code == -1100) {
                bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}发生了奇怪的事情所以发送失败了`)
              } else if (code == -11) {
                bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}这张图好像已经被删除了`)
              } else if (code >= 0) {
                if (i === 0) {
                  sql += `'${item.pid}'`
                } else {
                  sql += `,'${item.pid}'`
                }
              }
            }
            console.log(sql)
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}发完了`)
            if (!bot.CQ.getDebug()) this.Pool.viewed(title, sql, insertId, 1, res.length)
          } else {
            bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}好像没有符合要求的${bot.adminData && from === bot.adminData.id ? bot.config.setu.keyword_2 : bot.config.setu.keyword_1}`)
          }
        })
        .catch(() => {
          bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}出现了奇怪的问题`)
        })
    } else {
      let startTime = new Date()
      axios.get(`${bot.config.setu.api}?${bot.config.setu.apikey ? 'apikey=' + bot.config.setu.apikey : ''}${tag ? '&keyword=' + tag : ''}&size1200=1&num=${num}`, {
        timeout: 30 * 1000
      })
        .then(async (res) => {
          if (res.data.code === 0) {
            const endTime = new Date()

            if (res.data.data.length > 0) {
              bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}查询完成,用时${(endTime.getTime() - startTime.getTime()) / 1000}s\n剩余调用次数:${res.data.quota}\n找到了${res.data.data.length}张${tag ? tag : ''}${bot.adminData && from === bot.adminData.id ? bot.config.setu.keyword_2 : bot.config.setu.keyword_1}`)

              let title = ''
              let sql = ''
              let saveSql = ''
              const time = endTime.toLocaleString('chinese', { hour12: false })

              for (let i = 0; i < res.data.data.length; i++) {
                const item = res.data.data[i]
                const titleTemp = `${item.title} - ${item.author}`
                if (i === 0) {
                  title += titleTemp
                  saveSql += `('${time}', '${JSON.stringify([item.pid, item.p])}', ${item.uid}, '${Base64.encode(item.title)}', '${item.author}', ${item.r18}, '${item.url}', ${item.width}, ${item.height}, '${Base64.encode(JSON.stringify(item.tags))}')`
                } else {
                  title += '\n' + titleTemp
                  saveSql += `,('${time}', '${JSON.stringify([item.pid, item.p])}', ${item.uid}, '${Base64.encode(item.title)}', '${item.author}', ${item.r18}, '${item.url}', ${item.width}, ${item.height}, '${Base64.encode(JSON.stringify(item.tags))}')`
                }
                const code = await bot.send(fromType, from, `${item.title} - ${item.author}\n${bot.CQCode.image(item.url)}`)
                if (code == -1 || code == -1100) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}发生了奇怪的事情所以发送失败了`)
                } else if (code == -11) {
                  bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}这张图好像已经被删除了`)
                } else if (code >= 0) {
                  if (i === 0) {
                    sql += `[${item.pid},${item.p}]`
                  } else {
                    sql += `,[${item.pid},${item.p}]`
                  }
                }
              }
              bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}发完了`)
              this.Pool.saveSetu(saveSql)
              if (!bot.CQ.getDebug()) this.Pool.viewed(title, sql, insertId, 0, res.data.data.length)
            } else {
              bot.send(fromType, from, `${bot.CQCode.at(fromQQ)}查询完成,用时${(endTime.getTime() - startTime.getTime()) / 1000}s\n剩余调用次数:${res.data.quota}\n好像没有符合要求的${bot.adminData && from === bot.adminData.id ? bot.config.setu.keyword_2 : bot.config.setu.keyword_1}`)
            }
          } else {
            this.handleErr(bot, res.data.code, res.data.quota_min_ttl, from, fromQQ, fromType)
          }
        })
        .catch(err => {
          console.error(err)
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

  copying = false
  times = 1
  errTimes = 0
  initialNum = null
  startTime = null
  timeout = false

  startCopy = (bot: Bot, fromQQ?: number) => {
    if (!this.copying) {
      printTime(`第${this.times}次请求···`, CQLog.LOG_INFO)
      const url = `${bot.config.setu.api}?${bot.config.setu.apikey ? 'apikey=' + bot.config.setu.apikey : ''}&size1200=1&num=10&r18=2`
      request({
        url: url,
        timeout: 1000 * 20
      }, async (err, res, body) => {
        if (err) {
          bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}有些奇怪的问题不能开始`)
          printTime(err.code, CQLog.LOG_ERROR)
        } else {
          let data: any
          try {
            data = JSON.parse(body)
            printTime(`第${this.times}次请求成功 剩余次数：${data.quota}`, CQLog.LOG_INFO_SUCCESS)
            if (data.code === 0) {
              await this.formatAndSave(data.data)
              if (data.quota <= 30) {
                bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}剩余次数过少`)
                this.copying = false
                return
              }
              this.initialNum = (await this.Pool.setuTotal())[0]
              bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}开始搬图，剩余次数${data.quota}`)
              this.copying = true
              this.startTime = new Date()
              schedule.scheduleJob('copy', new Date(Date.now() + 60 * 60 * 1000), () => {
                this.timeout = true
              })
              this.copySetu(bot, url, fromQQ)
            } else {
              bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}有些奇怪的问题不能开始`)
              console.error(data.msg)
            }
          }
          catch (err) {
            bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}有些奇怪的问题不能开始`)
            printTime(err.code, CQLog.LOG_ERROR)
          }
        }
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
    if (this.errTimes >= 25) {
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
    printTime(`第${this.times}次请求···`, CQLog.LOG_INFO)
    request({
      url: url,
      timeout: 1000 * 20
    }, async (err, res, body) => {
      if (err) {
        ++this.errTimes
        printTime(err.code, CQLog.LOG_ERROR)
        this.copySetu(bot, url, fromQQ)
      } else {
        try {
          let data = JSON.parse(body)
          printTime(`第${this.times}次请求成功 剩余次数：${data.quota}`, CQLog.LOG_INFO_SUCCESS)
          if (data.code === 0) {
            await this.formatAndSave(data.data)
            if (data.quota <= 30) {
              this.copyEnd(bot, 1, fromQQ)
              return
            }
            this.copySetu(bot, url, fromQQ)
          } else {
            ++this.errTimes
            this.copySetu(bot, url, fromQQ)
          }
        }
        catch (err) {
          ++this.errTimes
          printTime(err.code, CQLog.LOG_ERROR)
          this.copySetu(bot, url, fromQQ)
        }
      }
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
    this.downloadCache(bot, fromQQ)
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
    const keyword = bot.adminData && bot.adminData.id === id ? bot.config.setu.keyword_2 : bot.config.setu.keyword_1
    const star = bot.adminData && bot.adminData.id === id ? bot.config.setu.star_2 : bot.config.setu.star_1
    this.Pool.setuWatchNum(id)
      .then(data => {
        if (data.length < 1) {
          bot.send(fromType, id, `今天还没有人看${keyword}`)
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
        bot.send(fromType, id, `${bot.CQCode.at(qqList[indexOfMax])}今天看了${numList[indexOfMax]}张${keyword}荣获${star}`)
      })
      .catch(() => {
        bot.send(fromType, id, `我也不知道今天谁拿了${star}`)
      })
  }

  downliading = false

  /**
   * 把数据库里的图片下载到酷Q文件夹里
   */
  downloadCache = (bot: Bot, fromQQ?: number) => {
    if (this.downliading) {
      bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}已在下载缓存`)
      return
    }
    this.Pool.cacheNum()
      .then(results => {
        this.downliading = true
        this.download(bot, results, fromQQ)
      })
      .catch(() => {
        bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}未缓存信息查询失败`)
        printTime('未缓存信息查询失败', CQLog.LOG_ERROR)
      })
  }

  download = async (bot: Bot, results: any, fromQQ?: number) => {
    if (results.length < 1) {
      bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}所有图片已经缓存`)
      return
    }
    bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}开始下载${results.length}张未缓存图片`)
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
              console.error(err)
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
            printTime(`[${err.response.status}][ID:${data.id}] - ${data.url}`, CQLog.LOG_ERROR)
            ++errNum
          }
        })
        .catch(() => {
          printTime(`[TIMEOUT][ID:${data.id}] - ${data.url}`, CQLog.LOG_ERROR)
          ++timeoutNum
        })
    }
    const endTime = new Date()
    bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${fromQQ && bot.adminData.type !== 0 ? bot.CQCode.at(fromQQ) : ''}缓存下载完成\n用时${(endTime.getTime() - startTime.getTime()) / 1000}s${timeoutNum ? `\n超时:${timeoutNum}` : ''}${errNum ? `\n异常:${errNum}` : ''}${delNum ? `\n被删除:${delNum}` : ''}`)
    this.downliading = false
  }
}
