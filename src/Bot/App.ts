import { magenta, white, yellow } from 'colors'
import { existsSync, readJSONSync, removeSync } from 'fs-extra'
import { merge } from 'lodash'
import { readSync, writeSync } from 'node-yaml'
import { join } from 'path'
import { Connect } from '../Connect/Connect'
import { BotPlugin } from '../Plugin'
import { AnonymousPlugin, Plugin, PluginFunction, WebSocketConfig } from '../Type'
import { Bot } from './Bot'
import { Api } from './modules/Api'
import { Event } from './modules/Event'
import schedule = require('node-schedule')

export class App {
  /**
   * BOT构造函数
   * @param name 插件名
   * @param dirname 插件设置保存位置
   */
  constructor(name: string = 'Bot', dirname?: string | false, filename?: string) {
    let dir: string = null
    if (dirname !== false) {
      if (!dirname) {
        dir = join(require.main.path, '../config/')
      } else {
        dir = dirname
      }
    }
    if (!filename) {
      filename = `${name}-config`
    }
    this.Bot = new Bot(name, dir, filename)
  }

  private isStart = false

  private readonly Bot: Bot

  private whitelist: {
    group?: Set<number>
    user?: Set<number>
  } = {}
  private blacklist: {
    group?: Set<number>
    user?: Set<number>
  } = {}

  /**
   * 增加白名单列表
   * @param group_list 群聊白名单
   * @param user_list 私聊白名单
   */
  white(group_list?: number[], user_list?: number[]): this {
    if (group_list) {
      if (this.blacklist.group) {
        const list = magenta(group_list.toString())
        this.Bot.Log.logWarning(`已设置群聊黑名单，该白名单 ${list} 设置无效`)
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
        const list = magenta(user_list.toString())
        this.Bot.Log.logWarning(`已设置私聊黑名单，该白名单 ${list} 设置无效`)
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

  /**
   * 增加黑名单列表
   * @param group_list 群聊黑名单
   * @param user_list 私聊黑名单
   */
  black(group_list?: number[], user_list?: number[]) {
    if (group_list) {
      if (this.whitelist.group) {
        const list = magenta(group_list.toString())
        this.Bot.Log.logWarning(`已设置群聊白名单，该黑名单 ${list} 设置无效`)
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
        const list = magenta(user_list.toString())
        this.Bot.Log.logWarning(`已设置私聊白名单，该黑名单 ${list} 设置无效`)
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

  /**
   * 设置管理员
   */
  admin(id_list: number[]): this {
    if (this.isStart) {
      this.Bot.Log.logWarning('请在应用启动前录入管理员', 'Bot')
      return this
    }
    this.Bot.Admin.addAdmin(id_list)
    return this
  }

  /**
   * 增加不输出log的群组
   */
  noLog(gorup_list: number[]): this {
    gorup_list.forEach(group_id => {
      this.Bot.Data.setNoLog(group_id)
    })
    return this
  }

  private _pluginsList: {
    class: boolean
    plugin: Plugin | PluginFunction
    config?: any
  }[] = []
  /**
   * 载入方法插件
   * @param plugin 插件方法
   */
  plugin(plugin: PluginFunction): this
  /**
   * 载入类插件
   * @param plugin 插件类
   * @param config 插件设置
   */
  plugin<T extends Plugin>(plugin: T, config?: InstanceType<T>['config']): this
  plugin<T extends Plugin>(plugin: T | PluginFunction, config?: InstanceType<T>['config']): this {
    if (this.isStart) {
      this.Bot.Log.logWarning('请在应用启动前载入插件', 'Bot')
      return this
    }
    if (plugin.prototype) {
      this._pluginsList.push({
        class: true,
        plugin,
        config
      })
    } else {
      this._pluginsList.push({
        class: false,
        plugin
      })
    }
    return this
  }

  /**
   * 启动函数
   * @param ws 链接设置
   * @param debug 是否开启debug
   * @param showLog 是否在控制台输出日志
   */
  start(ws: WebSocketConfig = {}, debug = false, showLog: boolean = true): Promise<Bot> {
    if (this.isStart) {
      this.Bot.Log.logWarning('请勿重复启动', 'Bot')
      return
    }
    this.isStart = true
    return new Promise(resolve => {
      this.Bot.Conn = new Connect(this.Bot.Data, ws)
      this.Bot.Conn.blacklist = this.blacklist
      this.Bot.Conn.whitelist = this.whitelist

      this.Bot.Conn.addEvent('ws.ready', async () => {
        this.Bot.Debug.debug = debug
        this.Bot.Api = new Api(this.Bot)
        this.Bot.Data.userId = (await this.Bot.Api.getLoginInfo()).user_id
        this.getData()
          .finally(() => {
            schedule.scheduleJob('0 0 0 * * *', () => {
              this.getData()
            })
          })

        this.Bot.Data.showLog = showLog
        this.Bot.Event = new Event(this.Bot)
        this.Bot.Event
          .on('ws.close', () => {
            this.Bot.Log.logWarning(`${this.Bot.Data.name}已关闭`, 'WS')
          })
          .on('meta_event.heartbeat', async () => {
            // 响应心跳连接
            this.Bot.Api.getApiStatus()
          })
        await this.initBot()
        this.Bot.Log.logNotice('应用已启动', 'Bot')
        resolve(this.Bot)
      })
    })
  }

  private async getData(): Promise<void> {
    this.Bot.Data.updateFriendList()
    this.Bot.Data.updateGroupsList()
      .then(() => {
        this.Bot.Data.updateAllGroupMemberList()
      })
  }

  private initBot = async (): Promise<void> => {
    this._pluginsList.forEach(item => {
      if (item.class) {
        const _plugin = new (item.plugin as Plugin)(this.Bot)
        _plugin.setup(item.config)
        _plugin.setup = (): void => {
          this.Bot.Log.logWarning('请勿重复执行setup')
        }
        if (this.Bot.Plugin.list.some(i => i.name === _plugin.name)) {
          this.Bot.Log.logWarning(`发现重名插件 ${white(_plugin.name)}`, '插件')
        }
        this.Bot.Plugin.list.push(_plugin)
      } else {
        this.Bot.Plugin.list.push({
          name: '匿名插件',
          init: item.plugin as PluginFunction
        })
      }
    })

    if (this.Bot.Plugin.dirname) {
      const jsonPath = join(this.Bot.Plugin.dirname, `./${this.Bot.Plugin.filename}.json`)
      const ymlPath = join(this.Bot.Plugin.dirname, `./${this.Bot.Plugin.filename}.yml`)
      try {
        let config: { config?: any, plugin?: any, bot?: any } = { plugin: {}, bot: {} }
        if (existsSync(jsonPath)) {
          config = readJSONSync(jsonPath)
          removeSync(jsonPath)
          writeSync(ymlPath, config)
        }
        if (existsSync(ymlPath)) {
          config = readSync(ymlPath)
        }
        if (config.config && Object.keys(config.config).length > 0) {
          config.plugin = merge(config.plugin, config.config)
          delete config.config
          writeSync(ymlPath, config)
        }
        for (const name in config.plugin) {
          this.Bot.Plugin.setConfig(name, config.plugin[name])
        }
        merge(this.Bot.Data.config, config.bot)
        this.Bot.Log.logNotice('本地配置加载成功', 'Bot')
      } catch (err) {
        console.error(err)
        this.Bot.Log.logError('本地配置加载失败', 'Bot')
      }
    }

    await this.initPlugin()
    this.Bot.Plugin.saveConfig()
    if (!this.Bot.Debug.debug) {
    }
  }

  private initPlugin = async (): Promise<void> => {
    if (this.Bot.Plugin.list.length > 0) {
      this.Bot.Log.logInfo('开始初始化插件', 'Bot')
      for (let i in this.Bot.Plugin.list) {
        const plugin = this.Bot.Plugin.list[i] as BotPlugin
        if (plugin.name === '匿名插件') {
          try {
            await (plugin as AnonymousPlugin).init(this.Bot)
            this.Bot.Log.logNotice(`${yellow(plugin.name)} 已加载`, '插件')
          } catch (err) {
            this.Bot.Log.logError(`${yellow(plugin.name)} 加载失败`, '插件')
          }
        } else {
          if (plugin.config.enable === undefined || plugin.config.enable) {
            await plugin.init()
            if (plugin.config.auto_save === undefined || plugin.config.auto_save) {
              plugin.autoSave()
            }
            this.Bot.Log.logNotice(`${yellow(plugin.name)} 已加载`, '插件')
          } else {
            this.Bot.Log.logWarning(`${white(plugin.name)} 已被禁用`, '插件')
          }
          plugin.autoSave = (): void => {
            this.Bot.Log.logWarning('请勿重复执行autoSave')
          }
        }
        plugin.init = (): void => {
          this.Bot.Log.logWarning('请勿重复执行init')
        }
      }
      this.Bot.Log.logNotice('插件初始化完成')
    }
  }
}
