[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Data](../modules/bot_modules_data.md) / Data

# Class: Data

[Bot/modules/Data](../modules/bot_modules_data.md).Data

## Table of contents

### Constructors

- [constructor](bot_modules_data.data.md#constructor)

### Properties

- [Bot](bot_modules_data.data.md#bot)
- [\_noCommList](bot_modules_data.data.md#_nocommlist)
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

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: Bot/modules/Data.ts:9

___

### \_noCommList

• `Private` **\_noCommList**: *Set*<number\>

不启用内置指令的群组列表

Defined in: Bot/modules/Data.ts:99

___

### friendList

• **friendList**: *object*= {}

好友昵称缓存

#### Type declaration:

Defined in: Bot/modules/Data.ts:69

___

### groupList

• **groupList**: *object*= {}

群名缓存

#### Type declaration:

Defined in: Bot/modules/Data.ts:24

___

### groupMemberList

• **groupMemberList**: *object*= {}

群员昵称缓存

#### Type declaration:

Defined in: Bot/modules/Data.ts:41

___

### name

• `Readonly` **name**: *string*

Bot名称

Defined in: Bot/modules/Data.ts:14

___

### noLogList

• **noLogList**: *Set*<number\>

不显示Log输出的群组列表

Defined in: Bot/modules/Data.ts:88

___

### showLog

• **showLog**: *boolean*

是否显示Log输出

Defined in: Bot/modules/Data.ts:83

___

### userId

• **userId**: *number*= -1

Bot的登录QQ

Defined in: Bot/modules/Data.ts:19

## Accessors

### noCommList

• get **noCommList**(): *Set*<number\>

**Returns:** *Set*<number\>

Defined in: Bot/modules/Data.ts:108

• set **noCommList**(`list`: *Set*<number\>): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *Set*<number\> |

**Returns:** *void*

Defined in: Bot/modules/Data.ts:100

## Methods

### setNoComm

▸ **setNoComm**(`list`: *number*[]): *void*

增加不启用内置指令的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: Bot/modules/Data.ts:114

___

### setNoLog

▸ **setNoLog**(`list`: *number*[]): *void*

增加不显示Log输出的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: Bot/modules/Data.ts:92

___

### updateAllGroupMemberList

▸ **updateAllGroupMemberList**(): *Promise*<void\>

更新所有群组群员昵称缓存

**Returns:** *Promise*<void\>

Defined in: Bot/modules/Data.ts:59

___

### updateFriendList

▸ **updateFriendList**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: Bot/modules/Data.ts:72

___

### updateGroupMemberList

▸ **updateGroupMemberList**(`group_id`: *number*): *Promise*<void\>

更新指定群组群员昵称缓存

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |

**Returns:** *Promise*<void\>

Defined in: Bot/modules/Data.ts:49

___

### updateGroupsList

▸ **updateGroupsList**(): *Promise*<void\>

更新群名缓存

**Returns:** *Promise*<void\>

Defined in: Bot/modules/Data.ts:30
