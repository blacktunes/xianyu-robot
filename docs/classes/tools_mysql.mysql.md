[xianyu-robot](../README.md) / [Exports](../modules.md) / [Tools/Mysql](../modules/tools_mysql.md) / Mysql

# Class: Mysql

[Tools/Mysql](../modules/tools_mysql.md).Mysql

## Table of contents

### Constructors

- [constructor](tools_mysql.mysql.md#constructor)

### Properties

- [Pool](tools_mysql.mysql.md#pool)

### Methods

- [query](tools_mysql.mysql.md#query)

## Constructors

### constructor

\+ **new Mysql**(`config`: PoolConfig): [*Mysql*](tools_mysql.mysql.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `config` | PoolConfig |

**Returns:** [*Mysql*](tools_mysql.mysql.md)

Defined in: Tools/Mysql.ts:3

## Properties

### Pool

• **Pool**: Pool= null

Defined in: Tools/Mysql.ts:13

## Methods

### query

▸ `Readonly`**query**(`sql`: *string*, `values?`: *string*): *Promise*<any\>

查询语句

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sql` | *string* | - |
| `values` | *string* | '' |

**Returns:** *Promise*<any\>

Defined in: Tools/Mysql.ts:20
