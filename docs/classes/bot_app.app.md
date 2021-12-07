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

\+ **new App**(`name?`: *string*, `dirname?`: *string* \| ``false``, `filename?`: *string*): [*App*](bot_app.app.md)

BOT构造函数

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | *string* | 'Bot' | 插件名 |
| `dirname?` | *string* \| ``false`` | - | 插件设置保存位置 |
| `filename?` | *string* | - | - |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:14

## Properties

### Bot

• `Private` `Readonly` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: Bot/App.ts:37

___

### \_pluginsList

• `Private` **\_pluginsList**: { `class`: *boolean* ; `config?`: *any* ; `plugin`: [*Plugin*](../interfaces/type_bot.plugin.md) \| [*PluginFunction*](../modules/type_bot.md#pluginfunction)  }[]= []

Defined in: Bot/App.ts:107

___

### blacklist

• `Private` **blacklist**: *Set*<number\>

Defined in: Bot/App.ts:40

___

### isStart

• `Private` **isStart**: *boolean*= false

Defined in: Bot/App.ts:35

___

### whitelist

• `Private` **whitelist**: *Set*<number\>

Defined in: Bot/App.ts:39

## Methods

### admin

▸ **admin**(`id_list`: *number*[]): [*App*](bot_app.app.md)

设置管理员

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id_list` | *number*[] |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:81

___

### black

▸ **black**(`group_list`: *number*[]): [*App*](bot_app.app.md)

增加黑名单列表，请勿和白名单同时使用

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_list` | *number*[] | 黑名单列表 |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:64

___

### getData

▸ `Private`**getData**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: Bot/App.ts:184

___

### initBot

▸ `Private`**initBot**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: Bot/App.ts:251

___

### initPlugin

▸ `Private`**initPlugin**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: Bot/App.ts:295

___

### noLog

▸ **noLog**(`gorup_list`: *number*[]): [*App*](bot_app.app.md)

增加不输出log的群组

#### Parameters:

| Name | Type |
| :------ | :------ |
| `gorup_list` | *number*[] |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:98

___

### noSysComm

▸ **noSysComm**(`group_list`: *number*[]): [*App*](bot_app.app.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_list` | *number*[] |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:90

___

### plugin

▸ **plugin**(`plugin`: [*PluginFunction*](../modules/type_bot.md#pluginfunction)): [*App*](bot_app.app.md)

载入方法插件

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | [*PluginFunction*](../modules/type_bot.md#pluginfunction) | 插件方法 |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:116

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

Defined in: Bot/App.ts:122

___

### setSysCommand

▸ `Private`**setSysCommand**(): *void*

**Returns:** *void*

Defined in: Bot/App.ts:192

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

Defined in: Bot/App.ts:149

___

### white

▸ **white**(`group_list`: *number*[]): [*App*](bot_app.app.md)

增加白名单列表，请勿和黑名单同时使用

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `group_list` | *number*[] | 白名单列表 |

**Returns:** [*App*](bot_app.app.md)

Defined in: Bot/App.ts:46
