[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Admin](../modules/bot_modules_admin.md) / Admin

# Class: Admin

[Bot/modules/Admin](../modules/bot_modules_admin.md).Admin

管理员相关

## Table of contents

### Constructors

- [constructor](bot_modules_admin.admin.md#constructor)

### Properties

- [Bot](bot_modules_admin.admin.md#bot)
- [adminList](bot_modules_admin.admin.md#adminlist)
- [banlist](bot_modules_admin.admin.md#banlist)

### Methods

- [addAdmin](bot_modules_admin.admin.md#addadmin)
- [addBlacklist](bot_modules_admin.admin.md#addblacklist)
- [addWhitelist](bot_modules_admin.admin.md#addwhitelist)
- [ban](bot_modules_admin.admin.md#ban)
- [isAdmin](bot_modules_admin.admin.md#isadmin)
- [isBan](bot_modules_admin.admin.md#isban)
- [liftBan](bot_modules_admin.admin.md#liftban)

## Constructors

### constructor

\+ **new Admin**(`bot`: [*Bot*](bot_bot.bot.md)): [*Admin*](bot_modules_admin.admin.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*Admin*](bot_modules_admin.admin.md)

Defined in: [Bot/modules/Admin.ts:8](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L8)

## Properties

### Bot

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: [Bot/modules/Admin.ts:12](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L12)

___

### adminList

• **adminList**: *Set*<number\>

Defined in: [Bot/modules/Admin.ts:14](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L14)

___

### banlist

• **banlist**: *Set*<number\>

被ban名单

Defined in: [Bot/modules/Admin.ts:26](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L26)

## Methods

### addAdmin

▸ **addAdmin**(`admin_id`: *number*[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `admin_id` | *number*[] |

**Returns:** *void*

Defined in: [Bot/modules/Admin.ts:15](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L15)

___

### addBlacklist

▸ **addBlacklist**(`group_list`: *number*[]): *void*

增加黑名单列表，请勿和白名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_list` | *number*[] |

**Returns:** *void*

Defined in: [Bot/modules/Admin.ts:83](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L83)

___

### addWhitelist

▸ **addWhitelist**(`group_list`: *number*[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_list` | *number*[] |

**Returns:** *void*

Defined in: [Bot/modules/Admin.ts:71](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L71)

___

### ban

▸ **ban**(`group_id`: *number*, `user_id`: *number*, `time?`: *number*): *void*

禁用所有功能

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `group_id` | *number* | - |
| `user_id` | *number* | - |
| `time` | *number* | 1 |

**Returns:** *void*

Defined in: [Bot/modules/Admin.ts:33](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L33)

___

### isAdmin

▸ **isAdmin**(`id`: *number*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** *boolean*

Defined in: [Bot/modules/Admin.ts:19](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L19)

___

### isBan

▸ **isBan**(`user_id`: *number*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `user_id` | *number* |

**Returns:** *boolean*

Defined in: [Bot/modules/Admin.ts:67](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L67)

___

### liftBan

▸ **liftBan**(`user_id`: *number*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `user_id` | *number* |

**Returns:** *void*

Defined in: [Bot/modules/Admin.ts:59](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Admin.ts#L59)
