import Bot from '../../../main'
import { printTime } from '../../../cq-robot'
import { PoolConfig } from 'mysql'

/**
 * 创建链接池
 */
export var Mysql = null

export function initMysql(bot: Bot, config: PoolConfig) {
  Mysql = bot.createPool(config)
}

/**
 * 创建调用记录
 * @param {number} from 来源群号或讨论组ID
 * @param {number} fromQQ
 * @param {number} fromType 消息来源, 0为讨论组, 1为群
 * @param {number} num 图片数量
 */
export async function recoed(bot: Bot, qq: number, from: number, fromType: number, num: number): Promise<number> {
  const date = bot.getTime(new Date())
  const time1 = date.date
  const time2 = date.time
  const type = fromType === 0 ? 'discuss' : 'group'
  try {
    return await Mysql.query(`INSERT INTO record (qq, \`from\`, fromType, date, time, num, source) VALUE (${qq}, ${from}, '${type}', '${time1}', '${time2}', ${num}, ${bot.config.setu.default})`).insertId
  }
  catch (err) {
    console.error(err)
    return 0
  }
}

/**
 * 将获取的图片信息存入数据库
 * @param {string} sql 图片的详细信息, 请先格式化为 (time, pid, uid, title, author, r18, url, width, height, tags)
 */
export async function saveSetu(sql: string) {
  await Mysql.query(`INSERT INTO setu (time, pid, uid, title, author, r18, url, width, height, tags) values ${sql} ON DUPLICATE KEY UPDATE id = id`)
    .then(() => {
      printTime(`录入完成`, 13)
    })
    .catch((err: any) => {
      if (err) {
        printTime(JSON.stringify(err), 30)
      }
    })
}

/**
 * 从数据库随机获取图片
 * @param {number} num 需要获取的图数
 * @param {string} tag 可选参数，指定作者或者tag
 */
export function getSetu(bot: Bot, num: number = 1, tag?: string) {
  return new Promise<Array<any>>((resolve, reject) => {
    let r18 = bot.config.setu.r18 === 0 ? ' and r18=0 ' : bot.config.setu.r18 === 1 ? ' and r18=1 ' : ''
    let cache = bot.config.setu.cache ? ' and \`cache\`=1 and \`404\`=0 ' : ''
    let newPic = bot.config.setu.new_pic ? ' and num=0 ' : ''
    let tagSql = tag ? ` and (author like '%${tag}%' or from_base64(title) like '%${tag}%' or from_base64(tags) like '%${tag}%') ` : ''
    Mysql.query(`SELECT title,pid,author,url FROM setu where id > 0${r18}${cache}${newPic}${tagSql}ORDER BY RAND() LIMIT ${num}`)
      .then((results: any[] | PromiseLike<any[]>) => {
        resolve(results)
      })
      .catch((err: any) => {
        printTime(JSON.stringify(err), 30)
        reject()
      })
  })
}

/**
 * 往数据库记录图片被查看一次
 * @param {string} title 用于控制台输出的图片标题
 * @param {string} sql 用于数据库记录的sql语句
 * @param {number} insertId 记录ID
 * @param {number} source 图片来源
 * @param {number} num 图片数量
 */
export function viewed(title: string, sql: string, insertId: number, source: number, num: number) {
  Mysql.query(`UPDATE setu SET num=num + 1 WHERE pid in (${sql});update record set num=${num}, success=1, setu='${sql.replace(/'/g, '')}', source=${source} where id=${insertId}`)
    .then(() => {
      printTime(`以下图片被查看了一次：\n${title}`, 20)
    })
    .catch((err: any) => {
      printTime(JSON.stringify(err), 30)
    })
}

/**
 * 查询图库目前的图量
 */
export function setuTotal() {
  return new Promise<Array<number>>(resolve => {
    Mysql.query('select COUNT(*) from setu;select COUNT(*) from setu where num=0;select COUNT(*) from setu where `cache` = 0 and `404` = 0;select COUNT(*) from setu where `404` = 1')
      .then((results: { [x: string]: number }[][]) => {
        resolve([results[0][0]['COUNT(*)'], results[1][0]['COUNT(*)'], results[2][0]['COUNT(*)'], results[3][0]['COUNT(*)']])
      })
      .catch((err: any) => {
        printTime(JSON.stringify(err), 30)
        resolve(null)
      })
  })
}

/**
 * 查询图库未缓存的PID
 */
export function cacheNum() {
  return new Promise((resolve, reject) => {
    Mysql.query('select * from setu where `cache` = 0 and `404` = 0')
      .then((results: unknown) => {
        resolve(results)
      })
      .catch((err: any) => {
        printTime(JSON.stringify(err), 30)
        reject()
      })
  })
}

/**
 * 更新缓存信息
 */
export function updateCache(data: { id: number; url: string }, type: string) {
  Mysql.query(`update setu set \`${type}\`=1 where id=${data.id}`)
    .then(() => {
      if (type === 'cache') {
        printTime(`[200][ID:${data.id}] - ${data.url}`, 13)
      } else {
        printTime(`[404][ID:${data.id}] - ${data.url}`, 30)
      }
    })
    .catch((err: any) => {
      printTime(JSON.stringify(err), 30)
    })
}

/**
 * 根据群组ID查询当日的成功记录
 * @param {number} from 群组ID
 */
export function setuWatchNum(from: number) {
  return new Promise<Array<any>>((resolve, reject) => {
    Mysql.query(`select qq,num from record where date='${new Date().toLocaleDateString()}' and \`from\`=${from} and success=1`)
      .then((data: any[] | PromiseLike<any[]>) => {
        resolve(data)
      })
      .catch((err: any) => {
        console.log(err)
        reject()
      })
  })
}

/**
 * 根据关键词查询图库数量
 * @param {string} keyword 关键词
 */
export function setuNum(bot: Bot, keyword: string) {
  return new Promise((resolve, reject) => {
    let r18 = bot.config.setu.r18 === 0 ? ' and r18=0 ' : bot.config.setu.r18 === 1 ? ' and r18=1 ' : ''
    let cache = bot.config.setu.cache ? ' and \`cache\`=1 and \`404\`=0 ' : ' and \`404\`=0 '
    let newPic = ' and num=0 '
    let tag = ` and author like '%${keyword}%' or from_base64(title) like '%${keyword}%' or from_base64(tags) like '%${keyword}%' `
    Mysql.query(`select COUNT(*) from setu where author like '%${keyword}%'${r18}${cache};select COUNT(*) from setu where author like '%${keyword}%'${r18}${cache}${newPic};select COUNT(*) from setu where from_base64(title) like '%${keyword}%'${r18}${cache};select COUNT(*) from setu where from_base64(title) like '%${keyword}%'${r18}${cache}${newPic};select COUNT(*) from setu where from_base64(tags) like '%${keyword}%'${r18}${cache};select COUNT(*) from setu where from_base64(tags) like '%${keyword}%'${r18}${cache}${newPic}`)
      .then((data: { [x: string]: any }[][]) => {
        const msg = `作者匹配数：${data[1][0]['COUNT(*)']}/${data[0][0]['COUNT(*)']}\n标题匹配数：${data[3][0]['COUNT(*)']}/${data[2][0]['COUNT(*)']}\n标签匹配数：${data[5][0]['COUNT(*)']}/${data[4][0]['COUNT(*)']}`
        resolve(msg)
      })
      .catch((err: any) => {
        console.log(err)
        reject()
      })
  })
}
