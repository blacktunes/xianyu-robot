[xianyu-robot](../README.md) / [Exports](../modules.md) / [Bot/modules/Event](../modules/bot_modules_event.md) / Event

# Class: Event

[Bot/modules/Event](../modules/bot_modules_event.md).Event

## Table of contents

### Constructors

- [constructor](bot_modules_event.event.md#constructor)

### Properties

- [Bot](bot_modules_event.event.md#bot)

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

Defined in: [Bot/modules/Event.ts:6](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L6)

## Properties

### Bot

• `Private` **Bot**: [*Bot*](bot_bot.bot.md)

Defined in: [Bot/modules/Event.ts:11](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L11)

## Methods

### init

▸ `Private`**init**(): *void*

**Returns:** *void*

Defined in: [Bot/modules/Event.ts:13](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L13)

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

Defined in: [Bot/modules/Event.ts:191](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L191)

▸ **on**(`type`: ``"ws.error"``, `fn`: (`error`: Error) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

WS链接错误

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"ws.error"`` |
| `fn` | (`error`: Error) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:195](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L195)

▸ **on**(`type`: ``"message.private"``, `fn`: (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent), `log?`: *boolean*): [*Event*](bot_modules_event.event.md)

私聊信息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"message.private"`` |
| `fn` | (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent) |
| `log?` | *boolean* |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:199](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L199)

▸ **on**(`type`: ``"message.group"``, `fn`: (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent), `log?`: *boolean*): [*Event*](bot_modules_event.event.md)

群消息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"message.group"`` |
| `fn` | (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent) |
| `log?` | *boolean* |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:203](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L203)

▸ **on**(`type`: ``"notice.group_upload"``, `fn`: (`e`: [*GroupUpload*](../interfaces/type_event.groupupload.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群文件上传

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_upload"`` |
| `fn` | (`e`: [*GroupUpload*](../interfaces/type_event.groupupload.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:207](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L207)

▸ **on**(`type`: ``"notice.group_admin"``, `fn`: (`e`: [*GroupAdmin*](../interfaces/type_event.groupadmin.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群管理员变动

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_admin"`` |
| `fn` | (`e`: [*GroupAdmin*](../interfaces/type_event.groupadmin.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:211](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L211)

▸ **on**(`type`: ``"notice.group_decrease"``, `fn`: (`e`: [*GroupDecrease*](../interfaces/type_event.groupdecrease.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群成员减少

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_decrease"`` |
| `fn` | (`e`: [*GroupDecrease*](../interfaces/type_event.groupdecrease.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:215](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L215)

▸ **on**(`type`: ``"notice.group_increase"``, `fn`: (`e`: [*GroupIncrease*](../interfaces/type_event.groupincrease.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群成员增加

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_increase"`` |
| `fn` | (`e`: [*GroupIncrease*](../interfaces/type_event.groupincrease.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:219](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L219)

▸ **on**(`type`: ``"notice.group_ban"``, `fn`: (`e`: [*GroupBan*](../interfaces/type_event.groupban.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群禁言

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_ban"`` |
| `fn` | (`e`: [*GroupBan*](../interfaces/type_event.groupban.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:223](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L223)

▸ **on**(`type`: ``"notice.friend_add"``, `fn`: (`e`: [*FriendAdd*](../interfaces/type_event.friendadd.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

好友添加

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.friend_add"`` |
| `fn` | (`e`: [*FriendAdd*](../interfaces/type_event.friendadd.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:227](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L227)

▸ **on**(`type`: ``"notice.group_recall"``, `fn`: (`e`: [*GroupRecall*](../interfaces/type_event.grouprecall.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群消息撤回

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_recall"`` |
| `fn` | (`e`: [*GroupRecall*](../interfaces/type_event.grouprecall.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:231](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L231)

▸ **on**(`type`: ``"notice.friend_recall"``, `fn`: (`e`: [*FriendRecall*](../interfaces/type_event.friendrecall.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

好友消息撤回

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.friend_recall"`` |
| `fn` | (`e`: [*FriendRecall*](../interfaces/type_event.friendrecall.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:235](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L235)

▸ **on**(`type`: ``"notice.notify"``, `fn`: (`e`: [*GroupNotify*](../interfaces/type_event.groupnotify.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群内提示事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.notify"`` |
| `fn` | (`e`: [*GroupNotify*](../interfaces/type_event.groupnotify.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:239](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L239)

▸ **on**(`type`: ``"notice.group_card"``, `fn`: (`e`: [*GroupCard*](../interfaces/type_event.groupcard.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

群成员名片更新

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_card"`` |
| `fn` | (`e`: [*GroupCard*](../interfaces/type_event.groupcard.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:243](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L243)

▸ **on**(`type`: ``"notice.offline_file"``, `fn`: (`e`: [*OfflineFile*](../interfaces/type_event.offlinefile.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

接收到离线文件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.offline_file"`` |
| `fn` | (`e`: [*OfflineFile*](../interfaces/type_event.offlinefile.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:247](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L247)

▸ **on**(`type`: ``"request.friend"``, `fn`: (`e`: [*Friend*](../interfaces/type_event.friend.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

加好友请求

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"request.friend"`` |
| `fn` | (`e`: [*Friend*](../interfaces/type_event.friend.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:251](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L251)

▸ **on**(`type`: ``"request.group"``, `fn`: (`e`: [*Group*](../interfaces/type_event.group.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

加群请求/邀请

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"request.group"`` |
| `fn` | (`e`: [*Group*](../interfaces/type_event.group.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:255](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L255)

▸ **on**(`type`: ``"notice.client_status"``, `fn`: (`e`: [*ClientStatus*](../interfaces/type_event.clientstatus.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

其他客户端在线状态变更

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.client_status"`` |
| `fn` | (`e`: [*ClientStatus*](../interfaces/type_event.clientstatus.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:259](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L259)

▸ **on**(`type`: ``"notice.essence"``, `fn`: (`e`: [*Essence*](../interfaces/type_event.essence.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

精华消息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.essence"`` |
| `fn` | (`e`: [*Essence*](../interfaces/type_event.essence.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:263](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L263)

▸ **on**(`type`: ``"meta_event.heartbeat"``, `fn`: (`e?`: *any*) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

心跳事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"meta_event.heartbeat"`` |
| `fn` | (`e?`: *any*) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:267](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L267)

▸ **on**(`type`: *string*, `fn`: (`e`: *any*) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](bot_modules_event.event.md)

其它事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | *string* |
| `fn` | (`e`: *any*) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:271](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L271)

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

Defined in: [Bot/modules/Event.ts:280](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L280)

▸ **onSendMessage**(`type`: ``"sendGroupMsg"``, `fn`: (`group_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void*): [*Event*](bot_modules_event.event.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"sendGroupMsg"`` |
| `fn` | (`group_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void* |

**Returns:** [*Event*](bot_modules_event.event.md)

Defined in: [Bot/modules/Event.ts:281](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Bot/modules/Event.ts#L281)
