import { Mysql } from "./mysql"

export interface SetuConfig {
  enable: boolean,
  multiservice: {
    enable: boolean,
    port: number,
    token: string
  },
  copy: boolean,
  copy_times: number,
  cache: boolean,
  r18: 0 | 1 | 2,
  new_pic: boolean,
  dl_location: string,
  keyword_1: string,
  keyword_2: string,
  star_1: string,
  star_2: string,
  default: 0 | 1,
  api: string,
  apikey: string,
  limit: number
}

export function toNumber(str: any) {
  if (/^[1-9]\d*$/.test(str)) {
    return str
  }
  let num: number
  switch (str) {
    case '一':
      num = 1
      break
    case '两':
      num = 2
      break
    case '三':
      num = 3
      break
    case '四':
      num = 4
      break
    case '五':
      num = 5
      break
    case '六':
      num = 6
      break
    case '七':
      num = 7
      break
    case '八':
      num = 8
      break
    case '九':
      num = 9
      break
    case '十':
      num = 10
      break
    case '张':
      num = 1
      break
    case '份':
      num = 1
      break
    case '幅':
      num = 1
      break
    case '点':
      num = Math.floor(Math.random() * 10 + 1)
      break
    default:
      num = null
      break
  }
  return num
}

export function mysqlErr(bot, type, from, fromQQ): boolean {
  if (Mysql === null) {
    bot.send(type, from, `${bot.CQCode.at(fromQQ)}好像没有配置本地数据库`)
    return true
  }
  return false
}