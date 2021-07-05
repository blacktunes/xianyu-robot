[xianyu-robot](../README.md) / [Exports](../modules.md) / [Type/Event](../modules/type_event.md) / _PrivateMsg

# Interface: \_PrivateMsg

[Type/Event](../modules/type_event.md)._PrivateMsg

## Table of contents

### Properties

- [font](type_event._privatemsg.md#font)
- [message](type_event._privatemsg.md#message)
- [message\_id](type_event._privatemsg.md#message_id)
- [message\_type](type_event._privatemsg.md#message_type)
- [post\_type](type_event._privatemsg.md#post_type)
- [raw\_message](type_event._privatemsg.md#raw_message)
- [self\_id](type_event._privatemsg.md#self_id)
- [sender](type_event._privatemsg.md#sender)
- [sub\_type](type_event._privatemsg.md#sub_type)
- [time](type_event._privatemsg.md#time)
- [user\_id](type_event._privatemsg.md#user_id)

## Properties

### font

• **font**: *number*

字体

Defined in: Type/Event.ts:50

___

### message

• **message**: *string*

消息内容

Defined in: Type/Event.ts:42

___

### message\_id

• **message\_id**: *number*

消息 ID

Defined in: Type/Event.ts:34

___

### message\_type

• **message\_type**: ``"private"``

消息类型

Defined in: Type/Event.ts:26

___

### post\_type

• **post\_type**: ``"message"``

上报类型

Defined in: Type/Event.ts:22

___

### raw\_message

• **raw\_message**: *string*

原始消息内容

Defined in: Type/Event.ts:46

___

### self\_id

• **self\_id**: *number*

收到事件的机器人 QQ 号

Defined in: Type/Event.ts:18

___

### sender

• **sender**: [*PrivateSender*](type_event.privatesender.md)

发送人信息

Defined in: Type/Event.ts:54

___

### sub\_type

• **sub\_type**: ``"group"`` \| ``"friend"`` \| ``" other"``

消息子类型，如果是好友则是 friend，如果是群临时会话则是 group

Defined in: Type/Event.ts:30

___

### time

• **time**: *number*

事件发生的时间戳

Defined in: Type/Event.ts:14

___

### user\_id

• **user\_id**: *number*

发送者 QQ 号

Defined in: Type/Event.ts:38
