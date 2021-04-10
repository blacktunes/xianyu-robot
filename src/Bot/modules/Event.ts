import { BotEvent, Friend, FriendRecall, Group, GroupAdmin, GroupBan, GroupCard, GroupDecrease, GroupIncrease, GroupMsg, GroupNotify, GroupRecall, GroupUpload, Message, Prevent, PrivateMsg } from '../..'
import { PrintLog } from '../../Tools'
import { emitter } from '../../Tools/Emitter'
import { Bot } from '../Bot'
import colors = require('colors')

export class Event {
  constructor(Bot: Bot, nolisten: boolean | number[]) {
    this.Bot = Bot
    this.init(nolisten)
  }
  private Bot: Bot

  private eventNum = 0
  /**
   * 更新监听事件ID
   * @returns 事件ID，影响监听事件执行顺序
   */
  updateEventID = () => {
    this.eventNum += 1
    return this.eventNum
  }



  private init = (nolisten: boolean | number[]) => {
    if (nolisten !== true) {
      this.Bot.Data.updateGroupsList()
      this
        .on('message.private', (event) => {
          if (event.user_id === this.Bot.Data.getUserId()) return
          PrintLog.logInfoRecv(`收到${colors.white(event.sender.nickname)}(${colors.white(event.user_id.toString())})的消息: ${colors.white(event.message)} (${colors.white(event.message_id.toString())})`, 'EVENT')
          return this.Bot.Admin.isBan(null, event.user_id)
        }, 0)
        .on('message.group', (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          PrintLog.logInfoRecv(`收到群${colors.cyan(this.Bot.Data.groupList[event.group_id] || '')}(${colors.cyan(event.group_id.toString())}) - ${colors.cyan(event.sender.card || event.sender.nickname)}(${colors.cyan(event.user_id.toString())})的消息: ${colors.cyan(event.message)} (${colors.cyan(event.message_id.toString())})`, 'EVENT')
          return this.Bot.Admin.isBan(event.group_id, event.user_id)
        }, 0)
        .on('notice.group_recall', (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          PrintLog.logWarning(`群${colors.magenta(this.Bot.Data.groupList[event.group_id] || '')}(${colors.magenta(event.group_id.toString())}) - (${colors.magenta(event.operator_id.toString())}) 撤回了 (${colors.magenta(event.user_id.toString())}) 的一条消息 (${colors.magenta(event.message_id.toString())})`, 'EVENT')
        })
        .on('notice.friend_recall', (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.user_id)) return
          PrintLog.logWarning(`(${colors.magenta(event.user_id.toString())}) 撤回了一条消息 (${colors.magenta(event.message_id.toString())})`, 'EVENT')
        })
        .on('notice.notify', (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          if (event.sub_type === 'poke') {
            PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - (${colors.white(event.user_id.toString())}) 戳了戳 (${colors.white(event.target_id.toString())})`, 'EVENT')
          } else if (event.sub_type === 'lucky_king') {
            PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - (${colors.white(event.target_id.toString())}) 获得了 (${colors.white(event.user_id.toString())}) 发出的群红包运气王`, 'EVENT')
          } else if (event.sub_type === 'honor') {
            const honor = event.honor_type === 'talkative' ? '龙王' : event.honor_type === 'performer' ? '群聊之火' : event.honor_type === 'emotion' ? '快乐源泉' : '群荣誉'
            PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - (${colors.white(event.user_id.toString())}) 获得了 ${honor}`, 'EVENT')
          }
        })
        .on('notice.group_admin', async (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          if (event.sub_type === 'set') {
            PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - (${colors.white(event.user_id.toString())}) 成为了管理员`, 'EVENT')
          } else if (event.sub_type === 'unset') {
            PrintLog.logWarning(`群${colors.magenta(this.Bot.Data.groupList[event.group_id] || '')}(${colors.magenta(event.group_id.toString())}) - (${colors.magenta(event.user_id.toString())}) 被取消了管理员`, 'EVENT')
          }
        })
        .on('notice.group_decrease', async (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          if (event.sub_type === 'kick') {
            PrintLog.logWarning(`群${colors.magenta(this.Bot.Data.groupList[event.group_id] || '')}(${colors.magenta(event.group_id.toString())}) - (${colors.magenta(event.user_id.toString())}) 被 (${colors.magenta(event.operator_id.toString())}) 踢出群聊`, 'EVENT')
          } else if (event.sub_type === 'leave') {
            PrintLog.logWarning(`群${colors.magenta(this.Bot.Data.groupList[event.group_id] || '')}(${colors.magenta(event.group_id.toString())}) - (${colors.magenta(event.user_id.toString())}) 退出了群聊`, 'EVENT')
          } else if (event.sub_type === 'kick_me') {
            PrintLog.logWarning(`${this.Bot.Data.name} 被 群${colors.magenta(this.Bot.Data.groupList[event.group_id] || '')}(${colors.magenta(event.group_id.toString())}) - (${colors.magenta(event.operator_id.toString())}) 踢出群聊`, 'EVENT')
          }
        })
        .on('notice.group_increase', async (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          if (event.sub_type === 'approve') {
            PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - (${colors.white(event.operator_id.toString())}) 同意 (${colors.white(event.user_id.toString())}) 加入群聊`, 'EVENT')
          } else if (event.sub_type === 'invite') {
            PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - (${colors.white(event.operator_id.toString())}) 邀请 (${colors.white(event.user_id.toString())}) 加入群聊`, 'EVENT')
          }
        })
        .on('notice.group_ban', async (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          if (event.sub_type === 'ban') {
            PrintLog.logWarning(`群${colors.magenta(this.Bot.Data.groupList[event.group_id] || '')}(${colors.magenta(event.group_id.toString())}) - (${colors.magenta(event.user_id.toString())}) 被 (${colors.magenta(event.operator_id.toString())}) 禁言 ${event.duration}秒`, 'EVENT')
          } else if (event.sub_type === 'lift_ban') {
            PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - (${colors.white(event.user_id.toString())}) 被 (${colors.white(event.operator_id.toString())}) 解除禁言`, 'EVENT')
          }
        })
        .on('notice.group_upload', async (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - (${colors.white(event.user_id.toString())}) 上传了 ${colors.white(event.file.name)}`, 'EVENT')
        })
        .on('request.friend', async (event) => {
          PrintLog.logNotice(`(${colors.white(event.user_id.toString())}) 申请添加好友 验证消息：${colors.white(event.comment)}`, 'EVENT')
        })
        .on('request.group', async (event) => {
          if (event.sub_type === 'add') {
            PrintLog.logNotice(`(${colors.white(event.user_id.toString())}) 申请加入 (${colors.white(event.group_id.toString())}) 验证消息：${colors.white(event.comment)}`, 'EVENT')
          } else if (event.sub_type === 'invite') {
            PrintLog.logNotice(`(${colors.white(event.user_id.toString())}) 邀请${this.Bot.Data.name}加入 (${colors.white(event.group_id.toString())}) 验证消息：${colors.white(event.comment)}`, 'EVENT')
          }
        })
        .on('notice.group_card', async (event) => {
          if (Array.isArray(nolisten) && nolisten.includes(event.group_id)) return
          PrintLog.logNotice(`群${colors.white(this.Bot.Data.groupList[event.group_id] || '')}(${colors.white(event.group_id.toString())}) - ${colors.white(event.card_old)}(${colors.white(event.user_id.toString())})群名片修改为${colors.white(event.card_new)}`, 'EVENT')
        })
      PrintLog.logInfo('开始监听事件', 'EVENT')
    }
  }

  /**
   * WS链接或断开
   */
  on(type: 'ws.ready' | 'ws.close' | 'ws.connect', fn: () => Prevent): this
  /**
   * WS链接错误
   */
  on(type: 'ws.error', fn: (error: Error) => Prevent): this
  /**
   * 私聊信息
   */
  on(type: 'message.private', fn: (e: PrivateMsg) => Prevent, uid?: number): this
  /**
   * 群消息
   */
  on(type: 'message.group', fn: (e: GroupMsg) => Prevent, uid?: number): this
  /**
   * 群消息撤回(拓展Event)
   */
  on(type: 'notice.group_recall', fn: (e: GroupRecall) => Prevent): this
  /**
   * 好友消息撤回(拓展Event)
   */
  on(type: 'notice.friend_recall', fn: (e: FriendRecall) => Prevent): this
  /**
   * 群内提示事件(拓展Event)(龙王等事件)
   */
  on(type: 'notice.notify', fn: (e: GroupNotify) => Prevent): this
  /**
   * 群管理员变动
   */
  on(type: 'notice.group_admin', fn: (e: GroupAdmin) => Prevent): this
  /**
   * 群成员减少
   */
  on(type: 'notice.group_decrease', fn: (e: GroupDecrease) => Prevent): this
  /**
   * 群成员增加
   */
  on(type: 'notice.group_increase', fn: (e: GroupIncrease) => Prevent): this
  /**
   * 群禁言
   */
  on(type: 'notice.group_ban', fn: (e: GroupBan) => Prevent): this
  /**
   * 群文件上传
   */
  on(type: 'notice.group_upload', fn: (e: GroupUpload) => Prevent): this
  /**
   * 群成员名片更新
   */
  on(type: 'notice.group_card', fn: (e: GroupCard) => Prevent): this
  /**
   * 加好友请求
   */
  on(type: 'request.friend', fn: (e: Friend) => Prevent): this
  /**
   * 加群请求/邀请
   */
  on(type: 'request.group', fn: (e: Group) => Prevent): this
  /**
   * 心跳事件
   */
  on(type: 'meta_event.heartbeat', fn: (e?: any) => Prevent): this
  /**
   * 列表外事件
   */
  on(type: 'other', fn: (e: any) => Prevent): this
  on(type: BotEvent, fn: (e: any) => Prevent, uid?: number) {
    this.Bot.Conn.addEvent(type, fn, (uid === 0 || uid) ? uid : this.updateEventID())
    return this
  }

  /**
   * 发送消息完成事件
   */
  onSendMessage(type: 'sendPrivateMsg', fn: (user_id: number, message: Message) => void): this
  onSendMessage(type: 'sendGroupMsg', fn: (group_id: number, message: Message) => void): this
  onSendMessage(type: 'sendPrivateMsg' | 'sendGroupMsg', fn: any) {
    emitter.on(type, (arg1, arg2) => {
      fn(arg1, arg2)
    })
    return this
  }
}
