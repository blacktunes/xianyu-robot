import { Data } from './../Bot/modules/Data';
import { white } from 'colors'
import { w3cwebsocket } from 'websocket'
import { ApiRes, Prevent, WebSocketConfig } from '..'
import { decode, PrintLog } from '../Tools'
import { GroupMsg, PrivateMsg, _GroupMsg, _PrivateMsg } from '../Type'

type MessageEvent = { type: string, fn: (data: any) => Prevent }

interface NextMessageEvent {
  message_id: number
  type: string
  group_id?: number
  user_id: number
  fn: (e: any) => Promise<Prevent> | Prevent
}

export class Connect {
  constructor(data: Data, config?: WebSocketConfig) {
    if (config) {
      for (const key in config) {
        this[key] = config[key]
      }
    }
    this.Data = data
    this.name = `${data.name}][WS`
    this.connect()
  }

  private Data: Data

  private name = 'WS'

  private wss = false
  private accessToken = ''
  private host = '127.0.0.1'
  private port = 6700
  private reconnection = true
  private reconnectionAttempts = 1000
  private reconnectionDelay = 1000
  // private timeout = 120000

  private ready: () => void

  private connectTimes = 0
  private _messageID = 1
  private get messageID(): number {
    return this._messageID++
  }
  private nextMessageID = 1

  /** 白名单 */
  whitelist: {
    group?: Set<number>
    user?: Set<number>
  } = {}
  /** 黑名单 */
  blacklist: {
    group?: Set<number>
    user?: Set<number>
  } = {}

  private setNextMessage = (data: PrivateMsg | GroupMsg, event: MessageEvent | NextMessageEvent) => {
    return (fn: (msg: string, event: any, prevEvent: any) => Prevent) => {
      const id = this.nextMessageID
      ++this.nextMessageID
      this.nextMessageEventList[id] = {
        message_id: data.message_id,
        type: event.type,
        group_id: data['group_id'] || null,
        user_id: data.user_id,
        fn: async (e) => {
          return await fn(e.message, e, data)
        }
      }
    }
  }

  private handleMessage = async (data: any) => {
    if (!data.message_type) {
      PrintLog.logWarning(`收到无效事件 ${white(data.toString())}`, this.name)
    }
    for (const event of this.messageLogEvent) {
      if (event.type === `message.${data.message_type}`) {
        if (await event.fn(data)) return
      }
    }
    for (const i in this.nextMessageEventList) {
      data.nextMessage = this.setNextMessage(data, this.nextMessageEventList[i])
      if (this.nextMessageEventList[i].type === 'message.private') {
        if (this.nextMessageEventList[i].user_id === data.sender.user_id) {
          const flag = await this.nextMessageEventList[i].fn(data)
          delete this.nextMessageEventList[i]
          if (flag) return
        }
      } else if (this.nextMessageEventList[i].type === 'message.group') {
        if (this.nextMessageEventList[i].user_id === data.sender.user_id && this.nextMessageEventList[i].group_id === data.group_id) {
          const flag = await this.nextMessageEventList[i].fn(data)
          delete this.nextMessageEventList[i]
          if (flag) return
        }
      }
    }
    for (const event of this.messageEventList.message) {
      if (event.type === `message.${data.message_type}`) {
        data.nextMessage = this.setNextMessage(data, event)
        if (await event.fn(data)) break
      }
    }
  }

  private isSkip = (type: 'group' | 'private', id: number) => {
    if (this.blacklist[type] && this.blacklist[type].has(id)) return true
    if (this.whitelist[type] && !this.whitelist[type].has(id)) return true
    return false
  }

  private connect = () => {
    if (this.connectTimes > 0) {
      PrintLog.logInfo(`正在尝试第${this.connectTimes}次重新链接`, this.name)
    } else {
      PrintLog.logInfo(`正在尝试链接`, this.name)
    }
    if (this.client) {
      this.client.close()
    }
    this.client = new w3cwebsocket(`${this.wss ? 'wss' : 'ws'}://${this.host}:${this.port}${this.accessToken ? '?access_token=' + this.accessToken : ''}`)
    this.client.onopen = () => {
      if (this.connectTimes > 0) {
        PrintLog.logNotice(`第${this.connectTimes}次重新链接成功`, this.name)
      } else {
        PrintLog.logNotice('websocket连接成功', this.name)
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
        PrintLog.logWarning('websocket连接已断开', this.name)
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
      const data = JSON.parse(decode((JSON.stringify(JSON.parse(message.data.toString())))))
      if (data.group_id && this.isSkip('group', data.group_id)) return
      if (data.user_id && this.isSkip('private', data.user_id)) return
      if (data.post_type) {
        if (data.post_type === 'message') {
          this.handleMessage(data)
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
          this.APIList.get(data.echo).fn(data)
        }
      }
    }
    this.client.onerror = (error) => {
      if (this.connectTimes > 0) {
        PrintLog.logFatal(`第${this.connectTimes}次重新链接失败`, this.name)
      } else {
        PrintLog.logFatal('websocket发生错误', this.name)
      }
      this.errorEventList.forEach(fn => {
        fn(error)
      })
      if (!this.reconnection) return
      ++this.connectTimes
      if (this.connectTimes > this.reconnectionAttempts) {
        PrintLog.logError('重试次数过多', this.name)
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
    message: MessageEvent[]
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
   * message消息的log参数true时有最高优先度，同时用于控制被Ban拦截
   * 推荐使用Event类中的方法
   */
  addEvent(type: string, fn: (e?: any) => Prevent, log?: boolean) {
    if (type === 'ws.ready') {
      this.ready = fn
    } else if (type === 'ws.connect') {
      this.connEventList.push(fn)
    } else if (type === 'ws.error') {
      this.errorEventList.push(fn)
    } else if (type === 'ws.close') {
      this.closeEventList.push(fn)
    } else if (type.startsWith('message.')) {
      if (log) {
        this.messageLogEvent.push({
          type,
          fn
        })
      } else {
        this.messageEventList.message.push({
          type,
          fn
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

  private getRes = (id: number, apiName: string, params: any = {}) => {
    return new Promise<ApiRes>(resolve => {
      // let timer = setTimeout(() => {
      //   resolve({
      //     retcode: 408,
      //     status: 'failed',
      //     msg: '请求超时'
      //   })
      // }, this.timeout)
      this.APIList.set(id, {
        info: {
          apiName,
          params
        },
        fn: (data: any) => {
          resolve({
            data: data.data,
            retcode: data.retcode,
            status: data.status
          })
          this.APIList.delete(id)
          // clearTimeout(timer)
          // timer = null
        }
      })
    })
  }

  /**
   * 获取消息监听器数量
   */
  getEventNum() {
    return this.messageEventList.message.length
  }

  private APIList = new Map<number, { fn: Function, info: any }>()
  /**
   * 获取队列中未完成的消息数量
   */
  getMessageNum() {
    return this.APIList.size
  }

  /**
   * 使用HTTP API
   * 推荐使用API类中的方法
   */
  async useAPI(apiName: string, params?: any, errorLog: boolean = true): Promise<ApiRes> {
    if (this.isConnect()) {
      const id = this.messageID
      this.client.send(JSON.stringify({
        action: apiName,
        params,
        echo: id
      }))
      const res = await this.getRes(id, apiName, params)
      if (errorLog && res.status !== 'ok') {
        PrintLog.logError(`${white(apiName)} 调用失败 recode: ${white(res.retcode.toString())} msg: ${white(res.msg || '未知错误')}`, this.name)
      }
      return res
    } else {
      PrintLog.logError(`WebSocket连接还未建立，无法调用 ${white(apiName)}`, this.name)
      return { retcode: 500, status: 'failed', msg: 'WebSocket尚未链接' }
    }
  }

  /**
   * WebSocket收否已经连接
   */
  isConnect() {
    if (this.client) {
      return this.client.readyState === this.client.OPEN
    } else {
      return false
    }
  }

  eventTest = (data: _PrivateMsg | _GroupMsg): void => {
    if (data['group_id'] && this.isSkip('group', data['group_id'])) return
    if (data['user_id'] && this.isSkip('private', data['user_id'])) return
    this.handleMessage(data)
  }
}
