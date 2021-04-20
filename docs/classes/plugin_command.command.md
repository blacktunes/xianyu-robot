[xianyu-robot](../README.md) / [Exports](../modules.md) / [Plugin/Command](../modules/plugin_command.md) / Command

# Class: Command

[Plugin/Command](../modules/plugin_command.md).Command

## Table of contents

### Constructors

- [constructor](plugin_command.command.md#constructor)

### Properties

- [Bot](plugin_command.command.md#bot)
- [\_blacklist](plugin_command.command.md#_blacklist)
- [\_whitelist](plugin_command.command.md#_whitelist)
- [group](plugin_command.command.md#group)

### Accessors

- [blacklist](plugin_command.command.md#blacklist)
- [whitelist](plugin_command.command.md#whitelist)

### Methods

- [black](plugin_command.command.md#black)
- [command](plugin_command.command.md#command)
- [white](plugin_command.command.md#white)

## Constructors

### constructor

\+ **new Command**(`group`: *string*, `Bot`: [*Bot*](bot_bot.bot.md)): [*Command*](plugin_command.command.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group` | *string* |
| `Bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*Command*](plugin_command.command.md)

Defined in: Plugin/Command.ts:7

## Properties

### Bot

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: Plugin/Command.ts:12

___

### \_blacklist

• `Private` **\_blacklist**: *Set*<number\>

Defined in: Plugin/Command.ts:24

___

### \_whitelist

• `Private` **\_whitelist**: *Set*<number\>

Defined in: Plugin/Command.ts:15

___

### group

• `Private` **group**: *string*

Defined in: Plugin/Command.ts:13

## Accessors

### blacklist

• set **blacklist**(`list`: *number*[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: Plugin/Command.ts:25

___

### whitelist

• set **whitelist**(`list`: *number*[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: Plugin/Command.ts:16

## Methods

### black

▸ **black**(`list`: *number*[]): [*Command*](plugin_command.command.md)

为插件指令增加黑名单列表，请勿和白名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** [*Command*](plugin_command.command.md)

Defined in: Plugin/Command.ts:49

___

### command

▸ **command**(`name`: *string*): *\_\_class*

增加命令

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *\_\_class*

Defined in: Plugin/Command.ts:62

___

### white

▸ **white**(`list`: *number*[]): [*Command*](plugin_command.command.md)

为插件指令增加白名单列表，请勿和黑名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** [*Command*](plugin_command.command.md)

Defined in: Plugin/Command.ts:37
