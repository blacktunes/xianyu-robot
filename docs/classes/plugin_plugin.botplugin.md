[xianyu-robot](../README.md) / [Exports](../modules.md) / [Plugin/Plugin](../modules/plugin_plugin.md) / BotPlugin

# Class: BotPlugin

[Plugin/Plugin](../modules/plugin_plugin.md).BotPlugin

## Table of contents

### Constructors

- [constructor](plugin_plugin.botplugin.md#constructor)

### Properties

- [Bot](plugin_plugin.botplugin.md#bot)
- [Command](plugin_plugin.botplugin.md#command)
- [Log](plugin_plugin.botplugin.md#log)
- [\_config](plugin_plugin.botplugin.md#_config)
- [\_configProxy](plugin_plugin.botplugin.md#_configproxy)
- [config](plugin_plugin.botplugin.md#config)
- [name](plugin_plugin.botplugin.md#name)

### Methods

- [autoSave](plugin_plugin.botplugin.md#autosave)
- [deepProxy](plugin_plugin.botplugin.md#deepproxy)
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

Defined in: Plugin/Plugin.ts:6

## Properties

### Bot

• `Protected` **Bot**: [*Bot*](bot_bot.bot.md)

Bot对象

Defined in: Plugin/Plugin.ts:17

___

### Command

• `Protected` **Command**: [*Command*](plugin_command.command.md)

插件命令
与Bot.Command基本相同，但能设置统一设置

Defined in: Plugin/Plugin.ts:22

___

### Log

• `Protected` **Log**: [*Log*](tools_printlog.log.md)

日志对象

Defined in: Plugin/Plugin.ts:26

___

### \_config

• `Private` **\_config**: *object*

#### Type declaration:

Defined in: Plugin/Plugin.ts:12

___

### \_configProxy

• `Private` **\_configProxy**: *object*

#### Type declaration:

Defined in: Plugin/Plugin.ts:13

___

### config

• **config**: *object*= {}

插件设置

#### Type declaration:

Defined in: Plugin/Plugin.ts:15

___

### name

• `Readonly` **name**: *string*= '未命名插件'

插件名称

Defined in: Plugin/Plugin.ts:11

## Methods

### autoSave

▸ **autoSave**(): *void*

创建设置代理，在设置修改后自动保存本地配置

**Returns:** *void*

Defined in: Plugin/Plugin.ts:71

___

### deepProxy

▸ `Private`**deepProxy**(`obj`: { [key: string]: *any*;  }): *object*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `obj` | *object* |

**Returns:** *object*

Defined in: Plugin/Plugin.ts:43

___

### init

▸ **init**(): *void* \| *Promise*<void\>

初始化方法
该方法会在Bot初始化完成后执行，请勿重复执行

**Returns:** *void* \| *Promise*<void\>

Defined in: Plugin/Plugin.ts:42

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

Defined in: Plugin/Plugin.ts:31
