[xianyu-robot](../README.md) / [Exports](../modules.md) / [Connect/Connect](../modules/connect_connect.md) / Connect

# Class: Connect

[Connect/Connect](../modules/connect_connect.md).Connect

## Table of contents

### Constructors

- [constructor](connect_connect.connect.md#constructor)

### Properties

- [APIList](connect_connect.connect.md#apilist)
- [\_messageID](connect_connect.connect.md#_messageid)
- [accessToken](connect_connect.connect.md#accesstoken)
- [blacklist](connect_connect.connect.md#blacklist)
- [client](connect_connect.connect.md#client)
- [closeEventList](connect_connect.connect.md#closeeventlist)
- [connEventList](connect_connect.connect.md#conneventlist)
- [connectTimes](connect_connect.connect.md#connecttimes)
- [errorEventList](connect_connect.connect.md#erroreventlist)
- [host](connect_connect.connect.md#host)
- [messageEventList](connect_connect.connect.md#messageeventlist)
- [messageLogEvent](connect_connect.connect.md#messagelogevent)
- [nextMessageEventList](connect_connect.connect.md#nextmessageeventlist)
- [nextMessageID](connect_connect.connect.md#nextmessageid)
- [port](connect_connect.connect.md#port)
- [ready](connect_connect.connect.md#ready)
- [reconnection](connect_connect.connect.md#reconnection)
- [reconnectionAttempts](connect_connect.connect.md#reconnectionattempts)
- [reconnectionDelay](connect_connect.connect.md#reconnectiondelay)
- [whitelist](connect_connect.connect.md#whitelist)
- [wss](connect_connect.connect.md#wss)

### Accessors

- [messageID](connect_connect.connect.md#messageid)

### Methods

- [addEvent](connect_connect.connect.md#addevent)
- [connect](connect_connect.connect.md#connect)
- [getEventNum](connect_connect.connect.md#geteventnum)
- [getMessageNum](connect_connect.connect.md#getmessagenum)
- [getRes](connect_connect.connect.md#getres)
- [groupMsgTest](connect_connect.connect.md#groupmsgtest)
- [handleMessage](connect_connect.connect.md#handlemessage)
- [isConnect](connect_connect.connect.md#isconnect)
- [isSkip](connect_connect.connect.md#isskip)
- [privateMsgTest](connect_connect.connect.md#privatemsgtest)
- [setNextMessage](connect_connect.connect.md#setnextmessage)
- [useAPI](connect_connect.connect.md#useapi)

## Constructors

### constructor

\+ **new Connect**(`option?`: [*WebSocketConfig*](../interfaces/type_bot.websocketconfig.md)): [*Connect*](connect_connect.connect.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `option?` | [*WebSocketConfig*](../interfaces/type_bot.websocketconfig.md) |

**Returns:** [*Connect*](connect_connect.connect.md)

Defined in: [Connect/Connect.ts:17](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L17)

## Properties

### APIList

• `Private` **APIList**: *Map*<number, Function\>

Defined in: [Connect/Connect.ts:287](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L287)

___

### \_messageID

• `Private` **\_messageID**: *number*= 1

Defined in: [Connect/Connect.ts:39](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L39)

___

### accessToken

• `Private` **accessToken**: *string*= ''

Defined in: [Connect/Connect.ts:28](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L28)

___

### blacklist

• **blacklist**: *Set*<number\>

Defined in: [Connect/Connect.ts:46](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L46)

___

### client

• `Private` **client**: *any*

Defined in: [Connect/Connect.ts:186](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L186)

___

### closeEventList

• `Private` **closeEventList**: () => *void*[]= []

Defined in: [Connect/Connect.ts:189](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L189)

___

### connEventList

• `Private` **connEventList**: () => *void*[]= []

Defined in: [Connect/Connect.ts:187](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L187)

___

### connectTimes

• `Private` **connectTimes**: *number*= 0

Defined in: [Connect/Connect.ts:38](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L38)

___

### errorEventList

• `Private` **errorEventList**: (`error`: Error) => *void*[]= []

Defined in: [Connect/Connect.ts:188](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L188)

___

### host

• `Private` **host**: *string*= '127.0.0.1'

Defined in: [Connect/Connect.ts:29](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L29)

___

### messageEventList

• `Private` **messageEventList**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `message` | MessageEvent[] |
| `meta_event` | MessageEvent[] |
| `notice` | MessageEvent[] |
| `other` | MessageEvent[] |
| `request` | MessageEvent[] |

Defined in: [Connect/Connect.ts:190](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L190)

___

### messageLogEvent

• `Private` **messageLogEvent**: MessageEvent[]= []

Defined in: [Connect/Connect.ts:203](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L203)

___

### nextMessageEventList

• `Private` **nextMessageEventList**: *object*= {}

#### Type declaration:

Defined in: [Connect/Connect.ts:204](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L204)

___

### nextMessageID

• `Private` **nextMessageID**: *number*= 1

Defined in: [Connect/Connect.ts:43](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L43)

___

### port

• `Private` **port**: *number*= 6700

Defined in: [Connect/Connect.ts:30](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L30)

___

### ready

• `Private` **ready**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [Connect/Connect.ts:36](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L36)

Defined in: [Connect/Connect.ts:36](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L36)

___

### reconnection

• `Private` **reconnection**: *boolean*= true

Defined in: [Connect/Connect.ts:31](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L31)

___

### reconnectionAttempts

• `Private` **reconnectionAttempts**: *number*= 1000

Defined in: [Connect/Connect.ts:32](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L32)

___

### reconnectionDelay

• `Private` **reconnectionDelay**: *number*= 1000

Defined in: [Connect/Connect.ts:33](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L33)

___

### whitelist

• **whitelist**: *Set*<number\>

Defined in: [Connect/Connect.ts:45](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L45)

___

### wss

• `Private` **wss**: *boolean*= false

Defined in: [Connect/Connect.ts:27](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L27)

## Accessors

### messageID

• `Private`get **messageID**(): *number*

**Returns:** *number*

Defined in: [Connect/Connect.ts:40](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L40)

## Methods

### addEvent

▸ **addEvent**(`type`: *string*, `fn`: (`e?`: *any*) => [*Prevent*](../modules/type_bot.md#prevent), `log?`: *boolean*): [*Connect*](connect_connect.connect.md)

增加事件监听
message消息的log参数true时有最高优先度，同时用于控制被Ban拦截
推荐使用Event类中的方法

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | *string* |
| `fn` | (`e?`: *any*) => [*Prevent*](../modules/type_bot.md#prevent) |
| `log?` | *boolean* |

**Returns:** [*Connect*](connect_connect.connect.md)

Defined in: [Connect/Connect.ts:213](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L213)

___

### connect

▸ `Private`**connect**(): *void*

**Returns:** *void*

Defined in: [Connect/Connect.ts:98](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L98)

___

### getEventNum

▸ **getEventNum**(): *number*

获取消息监听器数量

**Returns:** *number*

Defined in: [Connect/Connect.ts:283](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L283)

___

### getMessageNum

▸ **getMessageNum**(): *number*

获取队列中未完成的消息数量

**Returns:** *number*

Defined in: [Connect/Connect.ts:291](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L291)

___

### getRes

▸ `Private`**getRes**(`id`: *number*): *Promise*<[*ApiRes*](../interfaces/type_bot.apires.md)\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** *Promise*<[*ApiRes*](../interfaces/type_bot.apires.md)\>

Defined in: [Connect/Connect.ts:258](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L258)

___

### groupMsgTest

▸ **groupMsgTest**(`msg`: *string*, `user_id?`: *number*, `group_id?`: *number*): *Promise*<void\>

可以用于群消息相功能的简单测试

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `msg` | *string* | - |
| `user_id` | *number* | 1 |
| `group_id` | *number* | 1 |

**Returns:** *Promise*<void\>

Defined in: [Connect/Connect.ts:332](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L332)

___

### handleMessage

▸ `Private`**handleMessage**(`data`: *any*): *Promise*<void\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | *any* |

**Returns:** *Promise*<void\>

Defined in: [Connect/Connect.ts:66](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L66)

___

### isConnect

▸ **isConnect**(): *boolean*

WebSocket收否已经连接

**Returns:** *boolean*

Defined in: [Connect/Connect.ts:321](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L321)

___

### isSkip

▸ `Private`**isSkip**(`group_id`: *number*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `group_id` | *number* |

**Returns:** *boolean*

Defined in: [Connect/Connect.ts:94](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L94)

___

### privateMsgTest

▸ **privateMsgTest**(`msg`: *string*, `user_id?`: *number*): *Promise*<void\>

可以用于私聊消息相功能的简单测试

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `msg` | *string* | - |
| `user_id` | *number* | 1 |

**Returns:** *Promise*<void\>

Defined in: [Connect/Connect.ts:365](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L365)

___

### setNextMessage

▸ `Private`**setNextMessage**(`data`: [*GroupMsg*](../modules/type_event.md#groupmsg) \| [*PrivateMsg*](../modules/type_event.md#privatemsg), `event`: MessageEvent \| NextMessageEvent): *function*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | [*GroupMsg*](../modules/type_event.md#groupmsg) \| [*PrivateMsg*](../modules/type_event.md#privatemsg) |
| `event` | MessageEvent \| NextMessageEvent |

**Returns:** (`fn`: (`msg`: *string*, `event`: *any*, `prevEvent`: *any*) => [*Prevent*](../modules/type_bot.md#prevent)) => *void*

Defined in: [Connect/Connect.ts:48](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L48)

___

### useAPI

▸ **useAPI**(`apiName`: *string*, `params?`: *any*, `errorLog?`: *boolean*): *Promise*<[*ApiRes*](../interfaces/type_bot.apires.md)\>

使用HTTP API
推荐使用API类中的方法

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `apiName` | *string* | - |
| `params?` | *any* | - |
| `errorLog` | *boolean* | true |

**Returns:** *Promise*<[*ApiRes*](../interfaces/type_bot.apires.md)\>

Defined in: [Connect/Connect.ts:299](https://github.com/blacktunes/xianyu-robot/blob/ba6672b/src/Connect/Connect.ts#L299)
