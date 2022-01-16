import { Connect } from '../Connect/Connect'
import { Log } from '../Tools'
import { CQCODE, CQCode } from '../Tools/CQCode'
import { Admin } from './modules/Admin'
import { Api } from './modules/Api'
import { Command } from './modules/Command'
import { Data } from './modules/Data'
import { Debug } from './modules/Debug'
import { Event } from './modules/Event'
import { Plugin } from './modules/Plugin'

export class Bot {
  constructor(name: string, dirname: string, filename: string) {
    this.Data = new Data(this, name)
    this.Log = new Log(name)
    this.Plugin = new Plugin(this, dirname, filename)
    this.Admin = new Admin(this)
    this.Command = new Command(this)
    this.Debug = new Debug(this)
  }
  /** Bot的部分属性 */
  Data: Data
  /** 日志对象 */
  Log: Log
  /** CQ码 */
  CQCode: CQCODE = CQCode
  /** 插件对象 */
  Plugin: Plugin
  /** 命令对象 */
  Command: Command
  /** 管理员命令 */
  Admin: Admin
  /** WS链接 */
  Conn: Connect
  /** HTTP API */
  Api: Api
  /** 消息事件 */
  Event: Event
  /** 测试类 */
  Debug: Debug
}
