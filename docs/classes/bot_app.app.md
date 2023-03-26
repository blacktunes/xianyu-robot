[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/App](../modules/bot_app.md) / App

# Class: App

[Bot/App](../modules/bot_app.md).App

## Table of contents

### Constructors

- [constructor](bot_app.app.md#constructor)

### Properties

- [Bot](bot_app.app.md#bot)
- [\_pluginsList](bot_app.app.md#_pluginslist)
- [blacklist](bot_app.app.md#blacklist)
- [isStart](bot_app.app.md#isstart)
- [whitelist](bot_app.app.md#whitelist)

### Methods

- [admin](bot_app.app.md#admin)
- [black](bot_app.app.md#black)
- [getData](bot_app.app.md#getdata)
- [initBot](bot_app.app.md#initbot)
- [initPlugin](bot_app.app.md#initplugin)
- [noLog](bot_app.app.md#nolog)
- [plugin](bot_app.app.md#plugin)
- [start](bot_app.app.md#start)
- [white](bot_app.app.md#white)

## Constructors

### constructor

\+ **new App**(`name?`: *string*, `dirname?`: *string* \| ``false``, `filename?`: *string*): [*App*](bot_app.app.md)

BOT构造函数

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | *string* | 'Bot' | 插件名 |
| `dirname?` | *string* \| ``false`` | - | 插件设置保存位置 |
| `filename?` | *string* | - | - |

**Returns:** [*App*](bot_app.app.md)

Defined in: [Bot/App.ts:14](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L14)

## Properties

### Bot

• `Private` `Readonly` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: [Bot/App.ts:37](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L37)

___

### \_pluginsList

• `Private` **\_pluginsList**: { `class`: *boolean* ; `config?`: *any* ; `plugin`: [*Plugin*](../interfaces/type_bot.plugin.md) \| [*PluginFunction*](../modules/type_bot.md#pluginfunction)  }[]= []

Defined in: [Bot/App.ts:148](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L148)

___

### blacklist

• `Private` **blacklist**: *object*= {}

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group?` | *Set*<number\> |
| `user?` | *Set*<number\> |

Defined in: [Bot/App.ts:43](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L43)

___

### isStart

• `Private` **isStart**: *boolean*= false

Defined in: [Bot/App.ts:35](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L35)

___

### whitelist

• `Private` **whitelist**: *object*= {}

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group?` | *Set*<number\> |
| `user?` | *Set*<number\> |

Defined in: [Bot/App.ts:39](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L39)

## Methods

### admin

▸ **admin**(`id_list`: *number*[]): [*App*](bot_app.app.md)

设置管理员

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id_list` | *number*[] |

**Returns:** [*App*](bot_app.app.md)

Defined in: [Bot/App.ts:129](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L129)

___

### black

▸ **black**(`group_list?`: *number*[], `user_list?`: *number*[]): [*App*](bot_app.app.md)

增加黑名单列表

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_list?` | *number*[] | 群聊黑名单 |
| `user_list?` | *number*[] | 私聊黑名单 |

**Returns:** [*App*](bot_app.app.md)

Defined in: [Bot/App.ts:92](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L92)

___

### getData

▸ `Private`**getData**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Bot/App.ts:229](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L229)

___

### initBot

▸ `Private`**initBot**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Bot/App.ts:237](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L237)

___

### initPlugin

▸ `Private`**initPlugin**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Bot/App.ts:292](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L292)

___

### noLog

▸ **noLog**(`gorup_list`: *number*[]): [*App*](bot_app.app.md)

增加不输出log的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `gorup_list` | *number*[] |

**Returns:** [*App*](bot_app.app.md)

Defined in: [Bot/App.ts:141](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L141)

___

### plugin

▸ **plugin**(`plugin`: [*PluginFunction*](../modules/type_bot.md#pluginfunction)): [*App*](bot_app.app.md)

载入方法插件

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | [*PluginFunction*](../modules/type_bot.md#pluginfunction) | 插件方法 |

**Returns:** [*App*](bot_app.app.md)

Defined in: [Bot/App.ts:157](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L157)

▸ **plugin**<T\>(`plugin`: T, `config?`: *InstanceType*<T\>[``"config"``]): [*App*](bot_app.app.md)

载入类插件

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `T` | [*Plugin*](../interfaces/type_bot.plugin.md) |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | T | 插件类 |
| `config?` | *InstanceType*<T\>[``"config"``] | 插件设置 |

**Returns:** [*App*](bot_app.app.md)

Defined in: [Bot/App.ts:163](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L163)

___

### start

▸ **start**(`ws?`: [*WebSocketConfig*](../interfaces/type_bot.websocketconfig.md), `debug?`: *boolean*, `showLog?`: *boolean*): *Promise*<[*Bot*](bot_bot.bot.md)\>

启动函数

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ws` | [*WebSocketConfig*](../interfaces/type_bot.websocketconfig.md) | {} | 链接设置 |
| `debug` | *boolean* | false | 是否开启debug |
| `showLog` | *boolean* | true | 是否在控制台输出日志 |

**Returns:** *Promise*<[*Bot*](bot_bot.bot.md)\>

Defined in: [Bot/App.ts:190](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L190)

___

### white

▸ **white**(`group_list?`: *number*[], `user_list?`: *number*[]): [*App*](bot_app.app.md)

增加白名单列表

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_list?` | *number*[] | 群聊白名单 |
| `user_list?` | *number*[] | 私聊白名单 |

**Returns:** [*App*](bot_app.app.md)

Defined in: [Bot/App.ts:53](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/App.ts#L53)
