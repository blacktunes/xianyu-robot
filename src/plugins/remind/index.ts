import Bot, { CQLog, printTime } from '../../main'
import { toDate } from './format'
import schedule = require('node-schedule')
import fs = require('fs')
import path = require('path')
import NamedRegExp = require('named-regexp-groups')

var remindReg = new NamedRegExp('(?<tomorrow>^明天|^)((?<h0>[0-9]|1[0-9]|2[0-3]|[零一二三四五六七八九]|十([一二三四五六七八九])?|二十([一二三])?)点(?<m0>[1-5][0-9]|[0-9]|十([一二三四五六七八九])?|[二三四五]十([一二三四五六七八九])?|[零一二三四五六七八九])分?|(?<h1>[0-9]|1[0-9]|2[0-3]|[零一二三四五六七八九]|十([一二三四五六七八九])?|二十([一二三])?)点|(?<m1>[1-5][0-9]|[0-9]|十([一二三四五六七八九])?|[二三四五]十([一二三四五六七八九])?|[零一二三四五六七八九])分|((?<time>([0-1][0-9]|[1-2][0-3]):[0-5][0-9](:[0-5][0-9]*)?))|(?<m>[1-9][0-9]*)分钟后)提醒((?<at>\\[CQ:at,qq=[1-9][0-9]{4,}\\])|我) *(?<text>.*)?')

export default class Remind {
  constructor(bot: Bot, enable: boolean = true) {
    this.initRemind(bot, enable)
  }

  initRemind(bot: Bot, enable: boolean) {
    bot.config.remind = enable
    bot.applyPlugin(this.handelMsg)
    bot.applySchedule(this.createSchedule)
    printTime(`[插件] 提醒已载入`, CQLog.LOG_INFO_SUCCESS)
    this.initRemind = () => {
      throw new Error('请勿重复初始化')
    }
  }

  handelMsg = (bot: Bot, from: number, fromQQ: number, msg: string, type: 0 | 1 | 2) => {
    if (type === 0) return
    if (bot.config.remind) {
      if (remindReg.test(msg)) {
        this.remind(bot, type, from, fromQQ, remindReg.exec(msg).groups)
        return 0
      } else if (msg === '取消提醒') {
        this.cancelRemind(bot, fromQQ, from, type)
        return 0
      } else if (msg === '查询提醒') {
        this.selectRemind(bot, fromQQ, from, type)
        return 0
      }
    }
  }

  remindList = {}

  createSchedule = (bot: Bot) => {
    if (bot.dirname && fs.existsSync(path.join(bot.dirname, './remind.json'))) {
      this.remindList = JSON.parse(fs.readFileSync(path.join(bot.dirname, './remind.json')).toString())
    }
    for (let i in this.remindList) {
      const time = Number(i)
      if (time < Date.now()) {
        delete this.remindList[i]
      } else {
        this.createRemind(bot, this.remindList[i].fromQQ, this.remindList[i].from, this.remindList[i].type, time, this.remindList[i].text, this.remindList[i].at)
      }
    }
    this.saveRemind(bot)
  }

  saveRemind = (bot: Bot) => {
    return new Promise(resolve => {
      const str = JSON.stringify(this.remindList)
      fs.writeFile(path.join(bot.dirname, './remind.json'), str, (err) => {
        if (err) {
          console.error('任务未写入JSON')
          resolve()
        } else {
          resolve()
        }
      })
    })
  }

  /**
   * 创建定时任务
   * @param {number} from 来源群号或讨论组ID
   * @param {number} fromQQ
   * @param {any} msg
   */
  remind = (bot: Bot, type: number, from: number, fromQQ: number, msg: any) => {
    const now = new Date()
    let date: number
    let text = null
    let at = null
    if (msg.m) {
      date = Date.now() + msg.m * 60 * 1000
    } else if (msg.h0 && msg.m0) {
      date = new Date(now.toLocaleDateString() + ` ${toDate(msg.h0) + ':' + toDate(msg.m0) + ':' + '00'}`).getTime()
    } else if (msg.h1) {
      date = new Date(now.toLocaleDateString() + ` ${toDate(msg.h1) + ':' + '00' + ':' + '00'}`).getTime()
    } else if (msg.m1) {
      date = new Date(now.toLocaleDateString() + ` ${now.getHours() + ':' + toDate(msg.m1) + ':' + '00'}`).getTime()
    } else if (msg.time) {
      date = new Date(now.toLocaleDateString() + ` ${msg.time}`).getTime()
    }
    if (msg.text) {
      text = msg.text
    }
    if (msg.at) {
      at = msg.at
    }
    if (msg.tomorrow) {
      date += 24 * 60 * 60 * 1000
    }
    if (!date) {
      bot.send(type, from, `${bot.CQCode.at(fromQQ)}看不懂你这时间`)
      return
    }
    if (date < now.getTime()) {
      bot.send(type, from, `${bot.CQCode.at(fromQQ)}已经过了啊`)
      return
    }
    this.remindList[date] = {
      fromQQ,
      from,
      type,
      text,
      at
    }
    this.saveRemind(bot)
      .then(() => {
        this.createRemind(bot, fromQQ, from, type, date, text, at)
        if (msg.tomorrow) {
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}好，明天叫${at ? '他' : '你'}`)
        } else {
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}好`)
        }
      })
  }

  /**
   * 创建提醒任务
   * @param {number} fromQQ
   * @param {number} from
   * @param {number} time
   * @param {number} type
   * @param {string} text
   */
  createRemind = (bot: Bot, fromQQ: number, from: number, type: number, time: number | Date, text: string, at: string) => {
    schedule.scheduleJob(fromQQ.toString(), time, () => {
      bot.send(type, from, `${at ? at + ' ' : bot.CQCode.at(fromQQ)}${text ? `该${text}了` : `${at ? bot.CQCode.at(fromQQ) : '你'}让我在这个时间提醒你`}`)
      delete this.remindList[`${time}`]
      this.saveRemind(bot)
    })
    printTime(`${fromQQ}创建了${new Date(time).toLocaleString()}的定时任务`, 30)
  }

  selectRemind = (bot: Bot, fromQQ: number, from: number, type: number) => {
    let msg = `${bot.CQCode.at(fromQQ)}你创建了以下提醒:\n`
    for (let i in this.remindList) {
      if (this.remindList[i].fromQQ === fromQQ) {
        msg += `${this.remindList[i].from}: ${new Date(Number(i)).toLocaleString()} ${this.remindList[i].text ? this.remindList[i].text : ''}\n`
      }
    }
    bot.send(type, from, msg)
  }

  cancelRemind = (bot: Bot, fromQQ: number, from: number, type: number) => {
    if (schedule.cancelJob(fromQQ.toString())) {
      bot.send(type, from, `${bot.CQCode.at(fromQQ)}提醒已取消`)
    }
  }
}