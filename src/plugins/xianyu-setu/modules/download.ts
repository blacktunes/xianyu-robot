import axios from 'axios'
import fs = require('fs')
import Bot, { printTime } from '../../../main'
import { cacheNum, updateCache } from './mysql'

var copying = false

/**
 * 把数据库里的图片下载到酷Q文件夹里
 */
export function downloadCache(bot: Bot) {
  if (copying) {
    bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.adminData.type !== 0 ? bot.CQCode.at(bot.adminData.qq) : ''}已在下载缓存`)
    return
  }
  cacheNum()
    .then(results => {
      copying = true
      download(bot, results)
    })
    .catch(() => {
      bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.adminData.type !== 0 ? bot.CQCode.at(bot.adminData.qq) : ''}未缓存信息查询失败`)
      printTime('未缓存信息查询失败', 30)
    })
}

async function download(bot: Bot, results: any) {
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
            updateCache(data, 'cache')
          }
        })
      })
      .catch(err => {
        if (err.response.status) {
          updateCache(data, '404')
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
  bot.send(bot.adminData.type, bot.adminData.type === 0 ? bot.adminData.qq : bot.adminData.id, `${bot.adminData.type !== 0 ? bot.CQCode.at(bot.adminData.qq) : ''}缓存下载完成\n用时${(endTime.getTime() - startTime.getTime()) / 1000}s${timeoutNum ? `\n超时:${timeoutNum}`: ''}${errNum ? `\n异常:${errNum}`: ''}${delNum ? `\n被删除:${delNum}`: ''}`)
  copying = false
}
