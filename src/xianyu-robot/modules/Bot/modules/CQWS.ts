import { CQWebSocket } from 'cq-websocket'
import { printLog, Log } from '../../printLog'

export class CQWS {
  constructor(debug: boolean = false) {
    this.setDebug(debug)
  }

  bot: CQWebSocket // 建立连接的核心模块

  /**
   * 是否为调试模式。默认false
   * @type {boolean}
   */
  debug: boolean

  /**
  * 设置环境模式，用于区分生产环境和开发环境。
  * @param {boolean} debug
  */
  setDebug(debug: boolean) {
    this.debug = debug
    if (this.debug) {
      printLog(`[Debug] 已开启debug模式，所有api调用都不会真正执行`, Log.WARNING)
    }
  }

  /**
   * 获取当前环境模式
   */
  getDebug(): boolean {
    return this.debug
  }

  /**
   * api方式调用
   * @param {string} apiName 操作名称
   * @param {Record<string, any>} param 参数
   * @returns 对于无返回数据的仅返回状态码(retcode)，有返回数据的返回整个响应内容
   */
  async useAPI(apiName: string, param: Record<string, any>) {
    try {
      if (this.debug) {
        printLog(`[API] 操作 ${apiName} 已完成`, Log.DEBUG)
        return 0
      }
      if (this.bot.isReady()) {
        const result = await this.bot(apiName, param)
        result.retcode = -result.retcode
        // 返回内容格式 {"data":{"message_id":273},"retcode":0,"status":"ok"}
        if (apiName.startsWith('send_')) {
          return result
        } else if (apiName.startsWith('get_')) {
          // printLog(`[API] 请求 ${apiName} 完成`, Log.INFO_SUCCESS)
          return result
        } else {
          // printLog(`[API] 请求 ${opName} 完成`, Log.INFO_SUCCESS)
          return result.retcode
        }
      } else {
        printLog('[API] WebSocket连接还未建立，无法调用http-api', Log.ERROR)
        return -999
      }
    } catch (error) {
      printLog(`[API] 请求 ${apiName} 发生错误`, Log.ERROR)
      console.error(error)
      return -1000
    }
  }
}