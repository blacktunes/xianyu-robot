import { PrintLog } from '.'
import { GroupMsg, Prevent, PrivateMsg } from '..'
import { Bot } from '../Bot/Bot'
import { Admin } from '../Bot/modules/Admin'
import { Event } from './../Bot/modules/Event'
import colors = require('colors')
import NamedRegExp = require('named-regexp-groups')

export class Command {
  constructor(name: string, Bot: Bot) {
    this.name = name
    this.Bot = Bot
    this.setting = {
      group: this.name,
      whiteList: [],
      blackList: [],
    }
  }
  private name: string
  private Bot: Bot
  private setting: {
    group: string
    whiteList: number[]
    blackList: number[]
  }

  /**
   * 为插件指令增加白名单列表，请勿和黑名单同时使用
   */
  white(list: number[]) {
    if (this.setting.blackList.length > 0) {
      throw new Error('请勿和黑名单同时使用')
    }
    this.setting.whiteList = [...this.setting.whiteList, ...list]
    return this
  }
  /**
   * 为插件指令增加黑名单列表，请勿和白名单同时使用
   */
  black(list: number[]) {
    if (this.setting.whiteList.length > 0) {
      throw new Error('请勿和白名单同时使用')
    }
    this.setting.blackList = [...this.setting.blackList, ...list]
    return this
  }

  /**
   * 增加命令
   */
  command = (name: string) => {
    const repeat = this.Bot.Command.list.some(item => {
      return item.comm === name
    })
    if (repeat) {
      PrintLog.logWarning(`发现重复指令 ${colors.white(name)}`, '指令')
    }

    const comm = new Comm(name, this.Bot.addEvent(), this.setting.group, this.setting.whiteList, this.setting.blackList)
    this.Bot.Command.list.push(comm)
    return new class {
      /**
       * 增加命令描述，重复调用会被覆盖
       */
      desc(text: string) {
        comm.desc = text
        delete this.desc
        return this
      }
      /**
       * 增加正则规则，调用后命令名将会失效
       */
      reg(reg: RegExp | NamedRegExp) {
        if (repeat) return this
        comm.reg = reg
        comm.comm += '[正则指令]'
        return this
      }
      /**
       * 是否为管理员指令
       */
      admin(flag = true) {
        comm.admin = flag
        return this
      }
      /**
       * 增加命令处理方法，可添加多个
       */
      action(type: 'private', fn: (e: PrivateMsg) => Prevent): this
      action(type: 'group', fn: (e: GroupMsg) => Prevent): this
      action(type: 'group' | 'private', fn: (e: any) => Prevent) {
        if (repeat) return this
        if (type === 'group') {
          comm.fn.group.push(fn)
        } else if (type === 'private') {
          comm.fn.private.push(fn)
        }
        return this
      }
    }
  }
}

class Comm {
  constructor(name: string, uid: number, group: string, whiteList: number[], blackList: number[]) {
    this.comm = name
    this.uid = uid
    this.group = group
    this.whiteList = whiteList
    this.blackList = blackList
  }
  comm: string
  reg: RegExp | NamedRegExp
  admin: boolean = false
  desc: string = '暂无描述'
  group: string
  fn: {
    group: ((e: GroupMsg) => Prevent)[]
    private: ((e: PrivateMsg) => Prevent)[]
  } = {
      group: [],
      private: []
    }
  whiteList: number[] = []
  blackList: number[] = []
  readonly uid: number

  init = (event: Event, admin: Admin) => {
    event.on('message.group', e => {
      if (this.admin && !admin.isAdmin(e.sender.user_id)) return
      if ((this.blackList.length > 0 && this.blackList.includes(e.group_id)) || (this.whiteList.length > 0 && !this.whiteList.includes(e.group_id))) return
      if ((this.reg && !this.reg.test(e.message)) || (!this.reg && e.message !== this.comm)) return
      PrintLog.logNotice(`群${colors.white(event.groupList[e.group_id] || '')}(${colors.white(e.group_id.toString())}) - ${colors.white(e.sender.card || e.sender.nickname)}(${colors.white(e.user_id.toString())})触发${colors.yellow(this.group + '/' + this.comm)}指令`, '指令')
      for (const i in this.fn.group) {
        return this.fn.group[i](e)
      }
    }, this.uid)
    event.on('message.private', e => {
      if (this.admin && !admin.isAdmin(e.sender.user_id)) return
      if ((this.blackList.length > 0 && this.blackList.includes(e.sender.user_id)) || (this.whiteList.length > 0 && !this.whiteList.includes(e.sender.user_id))) return
      if ((this.reg && !this.reg.test(e.message)) || (!this.reg && e.message !== this.comm)) return
      PrintLog.logNotice(`${colors.white(e.sender.nickname)}(${colors.white(e.user_id.toString())})触发${colors.yellow(this.group + '/' + this.comm)}指令`, '指令')
      for (const i in this.fn.private) {
        return this.fn.private[i](e)
      }
    }, this.uid)
  }
}
