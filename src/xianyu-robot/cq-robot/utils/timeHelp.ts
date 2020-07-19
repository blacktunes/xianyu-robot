// 导入时间格式化插件cnpm i moment -g
// import moment from 'moment'
import moment = require('moment')
import colors = require('colors')
// import { getLogger } from './log'

/**
 * 格式化时间
 * @export
 * @param {(Date | number | string)} [date=Date.now()]
 * @param {string} [pattern='YYYY-MM-DD HH:mm:ss']
 * @returns {string}
 */
export function timeFormat(date: Date | number | string = Date.now(), pattern: string = 'YYYY-MM-DD HH:mm:ss'): string {
    let dateTime: Date | number | string = date
    if (typeof date === 'number') {
        if (date < 1e10) {
            dateTime = date * 1000
        }
    }
    dateTime = new Date(dateTime)
    return moment(dateTime).format(pattern)
}
/**
 *
 * 在控制台输出 HH:mm:ss:SSS->msg 格式的消息
 * @export
 * @param {string} msg
 * @param {number} [level=0]
 */
export function printTime(msg: string, level: number = 0) {
    // let appLog = getLogger('app')
    // let debugLog = getLogger('app-debug')
    // '[cq-robot] ' +
    let time = timeFormat(Date.now(), 'HH:mm:ss.SSS')
    switch (level) {
        case 0:
            console.log(time, '->', colors.gray(msg))
            // debugLog.debug(msg)
            break
        case 10:
            console.log(time, '->', msg)
            // appLog.info(msg)
            break
        case 11:
            console.log(time, '->', colors.cyan(msg))
            // appLog.info(msg)
            break
        case 12:
            console.log(time, '->', colors.blue(msg))
            // appLog.info(msg)
            break
        case 13:
            console.log(time, '->', colors.green(msg))
            // appLog.info(msg)
            break
        case 20:
            console.log(time, '->', colors.yellow(msg))
            // appLog.warn(msg)
            break
        case 30:
            console.log(time, '->', colors.red(msg))
            // appLog.error(msg)
            break
        case 40:
            console.log(time, '->', colors.magenta(msg))
            // appLog.fatal(msg)
            break
    }
}