[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Data](../modules/bot_modules_data.md) / Data

# Class: Data

[Bot/modules/Data](../modules/bot_modules_data.md).Data

## Table of contents

### Constructors

- [constructor](bot_modules_data.data.md#constructor)

### Properties

- [Bot](bot_modules_data.data.md#bot)
- [\_debug](bot_modules_data.data.md#_debug)
- [\_noCommList](bot_modules_data.data.md#_nocommlist)
- [friendList](bot_modules_data.data.md#friendlist)
- [groupList](bot_modules_data.data.md#grouplist)
- [groupMemberList](bot_modules_data.data.md#groupmemberlist)
- [name](bot_modules_data.data.md#name)
- [noLogList](bot_modules_data.data.md#nologlist)
- [showLog](bot_modules_data.data.md#showlog)
- [userId](bot_modules_data.data.md#userid)

### Accessors

- [debug](bot_modules_data.data.md#debug)
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

Defined in: [Bot/modules/Data.ts:3](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L3)

## Properties

### Bot

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: [Bot/modules/Data.ts:9](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L9)

___

### \_debug

• `Private` **\_debug**: *boolean*

Defined in: [Bot/modules/Data.ts:11](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L11)

___

### \_noCommList

• `Private` **\_noCommList**: *Set*<number\>

不启用内置指令的群组列表

Defined in: [Bot/modules/Data.ts:114](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L114)

___

### friendList

• **friendList**: *object*= {}

好友昵称缓存

#### Type declaration:

Defined in: [Bot/modules/Data.ts:84](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L84)

___

### groupList

• **groupList**: *object*= {}

群名缓存

#### Type declaration:

Defined in: [Bot/modules/Data.ts:39](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L39)

___

### groupMemberList

• **groupMemberList**: *object*= {}

群员昵称缓存

#### Type declaration:

Defined in: [Bot/modules/Data.ts:56](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L56)

___

### name

• `Readonly` **name**: *string*

Bot名称

Defined in: [Bot/modules/Data.ts:29](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L29)

___

### noLogList

• **noLogList**: *Set*<number\>

不显示Log输出的群组列表

Defined in: [Bot/modules/Data.ts:103](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L103)

___

### showLog

• **showLog**: *boolean*

是否显示Log输出

Defined in: [Bot/modules/Data.ts:98](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L98)

___

### userId

• **userId**: *number*= -1

Bot的登录QQ

Defined in: [Bot/modules/Data.ts:34](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L34)

## Accessors

### debug

• get **debug**(): *boolean*

是否为调试模式

**Returns:** *boolean*

Defined in: [Bot/modules/Data.ts:22](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L22)

• set **debug**(`debug`: *boolean*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `debug` | *boolean* |

**Returns:** *void*

Defined in: [Bot/modules/Data.ts:13](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L13)

___

### noCommList

• get **noCommList**(): *Set*<number\>

**Returns:** *Set*<number\>

Defined in: [Bot/modules/Data.ts:123](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L123)

• set **noCommList**(`list`: *Set*<number\>): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *Set*<number\> |

**Returns:** *void*

Defined in: [Bot/modules/Data.ts:115](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L115)

## Methods

### setNoComm

▸ **setNoComm**(`list`: *number*[]): *void*

增加不启用内置指令的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: [Bot/modules/Data.ts:129](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L129)

___

### setNoLog

▸ **setNoLog**(`list`: *number*[]): *void*

增加不显示Log输出的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: [Bot/modules/Data.ts:107](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L107)

___

### updateAllGroupMemberList

▸ **updateAllGroupMemberList**(): *Promise*<void\>

更新所有群组群员昵称缓存

**Returns:** *Promise*<void\>

Defined in: [Bot/modules/Data.ts:74](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L74)

___

### updateFriendList

▸ **updateFriendList**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Bot/modules/Data.ts:87](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L87)

___

### updateGroupMemberList

▸ **updateGroupMemberList**(`group_id`: *number*): *Promise*<void\>

更新指定群组群员昵称缓存

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |

**Returns:** *Promise*<void\>

Defined in: [Bot/modules/Data.ts:64](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L64)

___

### updateGroupsList

▸ **updateGroupsList**(): *Promise*<void\>

更新群名缓存

**Returns:** *Promise*<void\>

Defined in: [Bot/modules/Data.ts:45](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Data.ts#L45)
