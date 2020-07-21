import Bot, { printTime, CQLog } from '../../../main'
import IO = require('socket.io')

export default class SetuSocket {
  setuServer = null
  setuIo = null
  connList = []

  createSetuServer = (bot: Bot) => {
    this.setuServer = require('http').createServer((_req: any, res: any) => {
      res.writeHead(403, {
        'content-type': 'text/plain'
      })
      res.end()
    }).listen(bot.config.setu.multiservice.port)
    this.setuIo = IO.listen(this.setuServer)
    printTime(`[setu] 辅助服务器已创建`, CQLog.LOG_INFO_SUCCESS)

    this.setuIo.use((socket: any, next: Function) => {
      if (socket.handshake.query.token === bot.config.setu.multiservice.token) {
        next()
      } else {
        next(new Error('验证失败'))
        printTime(`[setu] 来自${socket.handshake.headers['x-forwarded-for'] || socket.handshake.address}非法请求`, CQLog.LOG_FATAL)
      }
    })

    this.setuIo.on('connection', (socket: any) => {
      this.connList.push(socket.id)
      printTime(`[setu] 辅助服务${socket.id}已连接`, CQLog.LOG_INFO_SUCCESS)

      socket.on('disconnect', () => {
        this.connList.splice(this.connList.indexOf(socket.id), 1)
        printTime(`[setu] 辅助服务${socket.id}已断开`, CQLog.LOG_WARNING)
        bot.send(0, bot.adminData.qq, `${new Date().toLocaleString()}\n辅助服务已断开 - ${this.connList.length}`)
      })
    })

    this.createSetuServer = () => { }
  }

  index = 0

  socketSetu = (bot: Bot, from: number, fromQQ: number, fromType: 0 | 1 | 2, keyword: string, num: number, insertId: number, tag?: string) => {
    return new Promise(resolve => {
      if (this.setuIo === null) {
        resolve(false)
      }
      if (this.index > this.connList.length - 1) {
        this.index = 0
      }
      let id = this.connList[this.index]
      if (this.setuIo.sockets.connected[id]) {
        this.setuIo.sockets.connected[id].emit('setu', {
          r18: bot.config.setu.r18,
          cache: bot.config.setu.cache,
          new_pic: bot.config.setu.new_pic,
          default: bot.config.setu.default,
          from: from,
          fromQQ: fromQQ,
          keyword: keyword,
          fromType: fromType,
          num: num,
          insertId: insertId,
          tag: tag
        })
        printTime(`[setu] 任务分配至${id}`, CQLog.LOG_DEBUG)
        this.index++
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }
}
