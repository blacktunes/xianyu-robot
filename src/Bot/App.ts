import { Connect } from '../Connect/Connect'
import { PrintLog } from '../Tools/PrintLog'
import { BotConfig, BotPluginClass } from '../Type/option'
import { Bot } from './Bot'
import { Api } from './modules/Api'
import { Event } from './modules/Event'
import fs = require('fs')
import path = require('path')

export class App {
  /**
   * BOT构造函数
   * @param name 插件名
   * @param dirname 插件设置保存位置
   */
  constructor(name: string = null, dirname: string = __dirname) {
    const dir = path.join(dirname, './config/')
    if (dirname) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
    }
    this.Bot = new Bot(name, dir)
  }

  private isStart = false
  private checkStart = (tip: string = '请在应用启动前调用该方法') => {
    if (this.isStart) {
      throw new Error(tip)
    }
  }

  readonly Bot: Bot

  /**
   * 载入bot链接成功后会立刻执行的方法
   */
  readonly init = (fn: (...arg: any[]) => any) => {
    this.checkStart('请在应用启动前载入init方法')
    this.tempInitList.push(fn)
    return this
  }
  private tempInitList: ((...arg: any[]) => any)[] = []
  private _pluginsList: {
    arg: any
    plugin: BotPluginClass
  }[] = []

  /**
   * 载入插件
   * @param plugin 插件类
   */
  readonly plugin = (plugin: BotPluginClass, ...arg: any[]): App => {
    this.checkStart('请在应用启动前载入插件')
    this._pluginsList.push({
      plugin: plugin,
      arg: [...arg]
    })
    return this
  }
  private initPlugin = (): void => {
    if (this.Bot.Plugin.pluginsList.length > 0) {
      for (let i in this.Bot.Plugin.pluginsList) {
        this.Bot.Plugin.pluginsList[i].init()
      }
    }
  }

  private initBot = async () => {
    this.Bot.userId = (await this.Bot.Api.getLoginInfo()).user_id

    let setting: any = {}
    if (fs.existsSync(path.join(this.Bot.Plugin.dirname, `./${this.Bot.userId}.json`))) {
      setting = JSON.parse(fs.readFileSync(path.join(this.Bot.Plugin.dirname, `./${this.Bot.userId}.json`)).toString())
    }
    for (let i in setting) {
      this.Bot.Plugin.config[i] = setting[i]
    }
    PrintLog.logNotice('本地配置加载成功', this.Bot.name)

    this._pluginsList.forEach(item => {
      const _plugin = new item.plugin(this.Bot, ...item.arg)
      this.Bot.Plugin.pluginsList.push(_plugin)
      PrintLog.logNotice(`[${_plugin.name}] 已载入`, '插件')
    })

    if (this.tempInitList.length > 0) {
      for (const i in this.tempInitList) {
        this.tempInitList[i](this)
      }
    }
    this.initPlugin()
    this.Bot.Plugin.saveConfig()
    PrintLog.logNotice('应用已启动', this.Bot.name)
  }

  /**
   * 设置管理员
   */
  readonly admin = (qq: number): App => {
    this.checkStart('请在应用启动前录入管理员')
    this.Bot.Admin.addAdmin(qq)
    return this
  }

  /**
   * 启动函数
   */
  readonly start = (config: BotConfig = { ws: null, debug: null, nolisten: null }): Promise<void> => {
    this.checkStart('请勿重复启动')
    this.isStart = true
    return new Promise(resolve => {
      this.Bot.Conn = new Connect(config.ws)
      this.Bot.Conn.addEvent('ws.ready', async () => {
        this.Bot.Api = new Api(this.Bot, config.debug)
        this.Bot.Event = new Event(this.Bot, config.nolisten)
        this.Bot.Event
          .on('ws.close', () => {
            PrintLog.logWarning(`${this.Bot.name}已关闭`, 'WS')
          })
          .on('meta_event.heartbeat', async () => {
            // 响应心跳连接
            this.Bot.Api.getApiStatus()
          })
        await this.initBot()
        resolve()
      })
    })
  }
}
