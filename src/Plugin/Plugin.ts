import { magenta, white, yellow } from 'colors'
import { merge } from 'lodash'
import { Bot } from '../Bot/Bot'
import { Comm, SetComm, setCommLister } from '../Bot/modules/Command'
import { Log } from '../Tools'
import { Event } from './Event'

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

  /** 白名单 */
  whitelist: {
    group?: Set<number>
    user?: Set<number>
  } = {}
  /**
   * 增加白名单列表
   * @param group_list 群聊白名单
   * @param user_list 私聊白名单
   */
  white(group_list?: number[], user_list?: number[]) {
    if (group_list) {
      if (this.blacklist.group) {
        const pluginName = magenta(this.name)
        const list = magenta(group_list.toString())
        this.Bot.Log.logWarning(`${pluginName} 已设置群聊黑名单，该白名单 ${list} 设置无效`, this.name)
      } else {
        if (this.whitelist.group) {
          group_list.forEach(group_id => {
            this.whitelist.group.add(group_id)
          })
        } else {
          this.whitelist.group = new Set<number>(group_list)
        }
      }
    }

    if (user_list) {
      if (this.blacklist.user) {
        const pluginName = magenta(this.name)
        const list = magenta(user_list.toString())
        this.Bot.Log.logWarning(`${pluginName} 已设置私聊黑名单，该白名单 ${list} 设置无效`, this.name)
      } else {
        if (this.whitelist.user) {
          user_list.forEach(group_id => {
            this.whitelist.user.add(group_id)
          })
        } else {
          this.whitelist.user = new Set<number>(user_list)
        }
      }
    }

    return this
  }

  /** 黑名单 */
  blacklist: {
    group?: Set<number>
    user?: Set<number>
  } = {}
  /**
   * 增加黑名单列表
   * @param group_list 群聊黑名单
   * @param user_list 私聊黑名单
   */
  black(group_list?: number[], user_list?: number[]) {
    if (group_list) {
      if (this.whitelist.group) {
        const pluginName = magenta(this.name)
        const list = magenta(group_list.toString())
        this.Bot.Log.logWarning(`${pluginName} 已设置群聊白名单，该黑名单 ${list} 设置无效`, this.name)
      } else {
        if (this.blacklist.group) {
          group_list.forEach(group_id => {
            this.blacklist.group.add(group_id)
          })
        } else {
          this.blacklist.group = new Set<number>(group_list)
        }
      }
    }

    if (user_list) {
      if (this.whitelist.user) {
        const pluginName = magenta(this.name)
        const list = magenta(user_list.toString())
        this.Bot.Log.logWarning(`${pluginName} 已设置私聊白名单，该黑名单 ${list} 设置无效`, this.name)
      } else {
        if (this.blacklist.user) {
          user_list.forEach(group_id => {
            this.blacklist.user.add(group_id)
          })
        } else {
          this.blacklist.user = new Set<number>(user_list)
        }
      }
    }

    return this
  }

  /** Bot对象 */
  protected Bot: Bot

  /**
   * 插件命令
   * 与Bot.Command相同，但受插件黑白名单影响
   */
  protected Command = {
    command: (name: string) => {
      const repeat = this.Bot.Command.list.some(item => {
        return item.comm.includes(name)
      })
      if (repeat) {
        this.Bot.Log.logWarning(`发现重复指令 ${white(name)}, 指令设置失败`, '指令')
      }

      const comm = new Comm(name)
      comm.group = this.name
      this.Bot.Command.list.push(comm)

      setCommLister(this.Bot, comm)

      this.Bot.Log.logNotice(`${yellow(this.name)} - ${yellow(name)} 已加载`, '指令')

      return new SetComm(this.Bot, comm, repeat) as Omit<SetComm, 'group'>
    }
  }

  /**
   * 事件
   * 与Bot.Event相同，但能设置统一设置
   */
  protected Event: Event

  /**
   * 日志对象
   */
  protected Log: Log

  /**
   * 安装方法
   * 该方法会在实例化后执行
   */
  setup(config?: any) {
    if (config) {
      this.config = merge(this.config, config)
    }
    this.Event = new Event(this.name, this.Bot)
    this.Log = new Log(this.name)
    this.setup = () => { }
  }

  /**
   * 初始化方法
   * 该方法会在Bot初始化完成后执行
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
    this.autoSave = () => { }
  }
}
