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
