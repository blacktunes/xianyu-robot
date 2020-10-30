import { CQWebSocketOption } from 'cq-websocket'
import { PoolConfig } from 'mysql'
import { BotApp } from './modules/Bot/BotApp'
import { CQCODE, CQCode } from './modules/Bot/modules/CQCode'
import { CQMessage } from './modules/Bot/modules/option'
import connect from './modules/connect'
import Mysql from './modules/mysql'
import { AdminConfig, BotPluginClass, botWSOption, PluginsConfig, Prevent, RobotConfig } from './modules/option'
import { BotPlugin } from './modules/plugin'
import { logError, logInfoSuccess, logWarning } from './modules/printLog'
import fs = require('fs')
import path = require('path')
import schedule = require('node-schedule')

export enum MsgType {
  privateMsg = 0,
  groupMsg = 1
}

export class App extends BotApp {
  /**
   * BOT构造函数
   * @param config
   * @param debug
   * @param dirname
   * @param nolisten 是否不监听聊天信息
   */
  constructor(config: RobotConfig = null, debug: boolean = false, dirname: string = __dirname, nolisten: boolean = false) {
    super(debug)

    if (config) {
      if (config.token) {
        this.CQWebSocketOption.accessToken = config.token
      }

      if (config.host) {
        this.CQWebSocketOption.host = config.host
      }

      if (config.port) {
        this.CQWebSocketOption.port = config.port
      }

      if (dirname) {
        const dir = path.join(dirname, './config/')
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        this.dirname = dir
      }

      this.nolisten = nolisten

      this.name = config.name || 'Bot'
    }
  }

  private robotReady: boolean = false

  /**
   * 是否监听聊天信息
   */
  readonly nolisten: boolean = false

  /**
   * bot名称
   */
  readonly name: string

  /**
   * bot的登录QQ
   */
  userId: number

  /**
   * bot管理员信息
   */
  adminData: AdminConfig

  /**
   * 本地设置保存位置
   */
  readonly dirname: string

  /**
   * 插件设置
   */
  config: PluginsConfig = {}

  /**
   * 插件列表
   */
  private pluginsList: Array<BotPlugin> = []

  /**
   * 黑名单
   */
  blacklist: Array<number> = []

  /**
   * CQ码对象
   */
  CQCode: CQCODE = CQCode

  private CQWebSocketOption: CQWebSocketOption = botWSOption

  /**
   * 禁用所有功能
   * @param {number} fromType
   * @param {number} from
   * @param {number} fromQQ
   * @param {number} time
   */
  ban = (fromType: 0 | 1, from: number, fromQQ: number, time: number) => {
    this.send(fromType, fromType === MsgType.privateMsg ? fromQQ : from, `${fromType === MsgType.privateMsg ? '' : this.CQCode.at(fromQQ)}无路赛，禁用你所有功能${time}分钟`)
    this.blacklist.push(fromQQ)
    logWarning(`${fromQQ}被禁用${time}分钟`, this.name)
    schedule.scheduleJob(new Date(Date.now() + time * 60 * 1000), () => {
      let index = this.blacklist.indexOf(fromQQ)
      if (index != -1) {
        this.blacklist.splice(index, 1)
      }
      logWarning(`${fromQQ}已解除禁用`, this.name)
      this.send(fromType, fromType === MsgType.privateMsg ? fromQQ : from, `${fromType === MsgType.privateMsg ? this.CQCode.at(fromQQ) : ''}放过你了，下次别这样了`)
    })
  }

  /**
   * 发送消息
   * @deprecated
   * @param type 0-私聊消息, 1-群组消息
   * @param id 群组ID或Q号
   * @param message 需要发送的信息
   * @returns {Promise<number>} 成功返回message_id，失败返回retcode
   */
  send = async (type: 0 | 1, id: number, message: string | CQMessage | CQMessage[]): Promise<number> => {
    if (type === MsgType.privateMsg) {
      return await this.API.sendPrivateMsg(id, message)
    } else if (type === MsgType.groupMsg) {
      return await this.API.sendGroupMsg(id, message)
    }
  }

  /**
   * 发送消息
   * 只有qq则发送私聊消息，只有group则发送群里消息
   * 若同时存在则发送临时会话（暂未实现）
   * @param message 需要发送的信息
   * @returns {Promise<number>} 成功返回message_id，失败返回retcode
   */
  sendMsg = async (qq: number | null, group: number | null, message: string | CQMessage | CQMessage[]): Promise<number> => {
    if (qq) {
      return await this.API.sendPrivateMsg(qq, message)
    } else if (group) {
      return await this.API.sendGroupMsg(group, message)
    }
  }

  /**
   * 格式化Date对象
   * @param date Date对象
   */
  getTime = (date: any) => {
    return {
      date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      time: `${date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds()}`
    }
  }

  /**
   * 使用await暂停运行
   * @param {number} interval 暂停秒数
   */
  sleep = (interval: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, interval * 1000)
    })
  }

  /**
   * 创建mysql链接池
   * @param config host, user, password, database
   */
  createPool = (config: PoolConfig) => {
    return new Mysql(config)
  }

  saveConfig = () => {
    if (this.dirname) {
      const str = JSON.stringify(this.config)
      try {
        fs.writeFileSync(path.join(this.dirname, `./${this.userId}.json`), str)
      } catch (err) {
        console.error(err)
        logError('数据未写入JSON', this.name)
      }
    }
  }

  readonly handleMsg = async (from: number, fromQQ: number, msg: string, msgId: number = -1): Promise<void> => {
    if (!this.robotReady || this.blacklist.includes(fromQQ)) return
    if (this.adminData && fromQQ === this.adminData.qq) {
      if (msg.includes('/send')) {
        const data = msg.split(' ')
        if (Number(data[1]) === 0 || Number(data[1]) === 1) {
          this.send(Number(data[1]) as 0 | 1, Number(data[2]), data[3])
        }
        return
      }
      if (msg.includes('-debug ')) {
        const type = from ? MsgType.groupMsg : MsgType.privateMsg
        if (this.pluginsList.length > 0) {
          const name = msg.split('-debug ')[1]
          if (name) {
            for (let i in this.pluginsList) {
              if (this.pluginsList[i].name === name) {
                this.send(type, type === MsgType.privateMsg ? fromQQ : from, `${this.pluginsList[i].name}：\n${this.pluginsList[i].debug(this) || '没有配置debug输出'}`)
                break
              }
            }
          }
        } else {
          this.send(type, type === MsgType.privateMsg ? fromQQ : from, '好像没有已载入的插件')
        }
        return
      }
      if (msg.includes('/ban')) {
        const data = msg.split(' ')
        if (Number(data[2]) !== this.adminData.qq) {
          this.ban(1, Number(data[1]), Number(data[2]), Number(data[3]))
        }
        return
      }
    }
    if (this.tempMessage) {
      if (this.tempMessage(from, fromQQ, msg, msgId)) {
        return
      }
    }
    if (this.pluginsList.length > 0) {
      for (let i in this.pluginsList) {
        if (await this.pluginsList[i].message(this, from, fromQQ, msg, msgId)) {
          break
        }
      }
    }
  }

  private initPlugin = (): void => {
    if (this.pluginsList.length > 0) {
      for (let i in this.pluginsList) {
        this.pluginsList[i].init(this)
      }
    }
  }

  /**
   * 定时任务由node-schedule实现，所以会取消所有定时任务
   * 当多个机器人都使用了定时任务的时候请请谨慎使用
   */
  cancelAllJob = (): boolean => {
    let status = true
    for (let i in schedule.scheduledJobs) {
      if (schedule.scheduledJobs[i].cancel() === false) {
        status = false
        break
      }
    }
    return status
  }

  privateMsg = async (_subType: string, msgId: number, fromQQ: number, msg: string): Promise<void> => {
    return this.handleMsg(null, fromQQ, msg, msgId)
  }

  groupMsg = async (_subType: string, msgId: number, fromGroup: number, fromQQ: number, _fromAnonymous: string, msg: string): Promise<void> => {
    return this.handleMsg(fromGroup, fromQQ, msg, msgId)
  }

  readonly enable = async () => {
    this.userId = await this.API.getLoginQq()
    if (this.dirname) {
      let setting: any
      if (fs.existsSync(path.join(this.dirname, `./${this.userId}.json`))) {
        setting = JSON.parse(fs.readFileSync(path.join(this.dirname, `./${this.userId}.json`)).toString())
      }
      for (let i in setting) {
        this.config[i] = setting[i]
      }
      logInfoSuccess('本地配置加载成功', this.name)
    }
    if (this.tempInit) {
      this.tempInit(this)
    }
    this.initPlugin()
    this.saveConfig()
    this.robotReady = true
  }

  private tempMessage: (from: number, fromQQ: number, msg: string, msgId: number) => Prevent
  /**
   * 载入接收到消息时会执行的方法
   */
  message = (fn: (from: number, fromQQ: number, msg: string, msgId: number) => Prevent) => {
    this.tempMessage = fn
    return this
  }

  /**
   * 载入插件
   * @param {class} plugin
   */
  plugin = (plugin: BotPluginClass, ...arg: any[]): App => {
    this.admin = () => {
      throw new Error('请在载入插件前设置管理员')
    }
    const _plugin = new plugin(this, ...arg)
    this.pluginsList.push(_plugin)
    logInfoSuccess(`[${_plugin.name}] 已载入`, '插件')
    return this
  }

  private tempInit: Function
  /**
   * 载入bot链接成功后会立刻执行的方法
   */
  init = (fn: Function) => {
    this.tempInit = fn
    return this
  }
  /**
   * 设置管理员，用于接收管理员消息
   * @param type 0-私聊, 1-群组
   * @param qq 管理员Q号
   * @param id 群组ID
   */
  admin = (qq: number, id: number = null): App => {
    this.adminData = { qq, id }
    return this
  }

  /**
   * 启动函数
   * @param dirname
   */
  start = () => {
    return new Promise<void>(resolve => {
      this.message = () => {
        throw new Error('请在应用启动前载入方法')
      }
      this.plugin = () => {
        throw new Error('请在应用启动前载入插件')
      }
      this.init = () => {
        throw new Error('请在应用启动前载入初始化方法')
      }
      this.admin = () => {
        throw new Error('请在应用启动前设置管理员')
      }
      connect(this, this.CQWebSocketOption).then(() => {
        resolve()
      })
    })
  }
}
