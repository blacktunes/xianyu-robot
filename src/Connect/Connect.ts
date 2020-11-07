import { w3cwebsocket } from 'websocket';
import { ApiRes, WSOption } from '..';
import { PrintLog } from '../Tools/PrintLog';
import { CQCode } from './../Tools/CQCode';

type MessageEvent = { type: string, fn: (data: any) => Promise<boolean | void> | boolean | void }[]

export class Connect {
  constructor(option?: WSOption) {
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
      if (data.post_type) {
        if (data.post_type === 'message') {
          for (const event of this.messageEventList.message) {
            if (event.type === `message.${data.message_type}`) {
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
    message: MessageEvent
    notice: MessageEvent
    request: MessageEvent
    meta_event: MessageEvent
    other: MessageEvent
  } = {
      message: [],
      notice: [],
      request: [],
      meta_event: [],
      other: []
    }

  readonly addEvent = (type: string, fn: any) => {
    if (type === 'ws.ready') {
      this.ready = fn
    } else if (type === 'ws.connect') {
      this.connEventList.push(fn)
    } else if (type === 'ws.error') {
      this.errorEventList.push(fn)
    } else if (type === 'ws.close') {
      this.closeEventList.push(fn)
    } else if (type.startsWith('message.')) {
      this.messageEventList.message.push({
        type,
        fn
      })
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
}
