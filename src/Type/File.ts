export interface ImageInfo {
  /**
   * 图片源文件大小
   */
  size: number
  /**
   * 图片文件原名
   */
  filename: string
  /**
   * 图片下载地址
   */
  url: string
}

export interface GroupFile {
  /**
   * 文件 ID
   */
  id: string
  /**
   * 文件名
   */
  name: string
  /**
   * 文件大小（字节数）
   */
  size: number
  /**
   * busid（目前不清楚有什么作用）
   */
  busid: number
}

export interface File {
  /**
   * 文件名
   */
  name: string
  /**
   * 文件大小
   */
  size: number
  /**
   * 下载链接
   */
  url: string
}
