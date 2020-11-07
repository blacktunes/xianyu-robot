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

class LOG {
  private printLog(msg: string, level: Log = 0) {
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    switch (level) {
      case Log.DEBUG:
        console.log(time, '->', colors.gray(msg))
        break
      case Log.INFO:
        console.log(time, '->', msg)
        break
      case Log.INFO_NOTICE:
        console.log(time, '->', colors.cyan(msg))
        break
      case Log.INFO_RECV:
        console.log(time, '->', colors.blue(msg))
        break
      case Log.INFO_SEND:
        console.log(time, '->', colors.green(msg))
        break
      case Log.WARNING:
        console.warn(time, '->', colors.yellow(msg))
        break
      case Log.ERROR:
        console.error(time, '->', colors.red(msg))
        break
      case Log.FATAL:
        console.error(time, '->', colors.magenta(msg))
        break
    }
  }

  /**
   * 在控制台调试输出日志。不推荐使用本方法,请使用log开头的方法
   * @param {LogLevel} level
   * @param {string} type
   * @param {string} content
   */
  sendLog(level: Log, content: string, type?: string) {
    this.printLog(`${type ? `[${type}]` : '[日志]'} ${content}`, level)
  }

  /**
   * 调试日志
   * @param {string} type
   * @param {string} content
   */
  logDebug(content: string, type: string = 'DEBUG') {
    this.sendLog(Log.DEBUG, content, type)
  }

  /**
   * 信息日志
   * @param {string} type
   * @param {string} content
   */
  logInfo(content: string, type?: string) {
    this.sendLog(Log.INFO, content, type)
  }

  /**
   * 接受信息日志
   * @param {string} type
   * @param {string} content
   */
  logInfoRecv(content: string, type?: string) {
    this.sendLog(Log.INFO_RECV, content, type)
  }

  /**
   * 发送日志
   * @param {string} type
   * @param {string} content
   */
  logInfoSend(content: string, type?: string) {
    this.sendLog(Log.INFO_SEND, content, type)
  }

  /**
   * 通知日志
   * @param {string} type
   * @param {string} content
   */
  logNotice(content: string, type?: string) {
    this.sendLog(Log.INFO_NOTICE, content, type)
  }

  /**
   * 警告日志
   * @param {string} type
   * @param {string} content
   */
  logWarning(content: string, type?: string) {
    this.sendLog(Log.WARNING, content, type)
  }

  /**
   * 错误日志
   * @param {string} type
   * @param {string} content
   */
  logError(content: string, type?: string) {
    this.sendLog(Log.ERROR, content, type)
  }

  /**
   * 致命错误日志
   * @param {string} type
   * @param {string} content
   */
  logFatal(content: string, type?: string) {
    this.sendLog(Log.FATAL, content, type)
  }
}

export const PrintLog = new LOG()
