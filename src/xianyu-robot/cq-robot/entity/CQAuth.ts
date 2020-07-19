const authList = [
    {
        /**
         * [敏感]取Cookies,对应CoolQ的方法 getCookies / getCsrfToken
         */
        auth: 20,
        name: 'get_cookies'
    },
    {
        /**
         * 接收语音,对应CoolQ的方法 getRecord
         */
        auth: 30,
        name: 'get_record'
    },
    {
        /**
         * 发送群消息,对应CoolQ的方法 sendGroupMsg
         */
        auth: 101,
        name: 'send_group_msg'
    },
    {
        /**
      * 发送讨论组消息,对应CoolQ的方法 sendDiscussMsg
      */
        auth: 103,
        name: 'send_discuss_msg'
    },
    {
        /**
         * 发送私聊消息,对应CoolQ方法 sendPrivateMsg
         */
        auth: 106,
        name: 'send_private_msg'
    },
    {
        /**
        * 发送赞,对应CoolQ方法 sendLike
        */
        auth: 110,
        name: 'send_like'
    },
    {
        /**
        * 置群员移除,对应CoolQ方法 setGroupKick
        */
        auth: 120,
        name: 'set_group_kick'
    },
    {
        /**
        * 置群员禁言,对应CoolQ方法 setGroupBan
        */
        auth: 121,
        name: 'set_group_ban'
    },
    {
        /**
         * 置群管理员,对应CoolQ方法 setGroupAdmin
         */
        auth: 122,
        name: 'set_group_admin'
    },
    {
        /**
         * 置全群禁言,对应CoolQ方法 setGroupWholeBan
         */
        auth: 123,
        name: 'set_group_whole_ban'
    },
    {
        /**
        * 置匿名群员禁言,对应CoolQ方法 setGroupAnonymousBan
        */
        auth: 124,
        name: 'set_group_anonymous_ban'
    },
    {
        /**
         * 置群匿名设置,对应CoolQ方法 setGroupAnonymous
         */
        auth: 125,
        name: 'set_group_anonymous'
    },
    {
        /**
         * 置群成员名片,对应CoolQ方法 setGroupCard
         */
        auth: 126,
        name: 'set_group_card'
    },
    {
        /**
        * [敏感]置群退出,对应CoolQ方法 setGroupLeave
        */
        auth: 127,
        name: 'set_group_leave'
    },
    {
        /**
        * 置群成员专属头衔,对应CoolQ方法 setGroupSpecialTitle
        */
        auth: 128,
        name: 'set_group_special_title'
    },
    {
        /**
          * 取群成员信息,对应CoolQ方法 getGroupMemberInfoV2 / getGroupMemberInfo
          */
        auth: 130,
        name: 'get_group_member_info'
    },
    {
        /**
       * 取陌生人信息,对应CoolQ方法 getStrangerInfo
       */
        auth: 131,
        name: 'get_stranger_info'
    },
    {
        /**
        * 置讨论组退出,对应CoolQ方法 setDiscussLeave
        */
        auth: 140,
        name: 'set_discuss_leave'
    },
    {
        /**
       * 置好友添加请求,对应CoolQ方法 setFriendAddRequest
       */
        auth: 150,
        name: 'set_friend_add_request'
    },
    {
        /**
       * 置群添加请求,对应CoolQ方法 setGroupAddRequest
       */
        auth: 151,
        name: 'set_group_add_request'
    },
    {
        /**
         * 取群成员列表,对应CoolQ方法 getGroupMemberList
         */
        auth: 160,
        name: 'get_group_member_list'
    },
    {
        /**
         * 取群列表,对应CoolQ方法 getGroupList
         */
        auth: 161,
        name: 'get_group_list'
    },
    {
        /**
       * 撤回消息,对应CoolQ方法 deleteMsg
       */
        auth: 180,
        name: 'delete_msg'
    },
]
let list = [
    'clean_plugin_log',
    'clean_data_dir',
    'set_restart_plugin',
    'get_version_info',
    'get_status',
    'can_send_record',
    'can_send_image',
    'get_image',
    'get_record',
    'get_login_info'
]
/**
 * @export
 * @param {number} auth
 * @returns {string}
 */
export function getAuthName(auth: number): string {
    let start = 0
    let end = authList.length - 1
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2)
        if (auth === authList[mid].auth) {
            return authList[mid].name
        } if (auth > authList[mid].auth) {
            start = mid + 1
        } else {
            end = mid - 1
        }
    }
    return ''
}
/**
 * 根据操作名称获取操作权限值
 * @export
 * @param {string} authName
 * @returns {number}
 */
export function getAuth(authName: string): number {
    if (list.includes(authName)) {
        return 1
    }
    for (let i = 0; i < authList.length; i++) {
        if (authList[i].name === authName) {
            return authList[i].auth
        }
    }
    return -1
}