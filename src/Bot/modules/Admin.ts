import { PrintLog } from '../..'
import schedule = require('node-schedule')
import { Bot } from '../Bot'

/**
 * 管理员相关
 */
export class Admin {
  constructor(bot: Bot) {
    this.bot = bot
  }
  private bot: Bot

  adminList: Set<number> = new Set<number>()
  readonly addAdmin = (adminId: number) => {
    this.adminList.add(adminId)
  }

  readonly isAdmin = (id: number) => {
    return this.adminList.has(id)
  }

  /**
   * 黑名单
   */
  blacklist: Set<string> = new Set<string>()
  /**
   * 禁用所有功能
   * @param {number} group_id
   * @param {number} user_id
   * @param {number} time
   */
  readonly ban = (group_id: number | null, user_id: number | null, time: number = 1) => {
    if (!user_id || this.adminList.has(user_id)) {
      return
    }
    const msg = `无路赛，禁用你所有功能${time}分钟`
    if (group_id) {
      this.bot.Api.sendGroupMsg(group_id, `${this.bot.CQCode.at(user_id)}${msg}`)
    } else {
      this.bot.Api.sendPrivateMsg(user_id, msg)
    }
    this.blacklist.add([group_id, user_id].toString())
    const user = group_id ? `(${group_id}) - (${user_id})` : `(${user_id})`
    PrintLog.logWarning(`${user}被禁用${time}分钟`, 'BAN')
    schedule.scheduleJob(new Date(Date.now() + time * 60 * 1000), () => {
      if (this.blacklist.has([group_id, user_id].toString())) {
        this.blacklist.delete([group_id, user_id].toString())
        PrintLog.logWarning(`${user}已解除禁用`, 'BAN')
        if (group_id) {
          this.bot.Api.sendGroupMsg(group_id, `${this.bot.CQCode.at(user_id)}放过你了，下次别这样了`)
        } else {
          this.bot.Api.sendPrivateMsg(user_id, '放过你了，下次别这样了')
        }
      }
    })
  }

  readonly isBan = (group_id: number | null, user_id: number | null) => {
    return this.blacklist.has([group_id, user_id].toString())
  }
}
