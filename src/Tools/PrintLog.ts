import { blue, cyan, gray, green, magenta, red, yellow } from 'colors'
import { decode } from './Tools'
import moment = require('moment')

/**
 * 日志级别常量
 */
export enum LogColor {
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
   * 级别：通知
   * 颜色：青色
   */
  INFO_NOTICE,
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
  FATAL,
  /**
   * 级别：致命错误
   * 颜色：品红
   */
}

export class Log {
  constructor(private name: string = '') { }

  private printLog(msg: string, level: LogColor = 0) {
    if (msg.length > 500) {
      msg = msg.slice(0, 500) + '...'
    }
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    switch (level) {
      case LogColor.DEBUG:
        console.log(time, '->', gray(msg))
        break
      case LogColor.INFO:
        console.log(time, '->', msg)
        break
      case LogColor.INFO_NOTICE:
        console.log(time, '->', cyan(msg))
        break
      case LogColor.INFO_RECV:
        console.log(time, '->', blue(msg))
        break
      case LogColor.INFO_SEND:
        console.log(time, '->', green(msg))
        break
      case LogColor.WARNING:
        console.warn(time, '->', yellow(msg))
        break
      case LogColor.ERROR:
        console.error(time, '->', red(msg))
        break
      case LogColor.FATAL:
        console.error(time, '->', magenta(msg))
        break
    }
  }

  /**
   * 在控制台调试输出日志。不推荐使用本方法,请使用log开头的方法
   * @param {LogLevel} level
   * @param {string} type
   * @param {string} content
   */
  sendLog(level: LogColor, content: string, type?: string) {
    this.printLog(`${this.name ? `[${this.name}]` : ''}[${type || '日志'}] ${decode(content)}`, level)
  }

  /**
   * 调试日志
   * @param {string} type
   * @param {string} content
   */
  logDebug(content: string, type: string = 'DEBUG') {
    this.sendLog(LogColor.DEBUG, content, type)
  }

  /**
   * 信息日志
   * @param {string} type
   * @param {string} content
   */
  logInfo(content: string, type?: string) {
    this.sendLog(LogColor.INFO, content, type)
  }

  /**
   * 接受信息日志
   * @param {string} type
   * @param {string} content
   */
  logInfoRecv(content: string, type?: string) {
    this.sendLog(LogColor.INFO_RECV, content, type)
  }

  /**
   * 发送日志
   * @param {string} type
   * @param {string} content
   */
  logInfoSend(content: string, type?: string) {
    this.sendLog(LogColor.INFO_SEND, content, type)
  }

  /**
   * 通知日志
   * @param {string} type
   * @param {string} content
   */
  logNotice(content: string, type?: string) {
    this.sendLog(LogColor.INFO_NOTICE, content, type)
  }

  /**
   * 警告日志
   * @param {string} type
   * @param {string} content
   */
  logWarning(content: string, type?: string) {
    this.sendLog(LogColor.WARNING, content, type)
  }

  /**
   * 错误日志
   * @param {string} type
   * @param {string} content
   */
  logError(content: string, type?: string) {
    this.sendLog(LogColor.ERROR, content, type)
  }

  /**
   * 致命错误日志
   * @param {string} type
   * @param {string} content
   */
  logFatal(content: string, type?: string) {
    this.sendLog(LogColor.FATAL, content, type)
  }
}

export const PrintLog = new Log()
