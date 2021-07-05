[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Api](../modules/bot_modules_api.md) / Api

# Class: Api

[Bot/modules/Api](../modules/bot_modules_api.md).Api

## Table of contents

### Constructors

- [constructor](bot_modules_api.api.md#constructor)

### Properties

- [Bot](bot_modules_api.api.md#bot)

### Methods

- [checkUrlSafely](bot_modules_api.api.md#checkurlsafely)
- [deleteEssenceMsg](bot_modules_api.api.md#deleteessencemsg)
- [deleteMsg](bot_modules_api.api.md#deletemsg)
- [getApiStatus](bot_modules_api.api.md#getapistatus)
- [getEssenceMsgList](bot_modules_api.api.md#getessencemsglist)
- [getForwardMsg](bot_modules_api.api.md#getforwardmsg)
- [getFriendList](bot_modules_api.api.md#getfriendlist)
- [getGroupAtAllRemain](bot_modules_api.api.md#getgroupatallremain)
- [getGroupHonorInfo](bot_modules_api.api.md#getgrouphonorinfo)
- [getGroupInfo](bot_modules_api.api.md#getgroupinfo)
- [getGroupList](bot_modules_api.api.md#getgrouplist)
- [getGroupMemberInfo](bot_modules_api.api.md#getgroupmemberinfo)
- [getGroupMemberList](bot_modules_api.api.md#getgroupmemberlist)
- [getGroupMsgHistory](bot_modules_api.api.md#getgroupmsghistory)
- [getImage](bot_modules_api.api.md#getimage)
- [getLoginInfo](bot_modules_api.api.md#getlogininfo)
- [getMsg](bot_modules_api.api.md#getmsg)
- [getOnlineClients](bot_modules_api.api.md#getonlineclients)
- [getStatus](bot_modules_api.api.md#getstatus)
- [getStrangerInfo](bot_modules_api.api.md#getstrangerinfo)
- [getVersionInfo](bot_modules_api.api.md#getversioninfo)
- [sendGroupForwardMsg](bot_modules_api.api.md#sendgroupforwardmsg)
- [sendGroupMsg](bot_modules_api.api.md#sendgroupmsg)
- [sendPrivateMsg](bot_modules_api.api.md#sendprivatemsg)
- [setEssenceMsg](bot_modules_api.api.md#setessencemsg)
- [setFriendAddRequest](bot_modules_api.api.md#setfriendaddrequest)
- [setGroupAddRequest](bot_modules_api.api.md#setgroupaddrequest)
- [setGroupAdmin](bot_modules_api.api.md#setgroupadmin)
- [setGroupAnonymousBan](bot_modules_api.api.md#setgroupanonymousban)
- [setGroupBan](bot_modules_api.api.md#setgroupban)
- [setGroupCard](bot_modules_api.api.md#setgroupcard)
- [setGroupKick](bot_modules_api.api.md#setgroupkick)
- [setGroupLeave](bot_modules_api.api.md#setgroupleave)
- [setGroupName](bot_modules_api.api.md#setgroupname)
- [setGroupSpecialTitle](bot_modules_api.api.md#setgroupspecialtitle)
- [setGroupWholeBan](bot_modules_api.api.md#setgroupwholeban)

## Constructors

### constructor

\+ **new Api**(`bot`: [*Bot*](bot_bot.bot.md)): [*Api*](bot_modules_api.api.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*Api*](bot_modules_api.api.md)

Defined in: Bot/modules/Api.ts:6

## Properties

### Bot

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: Bot/modules/Api.ts:11

## Methods

### checkUrlSafely

▸ **checkUrlSafely**(`url`: *string*): *Promise*<{ `level`: ``1`` \| ``2`` \| ``3``  }\>

检查链接安全性
1. 安全 2. 未知 3. 危险

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | 需要检查的链接 |

**Returns:** *Promise*<{ `level`: ``1`` \| ``2`` \| ``3``  }\>

Defined in: Bot/modules/Api.ts:921

___

### deleteEssenceMsg

▸ **deleteEssenceMsg**(`message_id`: *number*): *void*

移出精华消息

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `message_id` | *number* | 消息ID |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:879

___

### deleteMsg

▸ **deleteMsg**(`message_id`: *number*): *void*

撤回信息(仅对群消息有效)

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `message_id` | *number* | 消息 ID |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:122

___

### getApiStatus

▸ **getApiStatus**(): *void*

**Returns:** *void*

Defined in: Bot/modules/Api.ts:13

___

### getEssenceMsgList

▸ **getEssenceMsgList**(`group_id`: *number*): *Promise*<[*EssenceMsg*](../interfaces/type_message.essencemsg.md)[]\>

获取精华消息列表

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |

**Returns:** *Promise*<[*EssenceMsg*](../interfaces/type_message.essencemsg.md)[]\>

Defined in: Bot/modules/Api.ts:895

___

### getForwardMsg

▸ **getForwardMsg**(`message_id`: *number*): *Promise*<[*Message*](../modules/type_message.md#message)[]\>

获取合并转发内容

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `message_id` | *number* | 消息 ID |

**Returns:** *Promise*<[*Message*](../modules/type_message.md#message)[]\>

Defined in: Bot/modules/Api.ts:177

___

### getFriendList

▸ **getFriendList**(): *Promise*<[*QQInfo*](../interfaces/type_qq.qqinfo.md)[]\>

获取好友列表

**Returns:** *Promise*<[*QQInfo*](../interfaces/type_qq.qqinfo.md)[]\>

Defined in: Bot/modules/Api.ts:528

___

### getGroupAtAllRemain

▸ **getGroupAtAllRemain**(`group_id`: *number*): *Promise*<{ `can_at_all`: *boolean* ; `remain_at_all_count_for_group`: *number* ; `remain_at_all_count_for_uin`: *number*  }\>

获取群 @全体成员 剩余次数

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |

**Returns:** *Promise*<{ `can_at_all`: *boolean* ; `remain_at_all_count_for_group`: *number* ; `remain_at_all_count_for_uin`: *number*  }\>

Defined in: Bot/modules/Api.ts:776

___

### getGroupHonorInfo

▸ **getGroupHonorInfo**<T\>(`group_id`: *number*, `type`: T): *Promise*<[*HonorInfo*](../interfaces/type_message.honorinfo.md) & [*HonorItem*](../interfaces/type_message.honoritem.md)[T]\>

获取群荣誉信息

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `T` | [*HonorType*](../modules/type_message.md#honortype) |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |
| `type` | T | 要获取的群荣誉类型, 可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据, 或传入 all 获取所有数据 |

**Returns:** *Promise*<[*HonorInfo*](../interfaces/type_message.honorinfo.md) & [*HonorItem*](../interfaces/type_message.honoritem.md)[T]\>

Defined in: Bot/modules/Api.ts:674

___

### getGroupInfo

▸ **getGroupInfo**(`group_id`: *number*, `no_cache?`: *boolean*): *Promise*<[*GroupInfo*](../interfaces/type_group.groupinfo.md)\>

获取群信息

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group_id` | *number* | - | 群号 |
| `no_cache` | *boolean* | false | 是否不使用缓存（使用缓存可能更新不及时，但响应更快） |

**Returns:** *Promise*<[*GroupInfo*](../interfaces/type_group.groupinfo.md)\>

Defined in: Bot/modules/Api.ts:550

___

### getGroupList

▸ **getGroupList**(): *Promise*<[*GroupInfo*](../interfaces/type_group.groupinfo.md)[]\>

获取群列表

**Returns:** *Promise*<[*GroupInfo*](../interfaces/type_group.groupinfo.md)[]\>

Defined in: Bot/modules/Api.ts:582

___

### getGroupMemberInfo

▸ **getGroupMemberInfo**(`group_id`: *number*, `user_id`: *number*, `no_cache?`: *boolean*): *Promise*<[*MemberInfo*](../interfaces/type_group.memberinfo.md)\>

获取群成员信息

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group_id` | *number* | - | 群号 |
| `user_id` | *number* | - | QQ 号 |
| `no_cache` | *boolean* | false | 是否不使用缓存（使用缓存可能更新不及时，但响应更快） |

**Returns:** *Promise*<[*MemberInfo*](../interfaces/type_group.memberinfo.md)\>

Defined in: Bot/modules/Api.ts:605

___

### getGroupMemberList

▸ **getGroupMemberList**(`group_id`: *number*): *Promise*<[*MemberInfo*](../interfaces/type_group.memberinfo.md)[]\>

获取群成员列表

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |

**Returns:** *Promise*<[*MemberInfo*](../interfaces/type_group.memberinfo.md)[]\>

Defined in: Bot/modules/Api.ts:648

___

### getGroupMsgHistory

▸ **getGroupMsgHistory**(`group_id`: *number*, `message_seq?`: *number*): *Promise*<{ `messages`: [*Message*](../modules/type_message.md#message)[]  }\>

获取群消息历史记录

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |
| `message_seq?` | *number* | 起始消息序号, 可通过 get_msg 获得 |

**Returns:** *Promise*<{ `messages`: [*Message*](../modules/type_message.md#message)[]  }\>

Defined in: Bot/modules/Api.ts:837

___

### getImage

▸ **getImage**(`file`: *string*): *Promise*<[*ImageInfo*](../interfaces/type_file.imageinfo.md)\>

获取.image文件的图片信息

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | *string* | 图片缓存文件名 |

**Returns:** *Promise*<[*ImageInfo*](../interfaces/type_file.imageinfo.md)\>

Defined in: Bot/modules/Api.ts:199

___

### getLoginInfo

▸ **getLoginInfo**(): *Promise*<{ `nickname`: *string* ; `user_id`: *number*  }\>

获取登录号信息

**Returns:** *Promise*<{ `nickname`: *string* ; `user_id`: *number*  }\>

Defined in: Bot/modules/Api.ts:464

___

### getMsg

▸ **getMsg**(`message_id`: *number*): *Promise*<[*Msg*](../interfaces/type_message.msg.md)\>

获取消息

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `message_id` | *number* | 消息 ID |

**Returns:** *Promise*<[*Msg*](../interfaces/type_message.msg.md)\>

Defined in: Bot/modules/Api.ts:138

___

### getOnlineClients

▸ **getOnlineClients**(`no_cache?`: *boolean*): *Promise*<{ `clients`: [*Device*](../interfaces/type_qq.device.md)[]  }\>

获取当前账号在线客户端列表

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `no_cache` | *boolean* | false | 是否无视缓存 |

**Returns:** *Promise*<{ `clients`: [*Device*](../interfaces/type_qq.device.md)[]  }\>

Defined in: Bot/modules/Api.ts:813

___

### getStatus

▸ **getStatus**(): *Promise*<[*Status*](../interfaces/type_message.status.md)\>

获取运行状态

**Returns:** *Promise*<[*Status*](../interfaces/type_message.status.md)\>

Defined in: Bot/modules/Api.ts:757

___

### getStrangerInfo

▸ **getStrangerInfo**(`user_id`: *number*, `no_cache?`: *boolean*): *Promise*<[*PrivateSender*](../interfaces/type_event.privatesender.md) & { `qid?`: *number*  }\>

获取陌生人信息

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `user_id` | *number* | - | QQ 号 |
| `no_cache` | *boolean* | false | 是否不使用缓存（使用缓存可能更新不及时, 但响应更快） |

**Returns:** *Promise*<[*PrivateSender*](../interfaces/type_event.privatesender.md) & { `qid?`: *number*  }\>

Defined in: Bot/modules/Api.ts:501

___

### getVersionInfo

▸ **getVersionInfo**(): *Promise*<[*VersionInfo*](../interfaces/type_message.versioninfo.md)\>

获取版本信息

**Returns:** *Promise*<[*VersionInfo*](../interfaces/type_message.versioninfo.md)\>

Defined in: Bot/modules/Api.ts:739

___

### sendGroupForwardMsg

▸ **sendGroupForwardMsg**(`group_id`: *number*, `messages`: [*NodeMessage*](../interfaces/type_message.nodemessage.md)[]): *Promise*<number\>

发送合并转发(群)

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |
| `messages` | [*NodeMessage*](../interfaces/type_message.nodemessage.md)[] | 自定义转发消息 |

**Returns:** *Promise*<number\>

Defined in: Bot/modules/Api.ts:96

___

### sendGroupMsg

▸ **sendGroupMsg**(`group_id`: *number*, `message`: [*Message*](../modules/type_message.md#message), `auto_escape?`: *boolean*): *Promise*<number\>

发送群消息

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group_id` | *number* | - | 群号 |
| `message` | [*Message*](../modules/type_message.md#message) | - | 要发送的内容，支持纯文本和数组格式 |
| `auto_escape` | *boolean* | false | 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效 |

**Returns:** *Promise*<number\>

成功返回message_id，失败返回retcode(100)

Defined in: Bot/modules/Api.ts:65

___

### sendPrivateMsg

▸ **sendPrivateMsg**(`user_id`: *number*, `message`: [*Message*](../modules/type_message.md#message), `auto_escape?`: *boolean*): *Promise*<number\>

发送私聊消息

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `user_id` | *number* | - | 对方 QQ 号 |
| `message` | [*Message*](../modules/type_message.md#message) | - | 要发送的内容，支持纯文本和数组格式 |
| `auto_escape` | *boolean* | false | 消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效 |

**Returns:** *Promise*<number\>

成功返回message_id，失败返回retcode(100)

Defined in: Bot/modules/Api.ts:32

___

### setEssenceMsg

▸ **setEssenceMsg**(`message_id`: *number*): *void*

设置精华消息

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `message_id` | *number* | 消息ID |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:863

___

### setFriendAddRequest

▸ **setFriendAddRequest**(`flag`: *string*, `approve`: *boolean*, `remark`: *string*): *void*

处理加好友请求

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `flag` | *string* | 加好友请求的 flag（需从上报的数据中获得） |
| `approve` | *boolean* | 是否同意请求 |
| `remark` | *string* | 添加后的好友备注（仅在同意时有效） |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:427

___

### setGroupAddRequest

▸ **setGroupAddRequest**(`flag`: *string*, `sub_type`: ``"add"`` \| ``"invite"``, `approve?`: *boolean*, `reason`: *string*): *void*

处理加群请求／邀请

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `flag` | *string* | - | 加群请求的 flag（需从上报的数据中获得） |
| `sub_type` | ``"add"`` \| ``"invite"`` | - | add 或 invite，请求类型（需要和上报消息中的 sub_type 字段相符） |
| `approve` | *boolean* | true | 是否同意请求／邀请 |
| `reason` | *string* | - | 拒绝理由（仅在拒绝时有效） |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:447

___

### setGroupAdmin

▸ **setGroupAdmin**(`group_id`: *number*, `user_id`: *number*, `enable?`: *boolean*): *void*

群组设置管理员

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group_id` | *number* | - | 群号 |
| `user_id` | *number* | - | 要设置管理员的 QQ 号 |
| `enable` | *boolean* | true | true 为设置, false 为取消 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:315

___

### setGroupAnonymousBan

▸ **setGroupAnonymousBan**(`group_id`: *number*, `anonymous_flag`: *string*, `duration?`: *number*): *void*

群组匿名用户禁言

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |
| `anonymous_flag` | *string* | 要禁言的匿名用户的 flag（需从群消息上报的数据中获得） |
| `duration` | *number* | 禁言时长, 单位秒, 无法取消匿名用户禁言 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:273

___

### setGroupBan

▸ **setGroupBan**(`group_id`: *number*, `user_id`: *number*, `duration?`: *number*): *void*

群组单人禁言

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |
| `user_id` | *number* | 要禁言的 QQ 号 |
| `duration` | *number* | 禁言时长，单位秒，0 表示取消禁言 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:250

___

### setGroupCard

▸ **setGroupCard**(`group_id`: *number*, `user_id`: *number*, `card`: *string*): *void*

设置群名片（群备注）

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |
| `user_id` | *number* | 要设置的 QQ 号 |
| `card` | *string* | 群名片内容，不填或空字符串表示删除群名片 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:339

___

### setGroupKick

▸ **setGroupKick**(`group_id`: *number*, `user_id`: *number*, `reject_add_request?`: *boolean*): *void*

群组踢人

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group_id` | *number* | - | 群号 |
| `user_id` | *number* | - | 要踢的 QQ 号 |
| `reject_add_request` | *boolean* | false | 拒绝此人的加群请求 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:227

___

### setGroupLeave

▸ **setGroupLeave**(`group_id`: *number*, `is_dismiss?`: *boolean*): *void*

退出群组

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group_id` | *number* | - | 群号 |
| `is_dismiss` | *boolean* | false | 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:381

___

### setGroupName

▸ **setGroupName**(`group_id`: *number*, `group_name`: *string*): *void*

设置群组名

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_id` | *number* | 群号 |
| `group_name` | *string* | 新群名 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:361

___

### setGroupSpecialTitle

▸ **setGroupSpecialTitle**(`group_id`: *number*, `user_id`: *number*, `special_title`: *string*, `duration?`: *number*): *void*

设置群组专属头衔

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group_id` | *number* | - | 群号 |
| `user_id` | *number* | - | 要设置的 QQ 号 |
| `special_title` | *string* | - | 专属头衔，不填或空字符串表示删除专属头衔 |
| `duration` | *number* | -1 | 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:403

___

### setGroupWholeBan

▸ **setGroupWholeBan**(`group_id`: *number*, `enable?`: *boolean*): *void*

群组全员禁言

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `group_id` | *number* | - | 群号 |
| `enable` | *boolean* | true | 是否禁言 |

**Returns:** *void*

Defined in: Bot/modules/Api.ts:294
