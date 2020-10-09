import { CQWebSocketOption } from 'cq-websocket'

export enum Msg {
  /**
   * 拦截消息不传递给下一个插件
   */
  MSG_IGNORE,
  /**
   * 继续传递给下一个插件
   */
  MSG_INTERCEPT
}

export interface BotPluginClass {
  new(...arg: any): any
}

export interface pluginsConfig {
  [x: string]: any
}

export interface AdminConfig {
  qq: number
  id?: number
}

export interface RobotConfig {
  name?: string
  token?: string
  host?: string
  port?: number
}

export interface MysqlConfig {
  [x: string]: any
  host: string
  user: string
  password: string
  database: string
  multipleStatements?: boolean
  charset?: string
}

/**
 * CQWS的默认设置
 */
export const botWSOption: CQWebSocketOption = {
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
