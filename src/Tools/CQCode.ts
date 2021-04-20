import { Message, NodeMessage } from '../Type'
import { encode } from './Tools'

/**
 * CQ码
 */
export class CQCODE {
  /**
   * QQ表情
   * https://github.com/kyubotics/coolq-http-api/wiki/%E8%A1%A8%E6%83%85-CQ-%E7%A0%81-ID-%E8%A1%A8
   * @param id 表情id
   */
  face(id: number): string {
    return `[CQ:face,file=${id}]`
  }

  /**
   * 语音
   * @param file 语音文件名
   * @param magic 发送时可选, 默认 0, 设置为 1 表示变声
   * @param cache 只在通过网络 URL 发送时有效, 表示是否使用已缓存的文件, 默认 1
   * @param proxy 只在通过网络 URL 发送时有效, 表示是否通过代理下载文件 ( 需通过环境变量或配置文件配置代理 ) , 默认 1
   * @param timeout 只在通过网络 URL 发送时有效, 单位秒, 表示下载网络文件的超时时间 , 默认不超时
   */
  record(file: string, magic: 0 | 1 = 0, cache: 0 | 1 = 1, proxy: 0 | 1 = 1, timeout?: number): string {
    return `[CQ:record,file=${encode(file)}${magic === 1 ? ',magic=1' : ''}${cache === 0 ? ',cache=0' : ''}${proxy === 0 ? ',proxy=0' : ''}${timeout ? ',timeout=' + timeout : ''}]`
  }

  /**
   * 短视频
   * @param file 视频地址, 支持http和file发送
   * @param cover 视频封面, 支持http, file和base64发送, 格式必须为jpg
   * @param c 通过网络下载视频时的线程数, 默认单线程. (在资源不支持并发时会自动处理)
   */
  video(file: string, cover?: string, c?: 2 | 3): string {
    return `[CQ:video,file=${encode(file)}${cover ? ',cover' + encode(cover) : ''}${c ? ',c=' + c : ''}]`
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
   * 链接分享
   * @param url 分享的链接
   * @param title 分享的标题
   * @param content 分享的简介
   * @param image 分享的图片链接
   */
  share(url: string, title: string = '', content?: string, image?: string): string {
    return `[CQ:share,url=${encode(url)},title=${encode(title)}${content ? `,content=${encode(content)}` : ''}${image ? `,image=${encode(image)}` : ''}]`
  }

  /**
   * 音乐分享
   * @param type 分别表示使用 QQ 音乐、网易云音乐、虾米音乐
   * @param id 歌曲 ID
   */
  music(type: 'qq' | '163' | 'qq', id: number): string {
    return `[CQ:music,id=${id},type=${type}]`
  }

  /**
   * 音乐自定义分享
   * @param url 点击后跳转目标 URL
   * @param audio 音乐 URL
   * @param title 标题
   * @param content 发送时可选, 内容描述
   * @param image 发送时可选, 图片 URL
   */
  customMusic(url: string, audio: string, title: string, content?: string, image?: string): string {
    return `[CQ:music,type=custom,url=${encode(url)},audio=${encode(audio)},title=${encode(title)}${content ? `,content=${encode(content)}` : ''}${image ? `,image=${encode(image)}` : ''}]`
  }

  /**
   * 图片
   * @param file 图片文件名或URL
   * @param cache 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 1
   * @param type 图片类型，flash 表示闪照，show 表示秀图，默认普通图片
   * @param id 发送秀图时的特效id，默认为40000
   * @param c 通过网络下载图片时的线程数, 默认单线程. (在资源不支持并发时会自动处理)
   */
  image(file: string, cache: 0 | 1 = 1, type?: 'flash' | 'show', id: 40000 | 40001 | 40002 | 40003 | 40004 | 40005 = 40000, c?: 2 | 3): string {
    if (type === 'flash') {
      return `[CQ:image,file=${encode(file)},type=flash${cache === 0 ? ',cache=0' : ''}${c ? ',c=' + c : ''}]`
    } else if (type === 'show') {
      return `[CQ:image,file=${encode(file)},type=show,id=${id}${cache === 0 ? ',cache=0' : ''}${c ? ',c=' + c : ''}]`
    } else {
      return `[CQ:image,file=${encode(file)}${cache === 0 ? ',cache=0' : ''}${c ? ',c=' + c : ''}]`
    }
  }

  /**
   * 回复
   * @param id 回复时所引用的消息id, 必须为本群消息.
   */
  reply(id: number): string {
    return `[CQ:reply,id=${id}]`
  }

  /**
   * 自定义回复
   * @param text 	自定义回复的信息
   * @param qq 自定义回复时的自定义QQ
   * @param time 自定义回复时的时间, 格式为Unix时间
   * @param seq 起始消息序号, 可通过 get_msg 获得
   */
  customReply(text: string, qq: number, time?: number, seq?: number): string {
    return `[CQ:reply,text=${encode(text)},qq=${qq}${time ? `,time=${time}` : ''}${seq ? `,seq=${seq}` : ''}]`
  }

  /**
   * 红包
   * @param title 祝福语/口令
   */
  redbag(title: string): string {
    return `[CQ:redbag,title=${encode(title)}]`
  }

  /**
   * 戳一戳(仅群聊)
   * @param qq 需要戳的成员
   */
  poke(qq: number): string {
    return `[CQ:poke,qq=${qq}]`
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
   * 9 牵你的手
   * 10 可爱猫咪
   * 11 神秘面具
   * 12 我超忙的
   * 13 爱心口罩
   */
  gift(qq: number, id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13): string {
    return `[CQ:gift,qq=${qq},id=${id}]`
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
   * 发送xml卡片
   * @param data xml内容，xml中的value部分，记得实体化处理
   */
  xml(data: string): string {
    return `[CQ:xml,data=${encode(data)}]`
  }

  /**
   * 发送json卡片
   * @param data json内容，json的所有字符串记得实体化处理
   * @param resid 默认不填为0, 走小程序通道, 填了走富文本通道发送
   */
  json(data: string, resid: number = 0): string {
    return `[CQ:json,data=${encode(data)}${resid !== 0 ? `,resid=${resid}` : ''}]`
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
    return `[CQ:cardimage,file=${encode(file)},minwidth=${minwidth},minheight=${minheight},maxwidth=${maxwidth},maxheight=${maxheight},source=${encode(source)},icon=${encode(icon)}]`
  }

  /**
   * 文本转语音
   * 通过TX的TTS接口，采用的音源与登录账号的性别有关
   * @param text 内容
   */
  tts(text: string): string {
    return `[CQ:tts,text=${encode(text)}]`
  }
}

export const CQCode = new CQCODE
