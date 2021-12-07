[xianyu-robot](../README.md) / [Exports](../modules.md) / [Plugin/Plugin](../modules/plugin_plugin.md) / BotPlugin

# Class: BotPlugin

[Plugin/Plugin](../modules/plugin_plugin.md).BotPlugin

## Table of contents

### Constructors

- [constructor](plugin_plugin.botplugin.md#constructor)

### Properties

- [Bot](plugin_plugin.botplugin.md#bot)
- [Command](plugin_plugin.botplugin.md#command)
- [config](plugin_plugin.botplugin.md#config)
- [name](plugin_plugin.botplugin.md#name)

### Methods

- [init](plugin_plugin.botplugin.md#init)
- [setup](plugin_plugin.botplugin.md#setup)

## Constructors

### constructor

\+ **new BotPlugin**(`bot`: [*Bot*](bot_bot.bot.md)): [*BotPlugin*](plugin_plugin.botplugin.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*BotPlugin*](plugin_plugin.botplugin.md)

Defined in: Plugin/Plugin.ts:5

## Properties

### Bot

• `Protected` **Bot**: [*Bot*](bot_bot.bot.md)

Bot对象

Defined in: Plugin/Plugin.ts:14

___

### Command

• `Protected` **Command**: [*Command*](plugin_command.command.md)

插件命令
与Bot.Command基本相同，但能设置统一设置

Defined in: Plugin/Plugin.ts:19

___

### config

• **config**: *any*= {}

插件设置

Defined in: Plugin/Plugin.ts:12

___

### name

• `Readonly` **name**: *string*= '未命名插件'

插件名称

Defined in: Plugin/Plugin.ts:10

## Methods

### init

▸ **init**(): *void* \| *Promise*<void\>

初始化方法
该方法会在Bot初始化完成后执行，请勿重复执行

**Returns:** *void* \| *Promise*<void\>

Defined in: Plugin/Plugin.ts:34

___

### setup

▸ **setup**(`config?`: *any*): *void*

安装方法
该方法会在实例化后执行，请勿重复执行

#### Parameters:

| Name | Type |
| :------ | :------ |
| `config?` | *any* |

**Returns:** *void*

Defined in: Plugin/Plugin.ts:24
