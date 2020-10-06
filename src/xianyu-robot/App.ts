import { CQWebSocketOption } from 'cq-websocket'
import { PoolConfig } from 'mysql'
import { BotApp } from './modules/Bot/BotApp'
import { CQCODE, CQCode } from './modules/Bot/modules/CQCode'
import { CQMessage } from './modules/Bot/modules/option'
import connect from './modules/connect'
import Mysql from './modules/mysql'
import { AdminConfig, BotPlugin, botWSOption, pluginsConfig, RobotConfig } from './modules/option'
import { Log, printLog } from './modules/printLog'
import fs = require('fs')
import path = require('path')
import schedule = require('node-schedule')

export enum MsgType {
  privateMsg = 0,
  groupMsg = 1
}

export class App extends BotApp {
  /**
   * 机器人构造函数
   * @param config
   * @param debug
   */
  constructor(config: RobotConfig = null, debug: boolean = false) {
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
    }
  }

  private robotReady: boolean = false

  userId: number

  adminData: AdminConfig

  config: pluginsConfig = {}

  blacklist: Array<number> = []

  CQCode: CQCODE = CQCode

  private pluginsList: Array<Function> = []
  private initList: Array<Function> = []
  private scheduleList: Array<Function> = []

  private CQWebSocketOption: CQWebSocketOption = botWSOption

  /**
 * 禁用所有功能
 * @param {number} fromType
 * @param {number} from
 * @param {number} fromQQ
 * @param {number} time
 */
  ban = (fromType: 0 | 1, from: number, fromQQ: number, time: number) => {
    this.send(fromType, fromType === MsgType.privateMsg ? fromQQ : from, `${fromType === MsgType.privateMsg ? this.CQCode.at(fromQQ) : ''}无路赛，禁用你所有功能${time}分钟`)
    this.blacklist.push(fromQQ)
    schedule.scheduleJob(new Date(Date.now() + time * 60 * 1000), () => {
      let index = this.blacklist.indexOf(fromQQ)
      if (index != -1) {
        this.blacklist.splice(index, 1)
      }
      printLog(`${fromQQ}已解除禁用`, Log.WARNING)
      this.send(fromType, MsgType.privateMsg === 0 ? fromQQ : from, `${MsgType.privateMsg === 0 ? this.CQCode.at(fromQQ) : ''}放过你了，下次别这样了`)
    })
  }

  /**
   * 发送消息
   * @param type 0-私聊消息, 1-群组消息, 2-讨论组消息
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

  dirname: string

  saveConfig = () => {
    if (this.dirname) {
      const str = JSON.stringify(this.config)
      fs.writeFile(path.join(this.dirname, `./${this.userId}.json`), str, (err) => {
        if (err) {
          console.error(err)
          printLog('数据未写入JSON', Log.ERROR)
        }
      })
    }
  }

  private handleMsg = async (from: number, fromQQ: number, msg: string, type: 0 | 1, msgId: number): Promise<void> => {
    if (!this.robotReady || this.blacklist.includes(fromQQ)) return
    // 功能待完善
    // if (this.adminData && fromQQ === this.adminData.qq) {
    //   if (msg.includes('/send')) {
    //     const data = msg.split(' ')
    //     this.send(Number(data[1]) as 0 | 1, Number(data[2]), data[3])
    //     return
    //   }
    // }
    if (this.pluginsList.length > 0) {
      for (let i in this.pluginsList) {
        if (await this.pluginsList[i](this, from, fromQQ, msg, type, msgId) === 0) {
          break
        }
      }
      return
    }
  }

  private initPlugin = async (): Promise<void> => {
    if (this.initList.length > 0) {
      for (let i in this.initList) {
        this.initList[i](this)
      }
    }
    this.initSchedule()
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

  initSchedule = () => {
    if (this.scheduleList.length > 0) {
      for (let i in this.scheduleList) {
        this.scheduleList[i](this)
      }
    }
  }

  privateMsg = async (_subType: string, msgId: number, fromQQ: number, msg: string): Promise<void> => {
    return this.handleMsg(null, fromQQ, msg, 0, msgId)
  }

  groupMsg = async (_subType: string, msgId: number, fromGroup: number, fromQQ: number, _fromAnonymous: string, msg: string): Promise<void> => {
    return this.handleMsg(fromGroup, fromQQ, msg, 1, msgId)
  }

  enable = async () => {
    this.userId = await this.API.getLoginQq()
    if (this.dirname) {
      let setting: any
      if (fs.existsSync(path.join(this.dirname, `./${this.userId}.json`))) {
        setting = JSON.parse(fs.readFileSync(path.join(this.dirname, `./${this.userId}.json`)).toString())
      }
      for (let i in setting) {
        this.config[i] = setting[i]
      }
      printLog('[配置] 本地配置加载成功', Log.INFO_SUCCESS)
    }
    this.initPlugin()
    this.robotReady = true
    this.saveConfig()
  }

  /**
   * 添加消息处理插件
   * 请传入初始化插件，若要直接插入消息处理流程请使用applyPlugin方法
   * @param {class} plugin
   */
  plugin = (plugin: BotPlugin, ...arg: any[]): App => {
    this.admin = () => {
      throw new Error('请在载入插件前设置管理员')
    }
    new plugin(this, ...arg)
    return this
  }

  /**
   * 把方法插入到消息处理
   */
  applyPlugin = (fn: Function) => {
    this.pluginsList.push(fn)
  }

  /**
   * 把方法插入到启动函数
   */
  applyInit = (fn: Function) => {
    this.initList.push(fn)
  }

  /**
   * 把方法插入到定时任务
   */
  applySchedule = (fn: Function) => {
    this.scheduleList.push(fn)
  }

  /**
   * 设置管理员，用于接收管理员消息
   * @param type 0-私聊, 1-群组
   * @param qq 管理员Q号
   * @param id 群组ID
   */
  admin = (type: 0 | 1, qq: number, id: number = null): App => {
    if (type === MsgType.privateMsg) {
      this.adminData = { type, qq }
    } else {
      if (id) {
        this.adminData = { type, qq, id }
      } else {
        printLog('类型不为0时必须输入群组ID', Log.ERROR)
      }
    }
    return this
  }

  /**
   * 启动函数，可传入JSON配置的地址读取本地配置
   * 传入地址后配置会本地储存
   * @param dirname
   */
  start = (dirname: string = __dirname) => {
    return new Promise<void>(resolve => {
      this.plugin = () => {
        throw new Error('请在应用启动前载入插件')
      }
      this.admin = () => {
        throw new Error('请在应用启动前设置管理员')
      }
      if (dirname) {
        const dir = path.join(dirname, './config/')
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        this.dirname = dir
      }
      connect(this, this.CQWebSocketOption).then(() => {
        resolve()
      })
    })
  }
}
