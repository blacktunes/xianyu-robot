import Bot, { printTime, CQLog } from '../../main'
import fs = require('fs')
import path = require('path')
import schedule = require('node-schedule')

export interface PcrConfig {
  enable: boolean,
  gvg: boolean,
  id: number,
  other: boolean
}

export default class Pcr {
  constructor(bot: Bot, pcrConfig: PcrConfig) {
    this.initTiming(bot, pcrConfig)
  }

  initTiming = (bot: Bot, pcrConfig: PcrConfig) => {
    const config: PcrConfig = {
      enable: false,
      gvg: false,
      id: null,
      other: false,
    }
    if (pcrConfig) {
      for (let i in config) {
        if (pcrConfig[i]) {
          config[i] = pcrConfig[i]
        }
      }
      bot.config.pcr = { ...config }
    } else {
      bot.config.pcr = { ...config }
    }
    bot.applyInit(this.initData)
    bot.applySchedule(this.createSchedule)
    bot.applyPlugin(this.pcr)
    printTime(`[插件] PCR已载入`, CQLog.LOG_INFO_SUCCESS)
    this.initTiming = () => {
      throw new Error('请勿重复初始化')
    }
  }

  pcrData = {
    boss: 0,
    treeList: [],
    now: null,
    groupList: {},
    num: {}
  }

  createSchedule = (bot: Bot) => {
    if (bot.config.pcr.gvg) {
      schedule.scheduleJob('0 0 5 * * *', () => {
        this.resetNum(bot)
      })
    }
    schedule.scheduleJob('0 0 5 * * *', () => {
      this.getGroupList(bot)
    })
  }

  initData = async (bot: Bot) => {
    if (bot.dirname && fs.existsSync(path.join(bot.dirname, './pcrdata.json'))) {
      this.pcrData = JSON.parse(fs.readFileSync(path.join(bot.dirname, './pcrdata.json')).toString())
    }
    this.getGroupList(bot)
  }

  getGroupList = async (bot: Bot) => {
    let data = await bot.CQ.getGroupMemberList(bot.config.pcr.id)
    data.forEach(item => {
      if (item.user_id !== bot.userId) {
        if (item.card) {
          this.pcrData.groupList[item.user_id] = item.card
        } else {
          this.pcrData.groupList[item.user_id] = item.nickname
        }
      }
    })
  }

  savePcrData = (bot: Bot) => {
    const str = JSON.stringify(this.pcrData)
    fs.writeFile(path.join(bot.dirname, './pcrData.json'), str, (err) => {
      if (err) {
        console.error(err)
        printTime('任务未写入JSON', CQLog.LOG_ERROR)
      }
    })
  }

  updateNum = (qq: number) => {
    if (this.pcrData.num[qq]) {
      this.pcrData.num[qq] += 1
    } else {
      this.pcrData.num[qq] = 1
    }
  }

  resetNum = (bot: Bot) => {
    this.pcrData.num = {}
    for (let i in this.pcrData.groupList) {
      this.pcrData.num[i] = 0
    }
    this.pcrData.now = null
    this.pcrData.treeList = []
    this.savePcrData(bot)
    printTime('数据已重置', CQLog.LOG_DEBUG)
  }

  /**
   * PCR公会战
   * @param {number} from 来源群号或讨论组ID
   * @param {number} fromQQ
   * @param {string} msg
   * @param {number} type 消息来源, 0为讨论组, 1为群
   */
  pcr = (bot: Bot, from: number, fromQQ: number, msg: string, type: 0 | 1 | 2) => {
    if (from !== bot.config.pcr.id) return
    if (bot.adminData && fromQQ === bot.adminData.qq && msg === '强制刷新') {
      this.resetNum(bot)
      bot.send(type, from, '数据已重置')
      return 0
    }

    if (!bot.config.pcr.gvg && msg.indexOf('会长') != -1) {
      if (Math.random() > 0.8) {
        bot.send(type, from, `${Math.random() > 0.5 ? bot.CQCode.image('gua-1.jpg') : bot.CQCode.image('gua-2.jpg')}`)
      }
    }

    if (msg === '使用说明') {
      if (bot.config.pcr.gvg) {
        bot.send(type, from, `boss录入\n默认为国服boss数据。空格分开后接整数，空格分开，且单位为万，例如\n——————\nboss录入 200\n——————\n表示录入1个200w血boss\n\n申请出刀\n成员申请出刀，如果该成员已经挂数或有人正在打，则无法出刀。\n\n完成\n成员打完，空格后接伤害，或“击杀”，表示造成的伤害或击杀当前boss\n\n挂树\n当前挑战的成员已挂树\n\n强行下树\n空格后接强行下树的伤害\n\n查树\n查看树上的成员\n\n查看\n查看当前boss数据\n\n修正\n修正boss数据\n空格后接boss血量\n列如：修正 500000\n表示修正为boss血量为500000血\n出刀详情\n查看所有成员出刀情况\n\n查刀\n查看当日总刀数\n\n一键召唤\n@所有没有出完刀的成员`)
      } else {
        bot.send(type, from, '别看了，现在又没公会战')
      }
      return 0
    }

    if (msg.indexOf('boss录入 ') != -1) {
      if (bot.config.pcr.gvg) {
        let num = msg.split('boss录入 ')[1]
        if (/^[1-9]\d*$/.test(num)) {
          if (this.pcrData.boss == 0) {
            this.pcrData.boss = Number(num) * 10000
            bot.send(type, from, `已录入boss`)
          } else {
            bot.send(type, from, `当前boss还未击杀`)
          }
        } else {
          bot.send(type, from, '输入不正确')
        }
        this.savePcrData(bot)
      } else {
        bot.send(type, from, '不给录，好好咸鱼')
      }
      return 0
    }

    if (msg === '申请出刀') {
      if (bot.config.pcr.gvg) {
        if (this.pcrData.now) {
          if (this.pcrData.now === fromQQ) {
            bot.send(type, from, '你都还没打完！')
          } else {
            bot.send(type, from, `${this.pcrData.groupList[this.pcrData.now]}在攻击boss，请稍等！`)
          }
        } else if (this.pcrData.treeList.indexOf(fromQQ) != -1) {
          bot.send(type, from, `你在树上`)
        } else {
          if (this.pcrData.boss <= 0) {
            bot.send(type, from, '没boss打了')
          } else {
            this.pcrData.now = fromQQ
            bot.send(type, from, `${this.pcrData.groupList[this.pcrData.now]} 开始挑战第${this.pcrData.num[fromQQ] ? this.pcrData.num[fromQQ] + 1 : 1}刀\nboss生命值${this.pcrData.boss}`)
          }
        }
        this.savePcrData(bot)
      } else {
        bot.send(type, from, '你在树上')
      }
      return 0
    }

    if (msg.indexOf('完成 ') != -1) {
      if (this.pcrData.now && this.pcrData.now === fromQQ) {
        let num = msg.split('完成 ')[1]
        if (/^[0-9]\d*$/.test(num)) {
          this.pcrData.boss -= Number(num)
          if (this.pcrData.boss <= 0) {
            this.pcrData.boss = 0
            bot.send(type, from, `${this.pcrData.groupList[fromQQ] ? this.pcrData.groupList[fromQQ] : fromQQ} 击杀boss，已返还次数`)
          } else {
            bot.send(type, from, `${this.pcrData.groupList[fromQQ] ? this.pcrData.groupList[fromQQ] : fromQQ} 已完成挑战boss\nboss生命值${this.pcrData.boss}\n${bot.CQCode.image('next.jpg')}`)
            this.updateNum(fromQQ)
          }
          this.pcrData.now = null
        } else if (num === '击杀') {
          this.pcrData.boss = 0
          this.pcrData.now = null
          this.pcrData.treeList = []
          bot.send(type, from, `${this.pcrData.groupList[fromQQ] ? this.pcrData.groupList[fromQQ] : fromQQ} 击杀boss，已返还次数`)
        } else {
          bot.send(type, from, '输入不正确')
        }
        this.savePcrData(bot)
      }
      return 0
    }

    if (msg === '挂树') {
      if (this.pcrData.now && this.pcrData.now === fromQQ) {
        this.pcrData.treeList.push(fromQQ)
        this.pcrData.now = null
        bot.send(type, from, `${this.pcrData.groupList[fromQQ] ? this.pcrData.groupList[fromQQ] : fromQQ} 已挂树\n${Math.random() > 0.5 ? bot.CQCode.image('gua-1.jpg') : bot.CQCode.image('gua-2.jpg')}`)
      }
      this.savePcrData(bot)
      return 0
    }

    if (msg.indexOf('强行下树 ') != -1) {
      if (bot.config.pcr.gvg) {
        if (this.pcrData.treeList.indexOf(fromQQ) != -1) {
          let num = msg.split('强行下树 ')[1]
          if (/^[0-9]\d*$/.test(num)) {
            this.pcrData.boss -= Number(num)
            delete this.pcrData.treeList[this.pcrData.treeList.indexOf(fromQQ)]
            if (this.pcrData.boss <= 0) {
              this.pcrData.boss = 0
              bot.send(type, from, `${this.pcrData.groupList[fromQQ] ? this.pcrData.groupList[fromQQ] : fromQQ} 击杀boss，已返还次数`)
            } else {
              bot.send(type, from, `${this.pcrData.groupList[fromQQ] ? this.pcrData.groupList[fromQQ] : fromQQ} 已强行下树\nboss生命值${this.pcrData.boss}`)
              this.updateNum(fromQQ)
            }
          } else {
            bot.send(type, from, '输入不正确')
          }
        }
        this.savePcrData(bot)
      } else {
        bot.send(type, from, '好好挂着，不给下')
      }
      return 0
    }

    if (msg === '查树') {
      let tree = ''
      if (bot.config.pcr.gvg) {
        for (let i in this.pcrData.treeList) {
          tree += `${this.pcrData.groupList[this.pcrData.treeList[i]] ? this.pcrData.groupList[this.pcrData.treeList[i]] : this.pcrData.treeList[i]}\n`
        }
      } else {
        for (let i in this.pcrData.groupList) {
          tree += `${this.pcrData.groupList[i] ? this.pcrData.groupList[i] : i}\n`
        }
      }
      bot.send(type, from, `挂树成员:\n${tree}`)
      return 0
    }

    if (msg === '查看') {
      if (bot.config.pcr.gvg) {
        if (this.pcrData.boss <= 0) {
          bot.send(type, from, '现在没有boss')
        } else {
          bot.send(type, from, `当前boss生命值${this.pcrData.boss}`)
        }
      } else {
        bot.send(type, from, '看啥看，没公会战哪来的boss')
      }
      return 0
    }

    if (msg.indexOf('修正 ') != -1) {
      if (bot.config.pcr.gvg) {
        let num = msg.split('修正 ')[1]
        if (/^[0-9]\d*$/.test(num)) {
          this.pcrData.boss = Number(num)
          bot.send(type, from, `boss生命值已修正为${Number(num)}`)
        } else {
          bot.send(type, from, '输入不正确')
        }
        this.savePcrData(bot)
      } else {
        bot.send(type, from, 'boss都没，修正啥呀')
      }
      return 0
    }

    if (msg === '出刀详情') {
      if (bot.config.pcr.gvg) {
        let list = ''
        for (let i in this.pcrData.num) {
          list += `${this.pcrData.groupList[i] ? this.pcrData.groupList[i] : i}: ${this.pcrData.num[i]}/3\n`
        }
        bot.send(type, from, list)
      } else {
        bot.send(type, from, '去去去，一边去')
      }
      return 0
    }

    if (msg === '查刀') {
      if (bot.config.pcr.gvg) {
        let num = 0
        for (let i in this.pcrData.num) {
          num += this.pcrData.num[i]
        }
        bot.send(type, from, `今日出刀数：${num}/${Object.keys(this.pcrData.groupList).length * 3}(90)`)
      } else {
        bot.send(type, from, '今天大家都很咸鱼一刀没出')
      }
      return 0
    }

    if (msg === '一键召唤') {
      if (bot.config.pcr.gvg) {
        let at = ''
        for (let i in this.pcrData.num) {
          if (this.pcrData.num[i] < 3) {
            at += `${bot.CQCode.at(Number(i))}还有${3 - this.pcrData.num[i]}刀没出\n`
          }
        }
        bot.send(type, from, `${at}${bot.CQCode.image('dao.jpg')}`)
      } else {
        bot.send(type, from, `${bot.CQCode.at(fromQQ)}\n${bot.CQCode.image('dao.jpg')}`)
      }
      return 0
    }

    if (!bot.config.pcr.other) {
      return 0
    }
  }
}
