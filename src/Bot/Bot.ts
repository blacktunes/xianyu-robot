import { CQCODE, CQCode } from '..'
import { Connect } from '../Connect/Connect'
import { Admin } from './modules/Admin'
import { Api } from './modules/Api'
import { Command } from './modules/Command'
import { Event } from './modules/Event'
import { Plugin } from './modules/Plugin'
import { Data } from './modules/Data'

export class Bot {
  constructor(name: string, dirname: string) {
    this.Data = new Data(this, name)
    this.Plugin = new Plugin(this, dirname)
    this.Admin = new Admin(this)
    this.Command = new Command(this)
  }
  /**
   * Bot的部分属性
   */
  Data: Data
  /**
   * CQ码
   */
  CQCode: CQCODE = CQCode
  /**
   * 插件对象
   */
  Plugin: Plugin
  /**
   * 命令对象
   */
  Command: Command
  /**
   * 管理员命令
   */
  Admin: Admin
  /**
   * WS链接
   */
  Conn: Connect
  /**
   * HTTP API
   */
  Api: Api
  /**
   * 消息事件
   */
  Event: Event
}
