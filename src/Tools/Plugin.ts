import { Bot } from '../Bot/Bot'

export abstract class BotPlugin {
  constructor(name: string, bot: Bot) {
    this.name = name
    if (bot) {
      this.Bot = bot
    }
  }
  /**
   * 插件名称
   */
  readonly name: string
  /**
   * Bot对象
   */
  Bot: Bot
  /**
   * 该方法会在Bot初始化完成后执行
   * 初始化方法
   */
  init(): void | Promise<void> {}
  /**
   * debug本文输出
   */
  debug(): string | void {}
}
