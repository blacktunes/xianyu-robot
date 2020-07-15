/**
 * QQ信息
 *
 * @author CaoMeiYouRen
 * @date 2019-07-12
 * @export
 * @class QQInfo
 */
export class QQInfo {
    user_id: number // QQ 号
    nickname: string // 昵称
    sex: string // 性别，male 或 female 或 unknown
    age: number // 年龄

    constructor(user_id: number, nickname: string, sex: 'male' | 'female' | 'unknown', age: number) {
        this.user_id = user_id
        this.nickname = nickname
        this.sex = sex
        this.age = age
    }
}