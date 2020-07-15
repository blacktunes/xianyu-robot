import { CQFile } from '../entity/CQFile'
import { IVer } from '../entity/IVer'
/**
 * 酷Q事件监听
 * @author CaoMeiYouRen
 * @date 2019-07-07
 * @export
 * @abstract
 * @class CQListener
 */
export interface CQListener extends IVer {
    /**
    * 本函数的内容仅在debug模式下会执行，即CQ.setDebug(true)
    *
    * @memberof CQListener
    */
    debug(): void

    /**
    * Type=1001 插件启动，本函数会在连接建立前执行。
    * 请在这里执行插件初始化代码。
    * 请务必尽快返回本子程序，否则会卡住其他插件以及主程序的加载。
    * @returns {0} 请固定返回0
    * @memberof CQListener
    */
    startup(): 0
    /**
     * Type=1002 本函数会在连接断开后执行，请在此执行插件退出代码
     * @returns {0}请固定返回0，返回后主程序将很快关闭，请不要再通过线程等方式执行其他代码。
     * @memberof CQListener
     */
    exit(): 0
    /**
     * Type=1003 应用已被启用。本函数会在连接建立后立刻执行，可以在此执行初始化代码。
     * @returns {0}请固定返回0。
     * @memberof CQListener
     */
    enable(): 0
    /**
    * Type=1004 应用将被停用
     * 本函数会在连接断开前执行，可以在此执行插件退出代码
     * 如果酷Q载入时应用已被停用，则本函数【不会】被调用。
     * 无论本应用是否被启用，连接断开前本函数都【不会】被调用。
    * @returns {0}请固定返回0。
    * @memberof CQListener
    */
    disable(): 0
    /**
     *
     * Type=21 私聊消息
     * @param {string} subType 消息子类型，friend:来自好友、group:来自群聊、discuss:来自讨论组、other:其他来源
     * @param {number} msgId 消息ID
     * @param {number} fromQQ 来源QQ
     * @param {string} msg 消息内容
     * @param {number} font 字体
     * @returns {number} 返回值*不能*直接返回文本 如果要回复消息，请调用api发送。  * 这里 返回 1 - 截断本条消息，不再继续处理
     * 注意：应用优先级设置为"最高"(10000)时，不得使用本返回值。
     * 如果不回复消息，交由之后的应用/过滤器处理，这里 返回 0 - 忽略本条消息

     * @memberof CQListener
     */
    privateMsg(subType: string, msgId: number, fromQQ: number, msg: string, font: number): Promise<0 | 1>
    /**
     *
     * Type=2 群消息
     * @param {string} subType 消息子类型，normal:正常消息，anonymous:匿名消息，notice:系统提示
     * @param {number} msgId
     * @param {number} fromGroup 来源群号
     * @param {number} fromQQ
     * @param {string} fromAnonymous 来源匿名者
     * @param {string} msg
     * @param {number} font 字体
     * @returns {number} 关于返回值说明, 见 privateMsg 私聊消息 方法
     * @memberof CQListener
     */
    groupMsg(subType: string, msgId: number, fromGroup: number, fromQQ: number, fromAnonymous: string, msg: string, font: number): Promise<0 | 1>
    /**
     *
     * Type=4 讨论组消息
     * @param {string} subType 子类型，目前固定为discuss
     * @param {number} msgId
     * @param {number} fromDiscuss 来源讨论组
     * @param {number} fromQQ
     * @param {string} msg
     * @param {number} font
     * @returns {number}
     * @memberof CQListener
     */
    discussMsg(subType: string, msgId: number, fromDiscuss: number, fromQQ: number, msg: string, font: number): Promise<0 | 1>
    /**
     *
     *
    * Type=11 群文件上传事件
    * @param {string} subType 子类型，目前固定为group_upload
    * @param {number} sendTime 发送时间(时间戳)
    * @param {number} fromGroup 来源群号
    * @param {number} fromQQ 来源QQ号
    * @param {CQFile} file 上传文件的信息
    * @returns {number}
    * @memberof CQListener
    */
    groupUpload(subType: string, sendTime: number, fromGroup: number, fromQQ: number, file: CQFile): Promise<0 | 1>
    /**
     *
     *Type=101 群事件-管理员变动
     * @param {string} subType 子类型，set:设置管理员,unset:取消管理员
     * @param {number} sendTime 发送时间(时间戳)
     * @param {number} fromGroup 来源群号
     * @param {number} beingOperateQQ 被操作QQ
     * @returns {number}
     * @memberof CQListener
     */
    groupAdmin(subType: string, sendTime: number, fromGroup: number, beingOperateQQ: number): Promise<0 | 1>
    /**
     *
     * Type=102 群事件-群成员减少
     * @param {string} subType 子类型，leave:主动退群、kick:成员被踢、kick_me:登录号被踢
     * @param {number} sendTime
     * @param {number} fromGroup
     * @param {number} fromQQ 操作者QQ(仅子类型为2时存在)
     * @param {number} beingOperateQQ 被操作QQ
     * @returns {number}
     * @memberof CQListener
     */
    groupDecrease(subType: string, sendTime: number, fromGroup: number, fromQQ: number, beingOperateQQ: number): Promise<0 | 1>
    /**
     *
     * Type=103 群事件-群成员增加
     * @param {string} subType 子类型，approve:管理员已同意入群、invite:管理员邀请入群
     * @param {number} sendTime 发送时间(时间戳)
     * @param {number} fromGroup
     * @param {number} fromQQ 操作者QQ(即管理员QQ)
     * @param {number} beingOperateQQ 被操作QQ(即加群的QQ)
     * @returns {number}
     * @memberof CQListener
     */
    groupIncrease(subType: string, sendTime: number, fromGroup: number, fromQQ: number, beingOperateQQ: number): Promise<0 | 1>
    /**
     *
     * Type=201 好友事件-好友已添加
     * @param {string} subType 子类型，目前固定为friend_add
     * @param {number} sendTime 发送时间(时间戳)
     * @param {number} fromQQ 来源QQ
     * @returns {number}
     * @memberof CQListener
     */
    friendAdd(subType: string, sendTime: number, fromQQ: number): Promise<0 | 1>
    /**
     *
     * Type=301 请求-好友添加
     * @param {number} subType 子类型，目前固定为request_add_friend
     * @param {number} sendTime
     * @param {number} fromQQ 来源QQ
     * @param {string} msg 附言
     * @param {string} responseFlag 反馈标识(处理请求用)
     * @returns {number}
     * @memberof CQListener
     */
    requestAddFriend(subType: string, sendTime: number, fromQQ: number, msg: string, responseFlag: string): Promise<0 | 1>
    /**
     *
     * Type=302 请求-群添加
     * @param {number} subType 请求子类型，add:加群请求、invite:邀请登录号入群
     * @param {number} sendTime
     * @param {number} fromGroup
     * @param {number} fromQQ
     * @param {string} msg 附言
     * @param {string} responseFlag 反馈标识(处理请求用)
     * @returns {number}
     * @memberof CQListener
     */
    requestAddGroup(subType: string, sendTime: number, fromGroup: number, fromQQ: number, msg: string, responseFlag: string): Promise<0 | 1>

}