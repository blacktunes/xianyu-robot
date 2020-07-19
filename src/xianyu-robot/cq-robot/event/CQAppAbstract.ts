import { CoolQ } from '../entity/CoolQ'
/**
 * CQ应用
 *
 * @author CaoMeiYouRen
 * @date 2019-07-09
 * @export
 * @abstract
 * @class CQAppAbstract
 */
export abstract class CQAppAbstract {
    /**
     *  CQ核心操作变量
     *
     * @abstract
     * @type {CoolQ}
     * @memberof CQApp
     */
    readonly CQ: CoolQ
    /**
     * 应用ID。
     * 规则见https://d.cqp.me/Pro/%E5%BC%80%E5%8F%91/%E5%9F%BA%E7%A1%80%E4%BF%A1%E6%81%AF
     *
     * @type {string}
     * @memberof CQApp
     */
    readonly APP_ID: string
    /**
     *
     * 应用启用状态
     * @abstract
     * @type {boolean}
     * @memberof CQAppAbstract
     */
    readonly isEnable: boolean
    /**
     * 应用数据目录
     * @abstract
     * @type {string}
     * @memberof CQAppAbstract
     */
    readonly appDirectory: string
}