import { PrintLog } from '../..'
import { Bot } from '../Bot'

export class Data {
  constructor(Bot: Bot, name: string) {
    this.Bot = Bot
    this.name = name
  }

  private Bot: Bot
  /**
   * 是否为调试模式
   */
  private debug: boolean
  readonly setDebug = (debug: boolean) => {
    this.debug = debug
    if (this.debug) {
      PrintLog.logWarning(`已开启debug模式，所有api调用都不会真正执行`, 'DEBUG')
    }
  }
  readonly getDebug = () => {
    return this.debug
  }

  /**
   * Bot名称
   */
  readonly name: string

  /**
   * Bot的登录QQ
   */
  private userId: number = -1
  readonly setUserId = (user_id: number) => {
    this.userId = user_id
  }
  readonly getUserId = () => {
    return this.userId
  }

  /**
   * 群名缓存
   */
  groupList: {
    [group_id: number]: string
  } = {}
  /**
   * 更新群名缓存
   */
  updateGroupsList = () => {
    this.Bot.Api.getGroupList()
      .then(list => {
        list.forEach(group => {
          this.groupList[group.group_id] = group.group_name
        })
        PrintLog.logNotice('群名缓存已更新', 'EVENT')
      })
  }
}
