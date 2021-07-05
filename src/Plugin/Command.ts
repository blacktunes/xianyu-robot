import { magenta, white, yellow } from 'colors'
import { Bot } from '../Bot/Bot'
import { Comm, SetComm, setCommLister } from '../Bot/modules/Command'
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
      this.Bot.Log.logWarning(`${magenta(this.group)} 已设置黑名单，该白名单${magenta(list.toString())}设置无效`, 'Admin')
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
      this.Bot.Log.logWarning(`${magenta(this.group)} 已设置白名单，该黑名单 ${magenta(list.toString())} 设置无效`, 'Admin')
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
      return item.comm.includes(name)
    })
    if (repeat) {
      this.Bot.Log.logWarning(`发现重复指令 ${white(name)}, 指令设置失败`, '指令')
    }

    const comm = new Comm(name)
    comm.group = this.group
    comm.whitelist = this._whitelist
    comm.blacklist = this._blacklist
    this.Bot.Command.list.push(comm)

    setCommLister(this.Bot, comm)

    this.Bot.Log.logNotice(`${yellow(this.group)} - ${yellow(name)} 已加载`, '指令')

    return new SetComm(this.Bot, comm, repeat) as Omit<SetComm, 'group'>
  }
}