import { createPool, Pool, PoolConfig } from 'mysql'

export class Mysql {
  constructor(config: PoolConfig) {
    this.Pool = createPool({
      // 允许多条查询
      multipleStatements: true,
      charset: 'utf8mb4',
      ...config
    })
  }

  Pool: Pool = null

  /**
   * 查询语句
   * @param sql
   * @param values
   */
  readonly query = (sql: string, values = '') => {
    return new Promise<any>((resolve, reject) => {
      if (this.Pool === null) {
        reject(-1)
      } else {
        this.Pool.getConnection((err, conn) => {
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
