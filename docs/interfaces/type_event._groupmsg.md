[xianyu-robot](../README.md) / [Exports](../modules.md) / [Type/Event](../modules/type_event.md) / _GroupMsg

# Interface: \_GroupMsg

[Type/Event](../modules/type_event.md)._GroupMsg

## Table of contents

### Properties

- [anonymous](type_event._groupmsg.md#anonymous)
- [font](type_event._groupmsg.md#font)
- [group\_id](type_event._groupmsg.md#group_id)
- [message](type_event._groupmsg.md#message)
- [message\_id](type_event._groupmsg.md#message_id)
- [message\_type](type_event._groupmsg.md#message_type)
- [post\_type](type_event._groupmsg.md#post_type)
- [raw\_message](type_event._groupmsg.md#raw_message)
- [self\_id](type_event._groupmsg.md#self_id)
- [sender](type_event._groupmsg.md#sender)
- [sub\_type](type_event._groupmsg.md#sub_type)
- [time](type_event._groupmsg.md#time)
- [user\_id](type_event._groupmsg.md#user_id)

## Properties

### anonymous

• **anonymous**: [*Anonymous*](type_event.anonymous.md)

匿名信息，如果不是匿名消息则为 null

Defined in: [Type/Event.ts:117](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L117)

___

### font

• **font**: *number*

字体

Defined in: [Type/Event.ts:129](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L129)

___

### group\_id

• **group\_id**: *number*

群号

Defined in: [Type/Event.ts:109](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L109)

___

### message

• **message**: *string*

消息内容

Defined in: [Type/Event.ts:121](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L121)

___

### message\_id

• **message\_id**: *number*

消息 ID

Defined in: [Type/Event.ts:105](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L105)

___

### message\_type

• **message\_type**: ``"group"``

消息类型

Defined in: [Type/Event.ts:97](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L97)

___

### post\_type

• **post\_type**: ``"message"``

上报类型

Defined in: [Type/Event.ts:93](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L93)

___

### raw\_message

• **raw\_message**: *string*

原始消息内容

Defined in: [Type/Event.ts:125](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L125)

___

### self\_id

• **self\_id**: *number*

收到事件的机器人 QQ 号

Defined in: [Type/Event.ts:89](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L89)

___

### sender

• **sender**: [*GroupSender*](type_event.groupsender.md)

发送人信息

Defined in: [Type/Event.ts:133](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L133)

___

### sub\_type

• **sub\_type**: ``"normal"`` \| ``"anonymous"`` \| ``"notice"``

消息子类型，正常消息是 normal，匿名消息是 anonymous，系统提示（如「管理员已禁止群内匿名聊天」）是 notice

Defined in: [Type/Event.ts:101](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L101)

___

### time

• **time**: *number*

事件发生的时间戳

Defined in: [Type/Event.ts:85](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L85)

___

### user\_id

• **user\_id**: *number*

发送者 QQ 号

Defined in: [Type/Event.ts:113](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L113)
