[xianyu-robot](../README.md) / [Exports](../modules.md) / [Type/Event](../modules/type_event.md) / Group

# Interface: Group

[Type/Event](../modules/type_event.md).Group

## Table of contents

### Properties

- [comment](type_event.group.md#comment)
- [flag](type_event.group.md#flag)
- [group\_id](type_event.group.md#group_id)
- [post\_type](type_event.group.md#post_type)
- [request\_type](type_event.group.md#request_type)
- [self\_id](type_event.group.md#self_id)
- [sub\_type](type_event.group.md#sub_type)
- [time](type_event.group.md#time)
- [user\_id](type_event.group.md#user_id)

## Properties

### comment

• **comment**: *string*

验证信息

Defined in: [Type/Event.ts:501](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L501)

___

### flag

• **flag**: *string*

请求 flag，在调用处理请求的 API 时需要传入

Defined in: [Type/Event.ts:505](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L505)

___

### group\_id

• **group\_id**: *number*

群号

Defined in: [Type/Event.ts:493](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L493)

___

### post\_type

• **post\_type**: ``"request"``

上报类型

Defined in: [Type/Event.ts:481](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L481)

___

### request\_type

• **request\_type**: ``"group"``

请求类型

Defined in: [Type/Event.ts:485](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L485)

___

### self\_id

• **self\_id**: *number*

收到事件的机器人 QQ 号

Defined in: [Type/Event.ts:477](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L477)

___

### sub\_type

• **sub\_type**: ``"add"`` \| ``"invite"``

请求子类型，分别表示加群请求、邀请登录号入群

Defined in: [Type/Event.ts:489](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L489)

___

### time

• **time**: *number*

事件发生的时间戳

Defined in: [Type/Event.ts:473](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L473)

___

### user\_id

• **user\_id**: *number*

发送请求的 QQ 号

Defined in: [Type/Event.ts:497](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Event.ts#L497)
