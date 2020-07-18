import { CQWebSocketOption } from 'cq-websocket'
import { CQApp, CQMsg, printTime, CQCode } from '../cq-robot'
import { botOption, RobotConfig, AdminConfig, botWSOption, pluginsConfig } from './modules/option'
import connect from './modules/connect'
import Mysql from './modules/mysql'
import { PoolConfig } from '_@types_mysql@2.15.15@@types/mysql'
import fs = require('fs')
import path = require('path')
import schedule = require('node-schedule')

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

  adminData: AdminConfig

  config: pluginsConfig = {}

  blacklist: Array<number> = []

  CQCode: CQCode = this.CQ.CQCode

  private pluginsList: Array<Function> = []
  private initList: Array<Function> = []

  private CQWebSocketOption: CQWebSocketOption = botWSOption

  /**
 * 禁用所有功能
 * @param {number} fromType
 * @param {number} from
 * @param {number} fromQQ
 * @param {number} time
 */
  ban(fromType: number, from: number, fromQQ: number, time: number) {
    this.send(fromType, fromType === 0 ? fromQQ : from, `${fromType === 0 ? this.CQCode.at(fromQQ) : ''}无路赛，禁用你所有功能${time}分钟`)
    this.blacklist.push(fromQQ)
    schedule.scheduleJob(new Date(Date.now() + time * 60 * 1000), () => {
      let index = this.blacklist.indexOf(fromQQ)
      if (index != -1) {
        this.blacklist.splice(index, 1)
      }
      console.log(`${fromQQ}已解除禁用`)
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
  send(type: number, id: number, message: string): Promise<number> {
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
  getTime(date: any) {
    return {
      date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      time: `${date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds()}`
    }
  }

  /**
 * 使用await暂停运行
 * @param {number} interval 暂停秒数
 */
  sleep(interval: number) {
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
  createPool(config: PoolConfig) {
    return new Mysql(config)
  }

  dirname: string

  saveConfig() {
    if (this.dirname) {
      const str = JSON.stringify(this.config)
      if (!fs.existsSync(path.join(this.dirname, './conf/'))) {
        fs.mkdirSync(path.join(this.dirname, './conf/'))
      }
      fs.writeFile(path.join(this.dirname, './conf/config.json'), str, (err) => {
        if (err) {
          console.log(err)
          console.error('数据未写入JSON')
        }
      })
    }
  }

  private async handleMsg(from: number, fromQQ: number, msg: string, type: 0 | 1 | 2): Promise<0 | 1> {
    let CODE: 0 | 1 = CQMsg.MSG_IGNORE
    if (!this.robotReady || this.blacklist.includes(fromQQ)) return CODE
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

  private async initPlugin(): Promise<void> {
    if (this.initList.length > 0) {
      for (let i in this.initList) {
        this.initList[i](this)
      }
    }
  }

  async privateMsg(subType: string, msgId: number, fromQQ: number, msg: string, font: number): Promise<0 | 1> {
    return await this.handleMsg(null, fromQQ, msg, 0)
  }

  async groupMsg(_subType: string, _msgId: number, fromGroup: number, fromQQ: number, _fromAnonymous: string, msg: string, _font: number): Promise<0 | 1> {
    return await this.handleMsg(fromGroup, fromQQ, msg, 1)
  }

  async discussMsg(_subType: string, _msgId: number, fromDiscuss: number, fromQQ: number, msg: string, _font: number): Promise<0 | 1> {
    return await this.handleMsg(fromDiscuss, fromQQ, msg, 2)
  }

  enable(): 0 {
    this.initPlugin()
    this.robotReady = true
    this.saveConfig()
    return 0
  }

  /**
   * 添加消息处理插件
   * 函数名为apply或带有参数的时候会认为是初始化函数
   * 请在初始化函数里再次调用plugin方法插入指定函数
   * @param {Function} fn
   */
  plugin(fn: Function, ...arg: any[]): Bot {
    this.admin = () => {
      throw new Error('请在载入插件前设置管理员')
    }
    if (fn.name === 'apply' || arg.length > 0) fn(this, ...arg)
    else this.applyPlugin(fn)
    return this
  }

  private applyPlugin(fn: Function) {
    this.pluginsList.push(fn)
  }

  /**
   * 添加初始化插件，插件只会在启动时运行一次
   * 函数名为apply或带有参数的时候会认为是初始化函数
   * 请在初始化函数里再次调用init方法插入指定函数
   * @param {Function} fn
   */
  init(fn: Function, ...arg: any[]): Bot {
    this.admin = () => {
      throw new Error('请在载入插件前设置管理员')
    }
    if (fn.name === 'apply' || arg.length > 0) fn(this, ...arg)
    else this.applyInit(fn)
    return this
  }

  private applyInit(fn: Function) {
    this.initList.push(fn)
  }

  /**
   * 设置管理员，用于接收管理员消息
   * @param type 0-私聊, 1-群组, 2-讨论组
   * @param qq 管理员Q号
   * @param id 群组ID
   */
  admin(type: 0 | 1 | 2, qq: number, id: number = null): Bot {
    if (type === 0) {
      this.adminData = { type, qq }
    } else {
      if (id) {
        this.adminData = { type, qq, id }
      } else {
        console.error('类型不为0时必须输入群组ID')
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
    this.init = () => {
      throw new Error('请在应用启动前载入插件')
    }
    this.admin = () => {
      throw new Error('请在应用启动前设置管理员')
    }
    if (dirname) {
      this.dirname = dirname
      let setting: any
      if (fs.existsSync(path.join(dirname, './conf/config.json'))) {
        setting = JSON.parse(fs.readFileSync(path.join(dirname, './conf/config.json')).toString())
      }
      for (let i in setting) {
        this.config[i] = setting[i]
      }
      printTime('[配置] 本地配置加载成功', 13)
    }
    connect(this, this.CQWebSocketOption)
  }
}