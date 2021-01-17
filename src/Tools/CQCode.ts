import { Message, NodeMessage } from "../Type"

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
   * 发送图片(发送私聊时可能会失败)
   * @param file 图片文件名或URL
   * @param cache 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 1
   * @param type 图片类型，flash 表示闪照，show 表示秀图，默认普通图片
   * @param id 发送秀图时的特效id，默认为40000
   */
  image(file: string, cache: 0 | 1 = 1, type?: 'flash' | 'show', id: 40000 | 40001 | 40002 | 40003 | 40004 | 40005 = 40000): string {
    if (type === 'flash') {
      return `[CQ:image,file=${this.encode(file)},type=flash]`
    } else if (type === 'show') {
      return `[CQ:image,file=${this.encode(file)},type=show,id=${id}]`
    } else {
      return `[CQ:image,file=${this.encode(file)},cache=${cache}]`
    }
  }

  /**
   * 发送语音(需要ffmpeg)
   * @param file 文件路径
   */
  record(file: string): string {
    return `[CQ:record,file=${this.encode(file)}]`
  }

  /**
   * 发送视频
   * @param file 文件路径
   */
  video(file: string): string {
    return `[CQ:video,file=${this.encode(file)}]`
  }

  /**
   * 发送QQ表情
   * @param id 表情id
   */
  face(id: number): string {
    return `[CQ:face,file=${id}]`
  }

  /**
   * @某人(at)
   * @param qqId -1 为全体
   * @param isNoSpace 默认为假 At后添加空格，可使At更规范美观。如果不需要添加空格，请置本参数为true
   */
  at(qqId: number, isNoSpace: boolean = false): string {
    return `[CQ:at,qq=${qqId === -1 ? 'all' : qqId}]${isNoSpace ? '' : ' '}`
  }

  /**
   * 发送分享
   * @param url 分享的链接
   * @param title 分享的标题
   * @param content 分享的简介
   * @param image 分享的图片链接
   */
  share(url: string, title: string = '', content: string = '', image: string = ''): string {
    return `[CQ:share,url=${this.encode(url)},title=${this.encode(title)},content=${this.encode(content)},image=${this.encode(image)}]`
  }

  /**
   * 回复
   * @param id 回复时所引用的消息id, 必须为本群消息.
   */
  reply(id: number): string {
    return `[CQ:reply,id=${id}]`
  }

  /**
   * 合并转发
   * @param id 合并转发ID, 需要通过 /get_forward_msg API获取转发的具体内容
   */
  forward(id: number): string {
    return `[CQ:forward,id=${id}]`
  }

  /**
   * 合并转发消息节点
   * 需要使用单独的API /send_group_forward_msg 发送，并且由于消息段较为复杂，仅支持Array形式入参。
   * @param id 转发消息id
   */
  node(id: number): NodeMessage {
    return {
      type: 'node',
      data: {
        id: id.toString()
      }
    }
  }

  /**
   * 自定义合并转发消息节点
   * 需要使用单独的API /send_group_forward_msg 发送，并且由于消息段较为复杂，仅支持Array形式入参。
   * @param name 发送者显示名字
   * @param uin 发送者QQ号
   * @param content 具体消息
   */
  customNode(name: string, uin: number, content: Message): NodeMessage {
    return {
      type: 'node',
      data: {
        name,
        uin: uin.toString(),
        content
      }
    }
  }

  /**
   * 发送礼物
   * 仅支持免费礼物,发送群礼物消息无法撤回
   * @param qq 接收礼物的成员
   * @param id 	礼物的类型
   * 0 甜Wink
   * 1 快乐肥宅水
   * 2 幸运手链
   * 3 卡布奇诺
   * 4 猫咪手表
   * 5 绒绒手套
   * 6 彩虹糖果
   * 7 坚强
   * 8 告白话筒
   */
  gift(qq: number, id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): string {
    return `[CQ:gift,qq=${qq},id=${id}]`
  }

  /**
   * 文本转语音
   * 通过TX的TTS接口，采用的音源与登录账号的性别有关
   * @param test 内容
   */
  tts(test: string): string {
    return `[CQ:tts,text=${this.encode(test)}]`
  }

  /**
   * 发送音乐(music)
   * @param musicId 音乐的歌曲数字ID
   * @param type 目前支持 qq/QQ音乐 163/网易云音乐 xiami/虾米音乐，默认为qq
   * @param style 启用新版样式，目前仅 QQ音乐 支持
   */
  music(musicId: number, type: '' | 'qq' | '163' | 'xiami' = '', style: boolean = false): string {
    return `[CQ:music,id=${musicId},type=${type ? type : 'qq'}${style ? ',style=1' : ''}]`
  }

  /**
   * 戳一戳(仅群聊)
   * @param qq 需要戳的成员
   */
  poke(qq: number): string {
    return `[CQ:poke,qq=${qq}]`
  }

  /**
   * 发送xml卡片
   * @param data xml内容，xml中的value部分，记得实体化处理
   */
  xml(data: string): string {
    return `[CQ:xml,data=${this.encode(data)}]`
  }

  /**
   * 发送json卡片
   * @param data json内容，json的所有字符串记得实体化处理
   */
  json(data: string): string {
    return `[CQ:json,data=${this.encode(data)}]`
  }

  /**
   * xml大图
   * @param file 和image的file字段对齐，支持也是一样的
   * @param minwidth 默认不填为400，最小width
   * @param minheight 默认不填为400，最小height
   * @param maxwidth 默认不填为500，最大width
   * @param maxheight 默认不填为1000，最大height
   * @param source 分享来源的名称，可以留空
   * @param icon 分享来源的icon图标url，可以留空
   */
  cardimage(file: string, minwidth: number = 400, minheight: number = 400, maxwidth: number = 500, maxheight: number = 1000, source: string = '', icon: string = ''): string {
    return `[CQ:cardimage,file=${this.encode(file)},minwidth=${minwidth},minheight=${minheight},maxwidth=${maxwidth},maxheight=${maxheight},source=${this.encode(source)},icon=${this.encode(icon)}]`
  }
}

export const CQCode = new CQCODE
