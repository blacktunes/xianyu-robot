[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Data](../modules/bot_modules_data.md) / Data

# Class: Data

[Bot/modules/Data](../modules/bot_modules_data.md).Data

## Table of contents

### Constructors

- [constructor](bot_modules_data.data.md#constructor)

### Properties

- [Bot](bot_modules_data.data.md#bot)
- [config](bot_modules_data.data.md#config)
- [friendList](bot_modules_data.data.md#friendlist)
- [groupList](bot_modules_data.data.md#grouplist)
- [groupMemberList](bot_modules_data.data.md#groupmemberlist)
- [name](bot_modules_data.data.md#name)
- [noLogList](bot_modules_data.data.md#nologlist)
- [showLog](bot_modules_data.data.md#showlog)
- [userId](bot_modules_data.data.md#userid)

### Methods

- [getGroupMenberName](bot_modules_data.data.md#getgroupmenbername)
- [getGroupName](bot_modules_data.data.md#getgroupname)
- [removeNoLog](bot_modules_data.data.md#removenolog)
- [setNoLog](bot_modules_data.data.md#setnolog)
- [updateAllGroupMemberList](bot_modules_data.data.md#updateallgroupmemberlist)
- [updateFriendList](bot_modules_data.data.md#updatefriendlist)
- [updateGroupMemberList](bot_modules_data.data.md#updategroupmemberlist)
- [updateGroupsList](bot_modules_data.data.md#updategroupslist)

## Constructors

### constructor

\+ **new Data**(`Bot`: [*Bot*](bot_bot.bot.md), `name`: *string*): [*Data*](bot_modules_data.data.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `Bot` | [*Bot*](bot_bot.bot.md) |
| `name` | *string* |

**Returns:** [*Data*](bot_modules_data.data.md)

Defined in: [Bot/modules/Data.ts:3](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L3)

## Properties

### Bot

• `Private` **Bot**: *Pick*<[*Bot*](bot_bot.bot.md), ``"Admin"`` \| ``"Log"`` \| ``"CQCode"`` \| ``"Plugin"`` \| ``"Command"`` \| ``"Conn"`` \| ``"Api"`` \| ``"Event"`` \| ``"Debug"``\>

Defined in: [Bot/modules/Data.ts:9](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L9)

___

### config

• **config**: *object*

Bot的配置

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `admin` | *object* |
| `admin.ban` | *string* |
| `admin.group_lift_ban` | *string* |
| `admin.private_lift_ban` | *string* |

Defined in: [Bot/modules/Data.ts:24](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L24)

___

### friendList

• **friendList**: *object*= {}

好友昵称缓存

#### Type declaration:

Defined in: [Bot/modules/Data.ts:92](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L92)

___

### groupList

• **groupList**: *object*= {}

群名缓存

#### Type declaration:

Defined in: [Bot/modules/Data.ts:35](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L35)

___

### groupMemberList

• **groupMemberList**: *object*= {}

群员昵称缓存

#### Type declaration:

Defined in: [Bot/modules/Data.ts:58](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L58)

___

### name

• `Readonly` **name**: *string*

Bot名称

Defined in: [Bot/modules/Data.ts:14](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L14)

___

### noLogList

• **noLogList**: *Set*<number\>

不显示Log输出的群组列表

Defined in: [Bot/modules/Data.ts:111](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L111)

___

### showLog

• **showLog**: *boolean*

是否显示Log输出

Defined in: [Bot/modules/Data.ts:106](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L106)

___

### userId

• **userId**: *number*= -1

Bot的登录QQ

Defined in: [Bot/modules/Data.ts:19](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L19)

## Methods

### getGroupMenberName

▸ **getGroupMenberName**(`group_id`: *number*, `user_id`: *number*): *string*

获取指定群员昵称

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |
| `user_id` | *number* |

**Returns:** *string*

Defined in: [Bot/modules/Data.ts:85](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L85)

___

### getGroupName

▸ **getGroupName**(`group_id`: *number*): *string*

获取群名

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |

**Returns:** *string*

Defined in: [Bot/modules/Data.ts:51](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L51)

___

### removeNoLog

▸ **removeNoLog**(`group_id`: *number*): *void*

移除不显示Log输出的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |

**Returns:** *void*

Defined in: [Bot/modules/Data.ts:121](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L121)

___

### setNoLog

▸ **setNoLog**(`group_id`: *number*): *void*

增加不显示Log输出的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |

**Returns:** *void*

Defined in: [Bot/modules/Data.ts:115](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L115)

___

### updateAllGroupMemberList

▸ **updateAllGroupMemberList**(): *Promise*<void\>

更新所有群组群员昵称缓存

**Returns:** *Promise*<void\>

Defined in: [Bot/modules/Data.ts:76](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L76)

___

### updateFriendList

▸ **updateFriendList**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Bot/modules/Data.ts:95](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L95)

___

### updateGroupMemberList

▸ **updateGroupMemberList**(`group_id`: *number*): *Promise*<void\>

更新指定群组群员昵称缓存

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |

**Returns:** *Promise*<void\>

Defined in: [Bot/modules/Data.ts:66](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L66)

___

### updateGroupsList

▸ **updateGroupsList**(): *Promise*<void\>

更新群名缓存

**Returns:** *Promise*<void\>

Defined in: [Bot/modules/Data.ts:41](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Data.ts#L41)
