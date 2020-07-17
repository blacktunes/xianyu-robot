import mysql = require('mysql')

export default class Mysql {
  constructor(config: mysql.PoolConfig) {
    this.pool = mysql.createPool({
      // 允许多条查询
      multipleStatements: true,
      charset: 'utf8mb4',
      ...config
    })
  }

  pool: mysql.Pool

  /**
   * 查询语句
   * @param sql
   * @param values
   */
  query(sql: string, values = '') {
    return new Promise((resolve, reject) => {
      if (this.pool === null) {
        reject(false)
      } else {
        this.pool.getConnection((err, conn) => {
          if (err) {
            reject(err)
          } else {
            conn.query(sql, values, (err, results) => {
              if (err) {
                reject(err)
              } else {
                resolve(results)
              }
            })
            conn.release()
          }
        })
      }
    })
  }
}
