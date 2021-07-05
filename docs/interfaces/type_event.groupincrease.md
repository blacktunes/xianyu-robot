[xianyu-robot](../README.md) / [Exports](../modules.md) / [Type/Event](../modules/type_event.md) / GroupIncrease

# Interface: GroupIncrease

[Type/Event](../modules/type_event.md).GroupIncrease

## Table of contents

### Properties

- [group\_id](type_event.groupincrease.md#group_id)
- [notice\_type](type_event.groupincrease.md#notice_type)
- [operator\_id](type_event.groupincrease.md#operator_id)
- [post\_type](type_event.groupincrease.md#post_type)
- [self\_id](type_event.groupincrease.md#self_id)
- [sub\_type](type_event.groupincrease.md#sub_type)
- [time](type_event.groupincrease.md#time)
- [user\_id](type_event.groupincrease.md#user_id)

## Properties

### group\_id

• **group\_id**: *number*

群号

Defined in: Type/Event.ts:357

___

### notice\_type

• **notice\_type**: ``"group_increase"``

通知类型

Defined in: Type/Event.ts:349

___

### operator\_id

• **operator\_id**: *number*

操作者 QQ 号

Defined in: Type/Event.ts:361

___

### post\_type

• **post\_type**: ``"notice"``

上报类型

Defined in: Type/Event.ts:345

___

### self\_id

• **self\_id**: *number*

收到事件的机器人 QQ 号

Defined in: Type/Event.ts:341

___

### sub\_type

• **sub\_type**: ``"invite"`` \| ``"approve"``

事件子类型，分别表示管理员已同意入群、管理员邀请入群

Defined in: Type/Event.ts:353

___

### time

• **time**: *number*

事件发生的时间戳

Defined in: Type/Event.ts:337

___

### user\_id

• **user\_id**: *number*

加入者 QQ 号

Defined in: Type/Event.ts:365
