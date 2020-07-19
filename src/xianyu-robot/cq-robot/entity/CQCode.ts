/* eslint no-param-reassign: 0 */
import { getMidStr } from '../utils'
import { CQAnonymous, CQAt, CQBFace, CQCustomMusic, CQDice, CQEmoji, CQFace, CQImage, CQMusic, CQRPS, CQRecord, CQSFace, CQShake, CQShare, CQText } from 'cq-websocket'
/**
 * CQ码专用类
 *
 * @author CaoMeiYouRen
 * @date 2019-07-09
 * @export
 * @class CQCode
 */
export class CQCode {
    /**
     * 特殊字符，转义，避免冲突
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {string} code 要转义的字符串
     * @param {boolean} [isComma=true] 是否转义逗号，默认为true
     * @returns {string} 转义后的字符串
     * @memberof CQCode
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
     *特殊字符，反转义
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {string} code stringReplace
     * @returns {string} 反转义后的字符串
     * @memberof CQCode
     */
    decode(code: string): string {
        code = code.replace('&amp;', '&')
        code = code.replace('&#91;', '[')
        code = code.replace('&#93;', ']')
        code = code.replace('&#44;', ',')
        return code
    }
    /**
     *  QQ表情(face)
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {number} id 表情ID
     * @returns {string}
     * @memberof CQCode
     */
    face(id: number): string {
        return new CQFace(id).toString()
    }
    /**
     * emoji表情(emoji)
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {number} id 表情ID
     * @returns {string}
     * @memberof CQCode
     */
    emoji(id: number): string {
        return new CQEmoji(id).toString()
    }
    /**
     * @某人(at)
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {number} qqId -1 为全体
     * @param {boolean} [isNoSpace=false] 默认为假 At后添加空格，可使At更规范美观。如果不需要添加空格，请置本参数为true
     * @returns {string}
     * @memberof CQCode
     */
    at(qqId: number, isNoSpace: boolean = false): string {
        return `[CQ:at,qq=${qqId === -1 ? 'all' : qqId}]${isNoSpace ? '' : ' '}`
        // return new CQAt(qqId).toString() + (isNoSpace ? '' : ' ')
    }
    /**
     * 窗口抖动(shake) - 仅支持好友
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @returns {string}
     * @memberof CQCode
     */
    shake(): string {
        return new CQShake().toString()
    }
    /**
     * 匿名发消息(anonymous) - 仅支持群。
     * 是否不强制，如果希望匿名失败时，将消息转为普通消息发送(而不是取消发送)，请置本参数为true。
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {boolean} ignore 是否不强制
     * @returns {string}
     * @memberof CQCode
     */
    anonymous(ignore: boolean = false): string {
        return new CQAnonymous(ignore).toString()
        // return `[CQ:anonymous${ignore ? ',ignore=true' : ''}]`
    }
    /**
     *发送音乐(music)
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {number} musicId 音乐的歌曲数字ID
     * @param {('' | 'qq' | '163' | 'xiami')}  [type=''] 目前支持 qq/QQ音乐 163/网易云音乐 xiami/虾米音乐，默认为qq
     * @param {boolean} [style=false] 启用新版样式，目前仅 QQ音乐 支持
     * @returns {string}
     * @memberof CQCode
     */
    music(musicId: number, type: '' | 'qq' | '163' | 'xiami' = '', style: boolean = false): string {
        return `[CQ:music,id=${musicId},type=${type ? type : 'qq'}${style ? ',style=1' : ''}]`
    }
    /**
     * 发送音乐自定义分享
     *
     * @author CaoMeiYouRen
     * @date 2019-07-09
     * @param {string} url 分享链接,点击分享后进入的音乐页面（如歌曲介绍页）
     * @param {string} audio 音频链接,音乐的音频链接（如mp3链接）
     * @param {string} title 标题,音乐的标题，建议12字以内
     * @param {string} content 内容,音乐的简介，建议30字以内
     * @param {string} image 封面图片链接,音乐的封面图片链接，留空则为默认图片
     * @returns {string}
     * @memberof CQCode
     */
    customMusic(url: string, audio: string, title: string = '', content: string = '', image: string = ''): string {
        return new CQCustomMusic(this.encode(url), this.encode(audio), this.encode(title), this.encode(content), this.encode(image)).toString()
    }
    /**
     * 发送名片分享(contact)
     *
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {('qq' | 'group')} type 类型 目前支持 qq/好友分享 group/群分享
     * @param {number} id 类型为qq，则为QQID；类型为group，则为群号
     * @returns {string}
     * @memberof CQCode
     */
    contact(type: 'qq' | 'group', id: number): string {
        return `[CQ:contact,type=${type},id=${id}]`
    }
    /**
     * 发送链接分享(share)
     *
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {string} url 分享的链接
     * @param {string} [title=''] 分享的标题，建议12字以内
     * @param {string} [content=''] 分享的简介，建议30字以内
     * @param {string} [image=''] 分享的图片链接，留空则为默认图片
     * @returns {string}
     * @memberof CQCode
     */
    share(url: string, title: string = '', content: string = '', image: string = ''): string {
        return new CQShare(this.encode(url), this.encode(title), this.encode(content), this.encode(image)).toString()
    }
    /**
     * 发送位置分享(location)
     *
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {number} lat 纬度
     * @param {number} lon 经度
     * @param {number} [zoom=15] 放大倍数
     * @param {string} title 地点名称，建议12字以内
     * @param {string} content 地址，建议20字以内
     * @returns {string}
     * @memberof CQCode
     */
    location(lat: number, lon: number, zoom: number = 15, title: string, content: string): string {
        let para = `[CQ:location,lat=${lat},lon=${lon}`
        if (zoom > 0) {
            para += `,zoom=${zoom}`
        }
        // para += `,title=${this.encode(title)},content=${content}]`
        para += `,title=${this.encode(title)},content=${this.encode(content)}]`
        return para
    }
    /**
     * 发送图片(image)
     * 1.原生：将图片放在 酷Q的 data\image 下，并填写相对路径。如 data\image\1.jpg 则填写 1.jpg；
     * 2.增强：增强 CQ 码支持设置 file 为http/https/file协议，可以发送网络和本地文件系统中其它地方的图片、语音；
     * 增强 CQ 码详见https://cqhttp.cc/docs/4.10/#/CQCode
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {string} file 文件路径
     * @param {boolean} [cache=true] 是否使用缓存，默认为true
     * @returns {string}
     * @memberof CQCode
     */
    image(file: string, cache: boolean = true): string {
        return new CQImage(this.encode(file), cache).toString()
    }
    /**
     * 发送语音(record)
     * 1.原生：将语音放在 data\record 下，并填写相对路径。如 data\record\1.amr 则填写 1.amr；
     * 2.增强：增强 CQ 码支持设置 file 为http/https/file协议，可以发送网络和本地文件系统中其它地方的图片、语音；
     * 增强 CQ 码详见https://cqhttp.cc/docs/4.10/#/CQCode
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {string} file 文件路径
     * @param {boolean} [magic=false] 是否是魔法语音
     * @returns {string}
     * @memberof CQCode
     */
    record(file: string, magic: boolean = false): string {
        return new CQRecord(this.encode(file), magic).toString()
    }
    /**
     * 从CQ码中获取图片的路径，如 [CQ:image,file=1.jpg] 则返回 1.jpg;
     * 失败返回空字符串
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {string} code CQ码
     * @returns {string}
     * @memberof CQCode
     */
    getImage(code: string): string {
        if (code.includes('url=')) { // 考虑到增强 CQ 码多了一个url字段，因此不能直接分割字符串
            return getMidStr(code, '[CQ:image,file=', ',url=') // url不为空的情况下
        }
        return getMidStr(code, '[CQ:image,file=', ']')
    }
    /**
     * 从CQ码中获取语音的路径，如 [CQ:record,file=1.amr] 则返回 1.amr;
     * 失败返回空字符串
     * @author CaoMeiYouRen
     * @date 2019-07-10
     * @param {string} code CQ码
     * @returns {string}
     * @memberof CQCode
     */
    getRecord(code: string): string {
        if (code.includes('url=')) { // 考虑到增强 CQ 码多了一个url字段，因此不能直接分割字符串
            return getMidStr(code, '[CQ:record,file=', ',url=') // url不为空的情况下
        }
        return getMidStr(code, '[CQ:record,file=', ']')
    }
    // /**
    //  * 发送签到
    //  *
    //  * @author CaoMeiYouRen
    //  * @date 2019-07-23
    //  * @param {string} location 地点
    //  * @param {string} title 标题
    //  * @param {string} image 图片地址
    //  * @returns {string}
    //  * @memberof CQCode
    //  */
    // sign(location: string, title: string, image: string): string {
    //     return `[CQ:sign,location=${this.encode(location)},title=${this.encode(title)},image=${this.encode(image)}]`
    // }
}