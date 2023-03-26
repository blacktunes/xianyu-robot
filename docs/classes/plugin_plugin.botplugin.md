[xianyu-robot](../README.md) / [Exports](../modules.md) / [Plugin/Plugin](../modules/plugin_plugin.md) / BotPlugin

# Class: BotPlugin

[Plugin/Plugin](../modules/plugin_plugin.md).BotPlugin

## Table of contents

### Constructors

- [constructor](plugin_plugin.botplugin.md#constructor)

### Properties

- [Bot](plugin_plugin.botplugin.md#bot)
- [Command](plugin_plugin.botplugin.md#command)
- [Event](plugin_plugin.botplugin.md#event)
- [Log](plugin_plugin.botplugin.md#log)
- [\_config](plugin_plugin.botplugin.md#_config)
- [\_configProxy](plugin_plugin.botplugin.md#_configproxy)
- [blacklist](plugin_plugin.botplugin.md#blacklist)
- [config](plugin_plugin.botplugin.md#config)
- [name](plugin_plugin.botplugin.md#name)
- [whitelist](plugin_plugin.botplugin.md#whitelist)

### Methods

- [autoSave](plugin_plugin.botplugin.md#autosave)
- [black](plugin_plugin.botplugin.md#black)
- [deepProxy](plugin_plugin.botplugin.md#deepproxy)
- [init](plugin_plugin.botplugin.md#init)
- [setup](plugin_plugin.botplugin.md#setup)
- [white](plugin_plugin.botplugin.md#white)

## Constructors

### constructor

\+ **new BotPlugin**(`bot`: [*Bot*](bot_bot.bot.md)): [*BotPlugin*](plugin_plugin.botplugin.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*BotPlugin*](plugin_plugin.botplugin.md)

Defined in: [Plugin/Plugin.ts:8](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L8)

## Properties

### Bot

• `Protected` **Bot**: [*Bot*](bot_bot.bot.md)

Bot对象

Defined in: [Plugin/Plugin.ts:115](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L115)

___

### Command

• `Protected` **Command**: *object*

插件命令
与Bot.Command相同，但受插件黑白名单影响

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `command` | (`name`: *string*) => *Pick*<[*SetComm*](bot_modules_command.setcomm.md), ``"alias"`` \| ``"desc"`` \| ``"reg"`` \| ``"admin"`` \| ``"action"`` \| ``"white"`` \| ``"black"``\> |

Defined in: [Plugin/Plugin.ts:121](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L121)

___

### Event

• `Protected` **Event**: [*Event*](plugin_event.event.md)

事件
与Bot.Event相同，但能设置统一设置

Defined in: [Plugin/Plugin.ts:146](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L146)

___

### Log

• `Protected` **Log**: [*Log*](tools_printlog.log.md)

日志对象

Defined in: [Plugin/Plugin.ts:151](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L151)

___

### \_config

• `Private` **\_config**: *object*

#### Type declaration:

Defined in: [Plugin/Plugin.ts:16](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L16)

___

### \_configProxy

• `Private` **\_configProxy**: *object*

#### Type declaration:

Defined in: [Plugin/Plugin.ts:17](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L17)

___

### blacklist

• **blacklist**: *object*= {}

黑名单

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group?` | *Set*<number\> |
| `user?` | *Set*<number\> |

Defined in: [Plugin/Plugin.ts:69](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L69)

___

### config

• **config**: *object*= {}

插件设置

#### Type declaration:

Defined in: [Plugin/Plugin.ts:20](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L20)

___

### name

• `Readonly` **name**: *string*= '未命名插件'

插件名称

Defined in: [Plugin/Plugin.ts:14](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L14)

___

### whitelist

• **whitelist**: *object*= {}

白名单

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group?` | *Set*<number\> |
| `user?` | *Set*<number\> |

Defined in: [Plugin/Plugin.ts:23](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L23)

## Methods

### autoSave

▸ **autoSave**(): *void*

创建设置代理，在设置修改后自动保存本地配置

**Returns:** *void*

Defined in: [Plugin/Plugin.ts:199](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L199)

___

### black

▸ **black**(`group_list?`: *number*[], `user_list?`: *number*[]): [*BotPlugin*](plugin_plugin.botplugin.md)

增加黑名单列表

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_list?` | *number*[] | 群聊黑名单 |
| `user_list?` | *number*[] | 私聊黑名单 |

**Returns:** [*BotPlugin*](plugin_plugin.botplugin.md)

Defined in: [Plugin/Plugin.ts:78](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L78)

___

### deepProxy

▸ `Private`**deepProxy**(`obj`: { [key: string]: *any*;  }): *object*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `obj` | *object* |

**Returns:** *object*

Defined in: [Plugin/Plugin.ts:171](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L171)

___

### init

▸ **init**(): *void* \| *Promise*<void\>

初始化方法
该方法会在Bot初始化完成后执行

**Returns:** *void* \| *Promise*<void\>

Defined in: [Plugin/Plugin.ts:170](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L170)

___

### setup

▸ **setup**(`config?`: *any*): *void*

安装方法
该方法会在实例化后执行

#### Parameters:

| Name | Type |
| :------ | :------ |
| `config?` | *any* |

**Returns:** *void*

Defined in: [Plugin/Plugin.ts:157](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L157)

___

### white

▸ **white**(`group_list?`: *number*[], `user_list?`: *number*[]): [*BotPlugin*](plugin_plugin.botplugin.md)

增加白名单列表

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_list?` | *number*[] | 群聊白名单 |
| `user_list?` | *number*[] | 私聊白名单 |

**Returns:** [*BotPlugin*](plugin_plugin.botplugin.md)

Defined in: [Plugin/Plugin.ts:32](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Plugin.ts#L32)
