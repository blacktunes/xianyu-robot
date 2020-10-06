import { Log, printLog } from '../printLog'
import { CQWS } from './modules/CQWS'
import { CQMessage, GroupInfo, HttpApiInfo, HttpApiStatus, MemberInfo, QQInfo } from './modules/option'
import { getStatus } from './modules/Status'


export class BotApi extends CQWS {
  /**
   * @param {boolean} [debug=false] 调试模式
   */
  constructor(debug: boolean = false) {
    super(debug)
  }

  /**
   * 发送私聊消息
   * @param {number} user_id 对方 QQ 号
   * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容，支持纯文本和数组格式
   * @returns {Promise<number>} 成功返回message_id，失败返回retcode
   */
  async sendPrivateMsg(user_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number> {
      if (this.debug) {
        printLog(`[发送私聊消息] QQID:${user_id} msg:${JSON.stringify(message)}`)
        return 0
      }
      const result = await this.useAPI('send_private_msg', {
        user_id,
        message
      })
      if (result['status'] === 'ok') {
        printLog(`[发送私聊消息] QQID:${user_id} msg:${JSON.stringify(message)}`, Log.INFO_SEND)
        return result['data']['message_id']
      } else {
        printLog(`[发送私聊消息] QQID:${user_id} msg:${JSON.stringify(message)} 执行结果:${getStatus(result['retcode'])}(${result['retcode']})`, Log.ERROR)
        return result['retcode']
      }
  }

  /**
   * 异步发送私聊消息
   * @param {number} user_id 对方 QQ 号
   * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容，支持纯文本和数组格式
   * @returns {Promise<number>} 失败返回retcode
   */
  async sendPrivateMsgAsync(user_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number | 'unknow'> {
    if (this.debug) {
      printLog(`[异步发送私聊消息] QQID:${user_id} msg:${JSON.stringify(message)}`)
      return 'unknow'
    }
    const result = await this.useAPI('send_private_msg_async', {
      user_id,
      message
    })
    if (result['status'] === 'async') {
      printLog(`[异步发送私聊消息] QQID:${user_id} msg:${JSON.stringify(message)}`, Log.INFO_SEND)
      return 'unknow'
    } else {
      printLog(`[异步发送私聊消息] QQID:${user_id} msg:${JSON.stringify(message)} 执行结果:${getStatus(result['retcode'])}(${result['retcode']})`, Log.ERROR)
      return result['retcode']
    }
  }

  /**
   * 发送群消息
   * @param {number} group_id 群号
   * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容，支持纯文本和数组格式
   * @returns 成功返回message_id，失败返回retcode
   */
  async sendGroupMsg(group_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number> {
      if (this.debug) {
        printLog(`[发送群聊消息] 群号:${group_id} msg:${JSON.stringify(message)}`)
        return 0
      }
      const result = await this.useAPI('send_group_msg', {
        group_id,
        message
      })
      if (result['status'] === 'ok') {
        printLog(`[发送群聊消息] 群号:${group_id} msg:${JSON.stringify(message)}`, Log.INFO_SEND)
        return result['data']['message_id']
      } else {
        printLog(`[发送群聊消息] 群号:${group_id} msg:${JSON.stringify(message)} 执行结果:${getStatus(result['retcode'])}(${result['retcode']})`, Log.ERROR)
        return result['retcode']
      }
  }

  /**
   * 异步发送群消息
   * @param {number} group_id 群号
   * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容，支持纯文本和数组格式
   * @returns 失败返回retcode
   */
  async sendGroupMsgAsync(group_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number | 'unknow'> {
    if (this.debug) {
      printLog(`[异步发送群聊消息] 群号:${group_id} msg:${JSON.stringify(message)}`)
      return 'unknow'
    }
    const result = await this.useAPI('send_group_msg_async', {
      group_id,
      message
    })
    if (result['status'] === 'async') {
      printLog(`[异步发送群聊消息] 群号:${group_id} msg:${JSON.stringify(message)}`, Log.INFO_SEND)
      return 'unknow'
    } else {
      printLog(`[异步发送群聊消息] 群号:${group_id} msg:${JSON.stringify(message)} 执行结果:${getStatus(result['retcode'])}(${result['retcode']})`, Log.ERROR)
      return result['retcode']
    }
  }

  /**
   * 撤回消息
   * @param {number} message_id 消息 ID
   */
  async deleteMsg(message_id: number) {
    if (this.debug) {
      printLog(`[撤回消息] 消息ID:${message_id}`)
      return 'test'
    }
    const code = await this.useAPI('delete_msg', {
      message_id
    })
    if (code === 0) {
      printLog(`[撤回消息] 消息ID:${message_id}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[撤回消息] 消息ID:${message_id} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 群组踢人
   * @param {number} group_id 群号
   * @param {number} user_id  要踢的 QQ 号
   * @param {boolean} [reject_add_request=false] 拒绝此人的加群请求
   */
  async setGroupKick(group_id: number, user_id: number, reject_add_request: boolean = false) {
    if (this.debug) {
      printLog(`[群员移除] 群号:${group_id} QQID:${user_id} 拒绝再加群:${reject_add_request}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_kick', {
      group_id,
      user_id,
      reject_add_request
    })
    if (code === 0) {
      printLog(`[群员移除] 群号:${group_id} QQID:${user_id} 拒绝再加群:${reject_add_request}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[群员移除] 群号:${group_id} QQID:${user_id} 拒绝再加群:${reject_add_request} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 群组单人禁言
   * @param {number} group_id 群号
   * @param {number} user_id  要禁言的 QQ 号
   * @param {number} [duration=30 * 60] 禁言时长，单位秒，0 表示取消禁言
   */
  async setGroupBan(group_id: number, user_id: number, duration: number = 30 * 60) {
    if (this.debug) {
      printLog(`[群员禁言] 群号:${group_id} QQID:${user_id} 禁言时间:${duration}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_ban', {
      group_id,
      user_id,
      duration
    })
    if (code === 0) {
      printLog(`[群员禁言] 群号:${group_id} QQID:${user_id} 禁言时间:${duration}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[群员禁言] 群号:${group_id} QQID:${user_id} 禁言时间:${duration} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 群组全员禁言
   * @param {number} group_id 群号
   * @param {boolean} [enable=true] 是否禁言
   */
  async setGroupWholeBan(group_id: number, enable: boolean = true) {
    if (this.debug) {
      printLog(`[全群禁言] 群号:${group_id} 开启禁言:${enable}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_whole_ban', {
      group_id,
      enable
    })
    if (code === 0) {
      printLog(`[全群禁言] 群号:${group_id} 开启禁言:${enable}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[全群禁言] 群号:${group_id} 开启禁言:${enable} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 设置群名片（群备注）
   * @param {number} group_id 群号
   * @param {number} user_id 要设置的 QQ 号
   * @param {string} card 群名片内容，不填或空字符串表示删除群名片
   */
  async setGroupCard(group_id: number, user_id: number, card: string = '') {
    if (this.debug) {
      printLog(`[群成员名片] 群号:${group_id} QQID:${user_id} 新名片:${card}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_card', {
      group_id,
      user_id,
      card
    })
    if (code === 0) {
      printLog(`[群成员名片] 群号:${group_id} QQID:${user_id} 新名片:${card}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[群成员名片] 群号:${group_id} QQID:${user_id} 新名片:${card} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 退出群组
   * @param {number} group_id 群号
   * @param {boolean} is_dismiss 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散
   */
  async setGroupLeave(group_id: number, is_dismiss: boolean = false) {
    if (this.debug) {
      printLog(`[退出群聊] 群号:${group_id} 是否解散:${is_dismiss}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_leave', {
      group_id,
      is_dismiss
    })
    if (code === 0) {
      printLog(`[退出群聊] 群号:${group_id} 是否解散:${is_dismiss}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[退出群聊] 群号:${group_id} 是否解散:${is_dismiss} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 设置群成员专属头衔
   * 需群主权限
   * @param {number} group_id 目标群
   * @param {number} user_id 目标QQ
   * @param {string} special_title 如果要删除，这里填空
   * @param {number} duration 专属头衔有效期，单位为秒。如果永久有效，这里填写-1
   */
  async setGroupSpecialTitle(group_id: number, user_id: number, special_title: string, duration: number) {
    if (this.debug) {
      printLog(`[设置群成员专属头衔] 群号:${group_id} QQID:${user_id} 头衔:${special_title} 过期时间:${duration}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_special_title', {
      group_id, user_id,
      special_title, duration
    })
    if (code === 0) {
      printLog(`[设置群成员专属头衔] 群号:${group_id} QQID:${user_id} 头衔:${special_title} 过期时间:${duration}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[设置群成员专属头衔] 群号:${group_id} QQID:${user_id} 头衔:${special_title} 过期时间:${duration} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 处理好友添加请求
   * @param {string} flag 加好友请求的 flag（需从上报的数据中获得）
   * @param {boolean} [approve=true] 是否同意请求
   * @param {string} remark 添加后的好友备注（仅在同意时有效）
   */
  async setFriendAddRequest(flag: string, approve: boolean = true, remark: string) {
    if (this.debug) {
      printLog(`[处理好友添加请求] 请求反馈标识:${flag} 反馈类型:${approve} 备注:${remark}`)
      return 'test'
    }
    const code = await this.useAPI('set_friend_add_request', {
      flag, approve, remark
    })
    if (code === 0) {
      printLog(`[处理好友添加请求] 请求反馈标识:${flag} 反馈类型:${approve} 备注:${remark}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[处理好友添加请求] 请求反馈标识:${flag} 反馈类型:${approve} 备注:${remark} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 置群添加请求
   * @param {string} flag 加群请求的 flag（需从上报的数据中获得）
   * @param {string} type add 或 invite，请求类型（需要和上报消息中的 sub_type 字段相符）
   * @param {boolean} [approve=true] 是否同意请求／邀请
   * @param {string} reason 拒绝理由（仅在拒绝时有效）
   */
  async setGroupAddRequest(flag: string, type: string, approve: boolean = true, reason: string = '') {
    if (this.debug) {
      printLog(`[处理群添加请求] 请求反馈标识:${flag} 请求类型:${type}反馈类型:${approve} 理由:${reason}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_add_request', {
      flag, type, approve, reason
    })
    if (code === 0) {
      printLog(`[处理群添加请求] 请求反馈标识:${flag} 请求类型:${type}反馈类型:${approve} 理由:${reason}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[处理群添加请求] 请求反馈标识:${flag} 请求类型:${type}反馈类型:${approve} 理由:${reason} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 获取登录号信息
   * @returns {Promise<{ user_id: number; nickname: string; }>}
   */
  async getLoginInfo(): Promise<{ user_id: number; nickname: string; }> {
    if (this.debug) {
      const info = {
        user_id: 10001,
        nickname: 'test'
      }
      printLog(`[获取登录号信息] qq:${info.user_id} 昵称:${info.nickname}`)
      return info
    }
    const result = await this.useAPI('get_login_info', {
    })
    if (result['status'] === 'ok') {
      printLog(`[获取登录号信息] qq:${result['data'].user_id} 昵称:${result['data'].nickname}`, Log.INFO_SUCCESS)
      return result['data']
    } else {
      printLog(`[获取登录号信息] 执行结果:${getStatus(result['data'].retcode)}(${result['data'].retcode})`, Log.ERROR)
      return {
        user_id: -1,
        nickname: ''
      }
    }
  }

  /**
   * 取登录QQ
   * @returns {Promise<number>}
   */
  async getLoginQq(): Promise<number> {
    if (this.debug) {
      printLog('[获取登录QQ] QQ:10001')
      return 10001
    }
    const result = await this.getLoginInfo()
    return result.user_id
  }

  /**
   * 取登录昵称
   * @returns {Promise<string>}
   */
  async getLoginNick(): Promise<string> {
    if (this.debug) {
      printLog('[获取登录昵称] 昵称:test')
      return 'test'
    }
    const result = await this.getLoginInfo()
    return result.nickname
  }

  /**
   * 获取好友列表
   */
  async getFriendList(): Promise<QQInfo[]> {
    if (this.debug) {
      const testFriendList: QQInfo[] = [{
        user_id: 10001,
        nickname: 'test',
        remark: ''
      }]
      printLog('[获取好友列表] 好友数量:1')
      return testFriendList
    }
    const result = await this.useAPI('get_friend_list', {
    })
    if (result['status'] === 'ok') {
      printLog(`[获取好友列表] 好友数量:${result['data'].length}`, Log.INFO_SUCCESS)
      return result['data']
    } else {
      printLog(`[获取好友列表] 执行结果:${getStatus(result['data'].retcode)}(${result['data'].retcode})`, Log.ERROR)
      return []
    }
  }

  /**
   * 获取群列表
   * @returns {Promise<GroupInfo[]>}
   */
  async getGroupList(): Promise<GroupInfo[]> {
    if (this.debug) {
      const testGroupList: GroupInfo[] = [
        {
          group_id: 10001,
          group_name: 'test',
          member_count: 1,
          max_member_count: 1
        }
      ]
      printLog('[获取群列表] Q群数量: 1')
      return testGroupList
    }
    const result = await this.useAPI('get_group_list', {
    })
    if (result['status'] === 'ok') {
      printLog(`[获取群列表] Q群数量: ${result['data'].length}`, Log.INFO_SUCCESS)
      return result['data']
    } else {
      printLog(`[获取群列表] 执行结果:${getStatus(result['data'].retcode)}(${result['data'].retcode})`, Log.ERROR)
      return []
    }
  }

  /**
   * 获取群信息
   * @param group_id 群号
   * @param no_cache 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
   */
  async getGroupInfo(group_id: number, no_cache: boolean = false): Promise<GroupInfo> {
    if (this.debug) {
      const testGroup: GroupInfo = {
        group_id: 10001,
        group_name: 'test',
        member_count: 1,
        max_member_count: 1
      }
      printLog(`[获取群信息] 群号: ${testGroup.group_id} 群名: ${testGroup.group_name} 成员数: ${testGroup.member_count}/${testGroup.max_member_count} 使用缓存: ${no_cache}`)
      return testGroup
    }
    const result = await this.useAPI('get_group_info', {
      group_id,
      no_cache
    })
    if (result['status'] === 'ok') {
      printLog(`[获取群信息] 群号: ${result['data'].group_id} 群名: ${result['data'].group_name} 成员数: ${result['data'].member_count}/${result['data'].max_member_count} 使用缓存: ${no_cache}`, Log.INFO_SUCCESS)
      return result['data']
    } else {
      printLog(`[获取群信息] 执行结果:${getStatus(result['data'].retcode)}(${result['data'].retcode})`, Log.ERROR)
      return new GroupInfo()
    }
  }

  /**
   * 获取群成员信息
   * @param {number} group_id 群号
   * @param {number} user_id QQ 号
   * @param {boolean} no_cache 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
   * @returns {Promise<MemberInfo>}
   */
  async getGroupMemberInfo(group_id: number, user_id: number, no_cache: boolean = false): Promise<MemberInfo> {
    if (this.debug) {
      let testMemberInfo: MemberInfo = {
        group_id,
        user_id,
        nickname: '测试昵称',
        card: '测试名片',
        sex: 'male',
        age: 0,
        area: '中国',
        join_time: Date.now() - 24 * 60 * 60 * 1000,
        last_sent_time: Date.now() - 60 * 1000,
        level: '萌新',
        role: 'member',
        unfriendly: false,
        title: '测试专属头衔',
        title_expire_time: -1,
        card_changeable: true,
      }
      printLog(`[获取群成员信息] 群号:${group_id} QQID:${user_id} 不使用缓存:${no_cache} 返回: ${JSON.stringify(testMemberInfo)}`)
      return testMemberInfo
    }
    const result = await this.useAPI('get_group_member_info', {
      group_id,
      user_id,
      no_cache
    })
    if (result['status'] === 'ok') {
      printLog(`[获取群成员信息] 群号:${group_id} QQID:${user_id} 不使用缓存:${no_cache} 返回: ${JSON.stringify(result['data'])}`, Log.INFO_SUCCESS)
      return result['data']
    } else {
      printLog(`[获取群成员信息] 执行结果:${getStatus(result['data'].retcode)}(${result['data'].retcode})`, Log.ERROR)
      return new MemberInfo()
    }
  }

  /**
   * 获取群成员列表
   * @param {number} group_id
   * @returns {Promise<Array<MemberInfo>>} 响应内容为 JSON 数组，每个元素的内容和上面的 /get_group_member_info 接口相同，但对于同一个群组的同一个成员，获取列表时和获取单独的成员信息时，某些字段可能有所不同，例如 area、title 等字段在获取列表时无法获得，具体应以单独的成员信息为准。
   */
  async getGroupMemberList(group_id: number): Promise<Array<MemberInfo>> {
    if (this.debug) {
      let testMemberInfo: Array<MemberInfo> = [{
        group_id,
        user_id: 10001,
        nickname: '测试昵称',
        card: '测试名片',
        sex: 'male',
        age: 0,
        area: '中国',
        join_time: Date.now() - 24 * 60 * 60 * 1000,
        last_sent_time: Date.now() - 60 * 1000,
        level: '萌新',
        role: 'member',
        unfriendly: false,
        title: '测试专属头衔',
        title_expire_time: -1,
        card_changeable: true,
      }]
      printLog('[获取群成员列表] 群成员:1')
      return testMemberInfo
    }
    const result = await this.useAPI('get_group_member_list', {
      group_id
    })
    if (result['status'] === 'ok') {
      printLog(`[获取群成员列表] 群成员:${result['data'].length}`, Log.INFO_SUCCESS)
      return result['data']
    } else {
      printLog(`[获取群成员列表] 执行结果:${getStatus(result['data'].retcode)}(${result['data'].retcode})`, Log.ERROR)
      return []
    }
  }

  /**
   * 获取插件运行状态
   * @returns {Promise<HttpApiStatus>} 通常情况下建议只使用 online 和 good 这两个字段来判断运行状态，因为随着插件的更新，其它字段有可能频繁变化。
   */
  async getStatus(): Promise<HttpApiStatus> {
    if (this.debug) {
      let testStatus: HttpApiStatus = {
        online: true,
        good: true
      }
      printLog(`[获取插件运行状态] 是否在线:${testStatus.online} 模块状态:${testStatus.good}`)
      return testStatus
    }
    const result = await this.useAPI('get_status', {
    })
    if (result['status'] === 'ok') {
      printLog(`[获取插件运行状态] 是否在线:${result['data'].online} 模块状态:${result['data'].good}`)
      return result['data']
    } else {
      printLog(`[获取插件运行状态] 执行结果:${getStatus(result['data'].retcode)}(${result['data'].retcode})`, Log.ERROR)
      return new HttpApiStatus()
    }
  }

  /**
   * 获取版本信息
   * @returns {Promise<HttpApiInfo>}
   */
  async getVersionInfo(): Promise<HttpApiInfo> {
    if (this.debug) {
      let testInfo: HttpApiInfo = {
        app_name: 'test',
        app_version: 'test',
        protocol_version: 'v11'
      }
      printLog(`[获取版本信息] ${JSON.stringify(testInfo)}`)
      return testInfo
    }
    const result = await this.useAPI('get_version_info', {
    })
    if (result['status'] === 'ok') {
      printLog(`[获取版本信息] ${JSON.stringify(result['data'])}`, Log.INFO_SUCCESS)
      return result['data']
    } else {
      printLog(`[获取版本信息] 执行结果:${getStatus(result['data'].retcode)}(${result['data'].retcode})`, Log.ERROR)
      return new HttpApiInfo()
    }
  }

  /**
   * 设置群名
   * @param group_id 群号
   * @param group_name 新群名
   */
  async setGroupName(group_id: number, group_name: string) {
    if (this.debug) {
      printLog(`[设置群名] 群号:${group_id} 新群名:${group_name}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_name', {
      group_id,
      group_name
    })
    if (code === 0) {
      printLog(`[设置群名] 群号:${group_id} 新群名:${group_name}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[设置群名] 群号:${group_id} 新群名:${group_name} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  /**
   * 可用性未知
   * 群组匿名
   * @param {number} group_id 群号
   * @param {boolean} [enable=true] 是否允许匿名聊天
   */
  async setGroupAnonymous(group_id: number, enable: boolean = true) {
    if (this.debug) {
      printLog(`[置群匿名设置] 群号:${group_id} 开启匿名:${enable}`)
      return 'test'
    }
    const code = await this.useAPI('set_group_anonymous', {
      group_id,
      enable
    })
    if (code === 0) {
      printLog(`[置群匿名设置] 群号:${group_id} 开启匿名:${enable}`, Log.INFO_SUCCESS)
    } else {
      printLog(`[置群匿名设置] 群号:${group_id} 开启匿名:${enable} 执行结果:${getStatus(code as number)}(${code})`, Log.ERROR)
    }
    return code
  }

  // /**
  //  * 尚未支持
  //  * 群组匿名用户禁言
  //  * @param {number} group_id 群号
  //  * @param {string} anonymous_flag  要禁言的匿名用户的 flag（需从群消息上报的数据中获得）
  //  * @param {number}[duration=30 * 60] 禁言时长，单位秒，0 表示取消禁言
  //  * @returns
  //  */
  // async set_group_anonymous_ban(group_id: number, anonymous_flag: string, duration: number = 30 * 60) {
  //   if (this.debug) {
  //     printLog(`[置匿名群员禁言] 群号:${group_id} 匿名:${anonymous_flag} 禁言时间:${duration}`)
  //     return 0
  //   }
  //   return this.cqBasicOperate('set_group_anonymous_ban', {
  //     group_id,
  //     anonymous_flag,
  //     duration
  //   })
  // }

  // /**
  //  * 尚未支持
  //  * 群组设置管理员
  //  * @param {number} group_id 群号
  //  * @param {number} user_id
  //  * @param {boolean} [enable=true] 是否禁言
  //  */
  // async set_group_admin(group_id: number, user_id: number, enable: boolean = true) {
  //   if (this.debug) {
  //     printLog(`[置群管理员] 群号:${group_id} QQID:${user_id} 成为管理员:${enable}`)
  //     return 0
  //   }
  //   return this.cqBasicOperate('set_group_admin', {
  //     group_id,
  //     user_id,
  //     enable
  //   })
  // }

  // /**
  //  * 尚未支持
  //  * 获取陌生人信息
  //  * @param {number} user_id QQ 号
  //  * @param {boolean} [no_cache=false] 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
  //  * @returns {Promise<QQInfo>}
  //  */
  // async get_stranger_info(user_id: number, no_cache: boolean = false): Promise<QQInfo> {
  //   if (this.debug) {
  //     let testStranger: QQInfo = {
  //       user_id,
  //       nickname: '测试昵称',
  //       sex: 'male',
  //       age: 0
  //     }
  //     printLog(`[取陌生人信息] 本函数请在酷Q中测试 QQID:${user_id} 不使用缓存:${no_cache} 返回:${JSON.stringify(testStranger)}`)
  //     return testStranger
  //   }
  //   let result = await this.cqBasicOperate('get_stranger_info', {
  //     user_id, no_cache
  //   })
  //   if (result['status'] === 'ok') {
  //     return result['data']
  //   } else {
  //     return new QQInfo(-1, '', 'male', 0)
  //   }
  // }

  // /**
  //  * 尚未支持
  //  * 接收语音。
  //  * 其实并不是真的获取语音，而是转换语音到指定的格式，然后返回语音文件名（data\record 目录下）。注意，要使用此接口，需要安装 酷Q 的 语音组件。
  //  * @param {string} file 收到的语音文件名（CQ 码的 file 参数），如 0B38145AA44505000B38145AA4450500.silk
  //  * @param {string} out_format 要转换到的格式，目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac
  //  * @param {boolean} full_path 是否返回文件的绝对路径（Windows 环境下建议使用，Docker 中不建议）
  //  * @returns {Promise<string>} 转换后的语音文件名或路径，如 0B38145AA44505000B38145AA4450500.mp3，如果开启了 full_path，则如 C:\Apps\CoolQ\data\record\0B38145AA44505000B38145AA4450500.mp3
  //  */
  // async get_record(file: string, out_format: string, full_path: boolean = false): Promise<string> {
  //   if (this.debug) {
  //     printLog(`[接收语音] 本函数请在酷Q中测试 文件名:${file} 指定格式:${out_format} 是否返回文件的绝对路径:${full_path}`)
  //     return ''
  //   }
  //   let result = await this.cqBasicOperate('get_record', {
  //     file, out_format, full_path
  //   })
  //   if (result['status'] === 'ok') {
  //     return result['data']['file']
  //   } else {
  //     return ''
  //   }
  // }

  // /**
  //  * 尚未支持
  //  * 接收图片；
  //  * Auth=30 收到的图片文件名（CQ 码的 file 参数），如 6B4DE3DFD1BD271E3297859D41C530F5.jpg
  //  * @param {string} file
  //  * @returns {Promise<string>} 下载后的图片文件路径，如 C:\Apps\CoolQ\data\image\6B4DE3DFD1BD271E3297859D41C530F5.jpg
  //  */
  // async get_image(file: string): Promise<string> {
  //   if (this.debug) {
  //     printLog(`[接收图片] 本函数请在酷Q中测试 文件名:${file}`)
  //     return ''
  //   }
  //   let result = await this.cqBasicOperate('get_image', {
  //     file
  //   })
  //   if (result['status'] === 'ok') {
  //     return result['data']['file']
  //   } else {
  //     return ''
  //   }
  // }


  // /**
  //  * 尚未支持
  //  * 重启 HTTP API 插件；
  //  * 由于重启插件同时需要重启 API 服务，这意味着当前的 API 请求会被中断，因此需在异步地重启插件，接口返回的 status 是 async。
  //  * @param {number} [delay=0]
  //  */
  // async set_restart_plugin(delay: number = 0) {
  //   if (this.debug) {
  //     printLog(`[重启HTTP_API插件] 本函数请在酷Q中测试 延时:${delay} 返回:重启成功！`)
  //     return 1
  //   }
  //   return this.cqBasicOperate('set_restart_plugin', {
  //     delay
  //   })
  // }

  // /**
  //  * 尚未支持
  //  * 清理数据目录
  //  * @param {string} data_dir 要清理的目录名，支持 image、record、show、bface
  //  */
  // async clean_data_dir(data_dir: 'image' | 'record' | 'show' | 'bface') {
  //   if (this.debug) {
  //     printLog(`[清理数据目录] 本函数请在酷Q中测试 清理的目录名:${data_dir}`)
  //     return 0
  //   }
  //   return this.cqBasicOperate('clean_data_dir', {
  //   })
  // }

  // /**
  //  * 尚未支持
  //  * 清理插件日志
  //  */
  // async clean_plugin_log() {
  //   if (this.debug) {
  //     printLog('[清理插件日志] 本函数请在酷Q中测试')
  //     return 0
  //   }
  //   return this.cqBasicOperate('clean_plugin_log', {
  //   })
  // }
}