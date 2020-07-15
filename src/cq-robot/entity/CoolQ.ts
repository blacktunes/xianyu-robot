import { CQWebSocket, CQWebSocketOption } from 'cq-websocket'
import { printTime } from '../utils'
import { CQCode, CQLog, CQMessage, CQOption, getAuth, GroupInfo, QQInfo, MemberInfo, HttpApiInfo, HttpApiStatus } from './index'
import JSON5 = require('json5')
let bot: CQWebSocket // 建立连接的核心模块
type LogLevel = 0 | 10 | 11 | 12 | 13 | 20 | 30 | 40

/**
 *
 * 获取CQ的配置
 * @export
 * @param {string} cqPath 路径
 * @returns {CQOption}
 */
export function getCQOption(): CQOption {
    let config = `{
        "ret": 1, // 返回码，固定为1
        "apiver": 9, // Api版本本sdk为9
        "name": "咸鱼王", // 应用名称
        "version": "1.0.0", // 应用版本
        "version_id": 1, // 应用顺序版本（每次发布时至少+1）
        "author": "Blacktunes", // 应用作者
        "description": "沙雕机器人",
        "event": [ // 事件列表，同一事件类型可重复定义（发布前请删除无用事件）
            {
                "id": 1, // 事件ID
                "type": 21, // 事件类型
                "name": "私聊消息处理", // 事件名称
                "function": "privateMsg", // 事件对应函数
                "priority": 20000 // 事件优先级(参见 cq.im/deveventpriority)
            },
            {
                "id": 2,
                "type": 2,
                "name": "群消息处理",
                "function": "groupMsg",
                "priority": 20000
            },
            {
                "id": 3,
                "type": 4,
                "name": "讨论组消息处理",
                "function": "discussMsg",
                "priority": 20000
            },
            // {
            //  "id": 4,
            //  "type": 11,
            //  "name": "群文件上传事件处理",
            //  "function": "groupUpload",
            //  "priority": 20000
            // },
            // {
            //  "id": 5,
            //  "type": 101,
            //  "name": "群管理变动事件处理",
            //  "function": "groupAdmin",
            //  "priority": 20000
            // },
            // {
            //  "id": 6,
            //  "type": 102,
            //  "name": "群成员减少事件处理",
            //  "function": "groupDecrease",
            //  "priority": 20000
            // },
            // {
            //  "id": 7,
            //  "type": 103,
            //  "name": "群成员增加事件处理",
            //  "function": "groupIncrease",
            //  "priority": 20000
            // },
            // {
            //  "id": 10,
            //  "type": 201,
            //  "name": "好友已添加事件处理",
            //  "function": "friendAdd",
            //  "priority": 20000
            // },
            // {
            //  "id": 8,
            //  "type": 301,
            //  "name": "好友添加请求处理",
            //  "function": "requestAddFriend",
            //  "priority": 20000
            // },
            // {
            //  "id": 9,
            //  "type": 302,
            //  "name": "群添加请求处理",
            //  "function": "requestAddGroup",
            //  "priority": 20000
            // },
            {
                "id": 1003,
                "type": 1003,
                "name": "应用已被启用",
                "priority": 20000,
                "function": "enable"
            },
            {
                "id": 1004,
                "type": 1004,
                "name": "应用将被停用",
                "priority": 20000,
                "function": "disable"
            }
        ],
        "auth": [ // 应用权限（发布前请删除无用权限）
            //20,  //[敏感]取Cookies	getCookies / getCsrfToken
            //30,  //接收语音			getRecord
            101, //发送群消息			sendGroupMsg
            103, //发送讨论组消息		sendDiscussMsg
            106, //发送私聊消息		sendPrivateMsg
            //110,  //发送赞				sendLike
            //120,  //置群员移除			setGroupKick
            //121,  //置群员禁言			setGroupBan
            //122,  //置群管理员			setGroupAdmin
            //123,  //置全群禁言			setGroupWholeBan
            //124,  //置匿名群员禁言		setGroupAnonymousBan
            //125,  //置群匿名设置		setGroupAnonymous
            //126,  //置群成员名片		setGroupCard
            //127, //[敏感]置群退出		setGroupLeave
            //128,  //置群成员专属头衔	setGroupSpecialTitle
            //130,  //取群成员信息		getGroupMemberInfoV2 / getGroupMemberInfo
            //131,  //取陌生人信息		getStrangerInfo
            //140,  //置讨论组退出		setDiscussLeave
            //150,  //置好友添加请求		setFriendAddRequest
            //151,  //置群添加请求		setGroupAddRequest
            160  //取群成员列表		getGroupMemberList
            //161,  //取群列表			getGroupList
            //180//撤回消息			deleteMsg
        ]
    }`
    return JSON5.parse(config)
}

/**
 *
 * 初始化CQWebSocket
 * @export
 * @param {CQWebSocketOption} option
 */
export function CQWebSocketInit(option: CQWebSocketOption): CQWebSocket {
    bot = new CQWebSocket(option)
    bot.on('socket.connecting', (socketType, attempts) => {
        printTime(`[WebSocket] 尝试第${attempts}次连线`, CQLog.LOG_INFO)
    }).on('socket.connect', (socketType, sock, attempts) => {
        printTime(`[WebSocket] 第${attempts}次连线尝试成功`, CQLog.LOG_INFO_SUCCESS)
    }).on('socket.failed', (socketType, attempts) => {
        printTime(`[WebSocket] 第${attempts}次连线尝试失败 `, CQLog.LOG_WARNING)
    }).on('socket.error', (socketType, error) => {
        printTime('[WebSocket] 连线出现了socket.error错误！！', CQLog.LOG_ERROR)
        console.error(error)
    }).on('error', (error) => {
        printTime('[WebSocket] 连线出现了error！！', CQLog.LOG_FATAL)
        console.error(error)
    })
    bot.connect()
    return bot
}

/**
 * CoolQ 操作的核心类
 * @author CaoMeiYouRen
 * @date 2019-07-07
 * @export
 * @class CoolQ
 */
export class CoolQ {
    /**
     * CoolQ构造函数
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {string} APP_ID
     * @param {string} dirname 应用根目录，即index.ts中的__dirname
     * @param {boolean} [debug=false] 调试模式
     * @memberof CoolQ
     */
    constructor(debug: boolean = false) {
        this.CQCode = new CQCode()
        this.debug = debug
        this.appOption = getCQOption()
    }
    /**
     * CQ码
     *
     * @type {CQCode}
     * @memberof CoolQ
     */
    CQCode: CQCode
    /**
     * 插件配置
     *
     * @type {CQOption}
     * @memberof CoolQ
     */
    appOption: CQOption
    /**
    * 应用ID
    *
    * @type {string}
    * @memberof CoolQ
    */
    APP_ID: string
    /**
     * 是否为调试模式。默认false
     *
     * @type {boolean}
     * @memberof CoolQ
     */
    debug: boolean
    /**
     *
     * 应用目录
     * @type {string}
     * @memberof CoolQ
     */
    appDirectory: string
    /**
    * 设置环境模式，用于区分生产环境和开发环境。
    *
    * @export
    * @param {boolean} debug
    */
    setDebug(debug: boolean) {
        this.debug = debug
        if (this.debug && this.APP_ID) {
            printTime(`[setDebug] 应用 ${this.APP_ID} 已开启debug模式，所有api调用都不会真正执行`, CQLog.LOG_INFO_SUCCESS)
        }
        // else {
        //     printTime(`[setDebug] 应用 ${this.APP_ID} 已关闭debug模式，api调用将真正执行`, CQLog.LOG_INFO_SUCCESS)
        // }
    }
    /**
     * 获取当前环境模式
     *
     * @export
     * @returns {boolean}
     */
    getDebug(): boolean {
        return this.debug
    }

    /**
     *
     * 在控制台调试输出日志。不推荐使用本方法,请使用log开头的方法
     * @param {LogLevel} level
     * @param {string} type
     * @param {string} content
     * @memberof CoolQ
     */
    private addLog(level: LogLevel, type: string, content: string): 0 {
        printTime(`[日志] 类型:${type} 内容:${content}`, level)
        return 0
    }
    /**
     * 调试日志
     *
     * @param {string} type
     * @param {string} content
     * @returns {0}
     * @memberof CoolQ
     */
    logDebug(type: string, content: string): 0 {
        return this.addLog(CQLog.LOG_DEBUG, type, content)
    }
    /**
     * 信息日志
     *
     * @param {string} type
     * @param {string} content
     * @returns {0}
     * @memberof CoolQ
     */
    logInfo(type: string, content: string): 0 {
        return this.addLog(CQLog.LOG_INFO, type, content)
    }
    /**
     * 接受信息日志
     *
     * @param {string} type
     * @param {string} content
     * @returns {0}
     * @memberof CoolQ
     */
    logInfoRecv(type: string, content: string): 0 {
        return this.addLog(CQLog.LOG_INFO_RECV, type, content)
    }
    /**
     *
     * 发送信息日志
     * @param {string} type
     * @param {string} content
     * @returns {0}
     * @memberof CoolQ
     */
    logInfoSend(type: string, content: string): 0 {
        return this.addLog(CQLog.LOG_INFO_SEND, type, content)
    }
    /**
     * 发送成功日志
     *
     * @param {string} type
     * @param {string} content
     * @returns {0}
     * @memberof CoolQ
     */
    logInfoSuccess(type: string, content: string): 0 {
        return this.addLog(CQLog.LOG_INFO_SUCCESS, type, content)
    }
    /**
     * 警告日志
     *
     * @param {string} type
     * @param {string} content
     * @returns {0}
     * @memberof CoolQ
     */
    logWarning(type: string, content: string): 0 {
        return this.addLog(CQLog.LOG_WARNING, type, content)
    }
    /**
     * 错误日志
     *
     * @param {string} type
     * @param {string} content
     * @returns {0}
     * @memberof CoolQ
     */
    logError(type: string, content: string): 0 {
        return this.addLog(CQLog.LOG_ERROR, type, content)
    }
    /**
     * 致命错误日志
     *
     * @param {string} type
     * @param {string} content
     * @returns {0}
     * @memberof CoolQ
     */
    logFatal(type: string, content: string): 0 {
        return this.addLog(CQLog.LOG_FATAL, type, content)
    }
    /**
   *
   * 酷Q基本操作（通过api方式调用）
   * @param {string} opName 操作名称
   * @param {Record<string, any>} param 参数
   * @param {number} [auth] 权限
   * @returns 对于无返回数据的仅返回状态码(retcode)，有返回数据的返回整个响应内容
   */
    private async cqBasicOperate(opName: string, param: Record<string, any>) {
        try {
            if (this.debug) {
                printTime(`[酷Q基本操作] 操作 ${opName} 已完成`, CQLog.LOG_INFO_SUCCESS)
                return 0
            }
            let auth = getAuth(opName)
            if (this.appOption.auth.includes(auth) || auth === 1) { // 判断是否有权限执行该操作
                if (bot.isReady()) {
                    let result = await bot(opName, param)
                    // return result
                    // 返回内容格式 {"data":{"message_id":273},"retcode":0,"status":"ok"}
                    if (opName.startsWith('send_')) {
                        return result
                    } else if (opName.startsWith('get_')) {
                        printTime(`执行函数 ${opName} , 参数:${JSON.stringify(param)} , 执行结果:${JSON.stringify(result)}`, CQLog.LOG_INFO_SUCCESS)
                        return result
                    } else {
                        printTime(`执行函数 ${opName} , 参数:${JSON.stringify(param)} , 执行结果:${JSON.stringify(result)}`, CQLog.LOG_INFO_SUCCESS)
                        return result.retcode
                    }
                } else {
                    printTime('[cq-robot]WebSocket连接还未建立，无法调用http-api', CQLog.LOG_ERROR)
                    return -999
                }
            } else {
                printTime(`[cq-robot]该插件没有权限执行 操作名称为：${opName}，权限值为 ${auth} 的操作`, CQLog.LOG_ERROR)
                return -998
            }
        } catch (error) {
            printTime(`[cq-robot]请求 ${opName} 发生错误`, CQLog.LOG_ERROR)
            console.error(error)
            return -1000
        }
    }
    /**
     * 取应用目录
     * 返回的路径末尾带 \\ 或 /
     * @returns {string}
     * @memberof CoolQ
     */
    getAppDirectory(): string {
        if (this.debug) {
            printTime(`[取应用目录] 返回:${this.appDirectory}`)
        }
        return this.appDirectory
    }
    /** ************   snake_case 下划线风格 *********** */
    /**
     * 发送私聊消息
     *
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {number} user_id 对方 QQ 号
     * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容，支持纯文本和数组格式
     * @returns {Promise<number>} 成功返回message_id，失败返回retcode
     * @memberof CoolQ
     */
    async send_private_msg(user_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number> {
        if (this.debug) {
            printTime(`[发送私聊消息] QQID:${user_id} msg:${JSON.stringify(message)}`, CQLog.LOG_DEBUG)
            return 0
        }
        // 返回内容格式 {"data":{"message_id":273},"retcode":0,"status":"ok"}
        let result = await this.cqBasicOperate('send_private_msg', {
            user_id,
            message
        })
        printTime(`[发送私聊消息] QQID:${user_id} msg:${JSON.stringify(message)} 执行结果:${JSON.stringify(result)}`, CQLog.LOG_INFO_SEND)
        if (result['status'] === 'ok') {
            return result['data']['message_id']
        } else {
            if (result['retcode'] > 0) {
                return -result['retcode'] - 1000  // 为了和message_id作区分，对于来自 HTTP API 插件的错误码取相反数 -1000 处理，即，原本为1的错误码，现在为-1001
            }
            return result['retcode']
        }
    }
    /**
     * 发送群消息
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {number} group_id 群号
     * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容，支持纯文本和数组格式
     * @returns 成功返回message_id，失败返回retcode
     * @memberof CoolQ
     */
    async send_group_msg(group_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number> {
        if (this.debug) {
            printTime(`[发送群消息] 群号:${group_id} msg:${JSON.stringify(message)}`, CQLog.LOG_DEBUG)
            return 0
        }
        let result = await this.cqBasicOperate('send_group_msg', {
            group_id,
            message
        })
        printTime(`[发送群消息] 群号:${group_id} msg:${JSON.stringify(message)} 执行结果:${JSON.stringify(result)}`, CQLog.LOG_INFO_SEND)
        if (result['status'] === 'ok') {
            return result['data']['message_id']
        } else {
            if (result['retcode'] > 0) {
                return -result['retcode'] - 1000  // 为了和message_id作区分，对于来自 HTTP API 插件的错误码取相反数 -1000 处理，即，原本为1的错误码，现在为-1001
            }
            return result['retcode']
        }
    }
    /**
     * 发送讨论组消息
     * 成功返回message_id，失败返回retcode
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {number} discuss_id 讨论组 ID（正常情况下看不到，需要从讨论组消息上报的数据中获得）
     * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容
     * @returns
     * @memberof CoolQ
     */
    async send_discuss_msg(discuss_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number> {
        if (this.debug) {
            printTime(`[发送讨论组消息] 讨论组号:${discuss_id} msg:${JSON.stringify(message)}`, CQLog.LOG_DEBUG)
            return 0
        }
        let result = await this.cqBasicOperate('send_discuss_msg', {
            discuss_id,
            message
        })
        printTime(`[发送讨论组消息] 讨论组号:${discuss_id} msg:${JSON.stringify(message)} 执行结果:${JSON.stringify(result)}`, CQLog.LOG_INFO_SEND)
        if (result['status'] === 'ok') {
            return result['data']['message_id']
        } else {
            if (result['retcode'] > 0) {
                return -result['retcode'] - 1000  // 为了和message_id作区分，对于来自 HTTP API 插件的错误码取相反数 -1000 处理，即，原本为1的错误码，现在为-1001
            }
            return result['retcode']
        }
    }
    /**
     * 撤回消息
     *
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @param {number} message_id 消息 ID
     * @returns
     * @memberof CoolQ
     */
    async delete_msg(message_id: number) {
        if (this.debug) {
            printTime(`[撤回消息] 消息ID:${message_id}`, CQLog.LOG_DEBUG)
            return 0
        }
        return this.cqBasicOperate('delete_msg', {
            message_id
        })
    }

    /**
     * 发送好友赞
     *
     * @param {number} user_id  对方 QQ 号
     * @param {number} times 赞的次数，每个好友每天最多 10 次，默认为1
     * @returns
     */
    async send_like(user_id: number, times: number = 1) {
        if (this.debug) {
            printTime(`[发送赞] QQID:${user_id} 次数:${times}`, CQLog.LOG_DEBUG)
            return 0
        }
        let result = this.cqBasicOperate('send_like', {
            user_id,
            times
        })
        printTime(`[发送赞] QQID:${user_id} 次数:${times} 执行结果:${JSON.stringify(result)}`, CQLog.LOG_INFO_SEND)
        if (result['status'] === 'ok') {
            return result['retcode']
        } else {
            return -1
        }
    }


    /**
     * 群组踢人
     *
     * @param {number} group_id 群号
     * @param {number} user_id  要踢的 QQ 号
     * @param {boolean} [reject_add_request=false] 拒绝此人的加群请求
     * @returns
     */
    async set_group_kick(group_id: number, user_id: number, reject_add_request: boolean = false) {
        if (this.debug) {
            printTime(`[置群员移除] 群号:${group_id} QQID:${user_id} 拒绝再加群:${reject_add_request}`)
            return 0
        }
        return this.cqBasicOperate('set_group_kick', {
            group_id,
            user_id,
            reject_add_request
        })
    }

    /**
     * 群组单人禁言
     *
     * @param {number} group_id 群号
     * @param {number} user_id  要禁言的 QQ 号
     * @param {number} [duration=30 * 60] 禁言时长，单位秒，0 表示取消禁言
     * @returns
     */
    async set_group_ban(group_id: number, user_id: number, duration: number = 30 * 60) {
        if (this.debug) {
            printTime(`[置群员禁言] 群号:${group_id} QQID:${user_id} 禁言时间:${duration}`)
            return 0
        }
        return this.cqBasicOperate('set_group_ban', {
            group_id,
            user_id,
            duration
        })
    }

    /**
     * 群组匿名用户禁言
     *
     * @param {number} group_id 群号
     * @param {string} anonymous_flag  要禁言的匿名用户的 flag（需从群消息上报的数据中获得）
     * @param {number}[duration=30 * 60] 禁言时长，单位秒，0 表示取消禁言
     * @returns
     */
    async set_group_anonymous_ban(group_id: number, anonymous_flag: string, duration: number = 30 * 60) {
        if (this.debug) {
            printTime(`[置匿名群员禁言] 群号:${group_id} 匿名:${anonymous_flag} 禁言时间:${duration}`)
            return 0
        }
        return this.cqBasicOperate('set_group_anonymous_ban', {
            group_id,
            anonymous_flag,
            duration
        })
    }

    /**
     *
     * 群组全员禁言
     * @param {number} group_id 群号
     * @param {boolean} [enable=true] 是否禁言
     * @returns
     */
    async set_group_whole_ban(group_id: number, enable: boolean = true) {
        if (this.debug) {
            printTime(`[置全群禁言] 群号:${group_id} 开启禁言:${enable}`)
            return 0
        }
        return this.cqBasicOperate('set_group_whole_ban', {
            group_id,
            enable
        })
    }
    /**
     * 群组设置管理员
     * @param {number} group_id 群号
     * @param {number} user_id
     * @param {boolean} [enable=true] 是否禁言
     * @returns
     */
    async set_group_admin(group_id: number, user_id: number, enable: boolean = true) {
        if (this.debug) {
            printTime(`[置群管理员] 群号:${group_id} QQID:${user_id} 成为管理员:${enable}`)
            return 0
        }
        return this.cqBasicOperate('set_group_admin', {
            group_id,
            user_id,
            enable
        })
    }


    /**
     * 群组匿名
     * @param {number} group_id 群号
     * @param {boolean} [enable=true] 是否允许匿名聊天
     * @returns
     */
    async set_group_anonymous(group_id: number, enable: boolean = true) {
        if (this.debug) {
            printTime(`[置群匿名设置] 群号:${group_id} 开启匿名:${enable}`)
            return 0
        }
        return this.cqBasicOperate('set_group_anonymous', {
            group_id,
            enable
        })
    }

    /**
     * 设置群名片（群备注）
     * @param {number} group_id 群号
     * @param {number} user_id 要设置的 QQ 号
     * @param {string} card 群名片内容，不填或空字符串表示删除群名片
     * @returns
     */
    async set_group_card(group_id: number, user_id: number, card: string = '') {
        if (this.debug) {
            printTime(`[置群成员名片] 群号:${group_id} QQID:${user_id} 新名片_昵称:${card} `)
            return 0
        }
        return this.cqBasicOperate('set_group_card', {
            group_id,
            user_id,
            card
        })
    }

    /**
     * 退出群组
     * @param {number} group_id 群号
     * @param {boolean} is_dismiss 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散
     * @returns
     */
    async set_group_leave(group_id: number, is_dismiss: boolean = false) {
        if (this.debug) {
            printTime(`[置群退出] 群号:${group_id} 是否解散:${is_dismiss} `)
            return 0
        }
        return this.cqBasicOperate('set_group_leave', {
            group_id,
            is_dismiss
        })
    }
    /**
     * 置群成员专属头衔；
     * Auth=128 需群主权限
     *
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @param {number} group_id 目标群
     * @param {number} user_id 目标QQ
     * @param {string} special_title 如果要删除，这里填空
     * @param {number} duration 专属头衔有效期，单位为秒。如果永久有效，这里填写-1
     * @returns
     * @memberof CoolQ
     */
    async set_group_special_title(group_id: number, user_id: number, special_title: string, duration: number) {
        if (this.debug) {
            printTime(`[置群成员专属头衔] 群号:${group_id} QQID:${user_id} 头衔:${special_title} 过期时间:${duration}`)
            return 0
        }
        return this.cqBasicOperate('set_group_special_title', {
            group_id, user_id,
            special_title, duration
        })
    }
    /**
     * 置讨论组退出
     * Auth=140
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @param {number} discuss_id 讨论组 ID（正常情况下看不到，需要从讨论组消息上报的数据中获得
     * @returns
     * @memberof CoolQ
     */
    async set_discuss_leave(discuss_id: number) {
        if (this.debug) {
            printTime(`[置讨论组退出] 讨论组号:${discuss_id}`)
            return 0
        }
        return this.cqBasicOperate('set_discuss_leave', {
            discuss_id
        })
    }
    /**
     *  置好友添加请求
     *
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @param {string} flag 加好友请求的 flag（需从上报的数据中获得）
     * @param {boolean} [approve=true] 是否同意请求
     * @param {string} remark 添加后的好友备注（仅在同意时有效）
     * @returns
     * @memberof CoolQ
     */
    async set_friend_add_request(flag: string, approve: boolean = true, remark: string) {
        if (this.debug) {
            printTime(`[置好友添加请求] 请求反馈标识:${flag} 反馈类型:${approve} 备注:${remark}`)
            return 0
        }
        return this.cqBasicOperate('set_friend_add_request', {
            flag, approve, remark
        })
    }
    /**
     *
     * 置群添加请求
     * @author CaoMeiYouRen
     * @date 2019-07-24
     * @param {string} flag 加群请求的 flag（需从上报的数据中获得）
     * @param {string} type add 或 invite，请求类型（需要和上报消息中的 sub_type 字段相符）
     * @param {boolean} [approve=true] 是否同意请求／邀请
     * @param {string} reason 拒绝理由（仅在拒绝时有效）
     * @returns
     * @memberof CoolQ
     */
    async set_group_add_request(flag: string, type: string, approve: boolean = true, reason: string = '') {
        if (this.debug) {
            printTime(`[置群添加请求] 请求反馈标识:${flag} 请求类型:${type}反馈类型:${approve} 理由:${reason}`)
            return 0
        }
        return this.cqBasicOperate('set_group_add_request', {
            flag, type, approve, reason
        })
    }
    /**
     * 获取登录号信息
     *
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @returns {Promise<{ user_id: number; nickname: string; }>}
     * @memberof CoolQ
     */
    async get_login_info(): Promise<{ user_id: number; nickname: string; }> {
        if (this.debug) {
            let info = {
                user_id: 10001,
                nickname: '酷Q'
            }
            printTime(`[取登录号信息] qq:${info.user_id} 昵称:${info.nickname}`)
            return info
        }
        let result = await this.cqBasicOperate('get_login_info', {
        })
        if (result['status'] === 'ok') {
            return result['data']
        } else {
            return {
                user_id: -1,
                nickname: ''
            }
        }
    }
    /**
     * 取登录QQ
     *
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @returns {Promise<number>}
     * @memberof CoolQ
     */
    async get_login_qq(): Promise<number> {
        if (this.debug) {
            printTime('[取登录QQ] 返回:10001')
            return 10001
        }
        let result = await this.get_login_info()
        return result.user_id
    }
    /**
     *取登录昵称
     *
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @returns {Promise<string>}
     * @memberof CoolQ
     */
    async get_login_nick(): Promise<string> {
        if (this.debug) {
            printTime('[取登录昵称] 返回:酷Q')
            return '酷Q'
        }
        let result = await this.get_login_info()
        return result.nickname
    }
    /**
     *获取陌生人信息
     *
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @param {number} user_id QQ 号
     * @param {boolean} [no_cache=false] 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
     * @returns {Promise<QQInfo>}
     * @memberof CoolQ
     */
    async get_stranger_info(user_id: number, no_cache: boolean = false): Promise<QQInfo> {
        if (this.debug) {
            let testStranger: QQInfo = {
                user_id,
                nickname: '测试昵称',
                sex: 'male',
                age: 0
            }
            printTime(`[取陌生人信息] 本函数请在酷Q中测试 QQID:${user_id} 不使用缓存:${no_cache} 返回:${JSON.stringify(testStranger)}`)
            return testStranger
        }
        let result = await this.cqBasicOperate('get_stranger_info', {
            user_id, no_cache
        })
        if (result['status'] === 'ok') {
            return result['data']
        } else {
            return new QQInfo(-1, '', 'male', 0)
        }
    }
    /**
     * 获取群列表
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<Array<GroupInfo>>}
     * @memberof CoolQ
     */
    async get_group_list(): Promise<Array<GroupInfo>> {
        if (this.debug) {
            let testGroupList: Array<GroupInfo> = [
                {
                    group_id: 10001,
                    group_name: '测试群1'
                }
            ]
            printTime(`[取群列表] 本函数请在酷Q中测试 返回:${JSON.stringify(testGroupList)}`)
            return testGroupList
        }
        let result = await this.cqBasicOperate('get_group_list', {
        })
        if (result['status'] === 'ok') {
            return result['data']
        } else {
            return []
        }
    }
    /**
     *取群成员信息
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {number} group_id 群号
     * @param {number} user_id QQ 号
     * @param {boolean} no_cache 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
     * @returns {Promise<MemberInfo>}
     * @memberof CoolQ
     */
    async get_group_member_info(group_id: number, user_id: number, no_cache: boolean = false): Promise<MemberInfo> {
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
            printTime(`[取群成员信息] 本函数请在酷Q中测试 群号:${group_id} QQID:${user_id} 不使用缓存:${no_cache} 返回:${JSON.stringify(testMemberInfo)}`)
            return testMemberInfo
        }
        let result = await this.cqBasicOperate('get_group_member_info', {
            group_id, user_id, no_cache
        })
        if (result['status'] === 'ok') {
            return result['data']
        } else {
            return new MemberInfo()
        }
    }
    /**
     *取群成员列表
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {number} group_id
     * @returns {Promise<Array<MemberInfo>>} 响应内容为 JSON 数组，每个元素的内容和上面的 /get_group_member_info 接口相同，但对于同一个群组的同一个成员，获取列表时和获取单独的成员信息时，某些字段可能有所不同，例如 area、title 等字段在获取列表时无法获得，具体应以单独的成员信息为准。
     * @memberof CoolQ
     */
    async get_group_member_list(group_id: number): Promise<Array<MemberInfo>> {
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
            printTime(`[取群成员信息] 本函数请在酷Q中测试 群号:${group_id}返回:${JSON.stringify(testMemberInfo)}`)
            return testMemberInfo
        }
        let result = await this.cqBasicOperate('get_group_member_list', {
            group_id
        })
        if (result['status'] === 'ok') {
            return result['data']
        } else {
            return []
        }
    }
    /**
     *取Cookies;Auth=20 慎用,此接口需要严格授权
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<string>}
     * @memberof CoolQ
     */
    async get_cookies(): Promise<string> {
        if (this.debug) {
            printTime('[取Cookies] 本函数请在酷Q中测试 返回:""')
            return ''
        }
        let result = await this.cqBasicOperate('get_cookies', {
        })
        if (result['status'] === 'ok') {
            return result['data']['cookies']
        } else {
            return ''
        }
    }

    /**
     *取CsrfToken Auth=20 即QQ网页用到的bkn/g_tk等 慎用,此接口需要严格授权 //getCsrfToken
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<string>}
     * @memberof CoolQ
     */
    async get_csrf_token(): Promise<number> {
        if (this.debug) {
            printTime('[取CsrfToken] 本函数请在酷Q中测试 返回:0')
            return 0
        }
        let result = await this.cqBasicOperate('get_csrf_token', {
        })
        if (result['status'] === 'ok') {
            return result['data']['token']
        } else {
            return 0
        }
    }

    /**
     * 接收语音。
     * 其实并不是真的获取语音，而是转换语音到指定的格式，然后返回语音文件名（data\record 目录下）。注意，要使用此接口，需要安装 酷Q 的 语音组件。
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {string} file 收到的语音文件名（CQ 码的 file 参数），如 0B38145AA44505000B38145AA4450500.silk
     * @param {string} out_format 要转换到的格式，目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac
     * @param {boolean} full_path 是否返回文件的绝对路径（Windows 环境下建议使用，Docker 中不建议）
     * @returns {Promise<string>} 转换后的语音文件名或路径，如 0B38145AA44505000B38145AA4450500.mp3，如果开启了 full_path，则如 C:\Apps\CoolQ\data\record\0B38145AA44505000B38145AA4450500.mp3
     * @memberof CoolQ
     */
    async get_record(file: string, out_format: string, full_path: boolean = false): Promise<string> {
        if (this.debug) {
            printTime(`[接收语音] 本函数请在酷Q中测试 文件名:${file} 指定格式:${out_format} 是否返回文件的绝对路径:${full_path}`)
            return ''
        }
        let result = await this.cqBasicOperate('get_record', {
            file, out_format, full_path
        })
        if (result['status'] === 'ok') {
            return result['data']['file']
        } else {
            return ''
        }
    }
    /**
     *接收图片；
     *Auth=30 收到的图片文件名（CQ 码的 file 参数），如 6B4DE3DFD1BD271E3297859D41C530F5.jpg
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {string} file
     * @returns {Promise<string>} 下载后的图片文件路径，如 C:\Apps\CoolQ\data\image\6B4DE3DFD1BD271E3297859D41C530F5.jpg
     * @memberof CoolQ
     */
    async get_image(file: string): Promise<string> {
        if (this.debug) {
            printTime(`[接收图片] 本函数请在酷Q中测试 文件名:${file}`)
            return ''
        }
        let result = await this.cqBasicOperate('get_image', {
            file
        })
        if (result['status'] === 'ok') {
            return result['data']['file']
        } else {
            return ''
        }
    }
    /**
     *是否可以发送图片
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<boolean>}
     * @memberof CoolQ
     */
    async can_send_image(): Promise<boolean> {
        if (this.debug) {
            printTime(`[是否支持发送图片] 本函数请在酷Q中测试 返回:${true}`)
            return true
        }
        let result = await this.cqBasicOperate('can_send_image', {
        })
        if (result['status'] === 'ok') {
            return result['data']['yes']
        } else {
            return false
        }
    }
    /**
    *是否可以发送语音
    *
    * @author CaoMeiYouRen
    * @date 2019-07-13
    * @returns {Promise<boolean>}
    * @memberof CoolQ
    */
    async can_send_record(): Promise<boolean> {
        if (this.debug) {
            printTime(`[是否支持发送语音] 本函数请在酷Q中测试 返回:${true}`)
            return true
        }
        let result = await this.cqBasicOperate('can_send_record', {
        })
        if (result['status'] === 'ok') {
            return result['data']['yes']
        } else {
            return false
        }
    }

    /**
     *取插件运行状态
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<HttpApiStatus>} 通常情况下建议只使用 online 和 good 这两个字段来判断运行状态，因为随着插件的更新，其它字段有可能频繁变化。
     * @memberof CoolQ
     */
    async get_status(): Promise<HttpApiStatus> {
        if (this.debug) {
            let testStatus: HttpApiStatus = {
                app_initialized: true,
                app_enabled: true,
                plugins_good: {},
                app_good: true,
                online: true,
                good: true,
            }
            printTime(`[取插件运行状态] 本函数请在酷Q中测试 返回:${JSON.stringify(testStatus)}`)
            return testStatus
        }
        let result = await this.cqBasicOperate('get_status', {
        })
        if (result['status'] === 'ok') {
            return result['data']
        } else {
            let status: HttpApiStatus = {
                app_initialized: false,
                app_enabled: false,
                plugins_good: {},
                app_good: false,
                online: false,
                good: false,
            }
            return status
        }
    }
    /**
     *取 酷Q 及 HTTP API 插件的版本信息
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<HttpApiInfo>}
     * @memberof CoolQ
     */
    async get_version_info(): Promise<HttpApiInfo> {
        if (this.debug) {
            let testInfo: HttpApiInfo = {
                coolq_directory: '',
                coolq_edition: 'air',
                plugin_version: '4.10',
                plugin_build_number: 100,
                plugin_build_configuration: 'debug',

            }
            printTime(`[取酷Q及HTTP_API插件的版本信息] 本函数请在酷Q中测试 返回:${JSON.stringify(testInfo)}`)
            return testInfo
        }
        let result = await this.cqBasicOperate('get_version_info', {
        })
        if (result['status'] === 'ok') {
            return result['data']
        } else {
            return new HttpApiInfo()
        }
    }

    /**
     *重启 HTTP API 插件；
     *由于重启插件同时需要重启 API 服务，这意味着当前的 API 请求会被中断，因此需在异步地重启插件，接口返回的 status 是 async。
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {number} [delay=0]
     * @returns
     * @memberof CoolQ
     */
    async set_restart_plugin(delay: number = 0) {
        if (this.debug) {
            printTime(`[重启HTTP_API插件] 本函数请在酷Q中测试 延时:${delay} 返回:重启成功！`)
            return 1
        }
        return this.cqBasicOperate('set_restart_plugin', {
            delay
        })
    }

    /**
     *清理数据目录
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {string} data_dir 要清理的目录名，支持 image、record、show、bface
     * @returns
     * @memberof CoolQ
     */
    async clean_data_dir(data_dir: 'image' | 'record' | 'show' | 'bface') {
        if (this.debug) {
            printTime(`[清理数据目录] 本函数请在酷Q中测试 清理的目录名:${data_dir}`)
            return 0
        }
        return this.cqBasicOperate('clean_data_dir', {
        })
    }
    /**
     *清理插件日志
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns
     * @memberof CoolQ
     */
    async clean_plugin_log() {
        if (this.debug) {
            printTime('[清理插件日志] 本函数请在酷Q中测试')
            return 0
        }
        return this.cqBasicOperate('clean_plugin_log', {
        })
    }
    /** *********  camelCase 小驼峰风格  ***************/
    /**
    * 发送私聊消息
    *
    * @author CaoMeiYouRen
    * @date 2019-07-10
    * @param {number} user_id 对方 QQ 号
    * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容，支持纯文本和数组格式
    * @returns {Promise<number>} 成功返回message_id，失败返回retcode
    * @memberof CoolQ
    */
    async sendPrivateMsg(user_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number> {
        return this.send_private_msg(user_id, message)
    }
    /**
    * 发送群消息
    * @author CaoMeiYouRen
    * @date 2019-07-10
    * @param {number} group_id 群号
    * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容，支持纯文本和数组格式
    * @returns 成功返回message_id，失败返回retcode
    * @memberof CoolQ
    */
    async sendGroupMsg(group_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number> {
        return this.send_group_msg(group_id, message)
    }
    /**
     * 发送讨论组消息
     * 成功返回message_id，失败返回retcode
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {number} discuss_id 讨论组 ID（正常情况下看不到，需要从讨论组消息上报的数据中获得）
     * @param {(string | CQMessage | Array<CQMessage>)} message 要发送的内容
     * @returns
     * @memberof CoolQ
     */
    async sendDiscussMsg(discuss_id: number, message: string | CQMessage | Array<CQMessage>): Promise<number> {
        return this.send_discuss_msg(discuss_id, message)
    }
    /**
    * 撤回消息
    *
    * @author CaoMeiYouRen
    * @date 2019-07-12
    * @param {number} message_id 消息 ID
    * @returns
    * @memberof CoolQ
    */
    async deleteMsg(message_id: number) {
        return this.delete_msg(message_id)
    }
    /**
    * 发送好友赞
    *
    * @param {number} user_id  对方 QQ 号
    * @param {number} times 赞的次数，每个好友每天最多 10 次，默认为1
    * @returns
    */
    async sendLike(user_id: number, times: number = 1) {
        return this.send_like(user_id, times)
    }
    /**
    * 群组踢人
    *
    * @param {number} group_id 群号
    * @param {number} user_id  要踢的 QQ 号
    * @param {boolean} [reject_add_request=false] 拒绝此人的加群请求
    * @returns
    */
    async setGroupKick(group_id: number, user_id: number, reject_add_request: boolean = false) {
        return this.set_group_kick(group_id, user_id, reject_add_request)
    }
    /**
     * 群组单人禁言
     *
     * @param {number} group_id 群号
     * @param {number} user_id  要禁言的 QQ 号
     * @param {number} [duration=30 * 60] 禁言时长，单位秒，0 表示取消禁言
     * @returns
     */
    async setGroupBan(group_id: number, user_id: number, duration: number = 30 * 60) {
        return this.set_group_ban(group_id, user_id, duration)
    }
    /**
   * 群组匿名用户禁言
   *
   * @param {number} group_id 群号
   * @param {string} anonymous_flag  要禁言的匿名用户的 flag（需从群消息上报的数据中获得）
   * @param {number}[duration=30 * 60] 禁言时长，单位秒，0 表示取消禁言
   * @returns
   */
    async setGroupAnonymousBan(group_id: number, anonymous_flag: string, duration: number = 30 * 60) {
        return this.set_group_anonymous_ban(group_id, anonymous_flag, duration)
    }

    /**
     *
     * 群组全员禁言
     * @param {number} group_id 群号
     * @param {boolean} [enable=true] 是否禁言
     * @returns
     */
    async setGroupWholeBan(group_id: number, enable: boolean = true) {
        return this.set_group_whole_ban(group_id, enable)
    }
    /**
     * 群组设置管理员
     * @param {number} group_id 群号
     * @param {number} user_id
     * @param {boolean} [enable=true] 是否禁言
     * @returns
     */
    async setGroupAdmin(group_id: number, user_id: number, enable: boolean = true) {
        return this.set_group_admin(group_id, user_id, enable)
    }
    /**
      * 群组匿名
      * @param {number} group_id 群号
      * @param {boolean} [enable=true] 是否允许匿名聊天
      * @returns
      */
    async setGroupAnonymous(group_id: number, enable: boolean = true) {
        return this.set_group_anonymous(group_id, enable)
    }
    /**
    * 设置群名片（群备注）
    * @param {number} group_id 群号
    * @param {number} user_id 要设置的 QQ 号
    * @param {string} card 群名片内容，不填或空字符串表示删除群名片
    * @returns
    */
    async setGroupCard(group_id: number, user_id: number, card: string = '') {
        return this.set_group_card(group_id, user_id, card)
    }
    /**
    * 退出群组
    * @param {number} group_id 群号
    * @param {boolean} is_dismiss 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散
    * @returns
    */
    async setGroupLeave(group_id: number, is_dismiss: boolean = false) {
        return this.set_group_leave(group_id, is_dismiss)
    }
    /**
   * 置群成员专属头衔；
   * Auth=128 需群主权限
   *
   * @author CaoMeiYouRen
   * @date 2019-07-12
   * @param {number} group_id 目标群
   * @param {number} user_id 目标QQ
   * @param {string} special_title 如果要删除，这里填空
   * @param {number} duration 专属头衔有效期，单位为秒。如果永久有效，这里填写-1
   * @returns
   * @memberof CoolQ
   */
    async setGroupSpecialTitle(group_id: number, user_id: number, special_title: string, duration: number) {
        return this.set_group_special_title(group_id, user_id, special_title, duration)
    }
    /**
    * 置讨论组退出
    * Auth=140
    * @author CaoMeiYouRen
    * @date 2019-07-12
    * @param {number} discuss_id 讨论组 ID（正常情况下看不到，需要从讨论组消息上报的数据中获得
    * @returns
    * @memberof CoolQ
    */
    async setDiscussLeave(discuss_id: number) {
        return this.set_discuss_leave(discuss_id)
    }
    /**
    *  置好友添加请求
    *
    * @author CaoMeiYouRen
    * @date 2019-07-12
    * @param {string} flag 加好友请求的 flag（需从上报的数据中获得）
    * @param {boolean} [approve=true] 是否同意请求
    * @param {string} remark 添加后的好友备注（仅在同意时有效）
    * @returns
    * @memberof CoolQ
    */
    async setFriendAddRequest(flag: string, approve: boolean = true, remark: string) {
        return this.set_friend_add_request(flag, approve, remark)
    }

    /**
     *
     * 置群添加请求
     * @author CaoMeiYouRen
     * @date 2019-07-24
     * @param {string} flag 加群请求的 flag（需从上报的数据中获得）
     * @param {string} type add 或 invite，请求类型（需要和上报消息中的 sub_type 字段相符）
     * @param {boolean} [approve=true] 是否同意请求／邀请
     * @param {string} reason 拒绝理由（仅在拒绝时有效）
     * @returns
     * @memberof CoolQ
     */
    async setGroupAddRequest(flag: string, type: string, approve: boolean = true, reason: string = '') {
        return this.set_group_add_request(flag, type, approve, reason)
    }
    /**
    * 获取登录号信息
    *
    * @author CaoMeiYouRen
    * @date 2019-07-12
    * @returns {Promise<{ user_id: number; nickname: string; }>}
    * @memberof CoolQ
    */
    async getLoginInfo(): Promise<{ user_id: number; nickname: string; }> {
        return this.get_login_info()
    }
    /**
    * 取登录QQ
    *
    * @author CaoMeiYouRen
    * @date 2019-07-12
    * @returns {Promise<number>}
    * @memberof CoolQ
    */
    async getLoginQq(): Promise<number> {
        return this.get_login_qq()
    }
    /**
   *取登录昵称
   *
   * @author CaoMeiYouRen
   * @date 2019-07-12
   * @returns {Promise<string>}
   * @memberof CoolQ
   */
    async getLoginNick(): Promise<string> {
        return this.get_login_nick()
    }
    /**
     *获取陌生人信息
     *
     * @author CaoMeiYouRen
     * @date 2019-07-12
     * @param {number} user_id QQ 号
     * @param {boolean} [no_cache=false] 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
     * @returns {Promise<QQInfo>}
     * @memberof CoolQ
     */
    async getStrangerInfo(user_id: number, no_cache: boolean = false): Promise<QQInfo> {
        return this.get_stranger_info(user_id, no_cache)
    }
    /**
    * 获取群列表
    *
    * @author CaoMeiYouRen
    * @date 2019-07-13
    * @returns {Promise<Array<GroupInfo>>}
    * @memberof CoolQ
    */
    async getGroupList(): Promise<Array<GroupInfo>> {
        return this.get_group_list()
    }
    /**
   *获取群成员信息
   *
   * @author CaoMeiYouRen
   * @date 2019-07-13
   * @param {number} group_id 群号
   * @param {number} user_id QQ 号
   * @param {boolean} no_cache 是否不使用缓存（使用缓存可能更新不及时，但响应更快）
   * @returns {Promise<MemberInfo>}
   * @memberof CoolQ
   */
    async getGroupMemberInfo(group_id: number, user_id: number, no_cache: boolean): Promise<MemberInfo> {
        return this.get_group_member_info(group_id, user_id, no_cache)
    }
    /**
     *取群成员列表
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {number} group_id
     * @returns {Promise<Array<MemberInfo>>} 响应内容为 JSON 数组，每个元素的内容和上面的 /get_group_member_info 接口相同，但对于同一个群组的同一个成员，获取列表时和获取单独的成员信息时，某些字段可能有所不同，例如 area、title 等字段在获取列表时无法获得，具体应以单独的成员信息为准。
     * @memberof CoolQ
     */
    async getGroupMemberList(group_id: number): Promise<Array<MemberInfo>> {
        return this.get_group_member_list(group_id)
    }
    /**
     *取Cookies;Auth=20 慎用,此接口需要严格授权
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<string>}
     * @memberof CoolQ
     */
    async getCookies(): Promise<string> {
        return this.get_cookies()
    }
    /**
     *取CsrfToken Auth=20 即QQ网页用到的bkn/g_tk等 慎用,此接口需要严格授权 //getCsrfToken
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<string>}
     * @memberof CoolQ
     */
    async getCsrfToken(): Promise<number> {
        return this.get_csrf_token()
    }
    /**
   * 接收语音。
   * 其实并不是真的获取语音，而是转换语音到指定的格式，然后返回语音文件名（data\record 目录下）。注意，要使用此接口，需要安装 酷Q 的 语音组件。
   * @author CaoMeiYouRen
   * @date 2019-07-13
   * @param {string} file 收到的语音文件名（CQ 码的 file 参数），如 0B38145AA44505000B38145AA4450500.silk
   * @param {string} out_format 要转换到的格式，目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac
   * @param {boolean} full_path 是否返回文件的绝对路径（Windows 环境下建议使用，Docker 中不建议）
   * @returns {Promise<string>} 转换后的语音文件名或路径，如 0B38145AA44505000B38145AA4450500.mp3，如果开启了 full_path，则如 C:\Apps\CoolQ\data\record\0B38145AA44505000B38145AA4450500.mp3
   * @memberof CoolQ
   */
    async getRecord(file: string, out_format: string, full_path: boolean): Promise<string> {
        return this.get_record(file, out_format, full_path)
    }
    /**
     *接收图片；
     *Auth=30 收到的图片文件名（CQ 码的 file 参数），如 6B4DE3DFD1BD271E3297859D41C530F5.jpg
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {string} file
     * @returns {Promise<string>} 下载后的图片文件路径，如 C:\Apps\CoolQ\data\image\6B4DE3DFD1BD271E3297859D41C530F5.jpg
     * @memberof CoolQ
     */
    async getImage(file: string): Promise<string> {
        return this.get_image(file)
    }
    /**
     *是否可以发送图片
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<boolean>}
     * @memberof CoolQ
     */
    async canSendImage(): Promise<boolean> {
        return this.can_send_image()
    }
    /**
   *是否可以发送语音
   *
   * @author CaoMeiYouRen
   * @date 2019-07-13
   * @returns {Promise<boolean>}
   * @memberof CoolQ
   */
    async canSendRecord(): Promise<boolean> {
        return this.can_send_record()
    }
    /**
     *取插件运行状态
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<HttpApiStatus>} 通常情况下建议只使用 online 和 good 这两个字段来判断运行状态，因为随着插件的更新，其它字段有可能频繁变化。
     * @memberof CoolQ
     */
    async getStatus(): Promise<HttpApiStatus> {
        return this.get_status()
    }

    /**
     *取 酷Q 及 HTTP API 插件的版本信息
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns {Promise<HttpApiInfo>}
     * @memberof CoolQ
     */
    async getVersionInfo(): Promise<HttpApiInfo> {
        return this.get_version_info()
    }
    /**
     *重启 HTTP API 插件；
     *由于重启插件同时需要重启 API 服务，这意味着当前的 API 请求会被中断，因此需在异步地重启插件，接口返回的 status 是 async。
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {number} [delay=0]
     * @returns
     * @memberof CoolQ
     */
    async setRestartPlugin(delay: number = 0) {
        return this.set_restart_plugin(delay)
    }

    /**
     *清理数据目录
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @param {string} data_dir 要清理的目录名，支持 image、record、show、bface
     * @returns
     * @memberof CoolQ
     */
    async cleanDataDir(data_dir: 'image' | 'record' | 'show' | 'bface') {
        return this.clean_data_dir(data_dir)
    }
    /**
     *清理插件日志
     *
     * @author CaoMeiYouRen
     * @date 2019-07-13
     * @returns
     * @memberof CoolQ
     */
    async cleanPluginLog() {
        return this.clean_plugin_log()
    }
}