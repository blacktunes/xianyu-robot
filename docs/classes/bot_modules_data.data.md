[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Data](../modules/bot_modules_data.md) / Data

# Class: Data

[Bot/modules/Data](../modules/bot_modules_data.md).Data

## Table of contents

### Constructors

- [constructor](bot_modules_data.data.md#constructor)

### Properties

- [Bot](bot_modules_data.data.md#bot)
- [\_noCommList](bot_modules_data.data.md#_nocommlist)
- [config](bot_modules_data.data.md#config)
- [friendList](bot_modules_data.data.md#friendlist)
- [groupList](bot_modules_data.data.md#grouplist)
- [groupMemberList](bot_modules_data.data.md#groupmemberlist)
- [name](bot_modules_data.data.md#name)
- [noLogList](bot_modules_data.data.md#nologlist)
- [showLog](bot_modules_data.data.md#showlog)
- [userId](bot_modules_data.data.md#userid)

### Accessors

- [noCommList](bot_modules_data.data.md#nocommlist)

### Methods

- [setNoComm](bot_modules_data.data.md#setnocomm)
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

Defined in: Bot/modules/Data.ts:3

## Properties

### Bot

• `Private` **Bot**: *Pick*<[*Bot*](bot_bot.bot.md), ``"Admin"`` \| ``"Log"`` \| ``"CQCode"`` \| ``"Plugin"`` \| ``"Command"`` \| ``"Conn"`` \| ``"Api"`` \| ``"Event"`` \| ``"Debug"``\>

Defined in: Bot/modules/Data.ts:9

___

### \_noCommList

• `Private` **\_noCommList**: *Set*<number\>

不启用内置指令的群组列表

Defined in: Bot/modules/Data.ts:110

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

Defined in: Bot/modules/Data.ts:24

___

### friendList

• **friendList**: *object*= {}

好友昵称缓存

#### Type declaration:

Defined in: Bot/modules/Data.ts:80

___

### groupList

• **groupList**: *object*= {}

群名缓存

#### Type declaration:

Defined in: Bot/modules/Data.ts:35

___

### groupMemberList

• **groupMemberList**: *object*= {}

群员昵称缓存

#### Type declaration:

Defined in: Bot/modules/Data.ts:52

___

### name

• `Readonly` **name**: *string*

Bot名称

Defined in: Bot/modules/Data.ts:14

___

### noLogList

• **noLogList**: *Set*<number\>

不显示Log输出的群组列表

Defined in: Bot/modules/Data.ts:99

___

### showLog

• **showLog**: *boolean*

是否显示Log输出

Defined in: Bot/modules/Data.ts:94

___

### userId

• **userId**: *number*= -1

Bot的登录QQ

Defined in: Bot/modules/Data.ts:19

## Accessors

### noCommList

• get **noCommList**(): *Set*<number\>

**Returns:** *Set*<number\>

Defined in: Bot/modules/Data.ts:119

• set **noCommList**(`list`: *Set*<number\>): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *Set*<number\> |

**Returns:** *void*

Defined in: Bot/modules/Data.ts:111

## Methods

### setNoComm

▸ **setNoComm**(`list`: *number*[]): *void*

增加不启用内置指令的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: Bot/modules/Data.ts:125

___

### setNoLog

▸ **setNoLog**(`list`: *number*[]): *void*

增加不显示Log输出的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: Bot/modules/Data.ts:103

___

### updateAllGroupMemberList

▸ **updateAllGroupMemberList**(): *Promise*<void\>

更新所有群组群员昵称缓存

**Returns:** *Promise*<void\>

Defined in: Bot/modules/Data.ts:70

___

### updateFriendList

▸ **updateFriendList**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: Bot/modules/Data.ts:83

___

### updateGroupMemberList

▸ **updateGroupMemberList**(`group_id`: *number*): *Promise*<void\>

更新指定群组群员昵称缓存

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |

**Returns:** *Promise*<void\>

Defined in: Bot/modules/Data.ts:60

___

### updateGroupsList

▸ **updateGroupsList**(): *Promise*<void\>

更新群名缓存

**Returns:** *Promise*<void\>

Defined in: Bot/modules/Data.ts:41
