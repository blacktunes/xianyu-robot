import axios from 'axios'
import Bot, { printTime, CQLog } from '../../../main'

// 只显示P站、动画、电影结果
var whiteList = [5, 21, 23]

/**
 * 使用saucenao搜图
 * @param type 发送类型, 2为讨论组, 1为群
 * @param {number} from 来源群号或讨论组ID
 * @param {number} fromQQ
 * @param {string} msg
 */
export function saucenao(bot: Bot, type: 1 | 2, from: number, fromQQ: number, msg: string) {
  printTime(`${fromQQ}触发saucenao搜图`, CQLog.LOG_INFO)
  const imgURL = msg.match(/(?<=url=).*?(?=\])/)[0]
  printTime(`已获取图片URL`, CQLog.LOG_INFO)
  axios({
    url: 'https://saucenao.com/search.php',
    method: 'POST',
    params: {
      api_key: bot.config.saucenaoApiKey ? bot.config.saucenaoApiKey : '',
      db: 999,
      output_type: 2,
      numres: 1,
      url: imgURL
    }
  })
    .then((res: any) => {
      let {
        header: {
          // short_remaining,
          long_remaining
        }
      } = res.data
      let warnMsg = ''
      if (long_remaining < 20) {
        warnMsg += `\n注意：24h内搜图次数仅剩${long_remaining}次`
      }
      if (res.data.results && res.data.results.length > 0) {
        let {
          header: {
            similarity, // 相似度
            thumbnail, // 缩略图
            index_id // 数据库id
          },
          data: {
            source,
            part,
            est_time,
            // ext_urls,
            title, // 标题
            member_name, // 作者
            // member_id, // 可能 pixiv uid
            pixiv_id,
            eng_name, // 本子名
            jp_name // 本子名
          }
        } = res.data.results[0]
        if (similarity < 60) {
          warnMsg += `\n相似度过低，如果结果不理想，那么可能：确实找不到此图/图为原图的局部图/图清晰度太低/搜索引擎尚未同步新图`
        }
        let bookName = jp_name || eng_name
        if (bookName) {
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}这好像是个本子，具体是啥我就不说了${warnMsg}`)
        } else if (whiteList.indexOf(index_id) == -1) {
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}搜到的结果结果好像有点奇怪，就不发出来了`)
        } else {
          if (pixiv_id) {
            bot.send(type, from, `${bot.CQCode.at(fromQQ)}\n${bot.CQCode.image(thumbnail)}\n相似度：${similarity}%\ntitle：${title}\nauthor：${member_name}\npid：${pixiv_id}${warnMsg}`)
          } else if (est_time) {
            bot.send(type, from, `${bot.CQCode.at(fromQQ)}\n${bot.CQCode.image(thumbnail)}\n相似度：${similarity}%\n番名：${source}\n集数：${part}\n时间：${est_time}${warnMsg}`)
          } else {
            bot.send(type, from, `${bot.CQCode.at(fromQQ)}\n${bot.CQCode.image(thumbnail)}\n相似度：${similarity}%\n可能结果：${source ? source : ''} ${part ? part : ''}${warnMsg}`)
          }
        }
      } else {
        bot.send(type, from, `${bot.CQCode.at(fromQQ)}好像没查到这是啥${warnMsg}`)
      }
    })
    .catch(err => {
      console.error(err)
      bot.send(type, from, `${bot.CQCode.at(fromQQ)}出现了奇怪的错误`)
    })
}
