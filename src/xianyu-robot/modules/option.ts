import { CQOption } from '../../cq-robot'

export interface RobotConfig {
  name?: string
  token?: string
  host?: string
  port?: number
}

export const appOption: CQOption = {
  apiver: 9, // Api版本本sdk为9
  name: '咸鱼王', // 应用名称
  version: '1.0.0', // 应用版本
  version_id: 1, // 应用顺序版本（每次发布时至少+1）
  author: 'Blacktunes', // 应用作者
  description: '沙雕机器人',
  event: [ // 事件列表，同一事件类型可重复定义（发布前请删除无用事件）
    {
      id: 1, // 事件ID
      type: 21, // 事件类型
      name: '私聊消息处理', // 事件名称
      function: 'privateMsg', // 事件对应函数
      priority: 20000 // 事件优先级(参见 cq.im/deveventpriority)
    },
    {
      id: 2,
      type: 2,
      name: '群消息处理',
      function: 'groupMsg',
      priority: 20000
    },
    {
      id: 3,
      type: 4,
      name: '讨论组消息处理',
      function: 'discussMsg',
      priority: 20000
    },
    // {
    //  id: 4,
    //  type: 11,
    //  name: '群文件上传事件处理',
    //  function: 'groupUpload',
    //  priority: 20000
    // },
    // {
    //  id: 5,
    //  type: 101,
    //  name: '群管理变动事件处理',
    //  function: 'groupAdmin',
    //  priority: 20000
    // },
    // {
    //  id: 6,
    //  type: 102,
    //  name: '群成员减少事件处理',
    //  function: 'groupDecrease',
    //  priority: 20000
    // },
    // {
    //  id: 7,
    //  type: 103,
    //  name: '群成员增加事件处理',
    //  function: 'groupIncrease',
    //  priority: 20000
    // },
    // {
    //  id: 10,
    //  type: 201,
    //  name: '好友已添加事件处理',
    //  function: 'friendAdd',
    //  priority: 20000
    // },
    // {
    //  id: 8,
    //  type: 301,
    //  name: '好友添加请求处理',
    //  function: 'requestAddFriend',
    //  priority: 20000
    // },
    // {
    //  id: 9,
    //  type: 302,
    //  name: '群添加请求处理',
    //  function: 'requestAddGroup',
    //  priority: 20000
    // },
    {
      id: 1003,
      type: 1003,
      name: '应用已被启用',
      priority: 20000,
      function: 'enable'
    },
    {
      id: 1004,
      type: 1004,
      name: '应用将被停用',
      priority: 20000,
      function: 'disable'
    }
  ],
  auth: [ // 应用权限（发布前请删除无用权限）
    //20,  //[敏感]取Cookies	getCookies / getCsrfToken
    //30,  //接收语音			getRecord
    101, //发送群消息			sendGroupMsg
    103, //发送讨论组消息		sendDiscussMsg
    106, //发送私聊消息		sendPrivateMsg
    //110,  //发送赞				sendLike
    //120,  //置群员移除			setGroupKick
    //121,  //置群员禁言			setGroupBan
    //122,  //置群管理员			setGroupAdmin
    //123,  //置全群禁言			setGroupWholeBan
    //124,  //置匿名群员禁言		setGroupAnonymousBan
    //125,  //置群匿名设置		setGroupAnonymous
    //126,  //置群成员名片		setGroupCard
    //127, //[敏感]置群退出		setGroupLeave
    //128,  //置群成员专属头衔	setGroupSpecialTitle
    //130,  //取群成员信息		getGroupMemberInfoV2 / getGroupMemberInfo
    //131,  //取陌生人信息		getStrangerInfo
    //140,  //置讨论组退出		setDiscussLeave
    //150,  //置好友添加请求		setFriendAddRequest
    //151,  //置群添加请求		setGroupAddRequest
    160  //取群成员列表		getGroupMemberList
    //161,  //取群列表			getGroupList
    //180//撤回消息			deleteMsg
  ]
}
