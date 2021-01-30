import { Connect } from '../Connect/Connect'
import { PrintLog } from '../Tools/PrintLog'
import { Plugin, WSOption } from '../Type/option'
import { Bot } from './Bot'
import { Api } from './modules/Api'
import { Event } from './modules/Event'
import fs = require('fs-extra')
import path = require('path')
import colors = require('colors')
import os = require('os-utils')
import { secondsFormat } from '..'

export class App {
  /**
   * BOT构造函数
   * @param name 插件名
   * @param dirname 插件设置保存位置
   */
  constructor(name: string = 'Bot', dirname: string = require.main.path) {
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

  private Bot: Bot

  private WhiteList: number[] = []
  private BlackList: number[] = []

  /**
   * 增加白名单列表，请勿和黑名单同时使用
   * @param list 白名单列表
   */
  readonly white = (list: number[]) => {
    this.checkStart('请在应用启动前加载白名单')
    if (this.BlackList.length > 0) {
      throw new Error('请勿和黑名单同时使用')
    }
    this.WhiteList = [...this.WhiteList, ...list]
    return this
  }

  /**
   * 增加黑名单列表，请勿和白名单同时使用
   * @param list 黑名单列表
   */
  readonly black = (list: number[]) => {
    this.checkStart('请在应用启动前加载白名单')
    if (this.WhiteList.length > 0) {
      throw new Error('请勿和白名单同时使用')
    }
    this.BlackList = [...this.BlackList, ...list]
    return this
  }

  /**
   * 载入bot链接成功后会立刻执行的方法
   */
  readonly init = (fn: (bot: Bot) => void) => {
    this.checkStart('请在应用启动前载入init方法')
    this.tempInitList.push(fn)
    return this
  }
  private tempInitList: ((bot: Bot) => void)[] = []
  private _pluginsList: {
    config: any
    plugin: Plugin
  }[] = []

  /**
   * 载入插件
   * @param plugin 插件类
   */
  readonly plugin = <T extends Plugin>(plugin: T, config?: ConstructorParameters<T>[1]): App => {
    this.checkStart('请在应用启动前载入插件')
    this._pluginsList.push({
      plugin: plugin,
      config: config
    })
    return this
  }

  readonly command = (name: string) => {
    return this.Bot.Command.command(name)
  }

  private initPlugin = async () => {
    if (this.Bot.Plugin.pluginsList.length > 0) {
      PrintLog.logInfo('开始初始化插件', this.Bot.name)
      for (let i in this.Bot.Plugin.pluginsList) {
        await this.Bot.Plugin.pluginsList[i].init()
        this.Bot.Plugin.pluginsList[i].init = () => {
          throw new Error('请勿重复init')
        }
        PrintLog.logNotice(`${colors.yellow(this.Bot.Plugin.pluginsList[i].name)} 已加载`, '插件')
      }
      PrintLog.logNotice('插件初始化完成', this.Bot.name)
    }
  }

  private initCommand = () => {
    if (this.Bot.Command.list.length > 0) {
      PrintLog.logInfo('开始初始化指令', this.Bot.name)
      for (let i in this.Bot.Command.list) {
        this.Bot.Command.list[i].init(this.Bot.Event, this.Bot.Admin)
        this.Bot.Command.list[i].init = () => {
          throw new Error('请勿重复init')
        }
        PrintLog.logNotice(`${colors.yellow(this.Bot.Command.list[i].comm)} 已加载`, '指令')
      }
      PrintLog.logNotice('指令初始化完成', this.Bot.name)
    }
  }

  private initBot = async () => {
    this._pluginsList.forEach(item => {
      const _plugin = new item.plugin(this.Bot, item.config)
      this.Bot.Plugin.pluginsList.push(_plugin)
    })

    let setting: any = {}
    const configPath = path.join(this.Bot.Plugin.dirname, `./${this.Bot.userId}-config.json`)
    if (fs.existsSync(configPath)) {
      try {
        setting = fs.readJSONSync(configPath)
        for (let i in setting) {
          this.Bot.Plugin.config[i] = setting[i]
        }
        PrintLog.logNotice('本地配置加载成功', this.Bot.name)
      } catch {
        PrintLog.logError('本地配置加载失败', this.Bot.name)
      }
    }

    if (this.tempInitList.length > 0) {
      for (const i in this.tempInitList) {
        this.tempInitList[i](this.Bot)
      }
    }
    await this.initPlugin()
    this.initCommand()
    this.Bot.Plugin.saveConfig()
  }

  /**
   * 设置管理员
   */
  readonly admin = (qq: number): App => {
    this.checkStart('请在应用启动前录入管理员')
    this.Bot.Admin.addAdmin(qq)
    return this
  }

  private setSysCommand = (noCommand:  number[] = []) => {
    this.Bot.Command
      .command('#help')
      .group('内置指令')
      .black(noCommand)
      .desc('查询所有可用指令')
      .action('group', e => {
        let msg = ''
        const list = {}
        this.Bot.Command.list.forEach(comm => {
          if ((comm.blackList.length > 0 && comm.blackList.includes(e.group_id)) || (comm.whiteList.length > 0 && !comm.whiteList.includes(e.group_id))) return

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
        msg += `\n其它指令：\n${list['other']}` || ''
        this.Bot.Api.sendGroupMsg(e.group_id, msg)
        return true
      })

    this.Bot.Command
      .command('#sys')
      .admin()
      .desc('查询BOT运行状态')
      .group('内置指令')
      .black(noCommand)
      .action('group', e => {
        os.cpuUsage(cpuUsage => {
          const freeMem = os.freemem() / 1024
          const totalMem = os.totalmem() / 1024
          const data = {
            cpuUsage: (cpuUsage * 100.0).toFixed(2) + '%',
            useMem: (totalMem - freeMem).toFixed(2) + 'GB',
            totalMem: totalMem.toFixed(2) + 'GB',
            MemUsage: ((totalMem - freeMem) / totalMem * 100.0).toFixed(2) + '%',
          }
          this.Bot.Api.sendGroupMsg(e.group_id, `${this.Bot.name}\n----------\n已加载插件：${this.Bot.Plugin.pluginsList.length}\n已加载命令：${this.Bot.Command.list.length}\n运行时长：${secondsFormat(Math.floor(process.uptime()))}\n----------\nCPU：${data.cpuUsage}\n内存：${data.useMem}/${data.totalMem}(${data.MemUsage})\nBOT占用内存：${((process.memoryUsage().rss) / 1024 / 1024).toFixed(2) + 'MB'}`)
        })
        return true
      })
  }

  /**
   * 启动函数
   * @param ws 链接设置
   * @param debug 是否开启debug
   * @param nolisten 是否在控制台输出日志
   * @param noCommand 指定群组禁用内置指令
   */
   readonly start = (ws: WSOption, debug = false, nolisten: boolean | number[] = false, noCommand: number[] = []): Promise<Bot> => {
    this.checkStart('请勿重复启动')
    this.isStart = true
    return new Promise(resolve => {
      this.Bot.Conn = new Connect(this.WhiteList, this.BlackList, ws)
      this.Bot.Conn.addEvent('ws.ready', async () => {
        this.Bot.Api = new Api(this.Bot, debug)
        this.Bot.userId = (await this.Bot.Api.getLoginInfo()).user_id
        this.Bot.Event = new Event(this.Bot, nolisten)
        this.Bot.Event
          .on('ws.close', () => {
            PrintLog.logWarning(`${this.Bot.name}已关闭`, 'WS')
          })
          .on('meta_event.heartbeat', async () => {
            // 响应心跳连接
            this.Bot.Api.getApiStatus()
          })
        this.setSysCommand(noCommand)
        await this.initBot()
        PrintLog.logNotice('应用已启动', this.Bot.name)
        resolve(this.Bot)
      })
    })
  }
}
