import { existsSync, mkdirSync } from 'fs-extra'
import { readSync, writeSync } from 'node-yaml'
import { AnonymousPlugin, } from '../../Type'
import { BotPlugin } from '../../Plugin/Plugin'
import { Bot } from '../Bot'
import path = require('path')
import { merge } from 'lodash'

export class Plugin {
  constructor(bot: Bot, dir: string, filename: string) {
    this.Bot = bot
    this.dirname = dir
    this.filename = filename
  }
  private Bot: Omit<Bot, 'Plugin'>

  /** 插件列表 */
  list: (BotPlugin | AnonymousPlugin)[] = []

  /** 本地设置保存位置 */
  readonly dirname: string
  /** 本地设置文件名 */
  readonly filename: string

  setConfig(name: string, config: any) {
    const plugin = this.getPlugin(name)
    if (plugin && plugin.name === name) {
      plugin['config'] = merge(plugin['config'], config)
    }
  }

  getConfig<T>(name: string): T | any
  getConfig<T extends { [key: string]: any }, K extends string>(name: string, key: K): T[K]
  getConfig(name: string, key?: string) {
    const plugin = this.getPlugin(name)
    if (key) {
      return plugin && plugin['config'] && plugin['config'][key] ? plugin['config'][key] : null
    } else {
      return plugin && plugin['config'] ? plugin['config'] : null
    }
  }

  private saveFlag = false
  saveConfig(): void {
    if (this.saveFlag) {
      this.Bot.Log.logWarning('插件配置保存任务冲突', '插件')
      return
    }
    this.saveFlag = true
    if (this.dirname) {
      try {
        if (!existsSync(this.dirname)) {
          mkdirSync(this.dirname)
        }
        let config = { plugin: {} }
        this.list.forEach(plugin => {
          if (plugin['config'] && Object.keys(plugin['config']).length > 0) {
            config.plugin[plugin.name] = plugin['config']
          }
        })
        const ymlPath = path.join(this.dirname, `./${this.filename}.yml`)
        if (existsSync(ymlPath)) {
          config = merge(readSync(ymlPath), config)
        }
        writeSync(path.join(this.dirname, `./${this.filename}.yml`), config)
      } catch (err) {
        console.error(err)
        this.Bot.Log.logError('插件配置未保存', '插件')
      }
    }
    this.saveFlag = false
  }

  getPlugin<T extends BotPlugin | AnonymousPlugin>(name: string): Omit<T, 'init'> | undefined {
    const plugin = this.list.find(i => i.name === name)
    if (plugin) {
      return plugin as T as Omit<T, 'init'>
    } else {
      this.Bot.Log.logDebug(`未找到 ${name}`, '插件')
      return undefined
    }
  }
}
