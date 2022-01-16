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

Defined in: Bot/modules/Admin.ts:6

## Properties

### Bot

• `Private` **Bot**: *Pick*<[*Bot*](bot_bot.bot.md), ``"Data"`` \| ``"Log"`` \| ``"CQCode"`` \| ``"Plugin"`` \| ``"Command"`` \| ``"Conn"`` \| ``"Api"`` \| ``"Event"`` \| ``"Debug"``\>

Defined in: Bot/modules/Admin.ts:10

___

### adminList

• **adminList**: *Set*<number\>

Defined in: Bot/modules/Admin.ts:12

___

### banlist

• **banlist**: *Set*<number\>

被ban名单

Defined in: Bot/modules/Admin.ts:22

## Methods

### addAdmin

▸ **addAdmin**(`admin_id`: *number*[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `admin_id` | *number*[] |

**Returns:** *void*

Defined in: Bot/modules/Admin.ts:13

___

### addBlacklist

▸ **addBlacklist**(`group_list`: *number*[]): *void*

增加黑名单列表，请勿和白名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_list` | *number*[] |

**Returns:** *void*

Defined in: Bot/modules/Admin.ts:78

___

### addWhitelist

▸ **addWhitelist**(`group_list`: *number*[]): *void*

增加白名单列表，请勿和黑名单同时使用

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_list` | *number*[] |

**Returns:** *void*

Defined in: Bot/modules/Admin.ts:68

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

Defined in: Bot/modules/Admin.ts:29

___

### isAdmin

▸ **isAdmin**(`id`: *number*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** *boolean*

Defined in: Bot/modules/Admin.ts:17

___

### isBan

▸ **isBan**(`user_id`: *number*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `user_id` | *number* |

**Returns:** *boolean*

Defined in: Bot/modules/Admin.ts:63

___

### liftBan

▸ **liftBan**(`user_id`: *number*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `user_id` | *number* |

**Returns:** *void*

Defined in: Bot/modules/Admin.ts:55
