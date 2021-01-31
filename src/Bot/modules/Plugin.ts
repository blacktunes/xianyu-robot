import { PluginConfig } from './../../Type/option';
import { BotPlugin } from '../..'
import { Bot } from '../Bot'
import fs = require('fs-extra')
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
  config: PluginConfig = {}

  setConfig = <T>(name: string, config: T) => {
    this.config[name] = {
      ...config
    }
  }

  /**
   * 插件列表
   */
  list: BotPlugin[] = []

  readonly saveConfig = () => {
    if (this.dirname) {
      try {
        fs.writeJSONSync(path.join(this.dirname, `./${this.bot.userId}-config.json`), this.config, {
          spaces: 2
        })
      } catch (err) {
        console.error(err)
        PrintLog.logError('数据未写入JSON', '插件')
      }
    }
  }

  readonly debug = (name: string) => {
    for (const i in this.list) {
      if (this.list[i].name === name) {
        return this.list[i].debug()
      }
    }
  }
}