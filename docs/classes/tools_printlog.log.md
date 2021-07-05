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

\+ **new Log**(): [*Log*](tools_printlog.log.md)

**Returns:** [*Log*](tools_printlog.log.md)

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

Defined in: Tools/PrintLog.ts:104

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

Defined in: Tools/PrintLog.ts:158

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

Defined in: Tools/PrintLog.ts:167

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

Defined in: Tools/PrintLog.ts:113

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

Defined in: Tools/PrintLog.ts:122

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

Defined in: Tools/PrintLog.ts:131

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

Defined in: Tools/PrintLog.ts:140

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

Defined in: Tools/PrintLog.ts:149

___

### printLog

▸ `Private`**printLog**(`msg`: *string*, `level?`: [*LogColor*](../enums/tools_printlog.logcolor.md)): *void*

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `msg` | *string* | - |
| `level` | [*LogColor*](../enums/tools_printlog.logcolor.md) | 0 |

**Returns:** *void*

Defined in: Tools/PrintLog.ts:56

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

Defined in: Tools/PrintLog.ts:95
