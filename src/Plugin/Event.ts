import { Bot, BotPlugin, ClientStatus, Essence, Friend, FriendAdd, FriendRecall, Group, GroupAdmin, GroupBan, GroupCard, GroupDecrease, GroupIncrease, GroupMsg, GroupNotify, GroupRecall, GroupUpload, Message, OfflineFile, Prevent, PrivateMsg } from '..'

export class Event {
  constructor(private group: string, private Bot: Bot) { }

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
    const _fn = (e: any) => {
      if (this.group) {
        const plugin = this.Bot.Plugin.getPlugin<BotPlugin>(this.group)
        const blacklist = plugin?.blacklist || {}
        const whitelist = plugin?.whitelist || {}

        if (blacklist.group && blacklist.group.has(e?.group_id)) return
        if (whitelist.group && !whitelist.group.has(e?.group_id)) return

        if (blacklist.user && blacklist.user.has(e?.user_id)) return
        if (whitelist.user && !whitelist.user.has(e?.user_id)) return
        fn(e)
      }
    }
    this.Bot.Conn.addEvent(type, _fn, log)
    return this
  }

  /**
   * 发送消息完成事件
   */
  onSendMessage(type: 'sendPrivateMsg', fn: (user_id: number, message: Message) => void): this
  onSendMessage(type: 'sendGroupMsg', fn: (group_id: number, message: Message) => void): this
  onSendMessage(type: 'sendPrivateMsg' | 'sendGroupMsg', fn: any) {
    const _fn = (e: any) => {
      if (this.group) {
        const plugin = this.Bot.Plugin.getPlugin<BotPlugin>(this.group)
        const blacklist = plugin?.blacklist || {}
        const whitelist = plugin?.whitelist || {}

        if (blacklist.group && blacklist.group.has(e?.group_id)) return
        if (whitelist.group && !whitelist.group.has(e?.group_id)) return

        if (blacklist.user && blacklist.user.has(e?.user_id)) return
        if (whitelist.user && !whitelist.user.has(e?.user_id)) return
        fn(e)
      }
    }
    if (type === 'sendPrivateMsg') {
      this.Bot.Event.sendEvent.group.push(_fn)
    }
    if (type === 'sendPrivateMsg') {
      this.Bot.Event.sendEvent.private.push(_fn)
    }
    return this
  }
}
