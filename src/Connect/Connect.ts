import { w3cwebsocket } from 'websocket'
import { ApiRes, BotEvent, Prevent, WSOption } from '..'
import { PrintLog } from '../Tools/PrintLog'
import { CQCode } from './../Tools/CQCode'
import { GroupMsg, PrivateMsg } from './../Type/Event'

type MessageEvent = { type: string, fn: (data: any) => Prevent }

interface NextMessageEvent {
  message_id: number
  type: string
  group_id?: number
  user_id: number
  fn: (e: any) => Promise<void> | void
}

export class Connect {
  constructor(whitelist: number[], blacklist: number[], option?: WSOption) {
    this.whitelist = whitelist
    this.blacklist = blacklist
    if (option) {
      for (const key in option) {
        this[key] = option[key]
      }
    }
    this.connect()
  }

  private wss = false
  private accessToken = ''
  private host = '127.0.0.1'
  private port = 6700
  private reconnection = true
  private reconnectionAttempts = 1000
  private reconnectionDelay = 1000
  private timeout = 120000

  private ready: () => void

  private connectTimes = 0
  private messageID = 1
  private nextMessageID = 1

  private whitelist: number[] = []
  private blacklist: number[] = []

  private setNextMessage = (data: PrivateMsg | GroupMsg, event: MessageEvent & { uid: number } | NextMessageEvent) => {
    return (fn: (msg: string, event: any, prevEvent: any) => Prevent) => {
      const id = this.nextMessageID
      ++this.nextMessageID
      this.nextMessageEventList[id] = {
        message_id: data.message_id,
        type: event.type,
        group_id: data['group_id'] || null,
        user_id: data.user_id,
        fn: async (e) => {
          if (!(await fn(e.message, e, data))) {
            delete this.nextMessageEventList[id]
          }
        }
      }
    }
  }

  private connect = () => {
    if (this.connectTimes > 0) {
      PrintLog.logInfo(`正在尝试第${this.connectTimes}次重新链接`, 'WS')
    } else {
      PrintLog.logInfo(`正在尝试链接`, 'WS')
    }
    if (this.client) {
      this.client.close()
    }
    this.client = new w3cwebsocket(`${this.wss ? 'wss' : 'ws'}://${this.host}:${this.port}${this.accessToken ? '?access_token=' + this.accessToken : ''}`)
    this.client.onopen = () => {
      if (this.connectTimes > 0) {
        PrintLog.logNotice(`第${this.connectTimes}次重新链接成功`, 'WS')
      } else {
        PrintLog.logNotice('websocket连接成功', 'WS')
      }
      if (this.ready) {
        this.ready()
        delete this.ready
      }
      this.connEventList.forEach(fn => {
        fn()
      })
      this.connectTimes = 0
      this.client.onclose = () => {
        PrintLog.logWarning('websocket连接已断开', 'WS')
        this.closeEventList.forEach(fn => {
          fn()
        })
        if (this.reconnection) {
          this.connectTimes = 1
          this.connect()
        }
      }
    }
    this.client.onmessage = async (message) => {
      const data = JSON.parse(CQCode.decode((JSON.stringify(JSON.parse(message.data.toString())))))
      if (data.group_id) {
        if ((this.whitelist.length > 0 && !this.whitelist.includes(data.group_id)) || (this.blacklist.length > 0 && this.blacklist.includes(data.group_id))) {
          return
        }
      }
      if (data.post_type) {
        if (data.post_type === 'message') {
          for (const event of this.messageLogEvent) {
            if (event.type === `message.${data.message_type}`) {
              if (await event.fn(data)) return
            }
          }
          for (const i in this.nextMessageEventList) {
            data.nextMessage = this.setNextMessage(data, this.nextMessageEventList[i])
            if (this.nextMessageEventList[i].type === 'message.private') {
              if (this.nextMessageEventList[i].user_id === data.sender.user_id) {
                await this.nextMessageEventList[i].fn(data)
                return
              }
            } else if (this.nextMessageEventList[i].type === 'message.group') {
              if (this.nextMessageEventList[i].user_id === data.sender.user_id && this.nextMessageEventList[i].group_id === data.group_id) {
                await this.nextMessageEventList[i].fn(data)
                return
              }
            }
          }
          for (const event of this.messageEventList.message) {
            if (event.type === `message.${data.message_type}`) {
              data.nextMessage = this.setNextMessage(data, event)
              if (await event.fn(data)) break
            }
          }
        } else if (data.post_type === 'notice') {
          for (const event of this.messageEventList.notice) {
            if (event.type === `notice.${data.notice_type}`) {
              if (await event.fn(data)) break
            }
          }
        } else if (data.post_type === 'request') {
          for (const event of this.messageEventList.request) {
            if (event.type === `request.${data.request_type}`) {
              if (await event.fn(data)) break
            }
          }
        } else if (data.post_type === 'meta_event') {
          for (const event of this.messageEventList.meta_event) {
            if (event.type === `meta_event.${data.meta_event_type}`) {
              if (await event.fn(data)) break
            }
          }
        } else {
          for (const event of this.messageEventList.other) {
            if (await event.fn(data)) break
          }
        }
      }
      if (data.echo) {
        if (this.APIList.has(data.echo)) {
          this.APIList.get(data.echo)(data)
        }
      }
    }
    this.client.onerror = (error) => {
      if (this.connectTimes > 0) {
        PrintLog.logFatal(`第${this.connectTimes}次重新链接失败`, 'WS')
      } else {
        PrintLog.logFatal('websocket发生错误', 'WS')
      }
      this.errorEventList.forEach(fn => {
        fn(error)
      })
      ++this.connectTimes
      if (this.connectTimes > this.reconnectionAttempts) {
        PrintLog.logError('重试次数过多', 'WS')
      } else {
        setTimeout(this.connect, this.reconnectionDelay)
      }
    }
  }
  private client: w3cwebsocket
  private connEventList: (() => void)[] = []
  private errorEventList: ((error: Error) => void)[] = []
  private closeEventList: (() => void)[] = []
  private messageEventList: {
    message: (MessageEvent & { uid: number })[]
    notice: MessageEvent[]
    request: MessageEvent[]
    meta_event: MessageEvent[]
    other: MessageEvent[]
  } = {
      message: [],
      notice: [],
      request: [],
      meta_event: [],
      other: []
    }
  private messageLogEvent: MessageEvent[] = []
  private nextMessageEventList: {
    [id: number]: NextMessageEvent
  } = {}

  /**
   * 增加事件监听
   * message消息可填入uid控制消息顺序，uid为0时为log事件，有最高优先度
   * 推荐使用Event类中的方法
   */
  readonly addEvent = (type: BotEvent, fn: (e?: any) => Prevent, uid?: number) => {
    if (type === 'ws.ready') {
      this.ready = fn
    } else if (type === 'ws.connect') {
      this.connEventList.push(fn)
    } else if (type === 'ws.error') {
      this.errorEventList.push(fn)
    } else if (type === 'ws.close') {
      this.closeEventList.push(fn)
    } else if (type.startsWith('message.')) {
      if (uid === 0) {
        this.messageLogEvent.push({
          type,
          fn
        })
      } else {
        if (!uid) {
          if (this.messageEventList.message.length > 0 && this.messageEventList.message[this.messageEventList.message.length - 1].uid) {
            uid = this.messageEventList.message[this.messageEventList.message.length - 1].uid + 1
          } else {
            uid = 1
          }
        }
        this.messageEventList.message.push({
          type,
          fn,
          uid: uid
        })
        this.messageEventList.message.sort((a, b) => {
          return a.uid - b.uid
        })
      }
    } else if (type.startsWith('notice.')) {
      this.messageEventList.notice.push({
        type,
        fn
      })
    } else if (type.startsWith('request.')) {
      this.messageEventList.request.push({
        type,
        fn
      })
    } else if (type.startsWith('meta_event.')) {
      this.messageEventList.meta_event.push({
        type,
        fn
      })
    } else {
      this.messageEventList.other.push({
        type,
        fn
      })
    }
    return this
  }

  private getRes = (id: number) => {
    return new Promise<ApiRes>(resolve => {
      // let timer = setTimeout(() => {
      //   resolve({
      //     retcode: 408,
      //     status: 'failed',
      //     msg: '请求超时'
      //   })
      // }, this.timeout)
      this.APIList.set(id, (data: any) => {
        resolve({
          data: data.data,
          retcode: data.retcode,
          status: data.status
        })
        this.APIList.delete(id)
        // clearTimeout(timer)
        // timer = null
      })
    })
  }

  private APIList = new Map<number, Function>()
  /**
   * 获取队列中未完成的消息数量
   */
  readonly getMessageNum = () => {
    return this.APIList.size
  }

  /**
   * 使用HTTP API
   * 推荐使用API类中的方法
   */
  readonly useAPI = async (apiName: string, params?: any): Promise<ApiRes> => {
    if (this.isConnect()) {
      const id = this.messageID
      ++this.messageID
      this.client.send(JSON.stringify({
        action: apiName,
        params,
        echo: id
      }))
      return await this.getRes(id)
    } else {
      PrintLog.logError('WebSocket连接还未建立，无法调用http-api', 'WS')
      return { retcode: 404, status: 'failed', msg: 'websocket尚未链接' }
    }
  }

  readonly isConnect = () => {
    if (this.client) {
      return this.client.readyState === this.client.OPEN
    } else {
      return false
    }
  }

  /**
   * 可以用于群消息相功能的简单测试
   */
  async groupMsgTest(msg: string, user_id: number = 1, group_id: number = 1) {
    for (const event of this.messageEventList.message) {
      if (event.type === 'message.group') {
        if (await event.fn({
          time: Date.now(),
          self_id: 0,
          post_type: 'message',
          message_type: 'group',
          sub_type: 'normal',
          message_id: 1,
          group_id: group_id,
          user_id: user_id,
          anonymous: null,
          message: msg,
          raw_message: msg,
          font: 0,
          sender: {
            user_id: user_id,
            nickname: 'test',
            card: '',
            sex: 'unknown',
            age: 0,
            area: '',
            level: '',
            role: 'member',
            title: ''
          }
        })) break
      }
    }
  }

  /**
   * 可以用于私聊消息相功能的简单测试
   */
  async privateMsgTest(msg: string, user_id: number = 1) {
    for (const event of this.messageEventList.message) {
      if (event.type === 'message.private') {
        if (await event.fn({
          time: Date.now(),
          self_id: 0,
          post_type: 'message',
          message_type: 'private',
          sub_type: 'friend',
          message_id: 1,
          user_id: user_id,
          message: msg,
          raw_message: msg,
          font: 0,
          sender: {
            user_id: user_id,
            nickname: 'test',
            sex: 'unknown',
            age: 0
          }
        })) break
      }
    }
  }
}
