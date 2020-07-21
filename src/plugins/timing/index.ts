import schedule = require('node-schedule')
import Bot, { printTime, CQLog } from '../../main'

export interface TimingConfig {
  enable: boolean
  list: Array<{
    id: number,
    type: 1 | 2,
    twelve: boolean
    time: boolean
  }>
}

export default class Timing {
  constructor(bot: Bot, timingConfig: TimingConfig) {
    this.initTiming(bot, timingConfig)
  }

  initTiming = (bot: Bot, timingConfig: TimingConfig) => {
    const config: TimingConfig = {
      enable: true,
      list: []
    }
    if (timingConfig) {
      for (let i in config) {
        if (timingConfig[i]) {
          config[i] = timingConfig[i]
        }
      }
      bot.config.timing = { ...config }
    } else {
      bot.config.timing = { ...config }
    }
    bot.applySchedule(this.createSchedule)
    printTime(`[插件] 定时任务已载入`, CQLog.LOG_INFO_SUCCESS)
    this.initTiming = () => {
      throw new Error('请勿重复初始化')
    }
  }
  /**
   * 定时任务
   */
  createSchedule = (bot: Bot) => {
    if (bot.config.timing.enable) {
      bot.config.timing.list.forEach((item: any) => {
        if (item.twelve) {
          schedule.scheduleJob('0 0 0 * * *', () => {
            bot.send(item.type, item.id, bot.CQCode.image('12.jpg'))
          })
          schedule.scheduleJob('0 0 12 * * *', () => {
            bot.send(item.type, item.id, bot.CQCode.image('12.jpg'))
          })
        }
        if (item.time) {
          schedule.scheduleJob('0 0 1 * * *', () => {
            bot.send(item.type, item.id, bot.CQCode.image('01.jpg'))
          })
          schedule.scheduleJob('0 0 2 * * *', () => {
            bot.send(item.type, item.id, bot.CQCode.image('02.jpg'))
          })
          schedule.scheduleJob('0 0 3 * * *', () => {
            bot.send(item.type, item.id, bot.CQCode.image('03.jpg'))
          })
          schedule.scheduleJob('0 0 4 * * *', () => {
            bot.send(item.type, item.id, bot.CQCode.image('04.jpg'))
          })
          schedule.scheduleJob('0 0 5 * * *', () => {
            bot.send(item.type, item.id, bot.CQCode.image('05.jpg'))
          })
          schedule.scheduleJob('0 0 6 * * *', () => {
            bot.send(item.type, item.id, bot.CQCode.image('06.jpg'))
          })
        }
      })
    }
  }
}
