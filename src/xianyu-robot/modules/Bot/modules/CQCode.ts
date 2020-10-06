import { CQEmoji, CQFace, CQImage, CQRecord, CQShake, CQShare } from 'cq-websocket'

/**
 * CQ码
 */
export class CQCODE {
  /**
   * 特殊字符，转义，避免冲突
   * @param {string} code 要转义的字符串
   * @param {boolean} [isComma=true] 是否转义逗号，默认为true
   * @returns {string} 转义后的字符串
   */
  encode(code: string, isComma: boolean = true): string {
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
  decode(code: string): string {
    code = code.replace('&amp;', '&')
    code = code.replace('&#91;', '[')
    code = code.replace('&#93;', ']')
    code = code.replace('&#44;', ',')
    return code
  }

  /**
   * @某人(at)
   * @param {number} qqId -1 为全体
   * @param {boolean} [isNoSpace=false] 默认为假 At后添加空格，可使At更规范美观。如果不需要添加空格，请置本参数为true
   */
  at(qqId: number, isNoSpace: boolean = false): string {
    return `[CQ:at,qq=${qqId === -1 ? 'all' : qqId}]${isNoSpace ? '' : ' '}`
  }

  /**
   * 发送图片(image)
   * 1.原生：将图片放在 酷Q的 data\image 下，并填写相对路径。如 data\image\1.jpg 则填写 1.jpg；
   * 2.增强：增强 CQ 码支持设置 file 为http/https/file协议，可以发送网络和本地文件系统中其它地方的图片、语音；
   * @param {string} file 文件路径
   * @param {boolean} [cache=true] 是否使用缓存，默认为true
   * @returns {string}
   */
  image(file: string, cache: boolean = true): string {
    return new CQImage(this.encode(file), cache).toString()
  }

  /**
   * 发送语音(record)
   * 1.原生：将语音放在 data\record 下，并填写相对路径。如 data\record\1.amr 则填写 1.amr；
   * 2.增强：增强 CQ 码支持设置 file 为http/https/file协议，可以发送网络和本地文件系统中其它地方的图片、语音；
   * @param {string} file 文件路径
   * @param {boolean} [magic=false] 是否是魔法语音
   * @returns {string}
   */
  record(file: string, magic: boolean = false): string {
    return new CQRecord(this.encode(file), magic).toString()
  }

  /**
   * QQ表情(face)
   * @param {number} id 表情ID
   * @returns {string}
   */
  face(id: number): string {
    return new CQFace(id).toString()
  }

  /**
   * emoji表情(emoji)
   * @param {number} id 表情ID
   * @returns {string}
   */
  emoji(id: number): string {
    return new CQEmoji(id).toString()
  }

  /**
   * 发送链接分享(share)
   * @param {string} url 分享的链接
   * @param {string} [title=''] 分享的标题，建议12字以内
   * @param {string} [content=''] 分享的简介，建议30字以内
   * @param {string} [image=''] 分享的图片链接，留空则为默认图片
   * @returns {string}
   */
  share(url: string, title: string = '', content: string = '', image: string = ''): string {
    return new CQShare(this.encode(url), this.encode(title), this.encode(content), this.encode(image)).toString()
  }

  /**
   * 发送名片分享(contact)
   * @param {('qq' | 'group')} type 类型 目前支持 qq/好友分享 group/群分享
   * @param {number} id 类型为qq，则为QQID；类型为group，则为群号
   * @returns {string}
   */
  contact(type: 'qq' | 'group', id: number): string {
    return `[CQ:contact,type=${type},id=${id}]`
  }

  /**
   * 发送音乐(music)
   * @param {number} musicId 音乐的歌曲数字ID
   * @param {('' | 'qq' | '163' | 'xiami')}  [type=''] 目前支持 qq/QQ音乐 163/网易云音乐 xiami/虾米音乐，默认为qq
   * @param {boolean} [style=false] 启用新版样式，目前仅 QQ音乐 支持
   * @returns {string}
   */
  music(musicId: number, type: '' | 'qq' | '163' | 'xiami' = '', style: boolean = false): string {
    return `[CQ:music,id=${musicId},type=${type ? type : 'qq'}${style ? ',style=1' : ''}]`
  }

  /**
   * 窗口抖动(shake) - 仅支持好友
   * @returns {string}
   */
  shake(): string {
    return new CQShake().toString()
  }

  /**
   * 戳一戳
   * @param type 类型
   * @param id ID
   */
  poke(type: number, id: number): string {
    return `[CQ:poke,type=${type},id=${id}]`
  }
}

export const CQCode = new CQCODE
