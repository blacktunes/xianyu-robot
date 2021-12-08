import { Bot } from '../Bot/Bot'
import { Command } from './Command'
import { merge } from 'lodash'

export abstract class BotPlugin {
  constructor(bot: Bot) {
    this.Bot = bot
  }
  /** 插件名称 */
  readonly name: string = '未命名插件'
  private _config: { [key: string]: any }
  private _configProxy: { [key: string]: any }
  /** 插件设置 */
  config: { [key: string]: any } = {}
  /** Bot对象 */
  protected Bot: Bot
  /**
   * 插件命令
   * 与Bot.Command基本相同，但能设置统一设置
   */
  protected Command: Command
  /**
   * 安装方法
   * 该方法会在实例化后执行，请勿重复执行
   */
  setup(config?: any) {
    if (config) {
      this.config = merge(this.config, config)
    }
    this.Command = new Command(this.name, this.Bot)
  }
  /**
   * 初始化方法
   * 该方法会在Bot初始化完成后执行，请勿重复执行
   */
  init(): void | Promise<void> { }
  private deepProxy(obj: { [key: string]: any }) {
    if (typeof obj === 'object') {
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          obj[key] = this.deepProxy(obj[key])
        }
      }
    }
    return new Proxy(obj, {
      set: (target, key, value, receiver) => {
        if (typeof value === 'object') {
          value = this.deepProxy(value)
        }
        const flag = Reflect.set(target, key, value, receiver)
        if (flag) {
          this.Bot.Plugin.saveConfig()
        }
        return flag
  
      },
      deleteProperty(target, key) {
        return Reflect.deleteProperty(target, key)
      }
    })
  }
  /**
   * 创建设置代理，在设置修改后自动保存本地配置
   */
  autoSave() {
    this._config = this.config
    this._configProxy = this.deepProxy(this._config)
    Object.defineProperty(this, 'config', {
      get: () => {
        return this._configProxy
      },
      set: (value) => {
        this._config = value
      }
    })
  }
}
