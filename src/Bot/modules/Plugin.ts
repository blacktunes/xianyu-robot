import { BotPlugin as ClassPlugin, PluginConfig, AnonymousPlugin } from '../..'
import { Bot } from '../Bot'
import fs = require('fs-extra')
import path = require('path')

export class Plugin {
  constructor(bot: Bot, dir: string) {
    this.Bot = bot
    this.dirname = dir
  }
  private Bot: Bot

  /**
   * 插件列表
   */
  list: (ClassPlugin | AnonymousPlugin)[] = []

  /**
   * 本地设置保存位置
   */
  readonly dirname: string
  /**
   * 插件设置
   */
  config: PluginConfig = {}

  setConfig<T>(name: string, config: T) {
    this.config[name] = {
      ...config
    }
  }

  saveConfig() {
    if (this.dirname) {
      try {
        fs.writeJSONSync(path.join(this.dirname, `./${this.Bot.Data.userId}-config.json`), this.config, {
          spaces: 2
        })
      } catch (err) {
        console.error(err)
        this.Bot.Log.logError('数据未写入JSON', '插件')
      }
    }
  }

  getPlugin<T extends ClassPlugin | AnonymousPlugin>(name: string) {
    const plugin = this.list.find(i => i.name === name) as T
    if (plugin) {
      return plugin as Omit<T, 'init'>
    } else {
      this.Bot.Log.logDebug(`未找到 ${name}`, '插件')
      return undefined
    }
  }
}