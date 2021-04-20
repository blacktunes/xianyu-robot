import { PrivateSender, GroupSender } from './Event'

export interface CQMessage {
  type: string
  data: null | {
    [key: string]: string
  }
}

export type Message = string | CQMessage | CQMessage[]

export interface NodeMessage {
  type: 'node'
  data: {
    [key: string]: Message
  }
}

export interface Msg {
  /**
   * 消息id
   */
  message_id: number
  /**
   * 消息真实id
   */
  real_id: number
  /**
   * 发送者
   */
  sender: PrivateSender | GroupSender
  /**
   * 发送时间
   */
  time: number
  /**
   * 消息内容
   */
  message: Message
  /**
   * 原始消息内容
   */
  raw_message: Message
}

export type HonorType = 'talkative' | 'performer' | 'legend' | 'strong_newbie' | 'emotion' | 'all'

export interface HonorItem {
  talkative: {
    /**
     * 当前龙王
     */
    current_talkative: CurrentTalkative
    /**
     * 历史龙王
     */
    talkative_list: Honor[]
  }
  performer: {
    /**
     * 群聊之火
     */
    performer_list: Honor[]
  }
  legend: {
    /**
     * 群聊炽焰
     */
    legend_list: Honor[]
  }
  strong_newbie: {
    /**
     * 冒尖小春笋
     */
    strong_newbie_list: Honor[]
  }
  emotion: {
    /**
     * 快乐之源
     */
    emotion_list: Honor[]
  }
  all: HonorItem['talkative'] & HonorItem['performer'] & HonorItem['legend'] & HonorItem['strong_newbie'] & HonorItem['emotion']
}

export interface CurrentTalkative {
  /**
   * QQ 号
   */
  user_id: number
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像 URL
   */
  avatar: string
  /**
   * 持续天数
   */
  day_count: number
}

export interface Honor {
  /**
   * QQ 号
   */
  user_id: number
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像 URL
   */
  avatar: string
  /**
   * 荣誉描述
   */
  description: string
}

export interface HonorInfo {
  /**
   * 群号
   */
  group_id: number
}

export interface VersionInfo {
  /**
   * 应用标识
   */
  app_name: string
  /**
   * 应用版本
   */
  app_version: string
  /**
   * 	应用完整名称
   */
  app_full_name: string
  /**
   * OneBot 标准版本
   */
  protocol_version: string
  /**
   * 原Coolq版本
   */
  coolq_edition: string
  coolq_directory: string
  /**
   * 是否为go-cqhttp
   */
  'go-cqhttp': boolean
  plugin_version: string
  plugin_build_number: number
  plugin_build_configuration: string
  runtime_version: string
  runtime_os: string
  /**
   * 应用版本
   */
  version: string
  /**
   * 当前登陆使用协议类型
   */
  protocol: -1 | 0 | 1 | 2 | 3
}

export interface Status {
  app_initialized: true
  app_enabled: true
  plugins_good: true
  app_good: true
  /**
   * BOT是否在线
   */
  online: boolean
  good: boolean
  /**
   * 	运行统计
   */
  stat: Statistics
}

export interface Statistics {
  /**
   * 收到的数据包总数
   */
  packet_received: number
  /**
   * 发送的数据包总数
   */
  packet_sent: number
  /**
   * 数据包丢失总数
   */
  packet_lost: number
  /**
   * 接受信息总数
   */
  message_received: number
  /**
   * 发送信息总数
   */
  message_sent: number
  /**
   * TCP 链接断开次数
   */
  disconnect_times: number
  /**
   * 账号掉线次数
   */
  lost_times: number
}

export interface EssenceMsg {
  /**
   * 发送者QQ 号
   */
  sender_id: number
  /**
   * 发送者昵称
   */
  sender_nick: string
  /**
   * 	消息发送时间
   */
  sender_time: number
  /**
   * 操作者QQ 号
   */
  operator_id: number
  /**
   * 操作者昵称
   */
  operator_nick: string
  /**
   * 精华设置时间
   */
  operator_time: number
  /**
   * 消息ID
   */
  message_id: number
}
