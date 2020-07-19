/**
 * 酷Q Api版本和CoolQ HTTP API 插件的版本。
 * @author CaoMeiYouRen
 * @date 2019-07-07
 * @export
 * @interface IVer
 */
export interface IVer {
    /**
     * 当前酷Q Api 版本。
     * 详见 https://cqp.cc/t/15124
     * @type {number}
     * @memberof IVer
     */
    readonly CQ_API_VER: 9 | number
    /**
     * 当前CoolQ HTTP API 版本。
     * 详见 https://cqhttp.cc/docs
     * @type {number}
     * @memberof IVer
     */
    readonly HTTP_API_VER: 4 | number
}