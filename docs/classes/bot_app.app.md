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
- [noSysComm](bot_app.app.md#nosyscomm)
- [plugin](bot_app.app.md#plugin)
- [setSysCommand](bot_app.app.md#setsyscommand)
- [start](bot_app.app.md#start)
- [white](bot_app.app.md#white)

## Constructors

### constructor

\+ **new App**(`name?`: *string*, `dirname?`: *string*): [*App*](bot_app.app.md)

BOT构造函数

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | *string* | 'Bot' | 插件名 |
| `dirname` | *string* | - | 插件设置保存位置 |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:13

## Properties

### Bot

• `Private` `Readonly` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: Bot/App.ts:31

___

### \_pluginsList

• `Private` **\_pluginsList**: { `class`: *boolean* ; `config?`: *any* ; `plugin`: [*Plugin*](../interfaces/type_bot.plugin.md) \| [*PluginFunction*](../modules/type_bot.md#pluginfunction)  }[]= []

Defined in: Bot/App.ts:101

___

### blacklist

• `Private` **blacklist**: *Set*<number\>

Defined in: Bot/App.ts:34

___

### isStart

• `Private` **isStart**: *boolean*= false

Defined in: Bot/App.ts:29

___

### whitelist

• `Private` **whitelist**: *Set*<number\>

Defined in: Bot/App.ts:33

## Methods

### admin

▸ **admin**(`id_list`: *number*[]): [*App*](bot_app.app.md)

设置管理员

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id_list` | *number*[] |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:75

___

### black

▸ **black**(`group_list`: *number*[]): [*App*](bot_app.app.md)

增加黑名单列表，请勿和白名单同时使用

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_list` | *number*[] | 黑名单列表 |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:58

___

### getData

▸ `Private`**getData**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: Bot/App.ts:178

___

### initBot

▸ `Private`**initBot**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: Bot/App.ts:245

___

### initPlugin

▸ `Private`**initPlugin**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: Bot/App.ts:281

___

### noLog

▸ **noLog**(`gorup_list`: *number*[]): [*App*](bot_app.app.md)

增加不输出log的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `gorup_list` | *number*[] |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:92

___

### noSysComm

▸ **noSysComm**(`group_list`: *number*[]): [*App*](bot_app.app.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_list` | *number*[] |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:84

___

### plugin

▸ **plugin**(`plugin`: [*PluginFunction*](../modules/type_bot.md#pluginfunction)): [*App*](bot_app.app.md)

载入方法插件

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | [*PluginFunction*](../modules/type_bot.md#pluginfunction) | 插件方法 |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:110

▸ **plugin**<T\>(`plugin`: T, `config?`: *ConstructorParameters*<T\>[``1``]): [*App*](bot_app.app.md)

载入类插件

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `T` | [*Plugin*](../interfaces/type_bot.plugin.md) |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | T | 插件类 |
| `config?` | *ConstructorParameters*<T\>[``1``] | 插件设置 |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:116

___

### setSysCommand

▸ `Private`**setSysCommand**(): *void*

**Returns:** *void*

Defined in: Bot/App.ts:186

___

### start

▸ **start**(`ws`: [*WebSocketConfig*](../interfaces/type_bot.websocketconfig.md), `debug?`: *boolean*, `showLog?`: *boolean*): *Promise*<[*Bot*](bot_bot.bot.md)\>

启动函数

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ws` | [*WebSocketConfig*](../interfaces/type_bot.websocketconfig.md) | - | 链接设置 |
| `debug` | *boolean* | false | 是否开启debug |
| `showLog` | *boolean* | true | 是否在控制台输出日志 |

**Returns:** *Promise*<[*Bot*](bot_bot.bot.md)\>

Defined in: Bot/App.ts:143

___

### white

▸ **white**(`group_list`: *number*[]): [*App*](bot_app.app.md)

增加白名单列表，请勿和黑名单同时使用

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_list` | *number*[] | 白名单列表 |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:40
