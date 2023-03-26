[xianyu-robot](../README.md) / [Exports](../modules.md) / [Type/Event](../modules/type_event.md) / GroupDecrease

# Interface: GroupDecrease

[Type/Event](../modules/type_event.md).GroupDecrease

## Table of contents

### Properties

- [group\_id](type_event.groupdecrease.md#group_id)
- [notice\_type](type_event.groupdecrease.md#notice_type)
- [operator\_id](type_event.groupdecrease.md#operator_id)
- [post\_type](type_event.groupdecrease.md#post_type)
- [self\_id](type_event.groupdecrease.md#self_id)
- [sub\_type](type_event.groupdecrease.md#sub_type)
- [time](type_event.groupdecrease.md#time)
- [user\_id](type_event.groupdecrease.md#user_id)

## Properties

### group\_id

• **group\_id**: *number*

群号

Defined in: [Type/Event.ts:322](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L322)

___

### notice\_type

• **notice\_type**: ``"group_decrease"``

通知类型

Defined in: [Type/Event.ts:314](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L314)

___

### operator\_id

• **operator\_id**: *number*

操作者 QQ 号（如果是主动退群，则和 user_id 相同）

Defined in: [Type/Event.ts:326](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L326)

___

### post\_type

• **post\_type**: ``"notice"``

上报类型

Defined in: [Type/Event.ts:310](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L310)

___

### self\_id

• **self\_id**: *number*

收到事件的机器人 QQ 号

Defined in: [Type/Event.ts:306](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L306)

___

### sub\_type

• **sub\_type**: ``"leave"`` \| ``"kick"`` \| ``"kick_me"``

事件子类型，分别表示主动退群、成员被踢、登录号被踢

Defined in: [Type/Event.ts:318](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L318)

___

### time

• **time**: *number*

事件发生的时间戳

Defined in: [Type/Event.ts:302](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L302)

___

### user\_id

• **user\_id**: *number*

离开者 QQ 号

Defined in: [Type/Event.ts:330](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L330)
