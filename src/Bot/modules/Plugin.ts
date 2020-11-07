import { BotPlugin } from '../..'
import { Bot } from '../Bot'
import fs = require('fs')
import path = require('path')
import { PrintLog } from '../../Tools'

export class Plugin {
  constructor(bot: Bot, dir: string) {
    this.bot = bot
    this.dirname = dir
  }
  private bot: Bot
  /**
   * 本地设置保存位置
   */
  readonly dirname: string
  /**
   * 插件设置
   */
  config: {
    [name: string]: any
  } = {}

  /**
   * 插件列表
   */
  pluginsList: BotPlugin[] = []

  readonly saveConfig = () => {
    if (this.dirname) {
      const str = JSON.stringify(this.config)
      try {
        fs.writeFileSync(path.join(this.dirname, `./${this.bot.userId}.json`), str)
      } catch (err) {
        console.error(err)
        PrintLog.logError('数据未写入JSON', '插件')
      }
    }
  }

  readonly debug = (name: string) => {
    for (const i in this.pluginsList) {
      if (this.pluginsList[i].name === name) {
        return this.pluginsList[i].debug()
      }
    }
  }
}