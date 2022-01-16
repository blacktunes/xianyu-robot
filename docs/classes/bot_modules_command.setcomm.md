[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Command](../modules/bot_modules_command.md) / SetComm

# Class: SetComm

[Bot/modules/Command](../modules/bot_modules_command.md).SetComm

## Table of contents

### Constructors

- [constructor](bot_modules_command.setcomm.md#constructor)

### Properties

- [Bot](bot_modules_command.setcomm.md#bot)
- [comm](bot_modules_command.setcomm.md#comm)
- [plugin](bot_modules_command.setcomm.md#plugin)
- [repeat](bot_modules_command.setcomm.md#repeat)

### Methods

- [action](bot_modules_command.setcomm.md#action)
- [admin](bot_modules_command.setcomm.md#admin)
- [alias](bot_modules_command.setcomm.md#alias)
- [black](bot_modules_command.setcomm.md#black)
- [desc](bot_modules_command.setcomm.md#desc)
- [group](bot_modules_command.setcomm.md#group)
- [reg](bot_modules_command.setcomm.md#reg)
- [white](bot_modules_command.setcomm.md#white)

## Constructors

### constructor

\+ **new SetComm**(`Bot`: [*Bot*](bot_bot.bot.md), `comm`: [*Comm*](bot_modules_command.comm.md), `repeat`: *boolean*, `plugin?`: *boolean*): [*SetComm*](bot_modules_command.setcomm.md)

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `Bot` | [*Bot*](bot_bot.bot.md) | - |
| `comm` | [*Comm*](bot_modules_command.comm.md) | - |
| `repeat` | *boolean* | - |
| `plugin` | *boolean* | false |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:54

## Properties

### Bot

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: Bot/modules/Command.ts:61

___

### comm

• `Private` **comm**: [*Comm*](bot_modules_command.comm.md)

Defined in: Bot/modules/Command.ts:62

___

### plugin

• `Private` **plugin**: *boolean*

Defined in: Bot/modules/Command.ts:64

___

### repeat

• `Private` **repeat**: *boolean*

Defined in: Bot/modules/Command.ts:63

## Methods

### action

▸ **action**(`type`: ``"private"``, `fn`: (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent)): [*SetComm*](bot_modules_command.setcomm.md)

增加命令处理方法，可添加多个

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"private"`` |
| `fn` | (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:100

▸ **action**(`type`: ``"group"``, `fn`: (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent)): [*SetComm*](bot_modules_command.setcomm.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"group"`` |
| `fn` | (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:101

___

### admin

▸ **admin**(`flag?`: *boolean*): [*SetComm*](bot_modules_command.setcomm.md)

是否为管理员指令

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `flag` | *boolean* | true |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:90

___

### alias

▸ **alias**(`name`: *string*): *void*

增加指令别名

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *void*

Defined in: Bot/modules/Command.ts:67

___

### black

▸ **black**(`list`: *number*[]): [*SetComm*](bot_modules_command.setcomm.md)

增加黑名单列表，请勿和白名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:122

___

### desc

▸ **desc**(`text`: *string*): [*SetComm*](bot_modules_command.setcomm.md)

增加命令描述，重复调用会被覆盖

#### Parameters:

| Name | Type |
| :------ | :------ |
| `text` | *string* |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:78

___

### group

▸ **group**(`name`: *string*): [*SetComm*](bot_modules_command.setcomm.md)

设置命令分类

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:95

___

### reg

▸ **reg**(`reg`: *RegExp* \| *NamedRegExp*): [*SetComm*](bot_modules_command.setcomm.md)

增加正则规则，调用后命令名将会失效

#### Parameters:

| Name | Type |
| :------ | :------ |
| `reg` | *RegExp* \| *NamedRegExp* |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:83

___

### white

▸ **white**(`list`: *number*[]): [*SetComm*](bot_modules_command.setcomm.md)

增加白名单列表，请勿和黑名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** [*SetComm*](bot_modules_command.setcomm.md)

Defined in: Bot/modules/Command.ts:112
