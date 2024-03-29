import { magenta, white, yellow } from 'colors'
import { existsSync, readJSONSync, removeSync } from 'fs-extra'
import { merge } from 'lodash'
import { cpu, mem } from 'node-os-utils'
import { readSync, writeSync } from 'node-yaml'
import { join } from 'path'
import { secondsFormat } from '..'
import { Connect } from '../Connect/Connect'
import { BotPlugin } from '../Plugin'
import { AnonymousPlugin, Plugin, PluginFunction, WebSocketConfig } from '../Type'
import { Bot } from './Bot'
import { Api } from './modules/Api'
import { Event } from './modules/Event'

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

  private whitelist: Set<number> = new Set<number>()
  private blacklist: Set<number> = new Set<number>()

  /**
   * 增加白名单列表，请勿和黑名单同时使用
   * @param group_list 白名单列表
   */
  white(group_list: number[]): this {
    if (this.isStart) {
      this.Bot.Log.logWarning('请在应用启动前加载白名单', this.Bot.Data.name)
      return this
    }
    if (group_list.length < 1) return this
    if (this.blacklist.size > 0) {
      this.Bot.Log.logWarning(`已设置黑名单，该白名单 ${magenta(group_list.toString())} 设置无效`, 'Admin')
      return this
    }
    this.whitelist = new Set(([...this.whitelist, ...group_list]))
    return this
  }

  /**
   * 增加黑名单列表，请勿和白名单同时使用
   * @param group_list 黑名单列表
   */
  black(group_list: number[]): this {
    if (this.isStart) {
      this.Bot.Log.logWarning('请在应用启动前加载白名单', this.Bot.Data.name)
      return this
    }
    if (group_list.length < 1) return this
    if (this.whitelist.size > 0) {
      this.Bot.Log.logWarning(`已设置白名单，该黑名单 ${magenta(group_list.toString())} 设置无效`, 'Admin')
      return this
    }
    this.blacklist = new Set(([...this.blacklist, ...group_list]))
    return this
  }

  /**
   * 设置管理员
   */
  admin(id_list: number[]): this {
    if (this.isStart) {
      this.Bot.Log.logWarning('请在应用启动前录入管理员', this.Bot.Data.name)
      return this
    }
    this.Bot.Admin.addAdmin(id_list)
    return this
  }

  noSysComm(group_list: number[]): this {
    this.Bot.Data.setNoComm(group_list)
    return this
  }

  /**
   * 增加不输出log的群组
   */
  noLog(gorup_list: number[]): this {
    if (this.isStart) {
      this.Bot.Log.logWarning('请在应用启动前加载白名单', this.Bot.Data.name)
      return this
    }
    this.Bot.Data.setNoLog(gorup_list)
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
      this.Bot.Log.logWarning('请在应用启动前载入插件', this.Bot.Data.name)
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
      this.Bot.Log.logWarning('请勿重复启动', this.Bot.Data.name)
      return
    }
    this.isStart = true
    return new Promise(resolve => {
      this.Bot.Conn = new Connect(ws)
      this.Bot.Admin.addWhitelist([...this.whitelist])
      this.Bot.Admin.addBlacklist([...this.blacklist])

      this.Bot.Conn.addEvent('ws.ready', async () => {
        this.Bot.Debug.debug = debug
        this.Bot.Api = new Api(this.Bot)
        this.Bot.Data.userId = (await this.Bot.Api.getLoginInfo()).user_id
        this.getData()

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
        this.setSysCommand()
        await this.initBot()
        this.Bot.Log.logNotice('应用已启动', this.Bot.Data.name)
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

  private setSysCommand = (): void => {
    this.Bot.Command
      .command('#help')
      .group('内置指令')
      .desc('查询所有可用指令')
      .action('group', e => {
        let msg = ''
        const list = {
          other: ''
        }
        this.Bot.Command.list.forEach(comm => {
          if ((comm.blacklist.size > 0 && comm.blacklist.has(e.group_id)) || (comm.whitelist.size > 0 && !comm.whitelist.has(e.group_id))) return

          if (comm.group) {
            if (list[comm.group]) {
              list[comm.group] += `\n${comm.comm}${comm.desc ? ` ${comm.desc}` : ''}${comm.admin ? ' (管理员)' : ''}`
            } else {
              list[comm.group] = `${comm.comm}${comm.desc ? ` ${comm.desc}` : ''}${comm.admin ? ' (管理员)' : ''}`
            }
          } else {
            if (list['other']) {
              list['other'] += `\n${comm.comm}${comm.desc ? ` ${comm.desc}` : ''}${comm.admin ? ' (管理员)' : ''}`
            } else {
              list['other'] = `${comm.comm}${comm.desc ? ` ${comm.desc}` : ''}${comm.admin ? ' (管理员)' : ''}`
            }
          }
        })
        for (const i in list) {
          if (i !== 'other') {
            if (msg) {
              msg += '\n'
            }
            msg += `${i}：\n${list[i]}\n----------`
          }
        }
        msg += `${list.other ? '\n其它指令：\n' + list.other : ''}`
        this.Bot.Api.sendGroupMsg(e.group_id, msg)
        return true
      })

    this.Bot.Command
      .command('#sys')
      .admin()
      .desc('查询BOT运行状态')
      .group('内置指令')
      .action('group', async e => {
        const cpuUsage = await cpu.usage()
        const memInfo = await mem.info()
        this.Bot.Api.sendGroupMsg(e.group_id, `${this.Bot.Data.name}\n----------\n已加载插件：${this.Bot.Plugin.list.length}\n已加载命令：${this.Bot.Command.list.length}\n队列中的消息：${this.Bot.Conn.getMessageNum()}\n消息监听器数量：${this.Bot.Conn.getEventNum()}\n运行时长：${secondsFormat(Math.floor(process.uptime()))}\n----------\nCPU：${cpuUsage}%\n内存：${memInfo.usedMemMb}/${memInfo.totalMemMb}(${(memInfo.usedMemMb / memInfo.totalMemMb * 100.0).toFixed(2)}%)\nBOT占用内存：${((process.memoryUsage().rss) / 1024 / 1024).toFixed(2)}MB`)
        return true
      })

    this.Bot.Command.list.forEach(item => {
      if (item.group === '内置指令') {
        item.blacklist = this.Bot.Data.noCommList
      }
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
        this.Bot.Log.logNotice('本地配置加载成功', this.Bot.Data.name)
      } catch (err) {
        console.error(err)
        this.Bot.Log.logError('本地配置加载失败', this.Bot.Data.name)
      }
    }

    await this.initPlugin()
    this.Bot.Plugin.saveConfig()
    if (!this.Bot.Debug.debug) {
    }
  }

  private initPlugin = async (): Promise<void> => {
    if (this.Bot.Plugin.list.length > 0) {
      this.Bot.Log.logInfo('开始初始化插件', this.Bot.Data.name)
      for (let i in this.Bot.Plugin.list) {
        const plugin = this.Bot.Plugin.list[i] as BotPlugin
        if (plugin.name === '匿名插件') {
          await (plugin as AnonymousPlugin).init(this.Bot)
          this.Bot.Log.logNotice(`${yellow(plugin.name)} 已加载`, '插件')
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
