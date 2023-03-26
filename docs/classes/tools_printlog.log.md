[xianyu-robot](../README.md) / [Exports](../modules.md) / [Tools/PrintLog](../modules/tools_printlog.md) / Log

# Class: Log

[Tools/PrintLog](../modules/tools_printlog.md).Log

## Table of contents

### Constructors

- [constructor](tools_printlog.log.md#constructor)

### Methods

- [logDebug](tools_printlog.log.md#logdebug)
- [logError](tools_printlog.log.md#logerror)
- [logFatal](tools_printlog.log.md#logfatal)
- [logInfo](tools_printlog.log.md#loginfo)
- [logInfoRecv](tools_printlog.log.md#loginforecv)
- [logInfoSend](tools_printlog.log.md#loginfosend)
- [logNotice](tools_printlog.log.md#lognotice)
- [logWarning](tools_printlog.log.md#logwarning)
- [printLog](tools_printlog.log.md#printlog)
- [sendLog](tools_printlog.log.md#sendlog)

## Constructors

### constructor

\+ **new Log**(`name?`: *string*): [*Log*](tools_printlog.log.md)

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | *string* | '' |

**Returns:** [*Log*](tools_printlog.log.md)

Defined in: [Tools/PrintLog.ts:55](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L55)

## Methods

### logDebug

▸ **logDebug**(`content`: *string*, `type?`: *string*): *void*

调试日志

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `content` | *string* | - |
| `type` | *string* | 'DEBUG' |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:106](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L106)

___

### logError

▸ **logError**(`content`: *string*, `type?`: *string*): *void*

错误日志

#### Parameters:

| Name | Type |
| :------ | :------ |
| `content` | *string* |
| `type?` | *string* |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:160](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L160)

___

### logFatal

▸ **logFatal**(`content`: *string*, `type?`: *string*): *void*

致命错误日志

#### Parameters:

| Name | Type |
| :------ | :------ |
| `content` | *string* |
| `type?` | *string* |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:169](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L169)

___

### logInfo

▸ **logInfo**(`content`: *string*, `type?`: *string*): *void*

信息日志

#### Parameters:

| Name | Type |
| :------ | :------ |
| `content` | *string* |
| `type?` | *string* |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:115](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L115)

___

### logInfoRecv

▸ **logInfoRecv**(`content`: *string*, `type?`: *string*): *void*

接受信息日志

#### Parameters:

| Name | Type |
| :------ | :------ |
| `content` | *string* |
| `type?` | *string* |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:124](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L124)

___

### logInfoSend

▸ **logInfoSend**(`content`: *string*, `type?`: *string*): *void*

发送日志

#### Parameters:

| Name | Type |
| :------ | :------ |
| `content` | *string* |
| `type?` | *string* |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:133](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L133)

___

### logNotice

▸ **logNotice**(`content`: *string*, `type?`: *string*): *void*

通知日志

#### Parameters:

| Name | Type |
| :------ | :------ |
| `content` | *string* |
| `type?` | *string* |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:142](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L142)

___

### logWarning

▸ **logWarning**(`content`: *string*, `type?`: *string*): *void*

警告日志

#### Parameters:

| Name | Type |
| :------ | :------ |
| `content` | *string* |
| `type?` | *string* |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:151](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L151)

___

### printLog

▸ `Private`**printLog**(`msg`: *string*, `level?`: [*LogColor*](../enums/tools_printlog.logcolor.md)): *void*

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `msg` | *string* | - |
| `level` | [*LogColor*](../enums/tools_printlog.logcolor.md) | 0 |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:58](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L58)

___

### sendLog

▸ **sendLog**(`level`: [*LogColor*](../enums/tools_printlog.logcolor.md), `content`: *string*, `type?`: *string*): *void*

在控制台调试输出日志。不推荐使用本方法,请使用log开头的方法

#### Parameters:

| Name | Type |
| :------ | :------ |
| `level` | [*LogColor*](../enums/tools_printlog.logcolor.md) |
| `content` | *string* |
| `type?` | *string* |

**Returns:** *void*

Defined in: [Tools/PrintLog.ts:97](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/PrintLog.ts#L97)
