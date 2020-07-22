import schedule = require('node-schedule')
import axios from 'axios'
import Bot, { printTime, CQLog } from '../../main'

export interface LiveConfig {
  enable: boolean
  list: {
    [x: number]: {
      name: string,
      live_status?: 0 | 1 | 2,
      type: 0 | 1 | 2,
      id: number,
      qq: number
    }
  }
}

export default class Live {
  constructor(bot: Bot, liveConfig: LiveConfig) {
    const config: LiveConfig = {
      enable: true,
      list: []
    }
    if (liveConfig) {
      for (let i in config) {
        if (liveConfig[i]) {
          config[i] = liveConfig[i]
        }
      }
      bot.config.live = { ...config }
    } else {
      bot.config.live = { ...config }
    }
    bot.applySchedule(this.createSchedule)
    printTime(`[插件] 开播提醒已载入`, CQLog.LOG_INFO_SUCCESS)
  }

  createSchedule = (bot:Bot) => {
    if (!bot.config.live.enable) {
      return
    }
    let watchList = bot.config.live.list
    for (let key in watchList) {
      schedule.scheduleJob(key, '0 * * * * *', () => {
        axios.get(`https://api.live.bilibili.com/room/v1/Room/get_info?id=${key}`, {
          timeout: 1000 * 55
        })
          .then(res => {
            if (res.data.code === 0) {
              if (res.data.data['live_status'] === 1) {
                if (watchList[key]['live_status'] !== 1) {
                  watchList[key]['live_status'] = 1
                  bot.send(watchList[key].type, watchList[key].id, `${bot.CQCode.at(watchList[key].qq)}${watchList[key].name}开播了！\n直播标题：${res.data.data.title}\nhttps://live.bilibili.com/${key}`)
                }
              } else {
                if (watchList[key]['live_status'] === 1) {
                  watchList[key]['live_status'] = null
                  bot.send(watchList[key].type, watchList[key].id, `${bot.CQCode.at(watchList[key].qq)}${watchList[key].name}下播了`)
                }
              }
            }
          })
          .catch(err => {
            console.error(err.code)
          })
      })
    }
  }
}
