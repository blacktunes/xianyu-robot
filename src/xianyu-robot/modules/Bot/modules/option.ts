export interface GroupFile {
  /**
   * 文件 ID
   */
  id: string
  /**
   * 文件名
   */
  name: string
  /**
   * 文件大小（字节数）
   */
  size: number
  /**
   * busid（目前不清楚有什么作用）
   */
  busid: number
}

/**
 * 消息段
 */
export interface CQMessage {
  type: string
  data: null | {
    [key: string]: string
  }
}

/**
 * 群信息
 */
export class GroupInfo {
  /**
   *群号
   */
  group_id: number
  /**
   *群名称
   */
  group_name: string
  /**
   * 成员数
   */
  member_count: number
  /**
   * 最大成员数
   */
  max_member_count: number
}

/**
 * QQ信息
 */
export interface QQInfo {
  /**
   * QQ号
   */
  user_id: number
  /**
   * 昵称
   */
  nickname: string
  /**
   * 备注
   */
  remark: string
}

/**
 * 群成员信息
 */
export class MemberInfo {
  /**
   * 群号
   */
  group_id: number
  /**
   * QQ 号
   */
  user_id: number
  /**
   *昵称
   */
  nickname: string
  /**
   *群名片／备注
   */
  card: string
  /**
   * 性别，male 或 female 或 unknown
   */
  sex: string
  /**
   * 年龄
   */
  age: number
  /**
   * 地区
   */
  area: string
  /**
   * 加群时间戳
   */
  join_time: number
  /**
   * 最后发言时间戳
   */
  last_sent_time: number
  /**
   * 成员等级
   */
  level: string
  /**
   * 角色，owner 或 admin 或 member
   */
  role: string
  /**
   * 是否不良记录成员
   */
  unfriendly: boolean
  /**
   * 专属头衔
   */
  title: string
  /**
   * 专属头衔过期时间戳
   */
  title_expire_time: number
  /**
   * 是否允许修改群名片
   */
  card_changeable: boolean
}

/**
 * 版本信息
 */
export class HttpApiInfo {
  app_name: string
  app_version: string
  protocol_version: string
}

/**
 * HTTP_API插件运行状态
 */
export class HttpApiStatus {
  /**
   * 当前 QQ 在线，null 表示无法查询到在线状态
   */
  online: boolean
  /**
   * HTTP API 插件状态符合预期，意味着插件已初始化，内部插件都在正常运行，且 QQ 在线
   */
  good: boolean
}
