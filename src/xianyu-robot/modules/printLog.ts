import moment = require('moment')
import colors = require('colors')

/**
 * 日志级别常量
 */
export enum Log {
  /**
   * 级别：调试
   * 颜色：灰色
   */
  DEBUG,
  /**
   * 级别：信息
   * 颜色：白色
   */
  INFO,
  /**
   * 级别：信息(成功)
   * 颜色：青色
   */
  INFO_SUCCESS,
  /**
   * 级别：信息(接收)
   * 颜色：蓝色
   */
  INFO_RECV,
  /**
   * 级别：信息(发送)
   * 颜色：绿色
   */
  INFO_SEND,
  /**
   * 级别：警告
   * 颜色：黄色
   */
  WARNING,
  /**
   * 级别：错误
   * 颜色：红色
   */
  ERROR,
  /**
   * 级别：致命错误
   * 颜色：品红
   */
  FATAL
}

/**
 * 在控制台输出 YYYY-MM-DD HH:mm:ss->msg 格式的消息
 * @export
 * @param {string} msg
 * @param {number} [level=0]
 */
export function printLog(msg: string, level: Log = 0) {
  const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  switch (level) {
    case Log.DEBUG:
      console.log(time, '->', colors.gray(msg))
      break
    case Log.INFO:
      console.log(time, '->', msg)
      break
    case Log.INFO_SUCCESS:
      console.log(time, '->', colors.cyan(msg))
      break
    case Log.INFO_RECV:
      console.log(time, '->', colors.blue(msg))
      break
    case Log.INFO_SEND:
      console.log(time, '->', colors.green(msg))
      break
    case Log.WARNING:
      console.log(time, '->', colors.yellow(msg))
      break
    case Log.ERROR:
      console.log(time, '->', colors.red(msg))
      break
    case Log.FATAL:
      console.log(time, '->', colors.magenta(msg))
      break
  }
}

/**
  * 在控制台调试输出日志。不推荐使用本方法,请使用log开头的方法
  * @param {LogLevel} level
  * @param {string} type
  * @param {string} content
  */
export function sendLog(level: Log, content: string, type?: string) {
  printLog(`${type ? `[${type}]` : '[日志]'} ${content}`, level)
}

/**
 * 调试日志
 * @param {string} type
 * @param {string} content
 */
export function logDebug(content: string, type?: string){
  sendLog(Log.DEBUG, content, type)
}

/**
 * 信息日志
 * @param {string} type
 * @param {string} content
 */
export function logInfo(content: string, type?: string){
  sendLog(Log.INFO, content, type)
}

/**
 * 接受信息日志
 * @param {string} type
 * @param {string} content
 */
export function logInfoRecv(content: string, type?: string){
  sendLog(Log.INFO_RECV, content, type)
}

/**
 * 发送信息日志
 * @param {string} type
 * @param {string} content
 */
export function logInfoSend(content: string, type?: string){
  sendLog(Log.INFO_SEND, content, type)
}

/**
 * 发送成功日志
 * @param {string} type
 * @param {string} content
 */
export function logInfoSuccess(content: string, type?: string){
  sendLog(Log.INFO_SUCCESS, content, type)
}

/**
 * 警告日志
 * @param {string} type
 * @param {string} content
 */
export function logWarning(content: string, type?: string){
  sendLog(Log.WARNING, content, type)
}

/**
 * 错误日志
 * @param {string} type
 * @param {string} content
 */
export function logError(content: string, type?: string){
  sendLog(Log.ERROR, content, type)
}

/**
 * 致命错误日志
 * @param {string} type
 * @param {string} content
 */
export function logFatal(content: string, type?: string){
  sendLog(Log.FATAL, content, type)
}
