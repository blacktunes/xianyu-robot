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

Defined in: Bot/modules/Plugin.ts:8

## Properties

### Bot

• `Private` **Bot**: *Pick*<[*Bot*](bot_bot.bot.md), ``"Admin"`` \| ``"Data"`` \| ``"Log"`` \| ``"CQCode"`` \| ``"Command"`` \| ``"Conn"`` \| ``"Api"`` \| ``"Event"`` \| ``"Debug"``\>

Defined in: Bot/modules/Plugin.ts:14

___

### dirname

• `Readonly` **dirname**: *string*

本地设置保存位置

Defined in: Bot/modules/Plugin.ts:24

___

### filename

• `Readonly` **filename**: *string*

本地设置文件名

Defined in: Bot/modules/Plugin.ts:28

___

### list

• **list**: ([*BotPlugin*](plugin_plugin.botplugin.md) \| [*AnonymousPlugin*](../interfaces/type_bot.anonymousplugin.md))[]= []

插件列表

Defined in: Bot/modules/Plugin.ts:19

## Methods

### getConfig

▸ **getConfig**<T\>(`name`: *string*): T

#### Type parameters:

| Name |
| :------ |
| `T` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** T

Defined in: Bot/modules/Plugin.ts:37

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

Defined in: Bot/modules/Plugin.ts:38

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

Defined in: Bot/modules/Plugin.ts:72

___

### saveConfig

▸ **saveConfig**(): *void*

**Returns:** *void*

Defined in: Bot/modules/Plugin.ts:48

___

### setConfig

▸ **setConfig**(`name`: *any*, `config`: *any*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *any* |
| `config` | *any* |

**Returns:** *void*

Defined in: Bot/modules/Plugin.ts:30
