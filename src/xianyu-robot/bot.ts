import { CQWebSocketOption } from 'cq-websocket'
import { CoolQ, CQApp, CQMsg, printTime } from '../cq-robot'
import { appOption, RobotConfig } from './modules/option'
import { connect } from './modules/connect'

export class Bot extends CQApp {
  /**
   * 机器人构造函数
   * @param config
   * @param debug
   */
  constructor(config: RobotConfig = null, debug: boolean = false) {
    super(appOption)

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

  config: Object = {}

  private pluginsList: Array<Function> = []
  private initList: Array<Function> = []

  private CQWebSocketOption: CQWebSocketOption = {
    accessToken: '', // API 访问 token 。见 CQHTTP API 之配置文件说明
    enableAPI: true, // 启用 /api 连线
    enableEvent: true, // 启用 /event 连线
    protocol: 'ws:', // 协议名
    host: '127.0.0.1', // '127.0.0.1' 酷Q服务器 IP
    port: 6700, // 酷Q服务器端口
    baseUrl: '', // 酷Q服务器位址 (SDK在建立连线时会依照此设定加上前缀项 ws:// 及后缀项 `/<api
    qq: -1, // 触发 @me 事件用的QQ帐号，通常同登入酷Q之帐号，用在讨论组消息及群消息中辨认是否有人at此帐号
    reconnection: true, // 是否连线错误时自动重连
    reconnectionAttempts: 1000, // Infinity 连续连线失败的次数不超过这个值
    reconnectionDelay: 1000, // 重复连线的延迟时间, 单位: ms
    fragmentOutgoingMessages: false, // 由于 CQHTTP API 插件的 websocket 服务器尚未支持 fragment, 故建议维持 false 禁用 fragment。※详情请见 WebSocketClient 选项说明。
    fragmentationThreshold: 16000, // 0x4000 每个 frame 的最大容量, 默认为 16 KiB, 单位: byte※详情请见 WebSocketClient 选项说明。
    tlsOptions: {}, // 若需调用安全连线 https.request 时的选项
    requestOptions: { // 调用 API 方法时的全局默认选项。
      timeout: 120000
    }
  }

  private async handleMsg(app: CoolQ, from: number, fromQQ: number, msg: string, type: 0 | 1): Promise<0 | 1> {
    if (this.pluginsList.length > 0) {
      for (let i in this.pluginsList) {
        if (this.pluginsList[i](app, from, fromQQ, msg, type) === 0) {
          break
        }
        return CQMsg.MSG_INTERCEPT
      }
      return CQMsg.MSG_IGNORE
    }
  }

  private async initPlugin(): Promise<void> {
    if (this.initList.length > 0) {
      for (let i in this.initList) {
        this.initList[i]()
      }
    }
  }

  async groupMsg(_subType: string, _msgId: number, fromGroup: number, fromQQ: number, _fromAnonymous: string, msg: string, _font: number): Promise<0 | 1> {
    return await this.handleMsg(this.CQ, fromGroup, fromQQ, msg, 1)
  }

  async discussMsg(_subType: string, _msgId: number, fromDiscuss: number, fromQQ: number, msg: string, _font: number): Promise<0 | 1> {
    return await this.handleMsg(this.CQ, fromDiscuss, fromQQ, msg, 0)
  }

  enable(): 0 {
    this.initPlugin()
    return 0
  }

  /**
   * 添加消息处理插件
   * 函数名为apply或带有参数的时候会认为是初始化函数
   * 请在初始化函数里再次调用plugin方法插入指定函数
   * @param {Function} fn
   */
  plugin(fn: Function, ...arg: any[]): this {
    if (fn.name === 'apply' || arg.length > 0) fn(this, arg)
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
  init(fn: Function, ...arg: any[]): this {
    if (fn.name === 'apply' || arg.length > 0) fn(this, arg)
    else this.applyInit(fn)
    return this
  }

  private applyInit(fn: Function) {
    this.initList.push(fn)
  }

  /**
   * 启动函数，可传入JSON配置的地址读取本地配置
   * @param dirname
   */
  start(config: JSON = null) {
    this.plugin = () => {
      throw new Error('请在应用启动前载入插件')
    }
    this.init = () => {
      throw new Error('请在应用启动前载入插件')
    }
    if (config) {
      for (let i in config) {
        this.config[i] = config[i]
      }
      printTime('[配置] 本地配置加载成功', 13)
    }
    connect(this, this.CQWebSocketOption)
  }
}
