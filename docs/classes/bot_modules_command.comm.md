[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Command](../modules/bot_modules_command.md) / Comm

# Class: Comm

[Bot/modules/Command](../modules/bot_modules_command.md).Comm

## Table of contents

### Constructors

- [constructor](bot_modules_command.comm.md#constructor)

### Properties

- [admin](bot_modules_command.comm.md#admin)
- [blacklist](bot_modules_command.comm.md#blacklist)
- [comm](bot_modules_command.comm.md#comm)
- [desc](bot_modules_command.comm.md#desc)
- [fn](bot_modules_command.comm.md#fn)
- [group](bot_modules_command.comm.md#group)
- [reg](bot_modules_command.comm.md#reg)
- [whitelist](bot_modules_command.comm.md#whitelist)

## Constructors

### constructor

\+ **new Comm**(`name`: *string*): [*Comm*](bot_modules_command.comm.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** [*Comm*](bot_modules_command.comm.md)

Defined in: [Bot/modules/Command.ts:124](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L124)

## Properties

### admin

• **admin**: *boolean*= false

Defined in: [Bot/modules/Command.ts:130](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L130)

___

### blacklist

• **blacklist**: *Set*<number\>

Defined in: [Bot/modules/Command.ts:141](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L141)

___

### comm

• **comm**: *string*

Defined in: [Bot/modules/Command.ts:128](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L128)

___

### desc

• **desc**: *string*= '暂无描述'

Defined in: [Bot/modules/Command.ts:131](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L131)

___

### fn

• **fn**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group` | (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent)[] |
| `private` | (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent)[] |

Defined in: [Bot/modules/Command.ts:133](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L133)

___

### group

• **group**: *string*

Defined in: [Bot/modules/Command.ts:132](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L132)

___

### reg

• **reg**: *RegExp* \| *NamedRegExp*

Defined in: [Bot/modules/Command.ts:129](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L129)

___

### whitelist

• **whitelist**: *Set*<number\>

Defined in: [Bot/modules/Command.ts:140](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Command.ts#L140)
