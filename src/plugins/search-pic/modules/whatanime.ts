import axios from 'axios'
import Bot, { printTime, CQLog } from '../../../main'

/**
 * 使用whatanime搜图
 * @param type 发送类型, 2为讨论组, 1为群
 * @param {number} fromID 来源群号或讨论组ID
 * @param {number} fromQQ
 * @param {string} msg
 */
export function whatanime(bot: Bot, type: 1 | 2, fromID: number, fromQQ: number, msg: string) {
  printTime(`${fromQQ}触发whatanime搜图`, CQLog.LOG_INFO)
  const imgURL = msg.match(/(?<=url=).*?(?=\])/)[0]
  printTime(`已获取图片URL`, CQLog.LOG_INFO)
  axios({
    url: 'https://trace.moe/api/search',
    method: 'GET',
    params: {
      url: imgURL
    }
  })
    .then(res => {
      const quota = res.data.quota
      let warnMsg = ''
      if (quota < 20) {
        warnMsg += `\n注意：24h内搜图次数仅剩${quota}次`
      }
      if (res.data.docs && res.data.docs.length > 0) {
        let {
          from,
          to,
          at,
          anilist_id,
          filename,
          tokenthumb,
          // season,
          anime,
          episode,
          similarity
        } = res.data.docs[0]
        similarity = (similarity * 100).toFixed(2)
        if (similarity < 60) {
          warnMsg += `\n相似度过低，如果结果不理想，那么可能：确实找不到此图/图为原图的局部图/图清晰度太低`
        }
        let time = `${timeFormat(from)}~${timeFormat(to)}`
        let thumb = `https://trace.moe/thumbnail.php?anilist_id=${anilist_id}\&file=${filename}&t=${at}&token=${tokenthumb}`
        thumb = encodeURI(thumb.replace('+', ''))
        bot.send(type, fromID, `${bot.CQCode.at(fromQQ)}\n${bot.CQCode.image(thumb)}\n相似度：${similarity}%\n番名：${anime}\n集数：${episode}\n时间：${time}${warnMsg}`)
      } else {
        bot.send(type, fromID, `${bot.CQCode.at(fromQQ)}好像没查到这是啥${warnMsg}`)
      }
    })
    .catch(err => {
      console.error(err)
      bot.send(type, fromID, `${bot.CQCode.at(fromQQ)}出现了奇怪的错误`)
    })
}

/**
 * 将秒数转化为HH:MM:SS格式
 * @param {number} time 秒
 */
function timeFormat(time: number) {
  var h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600)
  var m = Math.floor((time / 60 % 60)) < 10 ? '0' + Math.floor((time / 60 % 60)) : Math.floor((time / 60 % 60))
  var s = Math.floor((time % 60)) < 10 ? '0' + Math.floor((time % 60)) : Math.floor((time % 60))
  return h + ":" + m + ":" + s
}
