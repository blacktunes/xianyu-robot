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
- [getBlacklist](plugin_command.command.md#getblacklist)
- [getWhitelist](plugin_command.command.md#getwhitelist)
- [removeBlacklist](plugin_command.command.md#removeblacklist)
- [removeWhitelist](plugin_command.command.md#removewhitelist)
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

Defined in: Plugin/Command.ts:6

## Properties

### Bot

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: Plugin/Command.ts:11

___

### \_blacklist

• `Private` **\_blacklist**: *Set*<number\>

Defined in: Plugin/Command.ts:54

___

### \_whitelist

• `Private` **\_whitelist**: *Set*<number\>

Defined in: Plugin/Command.ts:14

___

### group

• `Private` **group**: *string*

Defined in: Plugin/Command.ts:12

## Accessors

### blacklist

• `Private`set **blacklist**(`list`: *number*[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: Plugin/Command.ts:55

___

### whitelist

• `Private`set **whitelist**(`list`: *number*[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** *void*

Defined in: Plugin/Command.ts:15

## Methods

### black

▸ **black**(`list`: *number*[]): [*Command*](plugin_command.command.md)

为插件指令增加黑名单列表，请勿和白名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** [*Command*](plugin_command.command.md)

Defined in: Plugin/Command.ts:66

___

### command

▸ **command**(`name`: *string*): *Pick*<[*SetComm*](bot_modules_command.setcomm.md), ``"alias"`` \| ``"desc"`` \| ``"reg"`` \| ``"admin"`` \| ``"action"`` \| ``"white"`` \| ``"black"``\>

增加命令

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *Pick*<[*SetComm*](bot_modules_command.setcomm.md), ``"alias"`` \| ``"desc"`` \| ``"reg"`` \| ``"admin"`` \| ``"action"`` \| ``"white"`` \| ``"black"``\>

Defined in: Plugin/Command.ts:97

___

### getBlacklist

▸ **getBlacklist**(): readonly *number*[]

获取黑名单

**Returns:** readonly *number*[]

Defined in: Plugin/Command.ts:78

___

### getWhitelist

▸ **getWhitelist**(): readonly *number*[]

获取白名单

**Returns:** readonly *number*[]

Defined in: Plugin/Command.ts:38

___

### removeBlacklist

▸ **removeBlacklist**(`list`: *number*[] \| readonly *number*[]): *void*

移除黑名单

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] \| readonly *number*[] |

**Returns:** *void*

Defined in: Plugin/Command.ts:84

___

### removeWhitelist

▸ **removeWhitelist**(`list`: *number*[] \| readonly *number*[]): *void*

移除白名单

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] \| readonly *number*[] |

**Returns:** *void*

Defined in: Plugin/Command.ts:44

___

### white

▸ **white**(`list`: *number*[]): [*Command*](plugin_command.command.md)

为插件指令增加白名单列表，请勿和黑名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `list` | *number*[] |

**Returns:** [*Command*](plugin_command.command.md)

Defined in: Plugin/Command.ts:26
