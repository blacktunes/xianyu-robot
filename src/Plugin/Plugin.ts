import { Bot } from '../Bot/Bot'
import { Command } from './Command'
import { merge } from 'lodash'

export abstract class BotPlugin {
  constructor(bot: Bot) {
    this.Bot = bot
  }
  /** 插件名称 */
  readonly name: string = '未命名插件'
  /** 插件设置 */
  config: any = {}
  /** Bot对象 */
  protected Bot: Bot
  /**
   * 插件命令
   * 与Bot.Command基本相同，但能设置统一设置
   */
  protected Command: Command
  /**
   * 安装方法
   * 该方法会在实例化后执行，请勿重复执行
   */
  setup(config?: any) {
    if (config) {
      this.config = merge(this.config, config)
    }
    this.Command = new Command(this.name, this.Bot)
  }
  /**
   * 初始化方法
   * 该方法会在Bot初始化完成后执行，请勿重复执行
   */
  init(): void | Promise<void> { }
}
