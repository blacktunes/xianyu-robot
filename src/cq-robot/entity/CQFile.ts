/**
 * 酷Q文件类
 *
 * @author CaoMeiYouRen
 * @date 2019-07-08
 * @export
 * @class CQFile
 */
export class CQFile {
    id: string // 文件 ID
    name: string // 文件名
    size: number // 文件大小（字节数）
    busid: number // busid（目前不清楚有什么作用）
    constructor(id: string, name: string, size: number, busid: number) {
        this.id = id
        this.name = name
        this.size = size
        this.busid = busid
    }
}