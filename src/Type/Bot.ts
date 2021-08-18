import { Bot } from '../Bot/Bot'
import { BotPlugin } from '../Plugin/Plugin'

/**
 * 是否阻止消息传递
 * true为阻止
 */
export type Prevent = Promise<boolean | void> | boolean | void

export interface PluginConfig {
  [key: string]: any
  config: {
    [key: string]: any
  }
}

export interface Plugin {
  new(bot: Bot, config?: any): BotPlugin
}

export type PluginFunction = (bot: Bot) => void | Promise<void>

export interface AnonymousPlugin {
  name: '匿名插件'
  init: PluginFunction
}

export interface WebSocketConfig {
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
