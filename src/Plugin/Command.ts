import { magenta, white, yellow } from 'colors'
import { GroupMsg, Prevent, PrintLog, PrivateMsg } from '..'
import { Bot } from '../Bot/Bot'
import { Comm } from '../Bot/modules/Command'
import NamedRegExp = require('named-regexp-groups')

export class Command {
  constructor(group: string, Bot: Bot) {
    this.group = group
    this.Bot = Bot
  }
  private Bot: Bot
  private group: string

  private _whitelist: Set<number> = new Set<number>()
  set whitelist(list: number[]) {
    this._whitelist = new Set(([...this._whitelist, ...list]))
    this.Bot.Command.list.forEach(item => {
      if (item.group === this.group) {
        item.whitelist = new Set([...this._whitelist, ...item.whitelist])
      }
    })
  }
  private _blacklist: Set<number> = new Set<number>()
  set blacklist(list: number[]) {
    this._blacklist = new Set(([...this._blacklist, ...list]))
    this.Bot.Command.list.forEach(item => {
      if (item.group === this.group) {
        item.blacklist = new Set([...this._blacklist, ...item.blacklist])
      }
    })
  }

  /**
   * 为插件指令增加白名单列表，请勿和黑名单同时使用
   */
  white(list: number[]) {
    if (list.length < 1) return this
    if (this._blacklist.size > 0) {
      PrintLog.logWarning(`${magenta(this.group)} 已设置黑名单，该白名单${magenta(list.toString())}设置无效`, 'Admin')
      return this
    }
    this.whitelist = list
    return this
  }
  /**
   * 为插件指令增加黑名单列表，请勿和白名单同时使用
   */
  black(list: number[]) {
    if (list.length < 1) return this
    if (this._whitelist.size > 0) {
      PrintLog.logWarning(`${magenta(this.group)} 已设置白名单，该黑名单 ${magenta(list.toString())} 设置无效`, 'Admin')
      return this
    }
    this.blacklist = list
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
      this.Bot.Log.logWarning(`发现重复指令 ${white(name)}`, '指令')
    }

    const comm = new Comm(name)
    comm.group = this.group
    comm.whitelist = this._whitelist
    comm.blacklist = this._blacklist
    this.Bot.Command.list.push(comm)

    this.Bot.Event.on('message.group', async e => {
      if (comm.fn.group.length < 1) return
      if (comm.admin && !this.Bot.Admin.isAdmin(e.sender.user_id)) return
      if ((comm.blacklist.size > 0 && comm.blacklist.has(e.group_id)) || (comm.whitelist.size > 0 && !comm.whitelist.has(e.group_id))) return
      if ((comm.reg && !comm.reg.test(e.message)) || (!comm.reg && e.message !== comm.comm)) return
      this.Bot.Log.logNotice(`群${white(this.Bot.Data.groupList[e.group_id] || '')}(${white(e.group_id.toString())}) - ${white(e.sender.card || e.sender.nickname)}(${white(e.user_id.toString())})触发${yellow(comm.comm)}指令`, '指令')
      for (const i in comm.fn.group) {
        if (await comm.fn.group[i](e)) return true
      }
    })
    this.Bot.Event.on('message.private', async e => {
      if (comm.fn.private.length < 1) return
      if (comm.admin && !this.Bot.Admin.isAdmin(e.sender.user_id)) return
      if ((comm.blacklist.size > 0 && comm.blacklist.has(e.sender.user_id)) || (comm.whitelist.size > 0 && !comm.whitelist.has(e.sender.user_id))) return
      if ((comm.reg && !comm.reg.test(e.message)) || (!comm.reg && e.message !== comm.comm)) return
      this.Bot.Log.logNotice(`${white(e.sender.nickname)}(${white(e.user_id.toString())})触发${yellow(comm.comm)}指令`, '指令')
      for (const i in comm.fn.private) {
        if (await comm.fn.private[i](e)) return true
      }
    })
    this.Bot.Log.logNotice(`${yellow(this.group)} - ${yellow(name)} 已加载`, '指令')

    return new class {
      /**
       * 增加命令描述，重复调用会被覆盖
       */
      desc(text: string) {
        comm.desc = text
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
      /**
       * 增加白名单列表，请勿和黑名单同时使用
       */
      white(list: number[]) {
        if (repeat || list.length < 1) return this
        if (comm.blacklist.size > 0) {
          PrintLog.logWarning(`${magenta(comm.comm)} 已设置黑名单，该白名单 ${magenta(list.toString())} 设置无效`, 'Admin')
          return this
        }
        comm.whitelist = new Set(([...comm.whitelist, ...list]))
        return this
      }
      /**
       * 增加黑名单列表，请勿和白名单同时使用
       */
      black(list: number[]) {
        if (repeat || list.length < 1) return this
        if (comm.whitelist.size > 0) {
          PrintLog.logWarning(`${magenta(comm.comm)} 已设置白名单，该黑名单 ${magenta(list.toString())} 设置无效`, 'Admin')
          return this
        }
        comm.blacklist = new Set(([...comm.blacklist, ...list]))
        return this
      }
    }
  }
}