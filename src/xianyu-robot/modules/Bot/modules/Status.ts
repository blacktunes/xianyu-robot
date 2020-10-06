export function getStatus(status: number) {
  let msg = '未知错误'
  switch (status) {
    case 0:
      msg = '执行成功'
      break
    case -100:
      msg = '无效请求'
      break
    case -102:
      msg = 'Mirai异常'
      break
    case -103:
      msg = '插件异常'
      break
    case -999:
      msg = 'WebSocket连接还未建立，无法调用http-api'
      break
    case -1000:
      msg = '请求发生错误'
      break
  }
  return msg
}
