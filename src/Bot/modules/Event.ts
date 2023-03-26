import { cyan, magenta, red, white } from 'colors'
import { ClientStatus, Essence, Friend, FriendAdd, FriendRecall, Group, GroupAdmin, GroupBan, GroupCard, GroupDecrease, GroupIncrease, GroupMsg, GroupNotify, GroupRecall, GroupUpload, Message, OfflineFile, Prevent, PrivateMsg } from '../../Type'
import { Bot } from '../Bot'

export class Event {
  constructor(Bot: Bot) {
    this.Bot = Bot
    this.init()
  }
  private Bot: Omit<Bot, 'Event'>

  private init = () => {
    if (this.Bot.Data.showLog) {
      this
        .on('message.private', event => {
          if (event.user_id !== this.Bot.Data.userId) {
            const name = white(event.sender.nickname)
            const user_id = white(event.user_id.toString())
            const msg = white(event.message)
            const message_id = white(event.message_id.toString())
            this.Bot.Log.logInfoRecv(`收到${name}(${user_id})的消息: ${msg} (${message_id})`, 'EVENT')
          }
          return this.Bot.Admin.isBan(event.user_id)
        }, true)
        .on('message.group', event => {
          if (!this.Bot.Data.noLogList.has(event.group_id)) {
            const group_name = cyan(this.Bot.Data.groupList[event.group_id] || '')
            const group_id = cyan(event.group_id.toString())
            const user_name = cyan(event.sender.card || event.sender.nickname)
            const user_id = cyan(event.user_id.toString())
            const msg = cyan(event.message)
            const message_id = cyan(event.message_id.toString())
            this.Bot.Log.logInfoRecv(`收到群${group_name}(${group_id}) - ${user_name}(${user_id})的消息: ${msg} (${message_id})`, 'EVENT')
          }
          return this.Bot.Admin.isBan(event.user_id)
        }, true)
        .on('notice.group_upload', event => {
          if (this.Bot.Data.noLogList.has(event.group_id)) return
          const group_name = white(this.Bot.Data.groupList[event.group_id] || '')
          const group_id = white(event.group_id.toString())
          const user_name = this.Bot.Data.groupMemberList[event.group_id] ? white(this.Bot.Data.groupMemberList[event.group_id][event.user_id] || '') : ''
          const user_id = white(event.user_id.toString())
          const filename = white(event.file.name)
          this.Bot.Log.logNotice(`群${group_name}(${group_id}) - ${user_name}(${user_id}) 上传了 ${filename}`, 'EVENT')
        })
        .on('notice.group_admin', event => {
          if (this.Bot.Data.noLogList.has(event.group_id)) return
          const group_name = this.Bot.Data.groupList[event.group_id] || ''
          const group_id = event.group_id.toString()
          const user_name = this.Bot.Data.groupMemberList[event.group_id] ? this.Bot.Data.groupMemberList[event.group_id][event.user_id] || '' : ''
          const user_id = event.user_id.toString()
          if (event.sub_type === 'set') {
            this.Bot.Log.logNotice(`群${white(group_name)}(${white(group_id)}) - ${white(user_name)}(${white(user_id)}) 成为了管理员`, 'EVENT')
          } else if (event.sub_type === 'unset') {
            this.Bot.Log.logWarning(`群${magenta(group_name)}(${magenta(group_id)}) - ${white(user_name)}(${magenta(user_id)}) 被取消了管理员`, 'EVENT')
          }
        })
        .on('notice.group_decrease', event => {
          if (this.Bot.Data.noLogList.has(event.group_id)) return
          const group_name = magenta(this.Bot.Data.groupList[event.group_id] || '')
          const group_id = magenta(event.group_id.toString())
          const user_name = this.Bot.Data.groupMemberList[event.group_id] ? magenta(this.Bot.Data.groupMemberList[event.group_id][event.user_id] || '') : ''
          const user_id = magenta(event.user_id.toString())
          const operator_name = this.Bot.Data.groupMemberList[event.group_id] ? magenta(this.Bot.Data.groupMemberList[event.group_id][event.operator_id] || '') : ''
          const operator_id = magenta(event.operator_id.toString())
          if (event.sub_type === 'kick') {
            this.Bot.Log.logWarning(`群${group_name}(${group_id}) - ${user_name}(${user_id}) 被 ${operator_name}(${operator_id}) 踢出群聊`, 'EVENT')
          } else if (event.sub_type === 'leave') {
            this.Bot.Log.logWarning(`群${group_name}(${group_id}) - ${user_name}(${user_id}) 退出了群聊`, 'EVENT')
          } else if (event.sub_type === 'kick_me') {
            this.Bot.Log.logWarning(`群${group_name}(${group_id}) - ${red(this.Bot.Data.name)} 被 ${operator_name}(${operator_id}) 踢出群聊`, 'EVENT')
          }
        })
        .on('notice.group_increase', event => {
          if (this.Bot.Data.noLogList.has(event.group_id)) return
          const group_name = white(this.Bot.Data.groupList[event.group_id] || '')
          const group_id = white(event.group_id.toString())
          const user_name = this.Bot.Data.groupMemberList[event.group_id] ? white(this.Bot.Data.groupMemberList[event.group_id][event.user_id] || '') : ''
          const user_id = white(event.user_id.toString())
          const operator_name = this.Bot.Data.groupMemberList[event.group_id] ? white(this.Bot.Data.groupMemberList[event.group_id][event.operator_id] || '') : ''
          const operator_id = white(event.operator_id.toString())
          const type = event.sub_type === 'invite' ? '邀请' : '同意'
          this.Bot.Log.logNotice(`群${group_name}(${group_id}) - ${operator_name}(${operator_id}) ${type} ${user_name}(${user_id}) 加入群聊`, 'EVENT')
        })
        .on('notice.group_ban', event => {
          if (this.Bot.Data.noLogList.has(event.group_id)) return
          const group_name = this.Bot.Data.groupList[event.group_id] || ''
          const group_id = event.group_id.toString()
          const user_name = this.Bot.Data.groupMemberList[event.group_id] ? this.Bot.Data.groupMemberList[event.group_id][event.user_id] || '' : ''
          const user_id = event.user_id.toString()
          const operator_name = this.Bot.Data.groupMemberList[event.group_id] ? this.Bot.Data.groupMemberList[event.group_id][event.operator_id] || '' : ''
          const operator_id = event.operator_id.toString()
          if (event.sub_type === 'ban') {
            this.Bot.Log.logWarning(`群${magenta(group_name)}(${magenta(group_id)}) - ${magenta(user_name)}(${magenta(user_id)}) 被 ${magenta(operator_name)}(${magenta(operator_id)}) 禁言 ${magenta(event.duration.toString())}秒`, 'EVENT')
          } else if (event.sub_type === 'lift_ban') {
            this.Bot.Log.logNotice(`群${white(group_name)}(${white(group_id)}) - ${white(user_name)}(${white(user_id)}) 被 ${white(operator_name)}(${white(operator_id)}) 解除禁言`, 'EVENT')
          }
        })
        .on('notice.friend_add', event => {
          this.Bot.Log.logNotice(`与 (${white(event.user_id.toString())}) 成为好友`, 'EVENT')
        })
        .on('notice.group_recall', (event) => {
          if (this.Bot.Data.noLogList.has(event.group_id)) return
          const group_name = magenta(this.Bot.Data.groupList[event.group_id] || '')
          const group_id = magenta(event.group_id.toString())
          const user_name = this.Bot.Data.groupMemberList[event.group_id] ? magenta(this.Bot.Data.groupMemberList[event.group_id][event.user_id] || '') : ''
          const user_id = magenta(event.user_id.toString())
          const operator_name = this.Bot.Data.groupMemberList[event.group_id] ? magenta(this.Bot.Data.groupMemberList[event.group_id][event.operator_id] || '') : ''
          const operator_id = magenta(event.operator_id.toString())
          const message_id = magenta(event.message_id.toString())
          this.Bot.Log.logWarning(`群${group_name}(${group_id}) - ${operator_name}(${operator_id}) 撤回了${event.operator_id === event.user_id ? '' : ` ${user_name}(${user_id}) 的`}一条消息 (${message_id})`, 'EVENT')
        })
        .on('notice.friend_recall', event => {
          const user_name = magenta(this.Bot.Data.friendList[event.user_id] || '')
          const user_id = magenta(event.user_id.toString())
          const message_id = magenta(event.message_id.toString())
          this.Bot.Log.logWarning(`${user_name}(${user_id}) 撤回了一条消息 (${message_id})`, 'EVENT')
        })
        .on('notice.notify', event => {
          if ((this.Bot.Data.noLogList.has(event.group_id)) || !event.group_id) return
          const group_name = white(this.Bot.Data.groupList[event.group_id] || '')
          const group_id = white(event.group_id.toString())
          const user_name = this.Bot.Data.groupMemberList[event.group_id] ? white(this.Bot.Data.groupMemberList[event.group_id][event.user_id] || '') : ''
          const user_id = white(event.user_id.toString())
          const target_name = event.sub_type !== 'honor' && this.Bot.Data.groupMemberList[event.group_id] ? white(this.Bot.Data.groupMemberList[event.group_id][event.target_id] || '') : ''
          const target_id = event.sub_type !== 'honor' ? white(event.target_id.toString()) : ''
          if (event.sub_type === 'poke') {
            this.Bot.Log.logNotice(`群${group_name}(${group_id}) - ${user_name}(${user_id}) 戳了戳 ${target_name}(${target_id})`, 'EVENT')
          } else if (event.sub_type === 'lucky_king') {
            this.Bot.Log.logNotice(`群${group_name}(${group_id}) - ${target_name}(${target_id}) 获得了 ${user_name}(${user_id}) 发出的群红包运气王`, 'EVENT')
          } else if (event.sub_type === 'honor') {
            const honor = event.honor_type === 'talkative' ? '龙王' : event.honor_type === 'performer' ? '群聊之火' : event.honor_type === 'emotion' ? '快乐源泉' : '群荣誉'
            this.Bot.Log.logNotice(`群${group_name}(${group_id}) - ${user_name}(${user_id}) 获得了 ${honor}`, 'EVENT')
          }
        })
        .on('notice.group_card', event => {
          if (this.Bot.Data.noLogList.has(event.group_id)) return
          const group_name = white(this.Bot.Data.groupList[event.group_id] || '')
          const group_id = white(event.group_id.toString())
          const user_id = white(event.user_id.toString())
          const oldcard = white(event.card_old)
          const newcard = white(event.card_new)
          this.Bot.Log.logNotice(`群${group_name}(${group_id}) - ${oldcard}(${user_id}) 将群名片修改为${newcard}`, 'EVENT')
        })
        .on('notice.offline_file', event => {
          const user_name = white(this.Bot.Data.friendList[event.user_id] || '')
          const user_id = white(event.user_id.toString())
          const filename = white(event.file.name)
          const url = white(event.file.url)
          this.Bot.Log.logNotice(`${user_name}(${user_id}) 发送了离线文件 ${filename}(${url})`, 'EVENT')
        })
        .on('request.friend', async (event) => {
          const user_id = white(event.user_id.toString())
          const comment = white(event.comment)
          this.Bot.Log.logNotice(`(${user_id}) 申请添加好友 验证消息：${comment}`, 'EVENT')
        })
        .on('request.group', async (event) => {
          const user_id = white(event.user_id.toString())
          const group_name = white(this.Bot.Data.groupList[event.group_id] || '')
          const group_id = white(event.group_id.toString())
          const comment = white(event.comment)
          if (event.sub_type === 'add') {
            this.Bot.Log.logNotice(`(${user_id}) 申请加入 ${group_name}(${group_id}) 验证消息：${comment}`, 'EVENT')
          } else if (event.sub_type === 'invite') {
            this.Bot.Log.logNotice(`(${user_id}) 邀请${this.Bot.Data.name}加入 ${group_name}(${group_id}) 验证消息：${comment}`, 'EVENT')
          }
        })
        .on('notice.client_status', event => {
          if (event.online) {
            this.Bot.Log.logNotice(`账号在 ${white(event.client.device_name)} 上线`, 'EVENT')
          } else {
            this.Bot.Log.logWarning(`账号在 ${magenta(event.client.device_name)} 下线`, 'EVENT')
          }
        })
        .on('notice.essence', event => {
          if (event.sub_type === 'add') {
            this.Bot.Log.logNotice(`(${white(event.sender_id.toString())}) 的消息被 (${white(event.operator_id.toString())}) 设为精华消息 (${white(event.message_id.toString())})`, 'EVENT')
          } else {
            this.Bot.Log.logWarning(`(${magenta(event.sender_id.toString())}) 的消息被 (${magenta(event.operator_id.toString())}) 取消精华消息 (${magenta(event.message_id.toString())})`, 'EVENT')
          }
        })

      this.Bot.Log.logInfo('开始监听事件', 'EVENT')
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
  on(type: 'message.private', fn: (e: PrivateMsg) => Prevent, log?: boolean): this
  /**
   * 群消息
   */
  on(type: 'message.group', fn: (e: GroupMsg) => Prevent, log?: boolean): this
  /**
   * 群文件上传
   */
  on(type: 'notice.group_upload', fn: (e: GroupUpload) => Prevent): this
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
   * 好友添加
   */
  on(type: 'notice.friend_add', fn: (e: FriendAdd) => Prevent): this
  /**
   * 群消息撤回
   */
  on(type: 'notice.group_recall', fn: (e: GroupRecall) => Prevent): this
  /**
   * 好友消息撤回
   */
  on(type: 'notice.friend_recall', fn: (e: FriendRecall) => Prevent): this
  /**
   * 群内提示事件
   */
  on(type: 'notice.notify', fn: (e: GroupNotify) => Prevent): this
  /**
   * 群成员名片更新
   */
  on(type: 'notice.group_card', fn: (e: GroupCard) => Prevent): this
  /**
   * 接收到离线文件
   */
  on(type: 'notice.offline_file', fn: (e: OfflineFile) => Prevent): this
  /**
   * 加好友请求
   */
  on(type: 'request.friend', fn: (e: Friend) => Prevent): this
  /**
   * 加群请求/邀请
   */
  on(type: 'request.group', fn: (e: Group) => Prevent): this
  /**
   * 其他客户端在线状态变更
   */
  on(type: 'notice.client_status', fn: (e: ClientStatus) => Prevent): this
  /**
   * 精华消息
   */
  on(type: 'notice.essence', fn: (e: Essence) => Prevent): this
  /**
   * 心跳事件
   */
  on(type: 'meta_event.heartbeat', fn: (e?: any) => Prevent): this
  /**
   * 其它事件
   */
  on(type: string, fn: (e: any) => Prevent): this
  on(type: string, fn: (e: any) => Prevent, log?: boolean) {
    this.Bot.Conn.addEvent(type, fn, log)
    return this
  }

  sendEvent: {
    group: ((group_id: number, message: Message) => Prevent)[]
    private: ((user_id: number, message: Message) => Prevent)[]
  } = {
    group: [],
    private: []
  }

  /**
   * 发送消息完成事件
   */
  onSendMessage(type: 'sendPrivateMsg', fn: (user_id: number, message: Message) => void): this
  onSendMessage(type: 'sendGroupMsg', fn: (group_id: number, message: Message) => void): this
  onSendMessage(type: 'sendPrivateMsg' | 'sendGroupMsg', fn: any) {
    if (type === 'sendGroupMsg') {
      this.sendEvent.group.push(fn)
    }
    if (type === 'sendPrivateMsg') {
      this.sendEvent.private.push(fn)
    }
    return this
  }
}
