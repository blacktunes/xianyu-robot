import { _PrivateMsg } from './../../Type/Event';
import { _GroupMsg } from '../../Type/Event'
import { Bot } from '../Bot'

export class Debug {
  constructor(Bot: Bot) {
    this.Bot = Bot
  }

  private Bot: Omit<Bot, 'Debug'>

  private _debug: boolean

  set debug(debug: boolean) {
    this._debug = debug
    if (this.debug) {
      this.Bot.Log.logWarning(`已开启debug模式，所有api调用都不会真正执行`, 'DEBUG')
    }
  }
  /** 是否为调试模式 */
  get debug(): boolean {
    return this._debug
  }

  /** 可以用于群消息相功能的测试 */
  groupMsgTest(data: Partial<_GroupMsg>): void
  groupMsgTest(msg: string, user_id?: number, group_id?: number): void
  groupMsgTest(data: Partial<_GroupMsg> | string, user_id?: number, group_id?: number): void {
    let msg: string
    if (typeof data === 'string') {
      msg = data
    }
    let test: _GroupMsg = {
      time: Date.now(),
      self_id: 0,
      post_type: 'message',
      message_type: 'group',
      sub_type: 'normal',
      message_id: 1,
      group_id: group_id || 1,
      user_id: user_id || 1,
      anonymous: null,
      message: msg,
      raw_message: msg,
      font: 0,
      sender: {
        user_id: user_id || 1,
        nickname: 'test',
        card: '',
        sex: 'unknown',
        age: 0,
        area: '',
        level: '',
        role: 'member',
        title: ''
      }
    }
    if (typeof data !== 'string') {
      test = { ...test, ...data }
    }
    this.Bot.Conn.eventTest(test)
  }

  /** 可以用于私聊消息相功能的测试 */
  privateMsgTest(data: Partial<_PrivateMsg>): void
  privateMsgTest(msg: string, user_id?: number): void
  privateMsgTest(data: Partial<_PrivateMsg> | string, user_id?: number): void {
    let msg: string
    if (typeof data === 'string') {
      msg = data
    }
    const test: _PrivateMsg = {
      time: Date.now(),
      self_id: 0,
      post_type: 'message',
      message_type: 'private',
      sub_type: 'friend',
      message_id: 1,
      user_id: user_id || 1,
      message: msg,
      raw_message: msg,
      font: 0,
      sender: {
        user_id: user_id || 1,
        nickname: 'test',
        sex: 'unknown',
        age: 0
      }
    }
    this.Bot.Conn.eventTest(test)
  }
}
