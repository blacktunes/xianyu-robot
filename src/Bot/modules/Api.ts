import { red, white, yellow } from 'colors'
import { Device, EssenceMsg, GroupInfo, HonorInfo, HonorItem, HonorType, ImageInfo, MemberInfo, Message, Msg, NodeMessage, PrivateSender, QQInfo, Status, VersionInfo } from '../../Type'
import { Bot } from '../Bot'

export class Api {
  constructor(bot: Bot) {
    this.Bot = bot
  }

  private Bot: Omit<Bot, 'Api'>

  getApiStatus(): void {
    this.Bot.Conn.useAPI('get_status')
      .then(result => {
        if (result.status !== 'ok') {
          this.Bot.Log.logError('心跳链接异常', 'WS')
        }
      })
      .catch(() => {
        this.Bot.Log.logError('心跳链接异常', 'WS')
      })
  }

  /**
   * 发送私聊消息
   * @param {number} user_id 对方 QQ 号
   * @param {Message} message 要发送的内容，支持纯文本和数组格式
   * @param {boolean} auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
   * @returns {Promise<number>} 成功返回message_id，失败返回retcode(100)
   */
  async sendPrivateMsg(user_id: number, message: Message, auto_escape: boolean = false): Promise<number> {
    const logMsg = JSON.stringify(message)
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`发送消息至(${user_id}): ${logMsg}`)
      return 0
    }

    const result = await this.Bot.Conn.useAPI('send_private_msg', {
      user_id,
      message,
      auto_escape
    })

    for (const i in this.Bot.Event.sendEvent.private) {
      if (await (this.Bot.Event.sendEvent.private[i])(user_id, message)) break
    }

    const name = white(this.Bot.Data.friendList[user_id] || '')

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`发送消息至 ${name}(${white(user_id.toString())}): ${white(logMsg)} (${white(result.data.message_id.toString())})`, 'API')
      return result.data.message_id
    } else {
      this.Bot.Log.logError(`发送消息至 ${name}(${white(user_id.toString())}): ${white(logMsg)} 失败 (${result.retcode})`, 'API')
      return result.retcode
    }
  }

  /**
   * 发送群消息
   * @param {number} group_id 群号
   * @param {Message} message 要发送的内容，支持纯文本和数组格式
   * @param {boolean} auto_escape 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
   * @returns 成功返回message_id，失败返回retcode(100)
   */
  async sendGroupMsg(group_id: number, message: Message, auto_escape: boolean = false): Promise<number> {
    const logMsg = JSON.stringify(message)
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`发送消息至群(${group_id}): ${logMsg}`)
      return 0
    }

    const result = await this.Bot.Conn.useAPI('send_group_msg', {
      group_id,
      message,
      auto_escape
    })

    for (const i in this.Bot.Event.sendEvent.group) {
      if (await (this.Bot.Event.sendEvent.group[i])(group_id, message)) break
    }

    const group_name = white(this.Bot.Data.groupList[group_id] || '')

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`发送消息至群 ${group_name}(${white(group_id.toString())}): ${white(logMsg)} (${result.data.message_id})`, 'API')
      return result.data.message_id
    } else {
      this.Bot.Log.logError(`发送消息至群 ${group_name}(${white(group_id.toString())}): ${white(logMsg)} 失败 (${result.retcode})`, 'API')
      return result.retcode
    }
  }

  /**
   * 发送合并转发(群)
   * @param group_id 群号
   * @param messages 自定义转发消息
   */
  async sendGroupForwardMsg(group_id: number, messages: NodeMessage[]): Promise<number> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`发送合并转发至群(${group_id})`)
      return 0
    }

    const result = await this.Bot.Conn.useAPI('send_group_forward_msg', {
      group_id,
      messages
    })

    for (const i in this.Bot.Event.sendEvent.group) {
      if (await (this.Bot.Event.sendEvent.group[i])(group_id, '')) break
    }

    const group_name = white(this.Bot.Data.groupList[group_id] || '')

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`发送合并转发至群 ${group_name}(${white(group_id.toString())})成功(${white(result.data.message_id.toString())})`, 'API')
      return result.data.message_id
    } else {
      this.Bot.Log.logError(`发送合并转发至群 ${group_name}(${white(group_id.toString())})失败`, 'API')
      return result.retcode
    }
  }

  /**
   * 撤回信息(仅对群消息有效)
   * @param message_id 消息 ID
   */
  deleteMsg(message_id: number): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`撤回信息 (${message_id})`)
    }

    this.Bot.Conn.useAPI('delete_msg', {
      message_id
    })

    this.Bot.Log.logInfo(`撤回信息 (${yellow(message_id.toString())})`, 'API')
  }

  /**
   * 获取消息
   * @param message_id 消息 ID
   */
  async getMsg(message_id: number | string): Promise<Msg | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取消息 (${message_id})`)
      return {
        message_id: 1,
        real_id: 1,
        sender: {
          user_id: 1,
          nickname: 'test',
          sex: 'unknown',
          age: 0,
          card: 'test',
          area: '',
          level: '',
          role: 'member',
          title: ''
        },
        time: Date.now(),
        message: 'test',
        raw_message: 'test'
      }
    }

    const result = await this.Bot.Conn.useAPI('get_msg', {
      message_id
    })

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取消息 (${white(message_id.toString())}) 成功`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取消息 (${white(message_id.toString())}) 失败`, 'API')
    }
  }

  /**
   * 获取合并转发内容
   * @param message_id 消息 ID
   */
  async getForwardMsg(message_id: number): Promise<Message[] | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取合并转发内容 ${message_id}`)
      return []
    }

    const result = await this.Bot.Conn.useAPI('get_forward_msg', {
      message_id
    })

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取合并转发内容 (${white(message_id.toString())}) 成功`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取合并转发内容 (${white(message_id.toString())}) 失败`, 'API')
    }
  }

  /**
   * 获取.image文件的图片信息
   * @param file 图片缓存文件名
   */
  async getImage(file: string): Promise<ImageInfo | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取图片信息 (${file})`)
      return {
        size: 0,
        filename: 'test',
        url: ''
      }
    }

    const result = await this.Bot.Conn.useAPI('get_image', {
      file
    })

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取图片 (${white(file)}) 信息成功`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取图片 (${white(file)}) 信息失败`, 'API')
    }
  }

  /**
   * 群组踢人
   * @param group_id 群号
   * @param user_id 要踢的 QQ 号
   * @param reject_add_request 拒绝此人的加群请求
   */
  setGroupKick(group_id: number, user_id: number, reject_add_request = false): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`将 (${group_id}) - (${user_id}) 移出群聊`)
    }

    this.Bot.Conn.useAPI('set_group_kick', {
      group_id,
      user_id,
      reject_add_request
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''
    const user_name = this.Bot.Data.groupMemberList[group_id] ? this.Bot.Data.groupMemberList[group_id][user_id] || '' : ''

    this.Bot.Log.logInfo(`将 ${yellow(group_name)}(${yellow(group_id.toString())}) - ${yellow(user_name)}(${yellow(user_id.toString())}) 移出群聊`, 'API')
  }

  /**
   * 群组单人禁言
   * @param group_id 群号
   * @param user_id 要禁言的 QQ 号
   * @param duration 禁言时长，单位秒，0 表示取消禁言
   */
  setGroupBan(group_id: number, user_id: number, duration = 60 * 30): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`${duration === 0 ? '解除' : '禁言'} (${group_id}) - (${user_id}) ${duration === 0 ? '禁言' : `${duration.toString()}秒`}`)
    }

    this.Bot.Conn.useAPI('set_group_ban', {
      group_id,
      user_id,
      duration
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''
    const user_name = this.Bot.Data.groupMemberList[group_id] ? this.Bot.Data.groupMemberList[group_id][user_id] || '' : ''

    this.Bot.Log.logInfo(`${duration === 0 ? '解除' : '禁言'} ${yellow(group_name)}(${yellow(group_id.toString())}) - ${yellow(user_name)}(${yellow(user_id.toString())}) ${duration === 0 ? '禁言' : `${yellow(duration.toString())}秒`}`, 'API')
  }

  /**
   * 群组匿名用户禁言
   * @param group_id 群号
   * @param anonymous_flag 要禁言的匿名用户的 flag（需从群消息上报的数据中获得）
   * @param duration 禁言时长, 单位秒, 无法取消匿名用户禁言
   */
  setGroupAnonymousBan(group_id: number, anonymous_flag: string, duration: number = 30 * 60): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`禁言 (${group_id}) - 匿名用户 ${duration}秒`)
    }

    this.Bot.Conn.useAPI('set_group_anonymous_ban', {
      group_id,
      anonymous_flag,
      duration
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''

    this.Bot.Log.logInfo(`禁言 ${yellow(group_name)}(${yellow(group_id.toString())}) - 匿名用户 ${yellow(duration.toString())}秒`, 'API')
  }

  /**
   * 群组全员禁言
   * @param group_id 	群号
   * @param enable 是否禁言
   */
  setGroupWholeBan(group_id: number, enable = true): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`${enable ? '设置' : '解除'}群 (${group_id}) 禁言`)
    }

    this.Bot.Conn.useAPI('set_group_whole_ban', {
      group_id,
      enable
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''

    this.Bot.Log.logInfo(`${yellow(enable ? '设置' : '解除')}群 ${yellow(group_name)}(${yellow(group_id.toString())}) 禁言`, 'API')
  }

  /**
   * 群组设置管理员
   * @param group_id 群号
   * @param user_id 要设置管理员的 QQ 号
   * @param enable true 为设置, false 为取消
   */
  setGroupAdmin(group_id: number, user_id: number, enable: boolean = true): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`${enable ? '设置' : '取消'}管理员 (${group_id}) - (${user_id})`)
    }

    this.Bot.Conn.useAPI('set_group_admin', {
      group_id,
      user_id,
      enable
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''
    const user_name = this.Bot.Data.groupMemberList[group_id] ? this.Bot.Data.groupMemberList[group_id][user_id] || '' : ''


    this.Bot.Log.logInfo(`${enable ? '设置' : '取消'}管理员 ${yellow(group_name)}(${yellow(group_id.toString())}) - ${yellow(user_name)}(${yellow(user_id.toString())})`, 'API')
  }

  /**
   * 设置群名片（群备注）
   * @param group_id 群号
   * @param user_id 要设置的 QQ 号
   * @param card 群名片内容，不填或空字符串表示删除群名片
   */
  setGroupCard(group_id: number, user_id: number, card: string): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`设置 (${group_id}) - (${user_id}) 群名片为 ${card || '空'}`)
    }
    this.Bot.Conn.useAPI('set_group_card', {
      group_id,
      user_id,
      card
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''
    const user_name = this.Bot.Data.groupMemberList[group_id] ? this.Bot.Data.groupMemberList[group_id][user_id] || '' : ''


    this.Bot.Log.logInfo(`设置 ${yellow(group_name)}(${yellow(group_id.toString())}) - ${yellow(user_name)}(${yellow(user_id.toString())}) 群名片为 ${card || '空'}`, 'API')
  }

  /**
   * 设置群组名
   * @param group_id 群号
   * @param group_name 新群名
   */
  setGroupName(group_id: number, group_name: string): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`设置 (${group_id}) 群名为 ${group_name}`)
    }

    this.Bot.Conn.useAPI('set_group_name', {
      group_id,
      group_name
    })

    const name = this.Bot.Data.groupList[group_id] || ''

    this.Bot.Log.logInfo(`设置 ${yellow(name)}(${yellow(group_id.toString())}) 群名为 ${yellow(group_name)}`, 'API')
  }

  /**
   * 退出群组
   * @param group_id 群号
   * @param is_dismiss 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散
   */
  setGroupLeave(group_id: number, is_dismiss = false): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`${is_dismiss ? '解散' : '退出'}群组 (${group_id})`)
    }

    this.Bot.Conn.useAPI('set_group_leave', {
      group_id,
      is_dismiss
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''

    this.Bot.Log.logInfo(`${yellow(is_dismiss ? '解散' : '退出')}群组 ${yellow(group_name)}(${yellow(group_id.toString())})`, 'API')
  }

  /**
   * 设置群组专属头衔
   * @param group_id 群号
   * @param user_id 要设置的 QQ 号
   * @param special_title 专属头衔，不填或空字符串表示删除专属头衔
   * @param duration 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试
   */
  setGroupSpecialTitle(group_id: number, user_id: number, special_title: string, duration: number = -1): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`设置 (${group_id}) - (${user_id}) 专属头衔为 ${special_title}`)
    }

    this.Bot.Conn.useAPI('set_group_special_title', {
      group_id,
      user_id,
      special_title,
      duration
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''
    const user_name = this.Bot.Data.groupMemberList[group_id] ? this.Bot.Data.groupMemberList[group_id][user_id] || '' : ''

    this.Bot.Log.logInfo(`设置 ${yellow(group_name)}(${yellow(group_id.toString())}) - ${yellow(user_name)}(${yellow(user_id.toString())}) 专属头衔为 ${yellow(special_title)}`, 'API')
  }

  /**
   * 处理加好友请求
   * @param flag 加好友请求的 flag（需从上报的数据中获得）
   * @param approve 是否同意请求
   * @param remark 添加后的好友备注（仅在同意时有效）
   */
  setFriendAddRequest(flag: string, approve: boolean, remark: string): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`${approve ? '同意' : '拒绝'}好友请求`)
    }
    this.Bot.Conn.useAPI('set_friend_add_request', {
      flag,
      approve,
      remark
    })

    this.Bot.Log.logInfo(`${yellow(approve ? '同意' : '拒绝')}好友请求`, 'API')
  }

  /**
   * 处理加群请求／邀请
   * @param flag 	加群请求的 flag（需从上报的数据中获得）
   * @param sub_type 	add 或 invite，请求类型（需要和上报消息中的 sub_type 字段相符）
   * @param approve 是否同意请求／邀请
   * @param reason 拒绝理由（仅在拒绝时有效）
   */
  setGroupAddRequest(flag: string, sub_type: 'add' | 'invite', approve = true, reason: string): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`${approve ? '同意' : '拒绝'}加群${sub_type === 'invite' ? '邀请' : '请求'}`)
    }
    this.Bot.Conn.useAPI('set_group_add_request', {
      flag,
      sub_type,
      approve,
      reason
    })

    this.Bot.Log.logInfo(`${yellow(approve ? '同意' : '拒绝')}加群${sub_type === 'invite' ? '邀请' : '请求'}`, 'API')
  }

  /**
   * 获取登录号信息
   */
  async getLoginInfo(): Promise<{
    /**
     * QQ 号
     */
    user_id: number
    /**
     * QQ 昵称
     */
    nickname: string
  }> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug('获取登录号信息')
      return {
        user_id: 1,
        nickname: ''
      }
    }

    const result = await this.Bot.Conn.useAPI('get_login_info')

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取登录号信息成功 ${white(result.data.nickname)}(${white(result.data.user_id)})`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取登录号信息失败`, 'API')
      return {
        user_id: 1,
        nickname: ''
      }
    }
  }

  /**
   * 获取陌生人信息
   * @param user_id QQ 号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
   */
  async getStrangerInfo(user_id: number, no_cache: boolean = false): Promise<(PrivateSender & { qid?: number }) | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取 (${user_id}) 信息`)
      return {
        user_id: 1,
        nickname: 'test',
        sex: 'unknown',
        age: 0
      }
    }

    const result = await this.Bot.Conn.useAPI('get_stranger_info', {
      user_id,
      no_cache
    })

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取 (${white(user_id.toString())}) 信息成功`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取 (${white(user_id.toString())}) 信息失败`, 'API')
    }
  }

  /**
   * 获取好友列表
   */
  async getFriendList(): Promise<QQInfo[]> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug('获取好友列表')
      return []
    }

    const result = await this.Bot.Conn.useAPI('get_friend_list')

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取好友列表成功 好友数：${white(result.data.length)}`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取好友列表失败`, 'API')
      return []
    }
  }

  /**
   * 获取群信息
   * @param group_id 群号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
   */
  async getGroupInfo(group_id: number, no_cache = false): Promise<GroupInfo | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取群 (${group_id}) 信息`)
      return {
        group_id: 1,
        group_name: 'test',
        group_memo: '',
        group_create_time: Date.now(),
        group_level: 0,
        member_count: 1,
        max_member_count: 1
      }
    }

    const result = await this.Bot.Conn.useAPI('get_group_info', {
      group_id,
      no_cache
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取群 ${white(group_name)}(${white(group_id.toString())}) 信息成功`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取群 ${white(group_name)}(${white(group_id.toString())}) 信息失败`, 'API')
    }
  }

  /**
   * 获取群列表
   */
  async getGroupList(): Promise<GroupInfo[]> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug('获取群列表')
      return []
    }

    const result = await this.Bot.Conn.useAPI('get_group_list')

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取群列表成功 群组数：${white(result.data.length)}`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取群列表失败`, 'API')
      return []
    }
  }

  /**
   * 获取群成员信息
   * @param group_id 群号
   * @param user_id QQ 号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
   */
  async getGroupMemberInfo(group_id: number, user_id: number, no_cache = false): Promise<MemberInfo | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取群成员 (${group_id}) - (${user_id}) 信息`)
      return {
        group_id: 1,
        user_id: 1,
        nickname: 'test',
        card: 'test',
        sex: 'unknown',
        age: 0,
        area: '',
        join_time: 0,
        last_sent_time: 0,
        level: '',
        role: '',
        unfriendly: false,
        title: '',
        title_expire_time: 0,
        card_changeable: false
      }
    }

    const result = await this.Bot.Conn.useAPI('get_group_member_info', {
      group_id,
      user_id,
      no_cache
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''
    const user_name = this.Bot.Data.groupMemberList[group_id] ? this.Bot.Data.groupMemberList[group_id][user_id] || '' : ''

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取群成员 ${white(group_name)}(${white(group_id.toString())}) - ${white(user_name)}(${white(user_id.toString())}) 信息成功`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取群成员 ${white(group_name)}(${white(group_id.toString())}) - ${white(user_name)}(${white(user_id.toString())}) 信息失败`, 'API')
    }
  }

  /**
   * 获取群成员列表
   * @param group_id 群号
   */
  async getGroupMemberList(group_id: number): Promise<MemberInfo[]> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取群 (${group_id}) 成员列表`)
      return []
    }

    const result = await this.Bot.Conn.useAPI('get_group_member_list', {
      group_id
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取群 ${white(group_name)}(${white(group_id.toString())}) 成员列表成功 群员数：${white(result.data.length)}`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取群 ${white(group_name)}(${white(group_id.toString())}) 成员列表失败`, 'API')
      return []
    }
  }

  /**
   * 获取群荣誉信息
   * @param group_id 群号
   * @param type 要获取的群荣誉类型, 可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据, 或传入 all 获取所有数据
   */
  async getGroupHonorInfo<T extends HonorType>(group_id: number, type: T): Promise<(HonorInfo & HonorItem[T]) | undefined> {
    if (this.Bot.Debug.debug) {
      const group = {
        group_id: 1
      }
      const talkative = {
        current_talkative: {
          user_id: 1,
          nickname: 'test',
          avatar: '',
          day_count: 0
        },
        talkative_list: []
      }
      const performer = {
        performer_list: []
      }
      const legend = {
        legend_list: []
      }
      const strong_newbie = {
        strong_newbie_list: []
      }
      const emotion = {
        emotion_list: []
      }
      this.Bot.Log.logDebug(`获取群 (${group_id}) 荣誉信息`)
      if (type === 'talkative') {
        return { ...group, ...talkative } as any
      }
      if (type === 'performer') {
        return { ...group, ...performer } as any
      }
      if (type === 'legend') {
        return { ...group, ...legend } as any
      }
      if (type === 'strong_newbie') {
        return { ...group, ...strong_newbie } as any
      }
      if (type === 'emotion') {
        return { ...group, ...emotion } as any
      }
      if (type === 'performer') {
        return { ...group, ...talkative, ...performer, ...legend, ...strong_newbie, ...emotion } as any
      }
    }

    const result = await this.Bot.Conn.useAPI('get_group_honor_info', {
      group_id,
      type
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取群 ${white(group_name)}(${white(group_id.toString())}) 成荣誉信息成功`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取群 ${white(group_name)}(${white(group_id.toString())}) 成荣誉信息失败`, 'API')
    }
  }

  /**
   * 获取版本信息
   */
  async getVersionInfo(): Promise<VersionInfo | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug('获取版本信息')
    }

    const result = await this.Bot.Conn.useAPI('get_version_info')

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend('获取版本信息成功', 'API')
      return result.data
    } else {
      this.Bot.Log.logError('获取版本信息失败', 'API')
    }
  }

  /**
   * 获取运行状态
   */
  async getStatus(): Promise<Status | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug('获取运行状态')
    }

    const result = await this.Bot.Conn.useAPI('get_status')

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend('获取运行状态成功', 'API')
      return result.data
    } else {
      this.Bot.Log.logError('获取运行状态失败', 'API')
    }
  }

  /**
   * 获取群 @全体成员 剩余次数
   * @param group_id 群号
   */
  async getGroupAtAllRemain(group_id: number): Promise<{
    /**
     * 是否可以 @全体成员
     */
    can_at_all: boolean
    /**
     * 群内所有管理当天剩余 @全体成员 次数
     */
    remain_at_all_count_for_group: number
    /**
     * 当天剩余 @全体成员 次数
     */
    remain_at_all_count_for_uin: number
  } | undefined> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取群 (${group_id}) @全体成员 剩余次数`)
    }

    const result = await this.Bot.Conn.useAPI('get_group_at_all_remain', {
      group_id
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''


    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取群 ${white(group_name)}(${white(group_id.toString())}) @全体成员 剩余次数成功 剩余次数: ${white(result.data.remain_at_all_count_for_uin)}`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取群 ${white(group_name)}(${white(group_id.toString())}) @全体成员 剩余次数失败`, 'API')
    }
  }

  /**
   * 获取当前账号在线客户端列表
   * @param no_cache 是否无视缓存
   */
  async getOnlineClients(no_cache: boolean = false): Promise<{ clients: Device[] }> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug('获取当前账号在线客户端列表')
      return { clients: [] }
    }

    const result = await this.Bot.Conn.useAPI('get_online_clients', {
      no_cache
    })

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取当前账号在线客户端列表成功 在线数: ${white(result.data.clients.length)}`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError('获取当前账号在线客户端列表失败', 'API')
      return { clients: [] }
    }
  }

  /**
   * 获取群消息历史记录
   * @param group_id 群号
   * @param message_seq 起始消息序号, 可通过 get_msg 获得
   */
  async getGroupMsgHistory(group_id: number, message_seq?: number): Promise<{ messages: Message[] }> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug('获取群消息历史记录')
      return { messages: [] }
    }

    const result = await this.Bot.Conn.useAPI('get_group_msg_history', {
      group_id,
      message_seq
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取群 ${white(group_name)}(${white(group_id.toString())}) 消息历史记录成功`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取群 ${white(group_name)}(${white(group_id.toString())}) 消息历史记录失败`, 'API')
      return { messages: [] }
    }
  }

  /**
   * 设置精华消息
   * @param message_id 消息ID
   */
  setEssenceMsg(message_id: number): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`设置 (${message_id}) 为精华消息`)
    }

    this.Bot.Conn.useAPI('set_essence_msg', {
      message_id
    })

    this.Bot.Log.logInfo(`设置 (${yellow(message_id.toString())}) 为精华消息`, 'API')
  }

  /**
   * 移出精华消息
   * @param message_id 消息ID
   */
  deleteEssenceMsg(message_id: number): void {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`取消 (${message_id}) 精华消息`)
    }

    this.Bot.Conn.useAPI('delete_essence_msg', {
      message_id
    })

    this.Bot.Log.logInfo(`取消 (${yellow(message_id.toString())}) 精华消息`, 'API')
  }

  /**
   * 获取精华消息列表
   * @param group_id 群号
   */
  async getEssenceMsgList(group_id: number): Promise<EssenceMsg[]> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`获取群 (${group_id}) 精华消息列表`)
      return []
    }

    const result = await this.Bot.Conn.useAPI('get_essence_msg_list', {
      group_id
    })

    const group_name = this.Bot.Data.groupList[group_id] || ''

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`获取群 ${white(group_name)}(${white(group_id.toString())}) 精华消息列表成功 消息数: ${white(result.data.length)}`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`获取群 ${white(group_name)}(${white(group_id.toString())}) 精华消息列表失败`, 'API')
      return []
    }
  }

  /**
   * 检查链接安全性
   * 1. 安全 2. 未知 3. 危险
   * @param url 需要检查的链接
   */
  async checkUrlSafely(url: string): Promise<{ level: 1 | 2 | 3 }> {
    if (this.Bot.Debug.debug) {
      this.Bot.Log.logDebug(`检查 (${url}) 安全性`)
      return { level: 2 }
    }

    const result = await this.Bot.Conn.useAPI('check_url_safely', {
      url
    })

    if (result.status === 'ok') {
      this.Bot.Log.logInfoSend(`检查 (${white(url)}) 安全性成功 结果: ${result.data.level === 1 ? '安全' : result.data.level === 3 ? red('危险') : yellow('未知')}`, 'API')
      return result.data
    } else {
      this.Bot.Log.logError(`检查 (${white(url)}) 安全性失败`, 'API')
      return { level: 2 }
    }
  }
}
