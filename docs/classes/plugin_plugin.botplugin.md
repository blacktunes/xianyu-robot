[xianyu-robot](../README.md) / [Exports](../modules.md) / [Plugin/Plugin](../modules/plugin_plugin.md) / BotPlugin

# Class: BotPlugin

[Plugin/Plugin](../modules/plugin_plugin.md).BotPlugin

## Table of contents

### Constructors

- [constructor](plugin_plugin.botplugin.md#constructor)

### Properties

- [Bot](plugin_plugin.botplugin.md#bot)
- [Command](plugin_plugin.botplugin.md#command)
- [name](plugin_plugin.botplugin.md#name)

### Methods

- [debug](plugin_plugin.botplugin.md#debug)
- [init](plugin_plugin.botplugin.md#init)

## Constructors

### constructor

\+ **new BotPlugin**(`name`: *string*, `bot`: [*Bot*](bot_bot.bot.md)): [*BotPlugin*](plugin_plugin.botplugin.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*BotPlugin*](plugin_plugin.botplugin.md)

Defined in: Plugin/Plugin.ts:4

## Properties

### Bot

• `Protected` **Bot**: [*Bot*](bot_bot.bot.md)

Bot对象

Defined in: Plugin/Plugin.ts:22

___

### Command

• `Protected` **Command**: [*Command*](plugin_command.command.md)

插件命令
与Bot.Command基本相同，但能设置统一设置

Defined in: Plugin/Plugin.ts:27

___

### name

• `Readonly` **name**: *string*

插件名称

Defined in: Plugin/Plugin.ts:18

## Methods

### debug

▸ **debug**(): *void*

debug本文输出

**Returns:** *void*

Defined in: Plugin/Plugin.ts:36

___

### init

▸ **init**(): *void* \| *Promise*<void\>

初始化方法
该方法会在Bot初始化完成后执行，请勿重复执行

**Returns:** *void* \| *Promise*<void\>

Defined in: Plugin/Plugin.ts:32
