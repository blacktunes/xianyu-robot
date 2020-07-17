import CQWebSocket, { CQWebSocketOption } from "cq-websocket"
import { printTime, CQWebSocketInit, CQLog } from "../../cq-robot"

export default function connect(app: any, CQWebSocketOption: CQWebSocketOption) {
  const bot: CQWebSocket = CQWebSocketInit(CQWebSocketOption)

    app.startup()
    printTime(`[应用]${app.APP_ID ? ' ' + app.APP_ID + ' ' : '应用'}已载入`, CQLog.LOG_INFO_SUCCESS)

    bot.on('ready', () => {
      printTime('[WebSocket] 连接成功！', CQLog.LOG_INFO)
      app.enable()
      printTime(`[应用]${app.APP_ID ? ' ' + app.APP_ID + ' ' : '应用'}已启动`, CQLog.LOG_INFO_SUCCESS)
    })

    bot.on('message.private', async (_event, c, _tags) => {
      printTime(`[接收私聊消息] 类型:${c.sub_type} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
      await app.privateMsg(c.sub_type, c.message_id, c.user_id, c.message, c.font)
    })

    bot.on('message.group', async (_event, c, _tags) => {
      printTime(`[接收群聊消息] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
      let flag = c.anonymous ? c.anonymous.flag : ''
      await app.groupMsg(c.sub_type, c.message_id, c.group_id, c.user_id, flag, c.message, c.font)
    })

    bot.on('message.discuss', async (_event, c, _tags) => {
      printTime(`[接收讨论组消息] discussId:${c.discuss_id} QQId:${c.user_id} msg:${c.message}`, CQLog.LOG_INFO_RECV)
      await app.discussMsg('discuss', c.message_id, c.discuss_id, c.user_id, c.message, c.font)
    })

    bot.on('notice.group_upload', async (c) => {
      printTime(`[群文件上传] groupId:${c.group_id} QQId:${c.user_id} file:${JSON.stringify(c.file)}`, CQLog.LOG_INFO_RECV)
      await app.groupUpload('group_upload', c.time, c.group_id, c.user_id, c.file)
    })

    bot.on('notice.group_admin', async (c) => {
      printTime(`[群管理员变动] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id}`, CQLog.LOG_INFO_RECV)
      await app.groupAdmin(c.sub_type, c.time, c.group_id, c.user_id)
    })

    bot.on('notice.group_decrease', async (c) => {
      printTime(`[群成员减少] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.operator_id} 离开者QQ:${c.user_id}`, CQLog.LOG_INFO_RECV)
      await app.groupDecrease(c.sub_type, c.time, c.group_id, c.operator_id, c.user_id)
    })

    bot.on('notice.group_increase', async (c) => {
      printTime(`[群成员增加] 类型:${c.sub_type} GroupId:${c.group_id} 操作者QQ:${c.operator_id} 加入者QQ:${c.user_id}`, CQLog.LOG_INFO_RECV)
      await app.groupIncrease(c.sub_type, c.time, c.group_id, c.operator_id, c.user_id)
    })

    bot.on('notice.friend_add', async (c) => {
      printTime(`[好友添加] QQId:${c.user_id}`, CQLog.LOG_INFO_RECV)
      await app.friendAdd('friend_add', c.time, c.user_id)
    })

    bot.on('request.friend', async (c) => {
      printTime(`[加好友请求] QQId:${c.user_id} 验证信息:${c.comment}`, CQLog.LOG_INFO_RECV)
      await app.requestAddFriend('request_add_friend', c.time, c.user_id, c.comment, c.flag)
    })

    bot.on('request.group', async (c) => {
      printTime(`[加群请求／邀请] 类型:${c.sub_type} GroupId:${c.group_id} QQId:${c.user_id} 验证信息:${c.comment}`, CQLog.LOG_INFO_RECV)
      await app.requestAddGroup(c.sub_type, c.time, c.group_id, c.user_id, c.comment, c.flag)
    })

    bot.on('socket.closing', (_attempts) => {
      if (app.isEnable) {
        app.disable()
        printTime(`[应用]${app.APP_ID ? ' ' + app.APP_ID + ' ' : '应用'}已停用`, CQLog.LOG_INFO)
      }
    })

    bot.on('socket.close', (_socketType, _attempts) => {
      app.exit()
      printTime(`[应用]${app.APP_ID ? ' ' + app.APP_ID + ' ' : '应用'}已关闭`, CQLog.LOG_INFO)
    })

    bot.on('meta_event.heartbeat', async (_context) => { //响应心跳连接
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

    app.start = function () {
      throw new Error('请勿重复启动')
    }
}