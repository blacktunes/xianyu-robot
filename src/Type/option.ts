import { Bot } from '../Bot/Bot'
import { BotPlugin } from '../Tools/Plugin'

export interface BotConfig {
  ws?: WSOption
  debug?: boolean
  nolisten?: boolean
}

/**
 * 是否阻止消息传递
 */
export type Prevent = Promise<boolean | void> | boolean | void

export interface BotPluginClass {
  new(bot: Bot, ...arg: any): BotPlugin
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

export interface WSOption {
  wss?: boolean
  /**
   * API访问token
   */
  accessToken?: string
  host?: string
  port?: number
  /**
   * 是否连线错误时自动重连
   */
  reconnection?: boolean
  /**
   * 连续连线失败的次数不超过这个值
   */
  reconnectionAttempts?: number
  /**
   * 重复连线的延迟时间, 单位: ms
   */
  reconnectionDelay?: number
  /**
   * API超时时间, 单位: ms
   */
  timeout?: number
}

export interface ApiRes {
  data?: any
  retcode: number
  status: string
  msg?: string
}
