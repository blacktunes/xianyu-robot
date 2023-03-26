import { magenta } from 'colors'
import { cancelJob, scheduleJob } from 'node-schedule'
import { Bot } from '../Bot'

/** 管理员相关 */
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

  /** 被ban名单 */
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
    const msg = this.Bot.Data.config.admin.ban.replace('[time]', time.toString())
    if (group_id) {
      this.Bot.Api.sendGroupMsg(group_id, `${this.Bot.CQCode.at(user_id)}${msg}`)
    } else {
      this.Bot.Api.sendPrivateMsg(user_id, msg)
    }
    this.banlist.add(user_id)
    const user = group_id ? `(${group_id}) - (${user_id})` : `(${user_id})`
    this.Bot.Log.logWarning(`${user} 被禁用 ${time} 分钟`, 'BAN')
    scheduleJob('ban' + user_id.toString(), new Date(Date.now() + time * 60 * 1000), () => {
      if (this.banlist.has(user_id)) {
        this.banlist.delete(user_id)
        this.Bot.Log.logWarning(`${user} 已解除禁用`, 'BAN')
        if (group_id) {
          this.Bot.Api.sendGroupMsg(group_id, this.Bot.Data.config.admin.group_lift_ban.replace('[id]', this.Bot.CQCode.at(user_id)))
        } else {
          this.Bot.Api.sendPrivateMsg(user_id, this.Bot.Data.config.admin.private_lift_ban)
        }
      }
    })
  }

  liftBan(user_id: number) {
    cancelJob('ban' + user_id.toString())
    if (this.banlist.has(user_id)) {
      this.banlist.delete(user_id)
      this.Bot.Log.logWarning(`${user_id} 已解除禁用`, 'BAN')
    }
  }

  isBan(user_id: number | null) {
    return this.banlist.has(user_id)
  }
}
