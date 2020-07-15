/**
 *酷Q 及 HTTP API 插件的版本信息
 *
 * @author CaoMeiYouRen
 * @date 2019-07-13
 * @export
 * @class HttpApiInfo
 */
export class HttpApiInfo {
    /**
     *酷Q 根目录路径
     *
     * @type {string}
     * @memberof HttpApiInfo
     */
    coolq_directory: string
    /**
     *酷Q 版本，air 或 pro
     *
     * @type {string}
     * @memberof HttpApiInfo
     */
    coolq_edition: string
    /**
     *HTTP API 插件版本，例如 2.1.3
     *
     * @type {string}
     * @memberof HttpApiInfo
     */
    plugin_version: string
    /**
     *HTTP API 插件 build 号
     *
     * @type {number}
     * @memberof HttpApiInfo
     */
    plugin_build_number: number
    /**
     *HTTP API 插件编译配置，debug 或 release
     *
     * @type {string}
     * @memberof HttpApiInfo
     */
    plugin_build_configuration: string

}