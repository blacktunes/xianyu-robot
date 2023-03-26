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

Defined in: [Bot/modules/Command.ts:34](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L34)

## Properties

### admin

• **admin**: *boolean*= false

Defined in: [Bot/modules/Command.ts:40](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L40)

___

### blacklist

• **blacklist**: *object*= {}

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group?` | *Set*<number\> |
| `user?` | *Set*<number\> |

Defined in: [Bot/modules/Command.ts:54](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L54)

___

### comm

• **comm**: *string*[]= []

Defined in: [Bot/modules/Command.ts:38](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L38)

___

### desc

• **desc**: *string*= ''

Defined in: [Bot/modules/Command.ts:41](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L41)

___

### fn

• **fn**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group` | (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent)[] |
| `private` | (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent)[] |

Defined in: [Bot/modules/Command.ts:43](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L43)

___

### group

• **group**: *string*

Defined in: [Bot/modules/Command.ts:42](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L42)

___

### reg

• **reg**: *RegExp* \| *NamedRegExp*

Defined in: [Bot/modules/Command.ts:39](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L39)

___

### whitelist

• **whitelist**: *object*= {}

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group?` | *Set*<number\> |
| `user?` | *Set*<number\> |

Defined in: [Bot/modules/Command.ts:50](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Command.ts#L50)
