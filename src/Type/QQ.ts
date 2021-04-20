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
 * 客户端信息
 */
export interface Device {
  /**
   * 客户端ID
   */
  app_id: number
  /**
   * 设备名称
   */
  device_name: string
  /**
   * 设备类型
   */
  device_kind: string
}
