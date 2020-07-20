/**
 * 将文本格式化为数字字符串
 * @param {any} str 需要格式化的文本
 */
function toNumberString(str: any) {
  let num: string
  switch (str) {
    case '零':
      num = '0'
      break
    case '一':
      num = '1'
      break
    case '二':
      num = '2'
      break
    case '三':
      num = '3'
      break
    case '四':
      num = '4'
      break
    case '五':
      num = '5'
      break
    case '六':
      num = '6'
      break
    case '七':
      num = '7'
      break
    case '八':
      num = '8'
      break
    case '九':
      num = '9'
      break
    case '十':
      num = '10'
      break
  }
  return num
}

/**
 * 格式化文本为日期可用数字
 * @param {any} str
 */
export function toDate(str: any) {
  if (/^[0-9]\d*$/.test(str)) {
    return str
  }
  str = str.split('')
  if (str.length === 1) {
    str = toNumberString(str[0])
  } else if (str.length === 2) {
    if (str[0] === '十') {
      str = '1' + toNumberString(str[1])
    } else if (str[1] === '十') {
      str = toNumberString(str[0]) + '0'
    }
  } else if (str.length === 3 && str[1] === '十') {
    str = toNumberString(str[0]) + toNumberString(str[2])
  }
  return str
}
