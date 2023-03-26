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

Defined in: [Bot/modules/Admin.ts:6](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L6)

## Properties

### Bot

• `Private` **Bot**: *Pick*<[*Bot*](bot_bot.bot.md), ``"Data"`` \| ``"Log"`` \| ``"CQCode"`` \| ``"Plugin"`` \| ``"Command"`` \| ``"Conn"`` \| ``"Api"`` \| ``"Event"`` \| ``"Debug"``\>

Defined in: [Bot/modules/Admin.ts:10](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L10)

___

### adminList

• **adminList**: *Set*<number\>

Defined in: [Bot/modules/Admin.ts:12](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L12)

___

### banlist

• **banlist**: *Set*<number\>

被ban名单

Defined in: [Bot/modules/Admin.ts:22](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L22)

## Methods

### addAdmin

▸ **addAdmin**(`admin_id`: *number*[]): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `admin_id` | *number*[] |

**Returns:** *void*

Defined in: [Bot/modules/Admin.ts:13](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L13)

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

Defined in: [Bot/modules/Admin.ts:29](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L29)

___

### isAdmin

▸ **isAdmin**(`id`: *number*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** *boolean*

Defined in: [Bot/modules/Admin.ts:17](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L17)

___

### isBan

▸ **isBan**(`user_id`: *number*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `user_id` | *number* |

**Returns:** *boolean*

Defined in: [Bot/modules/Admin.ts:63](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L63)

___

### liftBan

▸ **liftBan**(`user_id`: *number*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `user_id` | *number* |

**Returns:** *void*

Defined in: [Bot/modules/Admin.ts:55](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Admin.ts#L55)
