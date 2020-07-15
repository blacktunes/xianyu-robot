/**
 *HTTP_API插件运行状态
 *
 * @author CaoMeiYouRen
 * @date 2019-07-13
 * @export
 * @class HttpApiStatus
 */
export class HttpApiStatus {
    /**
     *HTTP API 插件已初始化
     *
     * @type {boolean}
     * @memberof HttpApiStatus
     */
    app_initialized: boolean
    /**
     *HTTP API 插件已启用
     *
     * @type {boolean}
     * @memberof HttpApiStatus
     */
    app_enabled: boolean
    /**
     *HTTP API 的各内部插件是否正常运行
     *
     * @type {object}
     * @memberof HttpApiStatus
     */
    plugins_good: object
    /**
     *HTTP API 插件正常运行（已初始化、已启用、各内部插件正常运行）
     *
     * @type {boolean}
     * @memberof HttpApiStatus
     */
    app_good: boolean
    /**
     *当前 QQ 在线，null 表示无法查询到在线状态
     *
     * @type {boolean}
     * @memberof HttpApiStatus
     */
    online: boolean
    /**
     *HTTP API 插件状态符合预期，意味着插件已初始化，内部插件都在正常运行，且 QQ 在线
     *
     * @type {boolean}
     * @memberof HttpApiStatus
     */
    good: boolean

}