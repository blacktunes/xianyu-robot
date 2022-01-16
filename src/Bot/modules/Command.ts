import { magenta, white, yellow } from 'colors'
import { GroupMsg, Prevent, PrivateMsg } from '../..'
import { Bot } from '../Bot'
import NamedRegExp = require('named-regexp-groups')

export class Command {
  constructor(Bot: Bot) {
    this.Bot = Bot
  }
  private Bot: Omit<Bot, 'Command'>
  /** 命令列表 */
  list: Comm[] = []

  /** 增加命令 */
  command(name: string) {
    const repeat = this.list.some(item => {
      return item.comm.includes(name)
    })
    if (repeat) {
      this.Bot.Log.logWarning(`发现重复指令 ${white(name)}, 指令设置失败`, '指令')
    }

    const comm = new Comm(name)
    this.list.push(comm)

    setCommLister(this.Bot as Bot, comm)

    this.Bot.Log.logNotice(`${comm.group ? `${yellow(comm.group)} - ` : ''}${yellow(name)} 已加载`, '指令')

    return new SetComm(this.Bot as Bot, comm, repeat)
  }
}

export class Comm {
  constructor(name: string) {
    this.comm.push(name)
  }
  comm: string[] = []
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
  whitelist: Set<number> = new Set<number>()
  blacklist: Set<number> = new Set<number>()
}

export class SetComm {
  constructor(Bot: Bot, comm: Comm, repeat: boolean, plugin: boolean = false) {
    this.Bot = Bot
    this.comm = comm
    this.repeat = repeat
    this.plugin = plugin
  }
  private Bot: Bot
  private comm: Comm
  private repeat: boolean
  private plugin: boolean

  /** 增加指令别名 */
  alias(name: string) {
    const repeat = this.Bot.Command.list.some(item => {
      return item.comm.includes(name)
    })
    if (repeat) {
      this.Bot.Log.logWarning(`别名与其它指令重复 ${white(name)}, 别名设置失败`, '指令')
    } else {
      this.comm.comm.push(name)
    }
  }
  /** 增加命令描述，重复调用会被覆盖 */
  desc(text: string) {
    this.comm.desc = text
    return this
  }
  /** 增加正则规则，调用后命令名将会失效 */
  reg(reg: RegExp | NamedRegExp) {
    if (this.repeat) return this
    this.comm.reg = reg
    this.comm.desc += '(动态指令)'
    return this
  }
  /** 是否为管理员指令 */
  admin(flag = true) {
    this.comm.admin = flag
    return this
  }
  /** 设置命令分类 */
  group(name: string) {
    this.comm.group = name
    return this
  }
  /** 增加命令处理方法，可添加多个 */
  action(type: 'private', fn: (e: PrivateMsg) => Prevent): this
  action(type: 'group', fn: (e: GroupMsg) => Prevent): this
  action(type: 'group' | 'private', fn: (e: any) => Prevent) {
    if (this.repeat) return this
    if (type === 'group') {
      this.comm.fn.group.push(fn)
    } else if (type === 'private') {
      this.comm.fn.private.push(fn)
    }
    return this
  }
  /** 增加白名单列表，请勿和黑名单同时使用 */
  white(list: number[]) {
    if (this.repeat || list.length < 1) return this
    if (this.comm.blacklist.size > 0) {
      this.Bot.Log.logWarning(`${magenta(this.comm.comm[0])} 已设置黑名单，该白名单 ${magenta(list.toString())} 设置无效`, this.plugin ? '插件' : 'Admin')
      return this
    }
    this.comm.whitelist = new Set(([...this.comm.whitelist, ...list]))
    return this
  }
  /** 增加黑名单列表，请勿和白名单同时使用 */
  black(list: number[]) {
    if (this.repeat || list.length < 1) return this
    if (this.comm.whitelist.size > 0) {
      this.Bot.Log.logWarning(`${magenta(this.comm.comm[0])} 已设置白名单，该黑名单 ${magenta(list.toString())} 设置无效`, this.plugin ? '插件' : 'Admin')
      return this
    }
    this.comm.blacklist = new Set(([...this.comm.blacklist, ...list]))
    return this
  }
}

export const setCommLister = (Bot: Bot, comm: Comm) => {
  Bot.Event.on('message.group', async e => {
    if (comm.fn.group.length < 1) return
    if (comm.admin && !Bot.Admin.isAdmin(e.sender.user_id)) return
    if ((comm.blacklist.size > 0 && comm.blacklist.has(e.group_id)) || (comm.whitelist.size > 0 && !comm.whitelist.has(e.group_id))) return
    if ((comm.reg && !comm.reg.test(e.message)) || (!comm.reg && !comm.comm.includes(e.message))) return
    Bot.Log.logNotice(`群${white(Bot.Data.groupList[e.group_id] || '')}(${white(e.group_id.toString())}) - ${white(e.sender.card || e.sender.nickname)}(${white(e.user_id.toString())})触发${yellow(comm.comm[0])}指令`, '指令')
    for (const i in comm.fn.group) {
      if (await comm.fn.group[i](e)) return true
    }
  })
  Bot.Event.on('message.private', async e => {
    if (comm.fn.private.length < 1) return
    if (comm.admin && !Bot.Admin.isAdmin(e.sender.user_id)) return
    if ((comm.blacklist.size > 0 && comm.blacklist.has(e.sender.user_id)) || (comm.whitelist.size > 0 && !comm.whitelist.has(e.sender.user_id))) return
    if ((comm.reg && !comm.reg.test(e.message)) || (!comm.reg && !comm.comm.includes(e.message))) return
    Bot.Log.logNotice(`${white(e.sender.nickname)}(${white(e.user_id.toString())})触发${yellow(comm.comm[0])}指令`, '指令')
    for (const i in comm.fn.private) {
      if (await comm.fn.private[i](e)) return true
    }
  })
}
