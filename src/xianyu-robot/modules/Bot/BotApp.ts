import { BotApi } from './BotApi'
import { GroupFile } from './modules/option';

/**
 *  Bot应用
 */
export class BotApp {
  /**
   * CQApp构造函数
   */
  constructor(debug: boolean = false) {
    this.API = new BotApi(debug)
    this.isEnable = false
  }
  API: BotApi;
  /**
   * 应用启用状态，默认为false
   *
   * @type {boolean}
   * @memberof CQApp
   */
  isEnable: boolean

  /**
   * 插件启动，本函数会在连接建立前执行。
   * 请在这里执行插件初始化代码。
   */
  startup(): void {
    return
  }

  /**
   * 本函数会在连接断开后执行，请在此执行插件退出代码
   */
  exit(): void {
    return
  }

  /**
   * 应用已被启用。本函数会在连接建立后立刻执行，可以在此执行初始化代码。
   */
  enable(): void {
    return
  }

  /**
   * 应用将被停用
   * 本函数会在连接断开前执行，可以在此执行插件退出代码
   * 如果载入时应用已被停用，则本函数【不会】被调用。
   * 无论本应用是否被启用，连接断开前本函数都【不会】被调用。
   */
  disable(): void {
    return
  }

  /**
   * 私聊消息
   * @param {string} subType 消息子类型，friend:来自好友、group:来自群聊
   * @param {number} msgId 消息ID
   * @param {number} fromQQ 来源QQ
   * @param {string} msg 消息内容
   */
  async privateMsg(_subType: string, _msgId: number, _fromQQ: number, _msg: string): Promise<void> {
    return
  }

  /**
   * 群消息
   * @param {string} subType 消息子类型，normal:正常消息，anonymous:匿名消息，notice:系统提示
   * @param {number} msgId
   * @param {number} fromGroup 来源群号
   * @param {number} fromQQ
   * @param {string} fromAnonymous 来源匿名者
   * @param {string} msg
   */
  async groupMsg(_subType: string, _msgId: number, _fromGroup: number, _fromQQ: number, _fromAnonymous: string, _msg: string): Promise<void> {
    return
  }

  /**
   * 群文件上传事件
   * @param {string} subType 子类型，目前固定为group_upload
   * @param {number} sendTime 发送时间(时间戳)
   * @param {number} fromGroup 来源群号
   * @param {number} fromQQ 来源QQ号
   * @param {CQFile} file 上传文件的信息
   */
  async groupUpload(_subType: string, _sendTime: number, _fromGroup: number, _fromQQ: number, _file: GroupFile): Promise<void> {
    return
  }

  /**
   * 群事件-管理员变动
   * @param {string} subType 子类型，set:设置管理员,unset:取消管理员
   * @param {number} sendTime 发送时间(时间戳)
   * @param {number} fromGroup 来源群号
   * @param {number} beingOperateQQ 被操作QQ
   */
  async groupAdmin(_subType: string, _sendTime: number, _fromGroup: number, _beingOperateQQ: number): Promise<void> {
    return
  }

  /**
   * 群事件-群成员减少
   * @param {string} subType 子类型，leave:主动退群、kick:成员被踢、kick_me:登录号被踢
   * @param {number} sendTime
   * @param {number} fromGroup
   * @param {number} fromQQ 操作者QQ(仅子类型为2时存在)
   * @param {number} beingOperateQQ 被操作QQ
   */
  async groupDecrease(_subType: string, _sendTime: number, _fromGroup: number, _fromQQ: number, _beingOperateQQ: number): Promise<void> {
    return
  }

  /**
   * 群事件-群成员增加
   * @param {string} subType 子类型，approve:管理员已同意入群、invite:管理员邀请入群
   * @param {number} sendTime 发送时间(时间戳)
   * @param {number} fromGroup
   * @param {number} fromQQ 操作者QQ(即管理员QQ)
   * @param {number} beingOperateQQ 被操作QQ(即加群的QQ)
   */
  async groupIncrease(_subType: string, _sendTime: number, _fromGroup: number, _fromQQ: number, _beingOperateQQ: number): Promise<void> {
    return
  }

  /**
   * 好友事件-好友已添加
   * @param {string} subType 子类型，目前固定为friend_add
   * @param {number} sendTime 发送时间(时间戳)
   * @param {number} fromQQ 来源QQ
   */
  async friendAdd(_subType: string, _sendTime: number, _fromQQ: number): Promise<void> {
    return
  }

  /**
   * 请求-好友添加
   * @param {number} subType 子类型，目前固定为request_add_friend
   * @param {number} sendTime
   * @param {number} fromQQ 来源QQ
   * @param {string} msg 附言
   * @param {string} responseFlag 反馈标识(处理请求用)
   */
  async requestAddFriend(_subType: string, _sendTime: number, _fromQQ: number, _msg: string, _responseFlag: string): Promise<void> {
    return
  }

  /**
   * 请求-群添加
   * @param {number} subType 请求子类型，add:加群请求、invite:邀请登录号入群
   * @param {number} sendTime
   * @param {number} fromGroup
   * @param {number} fromQQ
   * @param {string} msg 附言
   * @param {string} responseFlag 反馈标识(处理请求用)
   */
  async requestAddGroup(_subType: string, _sendTime: number, _fromGroup: number, _fromQQ: number, _msg: string, _responseFlag: string): Promise<void> {
    return
  }
}