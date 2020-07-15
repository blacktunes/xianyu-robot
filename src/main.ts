import { CQApp, CQWebSocketInit, printTime, CQLog, CQMsg } from './cq-robot'
import CQWebSocket, { CQWebSocketOption } from 'cq-websocket'

interface config {
  token?: string
  host?: string
  port?: number
  plugins?: Array<Function>
  init?: Array<Function>
}

export default class Bot extends CQApp {
  constructor(config: config) {
    super()

    if (config.token) {
      this.CQWebSocketOption.accessToken = config.token
    }

    if (config.host) {
      this.CQWebSocketOption.host = config.host
    }

    if (config.port) {
      this.CQWebSocketOption.port = config.port
    }

    this.handleMsg = async (...args): Promise<0 | 1> => {
      if (config.plugins && config.plugins.length > 0) {
        for (let i in config.plugins) {
          if (config.plugins[i](...args) === 0) {
            break
          }
          return CQMsg.MSG_INTERCEPT
        }
        return CQMsg.MSG_IGNORE
      }
    }

    this.enable = (): 0 => {
      if (config.init && config.init.length > 0) {
        config.init.forEach(async fn => {
          await fn()
        })
        return 0
      }
    }
  }

  CQWebSocketOption: CQWebSocketOption = {
    accessToken: '', // API 访问 token 。见 CQHTTP API 之配置文件说明
    enableAPI: true, // 启用 /api 连线
    enableEvent: true, // 启用 /event 连线
    protocol: 'ws:', // 协议名
    host: '127.0.0.1', // '127.0.0.1' 酷Q服务器 IP
    port: 6700, // 酷Q服务器端口
    baseUrl: '', // 酷Q服务器位址 (SDK在建立连线时会依照此设定加上前缀项 ws:// 及后缀项 `/<api
    qq: -1, // 触发 @me 事件用的QQ帐号，通常同登入酷Q之帐号，用在讨论组消息及群消息中辨认是否有人at此帐号
    reconnection: true, // 是否连线错误时自动重连
    reconnectionAttempts: 1000, // Infinity 连续连线失败的次数不超过这个值
    reconnectionDelay: 1000, // 重复连线的延迟时间, 单位: ms
    fragmentOutgoingMessages: false, // 由于 CQHTTP API 插件的 websocket 服务器尚未支持 fragment, 故建议维持 false 禁用 fragment。※详情请见 WebSocketClient 选项说明。
    fragmentationThreshold: 16000, // 0x4000 每个 frame 的最大容量, 默认为 16 KiB, 单位: byte※详情请见 WebSocketClient 选项说明。
    tlsOptions: {}, // 若需调用安全连线 https.request 时的选项
    requestOptions: { // 调用 API 方法时的全局默认选项。
      timeout: 120000
    }
  }

  async handleMsg(from: number, fromQQ: number, msg: string, type: 0 | 1): Promise<0 | 1> {
    return CQMsg.MSG_IGNORE
  }

  async init(): Promise<void> {}

  async groupMsg(_subType: string, _msgId: number, fromGroup: number, fromQQ: number, _fromAnonymous: string, msg: string, _font: number): Promise<0 | 1> {
    return await this.handleMsg(fromGroup, fromQQ, msg, 1)
  }

  async discussMsg(_subType: string, _msgId: number, fromDiscuss: number, fromQQ: number, msg: string, _font: number): Promise<0 | 1> {
    return await this.handleMsg(fromDiscuss, fromQQ, msg, 0)
  }

  enable(): 0 {
    return 0
  }

  start() {
    // 链接酷Q
    const bot: CQWebSocket = CQWebSocketInit(this.CQWebSocketOption)
    this.startup()
    printTime(`[应用] 应用已载入`, CQLog.LOG_INFO_SUCCESS)
    bot.on('ready', () => {
      printTime('[WebSocket] 连接成功！', CQLog.LOG_INFO)
      this.enable()
      printTime(`[应用] 应用已启动`, CQLog.LOG_INFO_SUCCESS)
    })
    bot.on('message.private', async (_event, c, _tags) => {
      printTime(`[接收私聊消息] 类型:${c.sub_type} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
      await this.privateMsg(c.sub_type, c.message_id, c.user_id, c.message, c.font)
    })
    bot.on('message.group', async (_event, c, _tags) => {
      printTime(`[接收群聊消息] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
      let flag = c.anonymous ? c.anonymous.flag : ''
      await this.groupMsg(c.sub_type, c.message_id, c.group_id, c.user_id, flag, c.message, c.font)
    })
    bot.on('message.discuss', async (_event, c, _tags) => {
      printTime(`[接收讨论组消息] discussId:${c.discuss_id} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
      await this.discussMsg('discuss', c.message_id, c.discuss_id, c.user_id, c.message, c.font)
    })
    bot.on('notice.group_upload', async (c) => {
      printTime(`[群文件上传] groupId:${c.group_id} QQId:${c.user_id} file:${JSON.stringify(c.file)}`, CQLog.LOG_INFO_RECV)
      await this.groupUpload('group_upload', c.time, c.group_id, c.user_id, c.file)
    })
    bot.on('notice.group_admin', async (c) => {
      printTime(`[群管理员变动] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id}`, CQLog.LOG_INFO_RECV)
      await this.groupAdmin(c.sub_type, c.time, c.group_id, c.user_id)
    })
    bot.on('notice.group_decrease', async (c) => {
      printTime(`[群成员减少] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.operator_id} 离开者QQ:${c.user_id}`, CQLog.LOG_INFO_RECV)
      await this.groupDecrease(c.sub_type, c.time, c.group_id, c.operator_id, c.user_id)
    })
    bot.on('notice.group_increase', async (c) => {
      printTime(`[群成员增加] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.operator_id} 加入者QQ:${c.user_id}`, CQLog.LOG_INFO_RECV)
      await this.groupIncrease(c.sub_type, c.time, c.group_id, c.operator_id, c.user_id)
    })
    bot.on('notice.friend_add', async (c) => {
      printTime(`[好友添加] QQId:${c.user_id}`, CQLog.LOG_INFO_RECV)
      await this.friendAdd('friend_add', c.time, c.user_id)
    })
    bot.on('request.friend', async (c) => {
      printTime(`[加好友请求] QQId:${c.user_id} 验证信息:${c.comment}`, CQLog.LOG_INFO_RECV)
      await this.requestAddFriend('request_add_friend', c.time, c.user_id, c.comment, c.flag)
    })
    bot.on('request.group', async (c) => {
      printTime(`[加群请求／邀请] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} 验证信息:${c.comment}`, CQLog.LOG_INFO_RECV)
      await this.requestAddGroup(c.sub_type, c.time, c.group_id, c.user_id, c.comment, c.flag)
    })
    bot.on('socket.closing', (_attempts) => {
      if (this.isEnable) {
        this.disable()
        printTime(`[应用] ${this.APP_ID}已停用`, CQLog.LOG_INFO)
      }
    })
    bot.on('socket.close', (_socketType, _attempts) => {
      this.exit()
      printTime(`[应用] ${this.APP_ID}已关闭`, CQLog.LOG_INFO)
    })
    bot.on('meta_event.heartbeat', async (_context) => {//响应心跳连接
      try {
        let result = await bot('get_status')
        printTime(`API调用测试：get_status:${result.status}`, CQLog.LOG_DEBUG)
        if (result.status !== 'ok') {
          printTime('发生了异常', CQLog.LOG_ERROR)
        }
      } catch (error) {
        printTime('发生了异常', CQLog.LOG_ERROR)
      }
    })
    this.start = function () {
      throw new Error('请勿重复启动')
    }
  }
}
