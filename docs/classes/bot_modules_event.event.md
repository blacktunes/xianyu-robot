[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Event](../modules/bot_modules_event.md) / Event

# Class: Event

[Bot/modules/Event](../modules/bot_modules_event.md).Event

## Table of contents

### Constructors

- [constructor](bot_modules_event.event.md#constructor)

### Properties

- [Bot](bot_modules_event.event.md#bot)
- [sendEvent](bot_modules_event.event.md#sendevent)

### Methods

- [init](bot_modules_event.event.md#init)
- [on](bot_modules_event.event.md#on)
- [onSendMessage](bot_modules_event.event.md#onsendmessage)

## Constructors

### constructor

\+ **new Event**(`Bot`: [*Bot*](bot_bot.bot.md)): [*Event*](bot_modules_event.event.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `Bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:5](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L5)

## Properties

### Bot

• `Private` **Bot**: *Pick*<[*Bot*](bot_bot.bot.md), ``"Admin"`` \| ``"Data"`` \| ``"Log"`` \| ``"CQCode"`` \| ``"Plugin"`` \| ``"Command"`` \| ``"Conn"`` \| ``"Api"`` \| ``"Debug"``\>

Defined in: [Bot/modules/Event.ts:10](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L10)

___

### sendEvent

• **sendEvent**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group` | (`group_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => [*Prevent*](../modules/type_bot.md#prevent)[] |
| `private` | (`user_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => [*Prevent*](../modules/type_bot.md#prevent)[] |

Defined in: [Bot/modules/Event.ts:276](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L276)

## Methods

### init

▸ `Private`**init**(): *void*

**Returns:** *void*

Defined in: [Bot/modules/Event.ts:12](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L12)

___

### on

▸ **on**(`type`: ``"ws.ready"`` \| ``"ws.close"`` \| ``"ws.connect"``, `fn`: () => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

WS链接或断开

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"ws.ready"`` \| ``"ws.close"`` \| ``"ws.connect"`` |
| `fn` | () => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:190](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L190)

▸ **on**(`type`: ``"ws.error"``, `fn`: (`error`: Error) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

WS链接错误

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"ws.error"`` |
| `fn` | (`error`: Error) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:194](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L194)

▸ **on**(`type`: ``"message.private"``, `fn`: (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent), `log?`: *boolean*): [*Event*](bot_modules_event.event.md)

私聊信息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"message.private"`` |
| `fn` | (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent) |
| `log?` | *boolean* |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:198](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L198)

▸ **on**(`type`: ``"message.group"``, `fn`: (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent), `log?`: *boolean*): [*Event*](bot_modules_event.event.md)

群消息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"message.group"`` |
| `fn` | (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent) |
| `log?` | *boolean* |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:202](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L202)

▸ **on**(`type`: ``"notice.group_upload"``, `fn`: (`e`: [*GroupUpload*](../interfaces/type_event.groupupload.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群文件上传

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_upload"`` |
| `fn` | (`e`: [*GroupUpload*](../interfaces/type_event.groupupload.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:206](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L206)

▸ **on**(`type`: ``"notice.group_admin"``, `fn`: (`e`: [*GroupAdmin*](../interfaces/type_event.groupadmin.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群管理员变动

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_admin"`` |
| `fn` | (`e`: [*GroupAdmin*](../interfaces/type_event.groupadmin.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:210](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L210)

▸ **on**(`type`: ``"notice.group_decrease"``, `fn`: (`e`: [*GroupDecrease*](../interfaces/type_event.groupdecrease.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群成员减少

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_decrease"`` |
| `fn` | (`e`: [*GroupDecrease*](../interfaces/type_event.groupdecrease.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:214](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L214)

▸ **on**(`type`: ``"notice.group_increase"``, `fn`: (`e`: [*GroupIncrease*](../interfaces/type_event.groupincrease.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群成员增加

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_increase"`` |
| `fn` | (`e`: [*GroupIncrease*](../interfaces/type_event.groupincrease.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:218](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L218)

▸ **on**(`type`: ``"notice.group_ban"``, `fn`: (`e`: [*GroupBan*](../interfaces/type_event.groupban.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群禁言

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_ban"`` |
| `fn` | (`e`: [*GroupBan*](../interfaces/type_event.groupban.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:222](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L222)

▸ **on**(`type`: ``"notice.friend_add"``, `fn`: (`e`: [*FriendAdd*](../interfaces/type_event.friendadd.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

好友添加

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.friend_add"`` |
| `fn` | (`e`: [*FriendAdd*](../interfaces/type_event.friendadd.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:226](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L226)

▸ **on**(`type`: ``"notice.group_recall"``, `fn`: (`e`: [*GroupRecall*](../interfaces/type_event.grouprecall.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群消息撤回

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_recall"`` |
| `fn` | (`e`: [*GroupRecall*](../interfaces/type_event.grouprecall.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:230](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L230)

▸ **on**(`type`: ``"notice.friend_recall"``, `fn`: (`e`: [*FriendRecall*](../interfaces/type_event.friendrecall.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

好友消息撤回

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.friend_recall"`` |
| `fn` | (`e`: [*FriendRecall*](../interfaces/type_event.friendrecall.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:234](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L234)

▸ **on**(`type`: ``"notice.notify"``, `fn`: (`e`: [*GroupNotify*](../interfaces/type_event.groupnotify.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群内提示事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.notify"`` |
| `fn` | (`e`: [*GroupNotify*](../interfaces/type_event.groupnotify.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:238](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L238)

▸ **on**(`type`: ``"notice.group_card"``, `fn`: (`e`: [*GroupCard*](../interfaces/type_event.groupcard.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群成员名片更新

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_card"`` |
| `fn` | (`e`: [*GroupCard*](../interfaces/type_event.groupcard.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:242](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L242)

▸ **on**(`type`: ``"notice.offline_file"``, `fn`: (`e`: [*OfflineFile*](../interfaces/type_event.offlinefile.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

接收到离线文件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.offline_file"`` |
| `fn` | (`e`: [*OfflineFile*](../interfaces/type_event.offlinefile.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:246](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L246)

▸ **on**(`type`: ``"request.friend"``, `fn`: (`e`: [*Friend*](../interfaces/type_event.friend.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

加好友请求

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"request.friend"`` |
| `fn` | (`e`: [*Friend*](../interfaces/type_event.friend.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:250](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L250)

▸ **on**(`type`: ``"request.group"``, `fn`: (`e`: [*Group*](../interfaces/type_event.group.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

加群请求/邀请

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"request.group"`` |
| `fn` | (`e`: [*Group*](../interfaces/type_event.group.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:254](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L254)

▸ **on**(`type`: ``"notice.client_status"``, `fn`: (`e`: [*ClientStatus*](../interfaces/type_event.clientstatus.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

其他客户端在线状态变更

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.client_status"`` |
| `fn` | (`e`: [*ClientStatus*](../interfaces/type_event.clientstatus.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:258](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L258)

▸ **on**(`type`: ``"notice.essence"``, `fn`: (`e`: [*Essence*](../interfaces/type_event.essence.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

精华消息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.essence"`` |
| `fn` | (`e`: [*Essence*](../interfaces/type_event.essence.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:262](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L262)

▸ **on**(`type`: ``"meta_event.heartbeat"``, `fn`: (`e?`: *any*) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

心跳事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"meta_event.heartbeat"`` |
| `fn` | (`e?`: *any*) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:266](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L266)

▸ **on**(`type`: *string*, `fn`: (`e`: *any*) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

其它事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | *string* |
| `fn` | (`e`: *any*) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:270](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L270)

___

### onSendMessage

▸ **onSendMessage**(`type`: ``"sendPrivateMsg"``, `fn`: (`user_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void*): [*Event*](bot_modules_event.event.md)

发送消息完成事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"sendPrivateMsg"`` |
| `fn` | (`user_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void* |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:287](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L287)

▸ **onSendMessage**(`type`: ``"sendGroupMsg"``, `fn`: (`group_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void*): [*Event*](bot_modules_event.event.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"sendGroupMsg"`` |
| `fn` | (`group_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void* |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:288](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Bot/modules/Event.ts#L288)
