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

/**
 * 格式化秒
 */
export const secondsFormat = (s: number) => {
  const day = Math.floor(s / (24 * 3600))
  const hour = Math.floor((s - day * 24 * 3600) / 3600);
  const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  return `${day ? day + '天' : ''}${hour ? hour + '时' : ''}${minute ? minute + '分' : ''}${second ? second + '秒' : ''}`
}

/**
 * 特殊字符，转义，避免冲突
 * @param {string} code 要转义的字符串
 * @param {boolean} [isComma=true] 是否转义逗号，默认为true
 * @returns {string} 转义后的字符串
 */
export const encode = (code: string, isComma: boolean = true): string => {
  code = code.replace('&', '&amp;')
  code = code.replace('[', '&#91;')
  code = code.replace(']', '&#93;')
  if (isComma) {
    code = code.replace(',', '&#44;')
  }
  return code
}
/**
 * 特殊字符，反转义
 * @param {string} code stringReplace
 * @returns {string} 反转义后的字符串
 */
export const decode = (code: string): string => {
  code = code.replace('&amp;', '&')
  code = code.replace('&#91;', '[')
  code = code.replace('&#93;', ']')
  code = code.replace('&#44;', ',')
  return code
}
