import { GroupFile } from '.'

export interface PrivateMsg {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'message'
  /**
   * 消息类型
   */
  message_type: 'private'
  /**
   * 消息子类型，如果是好友则是 friend，如果是群临时会话则是 group
   */
  sub_type: 'friend' | 'group' | ' other'
  /**
   * 消息 ID
   */
  message_id: number
  /**
   * 发送者 QQ 号
   */
  user_id: number
  /**
   * 消息内容
   */
  message: string
  /**
   * 原始消息内容
   */
  raw_message: string
  /**
   * 字体
   */
  font: number
  /**
   * 发送人信息
   */
  sender: PrivateSender
}

export interface PrivateSender {
  /**
   * 发送者 QQ 号
   */
  user_id: number
  /**
   * 昵称
   */
  nickname: string
  /**
   * 性别，male 或 female 或 unknown
   */
  sex: 'male' | 'female' | 'unknown'
  /**
   * 	年龄
   */
  age: number
}

export interface GroupMsg {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'message'
  /**
   * 消息类型
   */
  message_type: 'group'
  /**
   * 消息子类型，正常消息是 normal，匿名消息是 anonymous，系统提示（如「管理员已禁止群内匿名聊天」）是 notice
   */
  sub_type: 'normal' | 'anonymous' | 'notice'
  /**
   * 消息 ID
   */
  message_id: number
  /**
   * 群号
   */
  group_id: number
  /**
   * 发送者 QQ 号
   */
  user_id: number
  /**
   * 匿名信息，如果不是匿名消息则为 null
   */
  anonymous: Anonymous | null
  /**
   * 消息内容
   */
  message: string
  /**
   * 原始消息内容
   */
  raw_message: string
  /**
   * 字体
   */
  font: number
  /**
   * 发送人信息
   */
  sender: GroupSender
}

export interface Anonymous {
  /**
   * 匿名用户 ID
   */
  id: number
  /**
   * 匿名用户名称
   */
  name: string
  /**
   * 匿名用户 flag，在调用禁言 API 时需要传入
   */
  flag: string
}

export interface GroupSender {
  /**
   * 发送者 QQ 号
   */
  user_id: number
  /**
   * 昵称
   */
  nickname: string
  /**
   * 群名片／备注
   */
  card: string
  /**
   * 性别，male 或 female 或 unknown
   */
  sex: 'male' | 'female' | 'unknown'
  /**
   * 年龄
   */
  age: number
  /**
   * 地区
   */
  area: string
  /**
   * 成员等级
   */
  level: string
  /**
   * 角色，owner 或 admin 或 member
   */
  role: 'owner' | 'admin' | 'member'
  /**
   * 专属头衔
   */
  title: string
}

export interface GroupRecall {
  /**
   * 上报类型
   */
  post_type: 'notice'
  /**
   * 消息类型
   */
  notice_type: 'group_recall'
  /**
   * 群号
   */
  group_id: number
  /**
   * 消息发送者id
   */
  user_id: number
  /**
   * 操作者id
   */
  operator_id: number
  /**
   * 被撤回的消息id
   */
  message_id: number
}

export interface FriendRecall {
  /**
   * 上报类型
   */
  post_type: 'notice'
  /**
   * 消息类型
   */
  notice_type: 'friend_recall'
  /**
   * 消息发送者id
   */
  user_id: number
  /**
   * 被撤回的消息id
   */
  message_id: number
}

export interface GroupNotify {
  /**
   * 	上报类型
   */
  post_type: 'notice'
  /**
   * 消息类型
   */
  notice_type: 'notify'
  /**
   * 群号
   */
  group_id: number
  /**
   * 提示类型
   */
  sub_type: 'lucky_king' | 'poke' | 'honor'
  /**
   * 发送者id
   */
  user_id: number
  /**
   * 接受者id
   */
  target_id: number | null
  /**
   * 荣誉类型
   */
  honor_type: string | null
}

export interface GroupAdmin {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'notice'
  /**
   * 通知类型
   */
  notice_type: 'group_admin'
  /**
   * 事件子类型，分别表示设置和取消管理员
   */
  sub_type: 'set' | 'unset'
  /**
   * 群号
   */
  group_id: number
  /**
   * 管理员 QQ 号
   */
  user_id: number
}

export interface GroupDecrease {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'notice'
  /**
   * 通知类型
   */
  notice_type: 'group_decrease'
  /**
   * 事件子类型，分别表示主动退群、成员被踢、登录号被踢
   */
  sub_type: 'leave' | 'kick' | 'kick_me'
  /**
   * 群号
   */
  group_id: number
  /**
   * 操作者 QQ 号（如果是主动退群，则和 user_id 相同）
   */
  operator_id: number
  /**
   * 离开者 QQ 号
   */
  user_id: number
}

export interface GroupIncrease {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'notice'
  /**
   * 通知类型
   */
  notice_type: 'group_increase'
  /**
   * 事件子类型，分别表示管理员已同意入群、管理员邀请入群
   */
  sub_type: 'approve' | 'invite'
  /**
   * 群号
   */
  group_id: number
  /**
   * 操作者 QQ 号
   */
  operator_id: number
  /**
   * 加入者 QQ 号
   */
  user_id: number
}

export interface GroupBan {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'notice'
  /**
   * 通知类型
   */
  notice_type: 'group_ban'
  /**
   * 事件子类型，分别表示禁言、解除禁言
   */
  sub_type: 'ban' | 'lift_ban'
  /**
   * 群号
   */
  group_id: number
  /**
   * 操作者 QQ 号
   */
  operator_id: number
  /**
   * 被禁言 QQ 号
   */
  user_id: number
  /**
   * 禁言时长，单位秒
   */
  duration: number
}

export interface GroupUpload {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'notice'
  /**
   * 通知类型
   */
  notice_type: 'group_upload'
  /**
   * 群号
   */
  group_id: number
  /**
   * 发送者 QQ 号
   */
  user_id: number
  /**
   * 文件信息
   */
  file: GroupFile
}

export interface Friend {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'request'
  /**
   * 请求类型
   */
  request_type: 'friend'
  /**
   * 发送请求的 QQ 号
   */
  user_id: number
  /**
   * 验证信息
   */
  comment: string
  /**
   * 请求 flag，在调用处理请求的 API 时需要传入
   */
  flag: string
}

export interface Group {
  /**
   * 事件发生的时间戳
   */
  time: number
  /**
   * 收到事件的机器人 QQ 号
   */
  self_id: number
  /**
   * 上报类型
   */
  post_type: 'request'
  /**
   * 请求类型
   */
  request_type: 'group'
  /**
   * 请求子类型，分别表示加群请求、邀请登录号入群
   */
  sub_type: 'add' | 'invite'
  /**
   * 群号
   */
  group_id: number
  /**
   * 发送请求的 QQ 号
   */
  user_id: number
  /**
   * 验证信息
   */
  comment: string
  /**
   * 请求 flag，在调用处理请求的 API 时需要传入
   */
  flag: string
}

export interface GroupCard {
  /**
   * 上报类型
   */
  post_type: 'notice'
  /**
   * 消息类型
   */
  notice_type: 'group_card'
  /**
   * 群号
   */
  group_id: number
  /**
   * 成员id
   */
  user_id: number
  /**
   * 新名片
   */
  card_new: any
  /**
   * 旧名片
   */
  card_old: any
}
