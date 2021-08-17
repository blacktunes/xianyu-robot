import { existsSync, mkdirSync, writeJSONSync } from 'fs-extra'
import { AnonymousPlugin, BotPlugin as ClassPlugin, PluginConfig } from '../..'
import { Bot } from '../Bot'
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

  setConfig<T>(name: string, config: T): void {
    this.config[name] = {
      ...config
    }
  }

  saveConfig(): void {
    if (this.dirname) {
      if (!existsSync(this.dirname)) {
        mkdirSync(this.dirname)
      }
      try {
        writeJSONSync(path.join(this.dirname, `./${this.Bot.Data.name}-config.json`), this.config, {
          spaces: 2
        })
      } catch (err) {
        console.error(err)
        this.Bot.Log.logError('数据未写入JSON', '插件')
      }
    }
  }

  getPlugin<T extends ClassPlugin | AnonymousPlugin>(name: string): Omit<T, 'init'> | undefined {
    const plugin = this.list.find(i => i.name === name)
    if (plugin) {
      return plugin as T as Omit<T, 'init'>
    } else {
      this.Bot.Log.logDebug(`未找到 ${name}`, '插件')
      return undefined
    }
  }
}