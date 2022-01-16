[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Plugin](../modules/bot_modules_plugin.md) / Plugin

# Class: Plugin

[Bot/modules/Plugin](../modules/bot_modules_plugin.md).Plugin

## Table of contents

### Constructors

- [constructor](bot_modules_plugin.plugin.md#constructor)

### Properties

- [Bot](bot_modules_plugin.plugin.md#bot)
- [dirname](bot_modules_plugin.plugin.md#dirname)
- [filename](bot_modules_plugin.plugin.md#filename)
- [list](bot_modules_plugin.plugin.md#list)
- [saveFlag](bot_modules_plugin.plugin.md#saveflag)

### Methods

- [getConfig](bot_modules_plugin.plugin.md#getconfig)
- [getPlugin](bot_modules_plugin.plugin.md#getplugin)
- [saveConfig](bot_modules_plugin.plugin.md#saveconfig)
- [setConfig](bot_modules_plugin.plugin.md#setconfig)

## Constructors

### constructor

\+ **new Plugin**(`bot`: [*Bot*](bot_bot.bot.md), `dir`: *string*, `filename`: *string*): [*Plugin*](bot_modules_plugin.plugin.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `bot` | [*Bot*](bot_bot.bot.md) |
| `dir` | *string* |
| `filename` | *string* |

**Returns:** [*Plugin*](bot_modules_plugin.plugin.md)

Defined in: Bot/modules/Plugin.ts:9

## Properties

### Bot

• `Private` **Bot**: *Pick*<[*Bot*](bot_bot.bot.md), ``"Admin"`` \| ``"Data"`` \| ``"Log"`` \| ``"CQCode"`` \| ``"Command"`` \| ``"Conn"`` \| ``"Api"`` \| ``"Event"`` \| ``"Debug"``\>

Defined in: Bot/modules/Plugin.ts:15

___

### dirname

• `Readonly` **dirname**: *string*

本地设置保存位置

Defined in: Bot/modules/Plugin.ts:21

___

### filename

• `Readonly` **filename**: *string*

本地设置文件名

Defined in: Bot/modules/Plugin.ts:23

___

### list

• **list**: ([*BotPlugin*](plugin_plugin.botplugin.md) \| [*AnonymousPlugin*](../interfaces/type_bot.anonymousplugin.md))[]= []

插件列表

Defined in: Bot/modules/Plugin.ts:18

___

### saveFlag

• `Private` **saveFlag**: *boolean*= false

Defined in: Bot/modules/Plugin.ts:43

## Methods

### getConfig

▸ **getConfig**<T\>(`name`: *string*): *any*

#### Type parameters:

| Name |
| :------ |
| `T` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *any*

Defined in: Bot/modules/Plugin.ts:32

▸ **getConfig**<T, K\>(`name`: *string*, `key`: K): T[K]

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `T` | *object* |
| `K` | *string* |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `key` | K |

**Returns:** T[K]

Defined in: Bot/modules/Plugin.ts:33

___

### getPlugin

▸ **getPlugin**<T\>(`name`: *string*): *Pick*<T, Exclude<keyof T, ``"init"``\>\>

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `T` | [*BotPlugin*](plugin_plugin.botplugin.md) \| [*AnonymousPlugin*](../interfaces/type_bot.anonymousplugin.md) |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *Pick*<T, Exclude<keyof T, ``"init"``\>\>

Defined in: Bot/modules/Plugin.ts:74

___

### saveConfig

▸ **saveConfig**(): *void*

**Returns:** *void*

Defined in: Bot/modules/Plugin.ts:44

___

### setConfig

▸ **setConfig**(`name`: *string*, `config`: *any*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `config` | *any* |

**Returns:** *void*

Defined in: Bot/modules/Plugin.ts:25
