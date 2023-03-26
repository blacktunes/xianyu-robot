[xianyu-robot](../README.md) / [Exports](../modules.md) / [Plugin/Event](../modules/plugin_event.md) / Event

# Class: Event

[Plugin/Event](../modules/plugin_event.md).Event

## Table of contents

### Constructors

- [constructor](plugin_event.event.md#constructor)

### Methods

- [on](plugin_event.event.md#on)
- [onSendMessage](plugin_event.event.md#onsendmessage)

## Constructors

### constructor

\+ **new Event**(`group`: *string*, `Bot`: [*Bot*](bot_bot.bot.md)): [*Event*](plugin_event.event.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group` | *string* |
| `Bot` | [*Bot*](bot_bot.bot.md) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:3](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L3)

## Methods

### on

▸ **on**(`type`: ``"ws.ready"`` \| ``"ws.close"`` \| ``"ws.connect"``, `fn`: () => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

WS链接或断开

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"ws.ready"`` \| ``"ws.close"`` \| ``"ws.connect"`` |
| `fn` | () => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:9](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L9)

▸ **on**(`type`: ``"ws.error"``, `fn`: (`error`: Error) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

WS链接错误

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"ws.error"`` |
| `fn` | (`error`: Error) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:13](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L13)

▸ **on**(`type`: ``"message.private"``, `fn`: (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent), `log?`: *boolean*): [*Event*](plugin_event.event.md)

私聊信息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"message.private"`` |
| `fn` | (`e`: [*PrivateMsg*](../modules/type_event.md#privatemsg)) => [*Prevent*](../modules/type_bot.md#prevent) |
| `log?` | *boolean* |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:17](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L17)

▸ **on**(`type`: ``"message.group"``, `fn`: (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent), `log?`: *boolean*): [*Event*](plugin_event.event.md)

群消息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"message.group"`` |
| `fn` | (`e`: [*GroupMsg*](../modules/type_event.md#groupmsg)) => [*Prevent*](../modules/type_bot.md#prevent) |
| `log?` | *boolean* |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:21](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L21)

▸ **on**(`type`: ``"notice.group_upload"``, `fn`: (`e`: [*GroupUpload*](../interfaces/type_event.groupupload.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

群文件上传

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_upload"`` |
| `fn` | (`e`: [*GroupUpload*](../interfaces/type_event.groupupload.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:25](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L25)

▸ **on**(`type`: ``"notice.group_admin"``, `fn`: (`e`: [*GroupAdmin*](../interfaces/type_event.groupadmin.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

群管理员变动

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_admin"`` |
| `fn` | (`e`: [*GroupAdmin*](../interfaces/type_event.groupadmin.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:29](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L29)

▸ **on**(`type`: ``"notice.group_decrease"``, `fn`: (`e`: [*GroupDecrease*](../interfaces/type_event.groupdecrease.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

群成员减少

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_decrease"`` |
| `fn` | (`e`: [*GroupDecrease*](../interfaces/type_event.groupdecrease.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:33](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L33)

▸ **on**(`type`: ``"notice.group_increase"``, `fn`: (`e`: [*GroupIncrease*](../interfaces/type_event.groupincrease.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

群成员增加

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_increase"`` |
| `fn` | (`e`: [*GroupIncrease*](../interfaces/type_event.groupincrease.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:37](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L37)

▸ **on**(`type`: ``"notice.group_ban"``, `fn`: (`e`: [*GroupBan*](../interfaces/type_event.groupban.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

群禁言

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_ban"`` |
| `fn` | (`e`: [*GroupBan*](../interfaces/type_event.groupban.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:41](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L41)

▸ **on**(`type`: ``"notice.friend_add"``, `fn`: (`e`: [*FriendAdd*](../interfaces/type_event.friendadd.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

好友添加

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.friend_add"`` |
| `fn` | (`e`: [*FriendAdd*](../interfaces/type_event.friendadd.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:45](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L45)

▸ **on**(`type`: ``"notice.group_recall"``, `fn`: (`e`: [*GroupRecall*](../interfaces/type_event.grouprecall.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

群消息撤回

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_recall"`` |
| `fn` | (`e`: [*GroupRecall*](../interfaces/type_event.grouprecall.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:49](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L49)

▸ **on**(`type`: ``"notice.friend_recall"``, `fn`: (`e`: [*FriendRecall*](../interfaces/type_event.friendrecall.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

好友消息撤回

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.friend_recall"`` |
| `fn` | (`e`: [*FriendRecall*](../interfaces/type_event.friendrecall.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:53](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L53)

▸ **on**(`type`: ``"notice.notify"``, `fn`: (`e`: [*GroupNotify*](../interfaces/type_event.groupnotify.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

群内提示事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.notify"`` |
| `fn` | (`e`: [*GroupNotify*](../interfaces/type_event.groupnotify.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:57](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L57)

▸ **on**(`type`: ``"notice.group_card"``, `fn`: (`e`: [*GroupCard*](../interfaces/type_event.groupcard.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

群成员名片更新

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.group_card"`` |
| `fn` | (`e`: [*GroupCard*](../interfaces/type_event.groupcard.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:61](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L61)

▸ **on**(`type`: ``"notice.offline_file"``, `fn`: (`e`: [*OfflineFile*](../interfaces/type_event.offlinefile.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

接收到离线文件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.offline_file"`` |
| `fn` | (`e`: [*OfflineFile*](../interfaces/type_event.offlinefile.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:65](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L65)

▸ **on**(`type`: ``"request.friend"``, `fn`: (`e`: [*Friend*](../interfaces/type_event.friend.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

加好友请求

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"request.friend"`` |
| `fn` | (`e`: [*Friend*](../interfaces/type_event.friend.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:69](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L69)

▸ **on**(`type`: ``"request.group"``, `fn`: (`e`: [*Group*](../interfaces/type_event.group.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

加群请求/邀请

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"request.group"`` |
| `fn` | (`e`: [*Group*](../interfaces/type_event.group.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:73](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L73)

▸ **on**(`type`: ``"notice.client_status"``, `fn`: (`e`: [*ClientStatus*](../interfaces/type_event.clientstatus.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

其他客户端在线状态变更

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.client_status"`` |
| `fn` | (`e`: [*ClientStatus*](../interfaces/type_event.clientstatus.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:77](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L77)

▸ **on**(`type`: ``"notice.essence"``, `fn`: (`e`: [*Essence*](../interfaces/type_event.essence.md)) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

精华消息

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"notice.essence"`` |
| `fn` | (`e`: [*Essence*](../interfaces/type_event.essence.md)) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:81](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L81)

▸ **on**(`type`: ``"meta_event.heartbeat"``, `fn`: (`e?`: *any*) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

心跳事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"meta_event.heartbeat"`` |
| `fn` | (`e?`: *any*) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:85](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L85)

▸ **on**(`type`: *string*, `fn`: (`e`: *any*) => [*Prevent*](../modules/type_bot.md#prevent)): [*Event*](plugin_event.event.md)

其它事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | *string* |
| `fn` | (`e`: *any*) => [*Prevent*](../modules/type_bot.md#prevent) |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:89](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L89)

___

### onSendMessage

▸ **onSendMessage**(`type`: ``"sendPrivateMsg"``, `fn`: (`user_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void*): [*Event*](plugin_event.event.md)

发送消息完成事件

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"sendPrivateMsg"`` |
| `fn` | (`user_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void* |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:112](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L112)

▸ **onSendMessage**(`type`: ``"sendGroupMsg"``, `fn`: (`group_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void*): [*Event*](plugin_event.event.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"sendGroupMsg"`` |
| `fn` | (`group_id`: *number*, `message`: [*Message*](../modules/type_message.md#message)) => *void* |

**Returns:** [*Event*](plugin_event.event.md)

Defined in: [Plugin/Event.ts:113](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Plugin/Event.ts#L113)
