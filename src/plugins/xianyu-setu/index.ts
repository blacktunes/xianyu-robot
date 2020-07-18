import { printTime } from '../../cq-robot'
import Bot from '../../main'
import { initMysql, setuNum, setuTotal } from './modules/mysql'
import { setu, setuStar, startCopy, stopCopy, clearRestrictedList } from './modules/setu'
import { createSetuServer } from './modules/socket'
import { SetuConfig, toNumber, mysqlErr } from './modules/utils'
import NamedRegExp = require('named-regexp-groups')

var status = false

export default function initSetu(bot: Bot, setuConfig: SetuConfig, mysqlConfig: any) {
  if (status) throw new Error('请勿重复初始化')
  const config: SetuConfig = {
    enable: true,
    multiservice: {
      enable: false,
      port: 10000,
      token: ''
    },
    copy: false,
    copy_times: 250,
    cache: false,
    r18: 0,
    new_pic: false,
    dl_location: '/',
    keyword_1: '色图',
    keyword_2: '色图',
    star_1: '每日色胚',
    star_2: '每日色胚',
    default: 0,
    api: 'https://api.lolicon.app/setu"',
    apikey: '',
    limit: 5
  }
  if (mysqlConfig) initMysql(bot, mysqlConfig)
  if (setuConfig) {
    for (let i in config) {
      if (setuConfig[i]) {
        config[i] = setuConfig[i]
      }
    }
    bot.config.setu = { ...config }
  } else {
    bot.config.setu = { ...config }
  }
  bot.plugin(handelMsg)
  bot.init(createSetuServer)
  clearRestrictedList()
  status = true
}

function handelMsg(bot: Bot, from: number, fromQQ: number, msg: string, type: 0 | 1 | 2): 0 {
  if (bot.adminData && fromQQ === bot.adminData.qq) {
    if (msg === '切换图库') {
      // 切换图库
      if (bot.config.setu.default === 1 && mysqlErr(bot, type, from, fromQQ)) return 0
      switch (bot.config.setu.default) {
        case 0:
          if (mysqlErr(bot, type, from, fromQQ)){}
          bot.config.setu.default = 1
          bot.saveConfig()
          bot.send(type, type === 0 ? fromQQ : from, `${type !== 0 ? bot.CQCode.at(fromQQ) : ''}图库已切换为：本地数据库`)
          break
        case 1:
          bot.config.setu.default = 0
          bot.saveConfig()
          bot.send(type, type === 0 ? fromQQ : from, `${type !== 0 ? bot.CQCode.at(fromQQ) : ''}图库已切换为：api.lolicon.app`)
          break
      }
      return 0
    }

    if (bot.adminData.type === 0 || from === bot.adminData.id) {
      // 自动搬图
      if (msg === '咸鱼王，开始干活' || msg === '-copy') {
        if (mysqlErr(bot, type, from, fromQQ)) return 0
        printTime('开始从API搬运', 10)
        bot.send(type, type === 0 ? fromQQ : from, `${type !== 0 ? bot.CQCode.at(fromQQ) : ''}哦`)
        startCopy(bot, fromQQ)
        return 0
      } else if (msg === '停下吧' || msg === '-end') {
        if (mysqlErr(bot, type, from, fromQQ)) return 0
        printTime('停止从API搬运', 10)
        stopCopy()
        return 0
      }
      // 下载缓存
      if (msg === '下载缓存') {
        if (mysqlErr(bot, type, from, fromQQ)) return 0
        // downloadCache()
        return 0
      }
    }
  }

  if (type === 0) return 0

  let setuReg_1 = new NamedRegExp(`[来发给](?<text>((?<num>([1-9]|10)|[一二两三四五六七八九十])?[张份幅])|点)(?<tag>.*?)?的?${bot.config.setu.keyword_1}`)
  let setuReg_2 = new NamedRegExp(`[来发给](?<text>((?<num>([1-9]|10)|[一二两三四五六七八九十])?[张份幅])|点)(?<tag>.*?)?的?(${bot.config.setu.keyword_1}|${bot.config.setu.keyword_2})`)

  if (bot.config.setu.enable) {
    if ((type === 1 && setuReg_1.test(msg)) || (type === 2 && setuReg_2.test(msg))) {
      const data = type === 1 ? setuReg_1.exec(msg).groups : type === 2 ? setuReg_2.exec(msg).groups : null
      const tag = data.tag ? data.tag : null
      const num = data.num ? toNumber(data.num) : toNumber(data.text)
      if (bot.config.setu.default === 1 && mysqlErr(bot, type, from, fromQQ)) return 0
      setu(bot, from, fromQQ, num, type, tag)
      return 0
    }

    if (msg.includes('查询 ')) {
      if (mysqlErr(bot, type, from, fromQQ)) return 0
      const keyword = msg.split('查询 ')[1]
      if (keyword && keyword.length > 0) {
        setuNum(bot, keyword)
          .then(msg => {
            bot.send(type, from, `${bot.CQCode.at(fromQQ)}\n${msg}`)
          })
          .catch(() => {
            bot.send(type, from, `${bot.CQCode.at(fromQQ)}出现了奇怪的问题`)
          })
      }
    }

    if (msg === '今天是谁') {
      if (mysqlErr(bot, type, from, fromQQ)) return 0
      setuStar(bot, type, from)
      return 0
    }

    if (msg === '当前图量') {
      if (mysqlErr(bot, type, from, fromQQ)) return 0
      setuTotal()
        .then(num => {
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}\n总图量:${num[0]}\n未浏览:${num[1]}\n未缓存:${num[2]}\n被删除:${num[3]}`)
        })
        .catch(() => {
          bot.send(type, from, `${bot.CQCode.at(fromQQ)}好像出了点问题`)
        })
      return 0
    }

    if (msg === '当前图库') {
      if (bot.config.setu.default === 1) {
        bot.send(type, from, `${bot.CQCode.at(fromQQ)}当前使用图库为：本地数据库`)
      } else {
        bot.send(type, from, `${bot.CQCode.at(fromQQ)}当前使用图库为：api.lolicon.app`)
      }
      return 0
    }
  }
}
