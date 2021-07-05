[xianyu-robot](../README.md) / [Exports](../modules.md) / Tools/Tools

# Module: Tools/Tools

## Table of contents

### Functions

- [decode](tools_tools.md#decode)
- [encode](tools_tools.md#encode)
- [getTime](tools_tools.md#gettime)
- [secondsFormat](tools_tools.md#secondsformat)
- [sleep](tools_tools.md#sleep)

## Functions

### decode

▸ `Const`**decode**(`code`: *string*): *string*

特殊字符，反转义

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | *string* | stringReplace |

**Returns:** *string*

反转义后的字符串

Defined in: Tools/Tools.ts:55

___

### encode

▸ `Const`**encode**(`code`: *string*, `isComma?`: *boolean*): *string*

特殊字符，转义，避免冲突

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `code` | *string* | - | 要转义的字符串 |
| `isComma` | *boolean* | true | - |

**Returns:** *string*

转义后的字符串

Defined in: Tools/Tools.ts:41

___

### getTime

▸ `Const`**getTime**(`date`: *any*): *object*

格式化Date对象

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | *any* | Date对象 |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `date` | *string* |
| `time` | *string* |

Defined in: Tools/Tools.ts:5

___

### secondsFormat

▸ `Const`**secondsFormat**(`s`: *number*): *string*

格式化秒

#### Parameters:

| Name | Type |
| :------ | :------ |
| `s` | *number* |

**Returns:** *string*

Defined in: Tools/Tools.ts:27

___

### sleep

▸ `Const`**sleep**(`interval`: *number*): *Promise*<void\>

使用await暂停运行

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | *number* | 暂停秒数 |

**Returns:** *Promise*<void\>

Defined in: Tools/Tools.ts:16
