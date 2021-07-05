import { Bot } from '../Bot/Bot'
import { Command } from './Command'

export abstract class BotPlugin {
  constructor(name: string, bot: Bot) {
    if (name === '匿名插件') {
      throw new Error('不允许插件命名为\"匿名插件\"')
    }
    this.name = name
    if (bot) {
      this.Bot = bot
      this.Command = new Command(this.name, this.Bot)
    }
  }
  /**
   * 插件名称
   */
  readonly name: string
  /**
   * Bot对象
   */
  protected Bot: Bot
  /**
   * 插件命令
   * 与Bot.Command基本相同，但能设置统一设置
   */
  protected Command: Command
  /**
   * 初始化方法
   * 该方法会在Bot初始化完成后执行，请勿重复执行
   */
  init(): void | Promise<void> { }
  /**
   * debug本文输出
   */
  debug(): void { }
  /**
   * 插件配置
   */
  readonly config: { [name: string]: any } = {}
}
