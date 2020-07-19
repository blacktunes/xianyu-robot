import Bot from '../../main'

export interface FuduConfig {
  enable: boolean,
  times: number,
  probability: number
}

export default class Fudu {
  constructor(bot: Bot, fuduConfig: FuduConfig)  {
    this.initFudu(bot, fuduConfig)
  }

  initFudu(bot: Bot, fuduConfig: FuduConfig) {
    const config: FuduConfig = {
      enable: true,
      times: 2,
      probability: 50
    }
    if (fuduConfig) {
      for (let i in config) {
        if (fuduConfig[i]) {
          config[i] = fuduConfig[i]
        }
      }
      bot.config.fudu = { ...config }
    } else {
      bot.config.fudu = { ...config }
    }
    bot.msgList = {}
    bot.applyPlugin(this.fudu)
    this.initFudu = () => {
      throw new Error('请勿重复初始化')
    }
  }

  msgList = {}

  /**
   * 当有多人发不同的人发相同内容时触发复读
   * @param type 2为讨论组, 1为群
   * @param from
   * @param fromQQ
   * @param msg
   */
  fudu = (bot: Bot, from: number, fromQQ: number, msg: string, type: 0 | 1 | 2) => {
    if (type === 0) return
    if (Object.keys(this.msgList).includes(`${from}`)) {
      if (this.msgList[from].msg === msg) {
        if (this.msgList[from].fromQQ !== fromQQ) {
          this.msgList[from].num += 1
        }
        if (this.msgList[from].num === bot.config.fudu.times) {
          this.msgList[from].num += 1
          bot.send(type, from, msg)
          return
        } else if (this.msgList[from].num > bot.config.fudu.times && (Math.random() * 100) > bot.config.fudu.probability) {
          bot.send(type, from, msg)
          return
        }
      }
    }
    this.msgList[from] = {
      fromQQ,
      msg,
      num: 1
    }
  }
}
