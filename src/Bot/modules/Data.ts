import { Bot } from '../Bot'

export class Data {
  constructor(Bot: Bot, name: string) {
    this.Bot = Bot
    this.name = name
  }

  private Bot: Bot

  private _debug: boolean

  set debug(debug: boolean) {
    this._debug = debug
    if (this.debug) {
      this.Bot.Log.logWarning(`已开启debug模式，所有api调用都不会真正执行`, 'DEBUG')
    }
  }
  /**
   * 是否为调试模式
   */
  get debug() {
    return this._debug
  }

  /**
   * Bot名称
   */
  readonly name: string

  /**
   * Bot的登录QQ
   */
  userId: number = -1

  /**
   * 群名缓存
   */
  groupList: {
    [group_id: number]: string
  } = {}
  /**
   * 更新群名缓存
   */
  async updateGroupsList() {
    const list = await this.Bot.Api.getGroupList()
    list.forEach(group => {
      this.groupList[group.group_id] = group.group_name
    })
    this.Bot.Log.logNotice('群名缓存已更新', '缓存')
  }

  /**
   * 群员昵称缓存
   */
  groupMemberList: {
    [group_id: number]: {
      [uesr_id: number]: string
    }
  } = {}
  /**
   * 更新指定群组群员昵称缓存
   */
  async updateGroupMemberList(group_id: number) {
    const list = await this.Bot.Api.getGroupMemberList(group_id)
    this.groupMemberList[group_id] = {}
    list.forEach(user => {
      this.groupMemberList[group_id][user.user_id] = user.card || user.nickname
    })
  }
  /**
   * 更新所有群组群员昵称缓存
   */
  async updateAllGroupMemberList() {
    for (const i in this.groupList) {
      await this.updateGroupMemberList(Number(i))
    }
    this.Bot.Log.logNotice('群员昵称缓存已更新', '缓存')
  }

  /**
   * 好友昵称缓存
   */
  friendList: {
    [user_id: number]: string
  } = {}
  async updateFriendList() {
    const list = await this.Bot.Api.getFriendList()
    list.forEach(user => {
      this.friendList[user.user_id] = user.remark || user.nickname
    })
    this.Bot.Log.logNotice('好友昵称缓存已更新', '缓存')
  }

  /**
   * 是否显示Log输出
   */
  showLog: boolean

  /**
   * 不显示Log输出的群组列表
   */
  noLogList: Set<number> = new Set<number>()
  /**
   * 增加不显示Log输出的群组
   */
  setNoLog(list: number[]) {
    this.noLogList = new Set(([...this.noLogList, ...list]))
  }

  /**
   * 不启用内置指令的群组列表
   */
  private _noCommList: Set<number> = new Set<number>()
  set noCommList(list: Set<number>) {
    this._noCommList = list
    this.Bot.Command.list.forEach(item => {
      if (item.group === '内置指令') {
        item.blacklist = this._noCommList
      }
    })
  }
  get noCommList() {
    return this._noCommList
  }
  /**
   * 增加不启用内置指令的群组
   */
  setNoComm(list: number[]) {
    this.noCommList = new Set(([...this._noCommList, ...list]))
  }
}
