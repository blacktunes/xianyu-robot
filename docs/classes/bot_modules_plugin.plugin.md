[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Plugin](../modules/bot_modules_plugin.md) / Plugin

# Class: Plugin

[Bot/modules/Plugin](../modules/bot_modules_plugin.md).Plugin

## Table of contents

### Constructors

- [constructor](bot_modules_plugin.plugin.md#constructor)

### Properties

- [Bot](bot_modules_plugin.plugin.md#bot)
- [config](bot_modules_plugin.plugin.md#config)
- [dirname](bot_modules_plugin.plugin.md#dirname)
- [list](bot_modules_plugin.plugin.md#list)

### Methods

- [getPlugin](bot_modules_plugin.plugin.md#getplugin)
- [saveConfig](bot_modules_plugin.plugin.md#saveconfig)
- [setConfig](bot_modules_plugin.plugin.md#setconfig)

## Constructors

### constructor

\+ **new Plugin**(`bot`: [*Bot*](bot_bot.bot.md), `dir`: *string*): [*Plugin*](bot_modules_plugin.plugin.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `bot` | [*Bot*](bot_bot.bot.md) |
| `dir` | *string* |

**Returns:** [*Plugin*](bot_modules_plugin.plugin.md)

Defined in: Bot/modules/Plugin.ts:6

## Properties

### Bot

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: Bot/modules/Plugin.ts:11

___

### config

• **config**: [*PluginConfig*](../interfaces/type_bot.pluginconfig.md)= {}

插件设置

Defined in: Bot/modules/Plugin.ts:25

___

### dirname

• `Readonly` **dirname**: *string*

本地设置保存位置

Defined in: Bot/modules/Plugin.ts:21

___

### list

• **list**: ([*BotPlugin*](plugin_plugin.botplugin.md) \| [*AnonymousPlugin*](../interfaces/type_bot.anonymousplugin.md))[]= []

插件列表

Defined in: Bot/modules/Plugin.ts:16

## Methods

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

Defined in: Bot/modules/Plugin.ts:46

___

### saveConfig

▸ **saveConfig**(): *void*

**Returns:** *void*

Defined in: Bot/modules/Plugin.ts:33

___

### setConfig

▸ **setConfig**<T\>(`name`: *string*, `config`: T): *void*

#### Type parameters:

| Name |
| :------ |
| `T` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `config` | T |

**Returns:** *void*

Defined in: Bot/modules/Plugin.ts:27
