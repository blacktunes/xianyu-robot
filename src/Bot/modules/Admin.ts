import { cancelJob, scheduleJob } from 'node-schedule'
import { Bot } from '../Bot'
import { magenta } from 'colors'

/**
 * 管理员相关
 */
export class Admin {
  constructor(bot: Bot) {
    this.Bot = bot
  }
  private Bot: Omit<Bot, 'Admin'>

  adminList: Set<number> = new Set<number>()
  addAdmin(admin_id: number[]) {
    this.adminList = new Set([...this.adminList, ...admin_id])
  }

  isAdmin(id: number) {
    return this.adminList.has(id)
  }

  /**
   * 被ban名单
   */
  banlist: Set<number> = new Set<number>()
  /**
   * 禁用所有功能
   * @param {number} group_id
   * @param {number} user_id
   * @param {number} time
   */
  ban(group_id: number | null, user_id: number, time: number = 1) {
    if (!user_id || this.adminList.has(user_id)) {
      return
    }
    const msg = `无路赛，禁用你所有功能${time}分钟`
    if (group_id) {
      this.Bot.Api.sendGroupMsg(group_id, `${this.Bot.CQCode.at(user_id)}${msg}`)
    } else {
      this.Bot.Api.sendPrivateMsg(user_id, msg)
    }
    this.banlist.add(user_id)
    const user = group_id ? `(${group_id}) - (${user_id})` : `(${user_id})`
    this.Bot.Log.logWarning(`${user}被禁用${time}分钟`, 'BAN')
    scheduleJob('ban' + user_id.toString(), new Date(Date.now() + time * 60 * 1000), () => {
      if (this.banlist.has(user_id)) {
        this.banlist.delete(user_id)
        this.Bot.Log.logWarning(`${user}已解除禁用`, 'BAN')
        if (group_id) {
          this.Bot.Api.sendGroupMsg(group_id, `${this.Bot.CQCode.at(user_id)}放过你了，下次别这样了`)
        } else {
          this.Bot.Api.sendPrivateMsg(user_id, '放过你了，下次别这样了')
        }
      }
    })
  }

  liftBan(user_id: number) {
    cancelJob('ban' + user_id.toString())
    if (this.banlist.has(user_id)) {
      this.banlist.delete(user_id)
      this.Bot.Log.logWarning(`${user_id}已解除禁用`, 'BAN')
    }
  }

  isBan(user_id: number | null) {
    return this.banlist.has(user_id)
  }

  addWhitelist(group_list: number[]) {
    if (group_list.length < 1) return
    if (this.Bot.Conn.blacklist.size > 0) {
      this.Bot.Log.logWarning(`已设置黑名单，该白名单 ${magenta(group_list.toString())} 设置无效`, 'Admin')
      return
    }
    this.Bot.Conn.whitelist = new Set(([...this.Bot.Conn.whitelist, ...group_list]))
  }

  /**
   * 增加黑名单列表，请勿和白名单同时使用
   */
  addBlacklist(group_list: number[]) {
    if (group_list.length < 1) return
    if (this.Bot.Conn.whitelist.size > 0) {
      this.Bot.Log.logWarning(`已设置白名单，该黑名单 ${magenta(group_list.toString())} 设置无效`, 'Admin')
      return
    }
    this.Bot.Conn.blacklist = new Set(([...this.Bot.Conn.blacklist, ...group_list]))
  }
}
