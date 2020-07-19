/**
 * 酷Q插件的配置项
 *
 * @author CaoMeiYouRen
 * @date 2019-07-08
 * @export
 * @interface CQOption
 */
export interface CQOption {
    apiver: number // Api版本
    name: string // 应用名称
    version: string // 应用版本
    version_id: number // 应用顺序版本（每次发布时至少+1）
    author: string // 应用作者
    description: string // 应用说明
    event: Array<CQEvent>
    auth: Array<number>// 应用权限（发布前请删除无用权限）

}
export interface CQEvent {
    id: number
    type: number // 类型
    name: string
    priority: number  // 优先级
    function: string // 函数名
}