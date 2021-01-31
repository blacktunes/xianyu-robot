import { GroupMsg, Prevent, PrivateMsg } from '../..'
import { PrintLog } from './../../Tools/PrintLog'
import { Event } from './Event'
import NamedRegExp = require('named-regexp-groups')
import colors = require('colors')
import { Admin } from './Admin'
import { Bot } from '../Bot'

export class Command {
  constructor(Bot: Bot) {
    this.Bot = Bot
  }
  private Bot: Bot
  /**
   * 命令列表
   */
  list: Comm[] = []

  /**
   * 增加命令
   */
  command = (name: string) => {
    const repeat = this.list.some(item => {
      return item.comm === name
    })
    if (repeat) {
      PrintLog.logWarning(`发现重复指令 ${colors.white(name)}`, '指令')
    }

    const comm = new Comm(name, this.Bot.addEvent())
    this.list.push(comm)
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
       * 设置命令分类
       */
      group(name: string) {
        comm.group = name
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
        if (repeat) return this
        if (comm.blackList.length > 0) {
          throw new Error('请勿和黑名单同时使用')
        }
        comm.whiteList = [...comm.whiteList, ...list]
        return this
      }
      /**
       * 增加黑名单列表，请勿和白名单同时使用
       */
      black(list: number[]) {
        if (repeat) return this
        if (comm.whiteList.length > 0) {
          throw new Error('请勿和白名单同时使用')
        }
        comm.blackList = [...comm.blackList, ...list]
        return this
      }
    }
  }
}

class Comm {
  constructor(name: string, uid: number) {
    this.comm = name
    this.uid = uid
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
      PrintLog.logNotice(`群${colors.white(event.groupList[e.group_id] || '')}(${colors.white(e.group_id.toString())}) - ${colors.white(e.sender.card || e.sender.nickname)}(${colors.white(e.user_id.toString())})触发${colors.yellow(this.comm)}指令`, '指令')
      for (const i in this.fn.group) {
        return this.fn.group[i](e)
      }
    }, this.uid)
    event.on('message.private', e => {
      if (this.admin && !admin.isAdmin(e.sender.user_id)) return
      if ((this.blackList.length > 0 && this.blackList.includes(e.sender.user_id)) || (this.whiteList.length > 0 && !this.whiteList.includes(e.sender.user_id))) return
      if ((this.reg && !this.reg.test(e.message)) || (!this.reg && e.message !== this.comm)) return
      PrintLog.logNotice(`${colors.white(e.sender.nickname)}(${colors.white(e.user_id.toString())})触发${colors.yellow(this.comm)}指令`, '指令')
      for (const i in this.fn.private) {
        return this.fn.private[i](e)
      }
    }, this.uid)
  }
}
