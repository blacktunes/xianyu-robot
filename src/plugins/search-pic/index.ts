import Bot, { printTime, CQLog } from '../../main'
import { saucenao } from './modules/saucenao'
import { whatanime } from './modules/whatanime'

export interface SearchPicConfig {
  enable: boolean,
  saucenaoApiKey: string
}

export default class SearchPic {
  constructor(bot: Bot, searchPicConfig: SearchPicConfig) {
    this.initSearchPic(bot, searchPicConfig)
  }

  initSearchPic(bot: Bot, searchPicConfig: SearchPicConfig) {
    const config: SearchPicConfig = {
      enable: true,
      saucenaoApiKey: ''
    }
    if (searchPicConfig) {
      for (let i in config) {
        if (searchPicConfig[i]) {
          config[i] = searchPicConfig[i]
        }
      }
      bot.config.searchPic = { ...config }
    } else {
      bot.config.searchPic = { ...config }
    }
    bot.applyPlugin(this.searchPic)
    printTime(`[插件] 搜图已载入`, CQLog.LOG_INFO_SUCCESS)
    this.initSearchPic = () => {
      throw new Error('请勿重复初始化')
    }
  }

  searchImgList = {}

  searchPic = (bot: Bot, from: number, fromQQ: number, msg: string, type: 0 | 1 | 2) => {
    if (type === 0) return
    if (bot.config.searchPic) {
      // 使用saucenao搜图
      if (msg.includes('-st')) {
        if (/(?<=url=).*?(?=\])/.test(msg)) {
          saucenao(bot, type, from, fromQQ, msg)
        } else {
          this.searchImgList[fromQQ] = [from, 'sn']
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}亮图吧`)
        }
        return 0
      }

      // 使用whatanime搜图
      if (msg.includes('-wa')) {
        if (/(?<=url=).*?(?=\])/.test(msg)) {
          whatanime(bot, type, from, fromQQ, msg)
        } else {
          this.searchImgList[fromQQ] = [from, 'wa']
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}亮图吧`)
        }
        return 0
      }

      if (this.searchImgList[fromQQ] && this.searchImgList[fromQQ][0] === from) {
        if (/(?<=url=).*?(?=\])/.test(msg)) {
          if (this.searchImgList[fromQQ][1] === 'wa') {
            whatanime(bot, type, from, fromQQ, msg)
            delete this.searchImgList[fromQQ]
          } else if (this.searchImgList[fromQQ][1] === 'sn') {
            saucenao(bot, type, from, fromQQ, msg)
            delete this.searchImgList[fromQQ]
          }
          return 0
        } else {
          delete this.searchImgList[fromQQ]
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}不搜算了`)
        }
      }
    }
  }

}
