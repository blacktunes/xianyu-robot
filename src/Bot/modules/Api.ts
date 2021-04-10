import { emitter } from '../../Tools/Emitter'
import { PrintLog } from '../../Tools/PrintLog'
import { GroupInfo, ImageInfo, MemberInfo, Message, QQInfo } from '../../Type'
import { NodeMessage } from '../../Type/Message'
import { Bot } from '../Bot'
import colors = require('colors')

export class Api {
  /**
   * @param {boolean} [debug=false] 调试模式
   */
  constructor(bot: Bot) {
    this.Bot = bot
  }

  private Bot: Bot

  readonly getApiStatus = async () => {
    try {
      const result = await this.Bot.Conn.useAPI('get_status')
      if (result.status !== 'ok') {
        PrintLog.logError('心跳链接异常', 'API')
      }
    } catch (error) {
      PrintLog.logError('心跳链接异常', 'API')
    }
  }

  /**
   * 发送私聊消息
   * @param {number} user_id 对方 QQ 号
   * @param {Message} message 要发送的内容，支持纯文本和数组格式
   * @returns {Promise<number>} 成功返回message_id，失败返回retcode
   */
  readonly sendPrivateMsg = async (user_id: number, message: Message): Promise<number> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug(`发送消息至(${user_id}): ${JSON.stringify(message)}`)
      return 0
    }
    const result = await this.Bot.Conn.useAPI('send_private_msg', {
      user_id,
      message
    })
    emitter.emit('sendPrivateMsg', user_id, message)
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`发送消息至(${colors.white(user_id.toString())}): ${colors.white(JSON.stringify(message))} (${colors.white(result.data.message_id.toString())})`, 'API')
      return result.data.message_id
    } else {
      PrintLog.logError(`发送消息至(${colors.white(user_id.toString())}): ${colors.white(JSON.stringify(message))} 失败 (${result.retcode})`, 'API')
      return result.retcode
    }
  }

  /**
   * 发送群消息
   * @param {number} group_id 群号
   * @param {Message} message 要发送的内容，支持纯文本和数组格式
   * @returns 成功返回message_id，失败返回retcode
   */
  readonly sendGroupMsg = async (group_id: number, message: Message): Promise<number> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug(`发送消息至群(${group_id}): ${JSON.stringify(message)}`)
      return 0
    }
    const result = await this.Bot.Conn.useAPI('send_group_msg', {
      group_id,
      message
    })
    emitter.emit('sendGroupMsg', group_id, message)
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`发送消息至群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())}): ${colors.white(JSON.stringify(message))} (${result.data.message_id})`, 'API')
      return result.data.message_id
    } else {
      PrintLog.logError(`发送消息至群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())}): ${colors.white(JSON.stringify(message))} 失败 (${result.retcode})`, 'API')
      return result.retcode
    }
  }

  /**
   * 发送合并转发(群)
   * @param group_id 群号
   * @param messages 自定义转发消息
   */
  readonly sendGroupForwardMsg = async (group_id: number, messages: NodeMessage[]): Promise<number> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug(`发送合并转发至群(${group_id})`)
      return 0
    }
    const result = await this.Bot.Conn.useAPI('send_group_forward_msg', {
      group_id,
      messages
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`发送合并转发至群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})成功(${colors.white(result.data.message_id.toString())})`, 'API')
      return result.data.message_id
    } else {
      PrintLog.logError(`发送合并转发至群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})失败`, 'API')
      return result.retcode
    }
  }

  /**
   * 获取登录号信息
   */
  readonly getLoginInfo = async (): Promise<{
    /**
     * QQ 号
     */
    user_id: number
    /**
     * QQ 昵称
     */
    nickname: string
  }> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('获取登录号信息')
      return {
        user_id: 10001,
        nickname: ''
      }
    }
    const result = await this.Bot.Conn.useAPI('get_login_info')
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`获取登录号信息成功 ${colors.white(result.data.nickname)}(${colors.white(result.data.user_id)})`, 'API')
      return result.data
    } else {
      PrintLog.logError(`获取登录号信息失败`, 'API')
      return {
        user_id: undefined,
        nickname: undefined
      }
    }
  }

  /**
   * 获取好友列表
   */
  readonly getFriendList = async (): Promise<QQInfo[]> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('获取好友列表')
      return []
    }
    const result = await this.Bot.Conn.useAPI('get_friend_list')
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`获取好友列表成功 好友数：${colors.white(result.data.length)}`, 'API')
      return result.data
    } else {
      PrintLog.logError(`获取好友列表失败`, 'API')
      return []
    }
  }

  /**
   * 获取群列表
   */
  readonly getGroupList = async (): Promise<GroupInfo[]> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('获取群列表')
      return []
    }
    const result = await this.Bot.Conn.useAPI('get_group_list')
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`获取群列表成功 群组数：${colors.white(result.data.length)}`, 'API')
      return result.data
    } else {
      PrintLog.logError(`获取群列表失败`, 'API')
      return []
    }
  }

  /**
   * 获取群信息
   * @param group_id 群号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
   * @param name 输出日志备注名字
   */
  readonly getGroupInfo = async (group_id: number, no_cache = false, name?: string): Promise<GroupInfo> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug(`获取${name || '群'}信息`)
      return {
        group_id: 10001,
        group_name: 'test',
        member_count: 1,
        max_member_count: 1
      }
    }
    const result = await this.Bot.Conn.useAPI('get_group_info', {
      group_id,
      no_cache
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`获取${name ? colors.white(name) : '群'}(${colors.white(group_id.toString())})信息成功`, 'API')
      return result.data
    } else {
      PrintLog.logError(`获取${name ? colors.white(name) : '群'}(${colors.white(group_id.toString())})信息失败`, 'API')
      return new GroupInfo
    }
  }

  /**
   * 获取群成员列表
   * @param group_id 群号
   * @param name 输出日志备注名字
   */
  readonly getGroupMemberList = async (group_id: number): Promise<MemberInfo[]> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug(`获取群成员列表`)
      return []
    }
    const result = await this.Bot.Conn.useAPI('get_group_member_list', {
      group_id
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`获取群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})成员列表成功 群员数：${colors.white(result.data.length)}`, 'API')
      return result.data
    } else {
      PrintLog.logError(`获取群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})成员列表失败`, 'API')
      return []
    }
  }

  /**
   * 获取群成员信息
   * @param group_id 群号
   * @param user_id QQ 号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
   */
  readonly getGroupMemberInfo = async (group_id: number, user_id: number, no_cache = false): Promise<MemberInfo> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('获取群成员信息')
      return {
        group_id: 10001,
        user_id: 10001,
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
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`获取群成员(${colors.white(group_id.toString())}) - (${colors.white(user_id.toString())})信息成功`, 'API')
      return result.data
    } else {
      PrintLog.logError(`获取群成员(${colors.white(group_id.toString())}) - (${colors.white(user_id.toString())})信息`, 'API')
      return new MemberInfo
    }
  }

  /**
   * 撤回信息
   * @param message_id 群号
   */
  readonly deleteMsg = async (message_id: number): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('撤回信息')
      return true
    }
    const result = await this.Bot.Conn.useAPI('delete_msg', {
      message_id
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`撤回信息(${colors.white(message_id.toString())})成功`, 'API')
      return true
    } else {
      PrintLog.logError(`撤回信息(${colors.white(message_id.toString())})失败`, 'API')
      return false
    }
  }

  /**
   * 处理加好友请求
   * @param flag 加好友请求的 flag（需从上报的数据中获得）
   * @param approve 是否同意请求
   * @param remark 添加后的好友备注（仅在同意时有效）
   */
  readonly setFriendAddRequest = async (flag: string, approve: boolean, remark: string): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('处理加好友请求')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_friend_add_request', {
      flag,
      approve,
      remark
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend('处理加好友请求成功', 'API')
      return true
    } else {
      PrintLog.logError('处理加好友请求失败', 'API')
      return false
    }
  }

  /**
   * 处理加群请求／邀请
   * @param flag 	加群请求的 flag（需从上报的数据中获得）
   * @param sub_type 	add 或 invite，请求类型（需要和上报消息中的 sub_type 字段相符）
   * @param approve 是否同意请求／邀请
   * @param reason 拒绝理由（仅在拒绝时有效）
   */
  readonly setGroupAddRequest = async (flag: string, sub_type: 'add' | 'invite', approve = true, reason: string): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('处理加群请求／邀请')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_group_add_request', {
      flag,
      sub_type,
      approve,
      reason
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend('处理加群请求／邀请成功', 'API')
      return true
    } else {
      PrintLog.logError('处理加群请求／邀请失败', 'API')
      return false
    }
  }

  /**
   * 设置群名片（群备注）
   * @param group_id 群号
   * @param user_id 要设置的 QQ 号
   * @param card 群名片内容，不填或空字符串表示删除群名片
   */
  readonly setGroupCard = async (group_id: number, user_id: number, card: string): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('设置群名片（群备注）')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_group_card', {
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend('设置群名片（群备注）成功', 'API')
      return true
    } else {
      PrintLog.logError('设置群名片（群备注）失败', 'API')
      return false
    }
  }

  /**
   * 设置群组专属头衔
   * @param group_id 群号
   * @param user_id 要设置的 QQ 号
   * @param special_title 专属头衔，不填或空字符串表示删除专属头衔
   * @param duration 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试
   */
  readonly setGroupSpecialTitle = async (group_id: number, user_id: number, special_title: string, duration: number = -1): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('设置群组专属头衔')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_group_special_title', {
      group_id,
      user_id,
      special_title,
      duration
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`设置(${colors.white(group_id.toString())}) - (${colors.white(user_id.toString())})专属头衔为${colors.white(special_title)}`, 'API')
      return true
    } else {
      PrintLog.logError(`设置(${colors.white(group_id.toString())}) - (${colors.white(user_id.toString())})专属头衔失败`, 'API')
      return false
    }
  }

  /**
   * 群组踢人
   * @param group_id 群号
   * @param user_id 要踢的 QQ 号
   * @param reject_add_request 拒绝此人的加群请求
   */
  readonly setGroupKick = async (group_id: number, user_id: number, reject_add_request = false): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('群组踢人')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_group_kick', {
      group_id,
      user_id,
      reject_add_request
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`(${colors.white(group_id.toString())}) - (${colors.white(user_id.toString())})已被移出群聊`, 'API')
      return true
    } else {
      PrintLog.logError(`无法将(${colors.white(group_id.toString())}) - (${colors.white(user_id.toString())})移出群聊`, 'API')
      return false
    }
  }

  /**
   * 群组单人禁言
   * @param group_id 群号
   * @param user_id 要禁言的 QQ 号
   * @param duration 禁言时长，单位秒，0 表示取消禁言
   */
  readonly setGroupBan = async (group_id: number, user_id: number, duration = 60 * 30): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('群组单人禁言')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_group_ban', {
      group_id,
      user_id,
      duration
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`已将(${colors.white(group_id.toString())}) - (${colors.white(user_id.toString())})禁言${colors.white(duration.toString())}秒`, 'API')
      return true
    } else {
      PrintLog.logError(`(${colors.white(group_id.toString())}) - (${colors.white(user_id.toString())})禁言失败`, 'API')
      return false
    }
  }

  /**
   * 群组全员禁言
   * @param group_id 	群号
   * @param enable 是否禁言
   */
  readonly setGroupWholeBan = async (group_id: number, enable = true): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('群组全员禁言')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_group_whole_ban', {
      group_id,
      enable
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`${enable ? colors.white('设置') : colors.white('关闭')}群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})成功`, 'API')
      return true
    } else {
      PrintLog.logError(`${enable ? colors.white('设置') : colors.white('关闭')}群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})失败`, 'API')
      return false
    }
  }

  /**
   * 退出群组
   * @param group_id 群号
   * @param is_dismiss 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散
   */
  readonly setGroupLeave = async (group_id: number, is_dismiss = false): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('退出群组')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_group_leave', {
      group_id,
      is_dismiss
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`已退出群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})`, 'API')
      return true
    } else {
      PrintLog.logError(`退群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})失败`, 'API')
      return false
    }
  }

  /**
   * 设置群组名
   * @param group_id 群号
   * @param group_name 新群名
   */
  readonly setGroupName = async (group_id: number, group_name: string): Promise<boolean> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('设置群组名')
      return true
    }
    const result = await this.Bot.Conn.useAPI('set_group_name', {
      group_id,
      group_name
    })
    if (result.status === 'ok') {
      PrintLog.logInfoSend(`群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})名已设置为${colors.white(group_name)}`, 'API')
      return true
    } else {
      PrintLog.logError(`设置群${colors.white(this.Bot.Data.groupList[group_id] || '')}(${colors.white(group_id.toString())})名失败`, 'API')
      return false
    }
  }

  /**
   * 获取.image文件的图片信息
   * @param file 图片缓存文件名
   */
  readonly getImage = async (file: string): Promise<ImageInfo> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('获取图片信息')
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
      PrintLog.logInfoSend(`获取图片(${colors.white(file)})信息成功`, 'API')
      return result.data
    } else {
      PrintLog.logError(`获取图片(${colors.white(file)})信息失败`, 'API')
      return new ImageInfo
    }
  }

  /**
   * 获取运行状态
   */
  readonly getStatus = async (): Promise<any> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('获取运行状态')
      return {}
    }
    const result = await this.Bot.Conn.useAPI('get_status')
    if (result.status === 'ok') {
      PrintLog.logInfoSend('获取运行状态成功', 'API')
      return result.data
    } else {
      PrintLog.logError('获取运行状态失败', 'API')
      return {}
    }
  }

  /**
   * 获取版本信息
   */
  readonly getVersionInfo = async (): Promise<any> => {
    if (this.Bot.Data.getDebug()) {
      PrintLog.logDebug('获取版本信息')
      return {}
    }
    const result = await this.Bot.Conn.useAPI('get_version_info')
    if (result.status === 'ok') {
      PrintLog.logInfoSend('获取版本信息成功', 'API')
      return result.data
    } else {
      PrintLog.logError('获取版本信息失败', 'API')
      return {}
    }
  }
}
