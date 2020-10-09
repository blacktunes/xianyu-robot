import { Msg } from '.'
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
   * @param _app bot对象
   * @param _from
   * @param _fromQQ
   * @param _msg
   * @param _msgId
   */
  async handelMsg(_app: App, _from: number, _fromQQ: number, _msg: string, _msgId: number): Promise<Msg> {
    return Msg.MSG_INTERCEPT
  }
  /**
   * 创建定时任务
   * @param _app bot对象
   */
  createSchedule(_app: App): void { }
  /**
   * 初始化方法
   * @param _app bot对象
   */
  initPlugin(_app: App): void { }
  /**
   * debug本文输出
   * @param _app bot对象
   */
  debug(_app: App): string {
    return '未添加debug输出'
  }
}
