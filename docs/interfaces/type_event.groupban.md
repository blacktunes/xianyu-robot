[xianyu-robot](../README.md) / [Exports](../modules.md) / [Type/Event](../modules/type_event.md) / GroupBan

# Interface: GroupBan

[Type/Event](../modules/type_event.md).GroupBan

## Table of contents

### Properties

- [duration](type_event.groupban.md#duration)
- [group\_id](type_event.groupban.md#group_id)
- [notice\_type](type_event.groupban.md#notice_type)
- [operator\_id](type_event.groupban.md#operator_id)
- [post\_type](type_event.groupban.md#post_type)
- [self\_id](type_event.groupban.md#self_id)
- [sub\_type](type_event.groupban.md#sub_type)
- [time](type_event.groupban.md#time)
- [user\_id](type_event.groupban.md#user_id)

## Properties

### duration

• **duration**: *number*

禁言时长，单位秒

Defined in: [Type/Event.ts:404](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L404)

___

### group\_id

• **group\_id**: *number*

群号

Defined in: [Type/Event.ts:392](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L392)

___

### notice\_type

• **notice\_type**: ``"group_ban"``

通知类型

Defined in: [Type/Event.ts:384](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L384)

___

### operator\_id

• **operator\_id**: *number*

操作者 QQ 号

Defined in: [Type/Event.ts:396](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L396)

___

### post\_type

• **post\_type**: ``"notice"``

上报类型

Defined in: [Type/Event.ts:380](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L380)

___

### self\_id

• **self\_id**: *number*

收到事件的机器人 QQ 号

Defined in: [Type/Event.ts:376](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L376)

___

### sub\_type

• **sub\_type**: ``"ban"`` \| ``"lift_ban"``

事件子类型，分别表示禁言、解除禁言

Defined in: [Type/Event.ts:388](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L388)

___

### time

• **time**: *number*

事件发生的时间戳

Defined in: [Type/Event.ts:372](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L372)

___

### user\_id

• **user\_id**: *number*

被禁言 QQ 号

Defined in: [Type/Event.ts:400](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Type/Event.ts#L400)
