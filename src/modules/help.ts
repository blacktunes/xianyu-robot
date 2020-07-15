import path = require('path')
import fs = require('fs')
import JSON5 = require('json5')
import { CQWebSocketOption } from 'cq-websocket'
import { CQApp, CQEvent, printTime, CQLog } from '../cq-robot/index'
/**
 * 获取CQWebSocket配置项
 *
 * @author CaoMeiYouRen
 * @date 2019-07-13
 * @export
 * @param {string} dirname
 * @returns {CQWebSocketOption}
 */
export function getCQWebSocketOption(): CQWebSocketOption {
  let setting: string
  if (fs.existsSync(path.join(__dirname, './setting.jsonc'))) {
    setting = fs.readFileSync(path.join(__dirname, './setting.jsonc')).toString()
  } else if (fs.existsSync(path.join(__dirname, './setting.json'))) {
    setting = fs.readFileSync(path.join(__dirname, './setting.json')).toString()
  }
  return JSON5.parse(setting)
}
/**
 * 是否存在某事件的函数名
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @param {Array<CQEvent>} list
 * @param {string} eventFunction
 * @returns {boolean}
 */
function getEvent(list: Array<CQEvent>, eventFunction: string): CQEvent {
  for (let i = 0; i < list.length; i++) {
    if (list[i].function === eventFunction) {
      return list[i]
    }
  }
  return null
}
/**
 * 根据优先级从小到大对插件进行排序，如果某插件并未定义某事件，该插件将不参与排序，也不会接收到该事件
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @export
 * @param {Array<CQApp>} list
 * @param {string} eventFunction
 * @returns {Array<CQApp>}
 */
export function sortApp(list: Array<CQApp>, eventFunction: string): Array<CQApp> {
  let appList: Array<CQApp> = []
  for (let i = 0; i < list.length; i++) {
    if (getEvent(list[i].CQ.appOption.event, eventFunction)) {
      appList.push(list[i])
    }
  }
  appList.sort((a, b) => {
    return getEvent(a.CQ.appOption.event, eventFunction).priority - getEvent(b.CQ.appOption.event, eventFunction).priority
  })
  return appList
}

/**
 * 载入app目录下的所有插件
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @export
 * @param {string} filePath
 * @returns {Array<CQApp>}
 */
export function loadApp(filePath: string): Array<CQApp> {
  let files = fs.readdirSync(filePath)
  let list: Array<CQApp> = []
  for (let i = 0; i < files.length; i++) {
    let fileName = files[i]
    var fileDir = path.join(filePath, fileName)
    if (fileName !== 'index.js') {
      let temp = require(fileDir)// 载入所有插件
      let app: CQApp = temp['app']
      if (checkApp(app)) {
        list.push(app)
      }
    }
  }
  return list
}
/**
 * 校验app是否合法
 *
 * @author CaoMeiYouRen
 * @date 2019-07-14
 * @param {CQApp} app
 * @returns {boolean}
 */
function checkApp(app: CQApp): boolean {
  if (app.CQ_API_VER !== 9) {
    printTime(`[应用]${app.APP_ID}的CQ_API版本不为9`, CQLog.LOG_ERROR)
    return false
  }
  if (app.HTTP_API_VER !== 4) {
    printTime(`[应用]${app.APP_ID}的HTTP_API版本不为4`, CQLog.LOG_ERROR)
    return false
  }
  if (!app.isEnable) {//应用未启用
    return false
  }
  return true
}
