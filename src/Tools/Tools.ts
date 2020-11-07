/**
 * 格式化Date对象
 * @param date Date对象
 */
export const getTime = (date: any) => {
  return {
    date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
    time: `${date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds()}`
  }
}

/**
 * 使用await暂停运行
 * @param {number} interval 暂停秒数
 */
export const sleep = (interval: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, interval * 1000)
  })
}
