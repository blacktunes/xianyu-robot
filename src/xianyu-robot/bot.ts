import { CQWebSocketOption } from 'cq-websocket'
import { PoolConfig } from 'mysql'
import { CQApp, CQCode, CQLog, CQMsg, printTime } from './cq-robot'
import connect from './modules/connect'
import Mysql from './modules/mysql'
import { AdminConfig, botOption, BotPlugin, botWSOption, pluginsConfig, RobotConfig } from './modules/option'
import fs = require('fs')
import path = require('path')
import schedule = require('node-schedule')

type MsgType = 0 | 1 | 2

export class Bot extends CQApp {
  /**
   * 机器人构造函数
   * @param config
   * @param debug
   */
  constructor(config: RobotConfig = null, debug: boolean = false) {
    super(botOption)

    this.CQ.setDebug(debug)

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

  CQCode: CQCode = this.CQ.CQCode

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
  ban = (fromType: number, from: number, fromQQ: number, time: number) => {
    this.send(fromType, fromType === 0 ? fromQQ : from, `${fromType === 0 ? this.CQCode.at(fromQQ) : ''}无路赛，禁用你所有功能${time}分钟`)
    this.blacklist.push(fromQQ)
    schedule.scheduleJob(new Date(Date.now() + time * 60 * 1000), () => {
      let index = this.blacklist.indexOf(fromQQ)
      if (index != -1) {
        this.blacklist.splice(index, 1)
      }
      printTime(`${fromQQ}已解除禁用`, CQLog.LOG_WARNING)
      this.send(fromType, fromType === 0 ? fromQQ : from, `${fromType === 0 ? this.CQCode.at(fromQQ) : ''}放过你了，下次别这样了`)
    })
  }

  /**
   * 发送消息
   * @param type 0-私聊消息, 1-群组消息, 2-讨论组消息
   * @param id 群组ID或Q号
   * @param message 需要发送的信息
   * @returns {Promise<number>} 成功返回message_id，失败返回retcode
   */
  send = (type: number, id: number, message: string): Promise<number> => {
    return new Promise(resolve => {
      if (type === 0) {
        this.CQ.sendPrivateMsg(id, message).then(code => {
          resolve(code)
        })
      } else if (type === 1) {
        this.CQ.sendGroupMsg(id, message).then(code => {
          resolve(code)
        })
      } else if (type === 2) {
        this.CQ.sendDiscussMsg(id, message).then(code => {
          resolve(code)
        })
      }
    })
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
      if (!fs.existsSync(this.dirname)) {
        fs.mkdirSync(this.dirname, './conf/')
      }
      fs.writeFile(path.join(this.dirname, './config.json'), str, (err) => {
        if (err) {
          console.error(err)
          printTime('数据未写入JSON', CQLog.LOG_ERROR)
        }
      })
    }
  }

  private handleMsg = async (from: number, fromQQ: number, msg: string, type: 0 | 1 | 2): Promise<0 | 1> => {
    let CODE: 0 | 1 = CQMsg.MSG_IGNORE
    if (!this.robotReady || this.blacklist.includes(fromQQ)) return CODE
    if (this.adminData && fromQQ === this.adminData.qq) {
      if (msg.includes('/send')) {
        const data = msg.split(' ')
        this.send(Number(data[1]), Number(data[2]), data[3])
        return CQMsg.MSG_INTERCEPT
      }
    }
    if (this.pluginsList.length > 0) {
      for (let i in this.pluginsList) {
        if (await this.pluginsList[i](this, from, fromQQ, msg, type) === 0) {
          break
        }
        CODE = CQMsg.MSG_INTERCEPT
      }
      return CODE
    }
  }

  private initPlugin = async (): Promise<void> => {
    this.userId = await this.CQ.getLoginQq()
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

  privateMsg = async (_subType: string, _msgId: number, fromQQ: number, msg: string, _font: number): Promise<0 | 1> => {
    return await this.handleMsg(null, fromQQ, msg, 0)
  }

  groupMsg = async (_subType: string, _msgId: number, fromGroup: number, fromQQ: number, _fromAnonymous: string, msg: string, _font: number): Promise<0 | 1> => {
    return await this.handleMsg(fromGroup, fromQQ, msg, 1)
  }

  discussMsg = async (_subType: string, _msgId: number, fromDiscuss: number, fromQQ: number, msg: string, _font: number): Promise<0 | 1> => {
    return await this.handleMsg(fromDiscuss, fromQQ, msg, 2)
  }

  enable = (): 0 => {
    this.initPlugin()
    this.robotReady = true
    this.saveConfig()
    return 0
  }

  /**
   * 添加消息处理插件
   * 请传入初始化插件，若要直接插入消息处理流程请使用applyPlugin方法
   * @param {class} plugin
   */
  plugin = (plugin: BotPlugin, ...arg: any[]): Bot => {
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
   * @param type 0-私聊, 1-群组, 2-讨论组
   * @param qq 管理员Q号
   * @param id 群组ID
   */
  admin(type: MsgType, qq: number, id: number = null): Bot {
    if (type === 0) {
      this.adminData = { type, qq }
    } else {
      if (id) {
        this.adminData = { type, qq, id }
      } else {
        printTime('类型不为0时必须输入群组ID', CQLog.LOG_ERROR)
      }
    }
    return this
  }

  /**
   * 启动函数，可传入JSON配置的地址读取本地配置
   * 传入地址后配置会本地储存
   * @param dirname
   */
  start(dirname: string = null) {
    this.plugin = () => {
      throw new Error('请在应用启动前载入插件')
    }
    this.admin = () => {
      throw new Error('请在应用启动前设置管理员')
    }
    if (dirname) {
      this.dirname = dirname
      let setting: any
      if (fs.existsSync(path.join(dirname, './config.json'))) {
        setting = JSON.parse(fs.readFileSync(path.join(dirname, './config.json')).toString())
      }
      for (let i in setting) {
        this.config[i] = setting[i]
      }
      printTime('[配置] 本地配置加载成功', CQLog.LOG_INFO_SUCCESS)
    }
    connect(this, this.CQWebSocketOption)
  }
}
