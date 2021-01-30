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
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, interval * 1000)
  })
}

export const secondsFormat = (s: number) => {
  const day = Math.floor(s / (24 * 3600))
  const hour = Math.floor((s - day * 24 * 3600) / 3600);
  const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  return `${day ? day + '天' : ''}${hour ? hour + '时' : ''}${minute ? minute + '分' : ''}${second ? second + '秒' : ''}`
}
