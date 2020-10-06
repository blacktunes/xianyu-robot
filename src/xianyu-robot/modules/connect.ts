import CQWebSocket, { CQWebSocketOption } from 'cq-websocket'
import { App } from '../App'
import { Log, printLog } from './printLog'

export default function connect(app: App, CQWebSocketOption: CQWebSocketOption) {
  return new Promise<void>(resolve => {
    app.API.bot = new CQWebSocket(CQWebSocketOption)
    app.API.bot.on('socket.connecting', (socketType, attempts) => {
      printLog(`[WebSocket] ${socketType} 尝试第${attempts}次连线`, Log.INFO)
    }).on('socket.connect', (socketType, sock, attempts) => {
      printLog(`[WebSocket] ${socketType} 第${attempts}次连线尝试成功`, Log.INFO_SUCCESS)
    }).on('socket.failed', (socketType, attempts) => {
      printLog(`[WebSocket] ${socketType} 第${attempts}次连线尝试失败 `, Log.WARNING)
    }).on('socket.error', (socketType, error) => {
      printLog(`[WebSocket] ${socketType} 连线出现了socket.error错误！！`, Log.ERROR)
      console.error(error)
    }).on('error', (error) => {
      printLog('[WebSocket] 连线出现了error！！', Log.FATAL)
      console.error(error)
    })
    app.API.bot.connect()

    app.startup()

    app.API.bot.on('ready', async () => {
      printLog('[WebSocket] 连接成功！', Log.INFO)
      await app.enable()
      resolve()
      printLog(`[应用] Bot已启动`, Log.INFO_SUCCESS)
    })

    app.API.bot.on('message.private', async (_event, c, _tags) => {
      printLog(`[接收私聊消息] 类型:${c.sub_type} 昵称: ${c.sender.nickname} QQ:${c.user_id} msg:${c.message}`, Log.INFO_RECV)
      await app.privateMsg(c.sub_type, c.message_id, c.user_id, c.message)
    })

    app.API.bot.on('message.group', async (_event, c, _tags) => {
      printLog(`[接收群聊消息] 类型:${c.sub_type} GroupId:${c.group_id} 昵称: ${c.sender.card || c.sender.nickname} QQ:${c.user_id} msg:${c.message}`, Log.INFO_RECV)
      const flag = c.anonymous ? c.anonymous.flag : ''
      await app.groupMsg(c.sub_type, c.message_id, c.group_id, c.user_id, flag, c.message)
    })

    app.API.bot.on('notice.group_upload', async (c) => {
      printLog(`[群文件上传] groupId:${c.group_id} QQId:${c.user_id} file:${JSON.stringify(c.file)}`, Log.INFO_RECV)
      await app.groupUpload('group_upload', c.time, c.group_id, c.user_id, c.file)
    })

    app.API.bot.on('notice.group_admin', async (c) => {
      printLog(`[群管理员变动] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id}`, Log.INFO_RECV)
      await app.groupAdmin(c.sub_type, c.time, c.group_id, c.user_id)
    })

    app.API.bot.on('notice.group_decrease', async (c) => {
      printLog(`[群成员减少] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.operator_id} 离开者QQ:${c.user_id}`, Log.INFO_RECV)
      await app.groupDecrease(c.sub_type, c.time, c.group_id, c.operator_id, c.user_id)
    })

    app.API.bot.on('notice.group_increase', async (c) => {
      printLog(`[群成员增加] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.operator_id} 加入者QQ:${c.user_id}`, Log.INFO_RECV)
      await app.groupIncrease(c.sub_type, c.time, c.group_id, c.operator_id, c.user_id)
    })

    app.API.bot.on('notice.friend_add', async (c) => {
      printLog(`[好友添加] QQId:${c.user_id}`, Log.INFO_RECV)
      await app.friendAdd('friend_add', c.time, c.user_id)
    })

    app.API.bot.on('request.friend', async (c) => {
      printLog(`[加好友请求] QQId:${c.user_id} 验证信息:${c.comment}`, Log.INFO_RECV)
      await app.requestAddFriend('request_add_friend', c.time, c.user_id, c.comment, c.flag)
    })

    app.API.bot.on('request.group', async (c) => {
      printLog(`[加群请求／邀请] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} 验证信息:${c.comment}`, Log.INFO_RECV)
      await app.requestAddGroup(c.sub_type, c.time, c.group_id, c.user_id, c.comment, c.flag)
    })

    app.API.bot.on('socket.closing', (_attempts) => {
      if (app.isEnable) {
        app.disable()
        printLog(`[应用] Bot已停用`, Log.INFO)
      }
    })

    app.API.bot.on('socket.close', (_socketType, _attempts) => {
      app.exit()
      printLog(`[应用] Bot已关闭`, Log.INFO)
    })

    app.API.bot.on('meta_event.heartbeat', async (_context) => { //响应心跳连接
      try {
        let result = await app.API.bot('get_status')
        printLog(`API调用测试：get_status:${result.status}`, Log.DEBUG)
        if (result.status !== 'ok') {
          printLog('发生了异常', Log.ERROR)
        }
      } catch (error) {
        printLog('发生了异常', Log.ERROR)
      }
    })

    app.start = function () {
      throw new Error('请勿重复启动')
    }
  })
}