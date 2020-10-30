import { App } from '../App'

export abstract class BotPlugin {
  constructor(name: string) {
    this.name = name
  }
  /**
   * 插件名称
   */
  readonly name: string
  /**
   * 信息处理方法
   * 若返回值为false或为空则继续传递消息
   * 若返回值为true则会拦截消息
   * @param app bot对象
   * @param from
   * @param fromQQ
   * @param msg
   * @param msgId
   */
  abstract message(app: App, from: number, fromQQ: number, msg: string, msgId: number): Promise<boolean | void> | boolean | void
  /**
   * 初始化方法
   * @param app bot对象
   */
  abstract init(app: App): void
  /**
   * debug本文输出
   * @param app bot对象
   */
  abstract debug(app: App): string | void
}
