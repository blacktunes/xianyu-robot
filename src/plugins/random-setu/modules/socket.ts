import Bot, { printTime } from "../../../main"

var setuServer = null
var setuIo = null
var connList = []

export function createSetuServer(bot: Bot) {
  setuServer = require('http').createServer((req, res) => {
    res.writeHead(403, {
      'content-type': 'text/plain'
    })
    res.end()
  }).listen(bot.config.setu.multiservice.port)
  setuIo = require('socket.io').listen(setuServer)
  printTime(`[setu] 辅助服务器已创建`, 13)

  setuIo.use((socket, next) => {
    if (socket.handshake.query.token === bot.config.setu.multiservice.token) {
      next()
    } else {
      next(new Error('验证失败'))
      printTime(`[setu] 来自${socket.handshake.headers['x-forwarded-for'] || socket.handshake.address}非法请求`, 30)
    }
  })

  setuIo.on('connection', socket => {
    connList.push(socket.id)
    printTime(`[setu] 辅助服务${socket.id}已连接`, 13)

    socket.on('disconnect', () => {
      connList.splice(connList.indexOf(socket.id), 1)
      printTime(`[setu] 辅助服务${socket.id}已断开`, 20)
      bot.send(0, bot.adminData.qq, `${new Date().toLocaleString()}\n辅助服务已断开 - ${connList.length}`)
    })
  })
}

var index = 0

export function socketSetu(bot: Bot, from: number, fromQQ: number, fromType: 0 | 1 | 2, keyword: string, num: number, insertId: number, tag?: string) {
  return new Promise(resolve => {
    if (setuIo === null) {
      resolve(false)
    }
    if (index > connList.length - 1) {
      index = 0
    }
    let id = connList[index]
    if (setuIo.sockets.connected[id]) {
      setuIo.sockets.connected[id].emit('setu', {
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
      printTime(`[setu] 任务分配至${id}`, 40)
      index++
      resolve(true)
    } else {
      resolve(false)
    }
  })
}
