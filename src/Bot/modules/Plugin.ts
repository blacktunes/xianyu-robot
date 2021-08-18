import { existsSync, mkdirSync } from 'fs-extra'
import { writeSync } from 'node-yaml'
import { AnonymousPlugin, BotPlugin as ClassPlugin, PluginConfig } from '../..'
import { Bot } from '../Bot'
import path = require('path')
import { merge } from 'lodash'
export class Plugin {
  constructor(bot: Bot, dir: string, filename: string) {
    this.Bot = bot
    this.dirname = dir
    this.filename = filename
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
   * 本地设置文件名
   */
  readonly filename: string
  /**
   * 插件设置
   */
  config: PluginConfig = { config: {} }

  setConfig<T>(name: string, config: T): void {
    this.config.config[name] = merge(config, this.config.config[name])
  }

  getConfig<T>(name: string): T
  getConfig<T extends { [key: string]: any }, K extends string>(name: string, key: K): T[K]
  getConfig(name: string, key?: string) {
    if (key) {
      return this.config.config[name] && this.config.config[name][key] ? this.config.config[name][key] : null
    } else {
      return this.config.config[name] ? this.config.config[name] : null
    }
  }

  saveConfig(): void {
    if (this.dirname) {
      try {
        if (!existsSync(this.dirname)) {
          mkdirSync(this.dirname)
        }
        writeSync(path.join(this.dirname, `./${this.filename}.yml`), this.config)
      } catch (err) {
        console.error(err)
        this.Bot.Log.logError('插件配置未保存', '插件')
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