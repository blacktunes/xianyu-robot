[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Debug](../modules/bot_modules_debug.md) / Debug

# Class: Debug

[Bot/modules/Debug](../modules/bot_modules_debug.md).Debug

## Table of contents

### Constructors

- [constructor](bot_modules_debug.debug.md#constructor)

### Properties

- [Bot](bot_modules_debug.debug.md#bot)
- [\_debug](bot_modules_debug.debug.md#_debug)

### Accessors

- [debug](bot_modules_debug.debug.md#debug)

### Methods

- [groupMsgTest](bot_modules_debug.debug.md#groupmsgtest)
- [privateMsgTest](bot_modules_debug.debug.md#privatemsgtest)

## Constructors

### constructor

\+ **new Debug**(`Bot`: [*Bot*](bot_bot.bot.md)): [*Debug*](bot_modules_debug.debug.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `Bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*Debug*](bot_modules_debug.debug.md)

Defined in: Bot/modules/Debug.ts:5

## Properties

### Bot

• `Private` **Bot**: *Pick*<[*Bot*](bot_bot.bot.md), ``"Admin"`` \| ``"Data"`` \| ``"Log"`` \| ``"CQCode"`` \| ``"Plugin"`` \| ``"Command"`` \| ``"Conn"`` \| ``"Api"`` \| ``"Event"``\>

Defined in: Bot/modules/Debug.ts:10

___

### \_debug

• `Private` **\_debug**: *boolean*

Defined in: Bot/modules/Debug.ts:12

## Accessors

### debug

• get **debug**(): *boolean*

是否为调试模式

**Returns:** *boolean*

Defined in: Bot/modules/Debug.ts:23

• set **debug**(`debug`: *boolean*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `debug` | *boolean* |

**Returns:** *void*

Defined in: Bot/modules/Debug.ts:14

## Methods

### groupMsgTest

▸ **groupMsgTest**(`data`: *Partial*<[*\_GroupMsg*](../interfaces/type_event._groupmsg.md)\>): *void*

可以用于群消息相功能的测试

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | *Partial*<[*\_GroupMsg*](../interfaces/type_event._groupmsg.md)\> |

**Returns:** *void*

Defined in: Bot/modules/Debug.ts:30

▸ **groupMsgTest**(`msg`: *string*, `user_id?`: *number*, `group_id?`: *number*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `msg` | *string* |
| `user_id?` | *number* |
| `group_id?` | *number* |

**Returns:** *void*

Defined in: Bot/modules/Debug.ts:31

___

### privateMsgTest

▸ **privateMsgTest**(`data`: *Partial*<[*\_PrivateMsg*](../interfaces/type_event._privatemsg.md)\>): *void*

可以用于私聊消息相功能的测试

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | *Partial*<[*\_PrivateMsg*](../interfaces/type_event._privatemsg.md)\> |

**Returns:** *void*

Defined in: Bot/modules/Debug.ts:71

▸ **privateMsgTest**(`msg`: *string*, `user_id?`: *number*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `msg` | *string* |
| `user_id?` | *number* |

**Returns:** *void*

Defined in: Bot/modules/Debug.ts:72
