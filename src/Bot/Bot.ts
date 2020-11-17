import { CQCODE, CQCode } from '..'
import { Connect } from '../Connect/Connect'
import { Admin } from './modules/Admin'
import { Api } from './modules/Api'
import { Event } from './modules/Event'
import { Plugin } from './modules/Plugin'

export class Bot {
  constructor(name: string, dirname: string) {
    this.name = name
    this.Plugin = new Plugin(this, dirname)
    this.Admin = new Admin(this)
  }
  /**
   * bot名称
   */
  readonly name: string
  /**
   * bot的登录QQ
   */
  userId: number = -1
  /**
   * CQ码
   */
  CQCode: CQCODE = CQCode
  /**
   * 插件对象
   */
  Plugin: Plugin
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
