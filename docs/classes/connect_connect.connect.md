[xianyu-robot](../README.md) / [Exports](../modules.md) / [Connect/Connect](../modules/connect_connect.md) / Connect

# Class: Connect

[Connect/Connect](../modules/connect_connect.md).Connect

## Table of contents

### Constructors

- [constructor](connect_connect.connect.md#constructor)

### Properties

- [APIList](connect_connect.connect.md#apilist)
- [Data](connect_connect.connect.md#data)
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
- [name](connect_connect.connect.md#name)
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
- [eventTest](connect_connect.connect.md#eventtest)
- [getEventNum](connect_connect.connect.md#geteventnum)
- [getMessageNum](connect_connect.connect.md#getmessagenum)
- [getRes](connect_connect.connect.md#getres)
- [handleMessage](connect_connect.connect.md#handlemessage)
- [isConnect](connect_connect.connect.md#isconnect)
- [isSkip](connect_connect.connect.md#isskip)
- [setNextMessage](connect_connect.connect.md#setnextmessage)
- [useAPI](connect_connect.connect.md#useapi)

## Constructors

### constructor

\+ **new Connect**(`data`: [*Data*](bot_modules_data.data.md), `config?`: [*WebSocketConfig*](../interfaces/type_bot.websocketconfig.md)): [*Connect*](connect_connect.connect.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | [*Data*](bot_modules_data.data.md) |
| `config?` | [*WebSocketConfig*](../interfaces/type_bot.websocketconfig.md) |

**Returns:** [*Connect*](connect_connect.connect.md)

Defined in: [Connect/Connect.ts:18](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L18)

## Properties

### APIList

• `Private` **APIList**: *Map*<number, { `fn`: Function ; `info`: *any*  }\>

Defined in: [Connect/Connect.ts:315](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L315)

___

### Data

• `Private` **Data**: [*Data*](bot_modules_data.data.md)

Defined in: [Connect/Connect.ts:30](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L30)

___

### \_messageID

• `Private` **\_messageID**: *number*= 1

Defined in: [Connect/Connect.ts:46](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L46)

___

### accessToken

• `Private` **accessToken**: *string*= ''

Defined in: [Connect/Connect.ts:35](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L35)

___

### blacklist

• **blacklist**: *object*= {}

黑名单

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group?` | *Set*<number\> |
| `user?` | *Set*<number\> |

Defined in: [Connect/Connect.ts:58](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L58)

___

### client

• `Private` **client**: *any*

Defined in: [Connect/Connect.ts:208](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L208)

___

### closeEventList

• `Private` **closeEventList**: () => *void*[]= []

Defined in: [Connect/Connect.ts:211](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L211)

___

### connEventList

• `Private` **connEventList**: () => *void*[]= []

Defined in: [Connect/Connect.ts:209](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L209)

___

### connectTimes

• `Private` **connectTimes**: *number*= 0

Defined in: [Connect/Connect.ts:45](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L45)

___

### errorEventList

• `Private` **errorEventList**: (`error`: Error) => *void*[]= []

Defined in: [Connect/Connect.ts:210](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L210)

___

### host

• `Private` **host**: *string*= '127.0.0.1'

Defined in: [Connect/Connect.ts:36](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L36)

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

Defined in: [Connect/Connect.ts:212](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L212)

___

### messageLogEvent

• `Private` **messageLogEvent**: MessageEvent[]= []

Defined in: [Connect/Connect.ts:225](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L225)

___

### name

• `Private` **name**: *string*= 'WS'

Defined in: [Connect/Connect.ts:32](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L32)

___

### nextMessageEventList

• `Private` **nextMessageEventList**: *object*= {}

#### Type declaration:

Defined in: [Connect/Connect.ts:226](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L226)

___

### nextMessageID

• `Private` **nextMessageID**: *number*= 1

Defined in: [Connect/Connect.ts:50](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L50)

___

### port

• `Private` **port**: *number*= 6700

Defined in: [Connect/Connect.ts:37](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L37)

___

### ready

• `Private` **ready**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [Connect/Connect.ts:43](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L43)

Defined in: [Connect/Connect.ts:43](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L43)

___

### reconnection

• `Private` **reconnection**: *boolean*= true

Defined in: [Connect/Connect.ts:38](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L38)

___

### reconnectionAttempts

• `Private` **reconnectionAttempts**: *number*= 1000

Defined in: [Connect/Connect.ts:39](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L39)

___

### reconnectionDelay

• `Private` **reconnectionDelay**: *number*= 1000

Defined in: [Connect/Connect.ts:40](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L40)

___

### whitelist

• **whitelist**: *object*= {}

白名单

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `group?` | *Set*<number\> |
| `user?` | *Set*<number\> |

Defined in: [Connect/Connect.ts:53](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L53)

___

### wss

• `Private` **wss**: *boolean*= false

Defined in: [Connect/Connect.ts:34](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L34)

## Accessors

### messageID

• `Private`get **messageID**(): *number*

**Returns:** *number*

Defined in: [Connect/Connect.ts:47](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L47)

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

Defined in: [Connect/Connect.ts:235](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L235)

___

### connect

▸ `Private`**connect**(): *void*

**Returns:** *void*

Defined in: [Connect/Connect.ts:118](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L118)

___

### eventTest

▸ **eventTest**(`data`: [*\_GroupMsg*](../interfaces/type_event._groupmsg.md) \| [*\_PrivateMsg*](../interfaces/type_event._privatemsg.md)): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | [*\_GroupMsg*](../interfaces/type_event._groupmsg.md) \| [*\_PrivateMsg*](../interfaces/type_event._privatemsg.md) |

**Returns:** *void*

Defined in: [Connect/Connect.ts:357](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L357)

___

### getEventNum

▸ **getEventNum**(): *number*

获取消息监听器数量

**Returns:** *number*

Defined in: [Connect/Connect.ts:311](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L311)

___

### getMessageNum

▸ **getMessageNum**(): *number*

获取队列中未完成的消息数量

**Returns:** *number*

Defined in: [Connect/Connect.ts:319](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L319)

___

### getRes

▸ `Private`**getRes**(`id`: *number*, `apiName`: *string*, `params?`: *any*): *Promise*<[*ApiRes*](../interfaces/type_bot.apires.md)\>

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | *number* | - |
| `apiName` | *string* | - |
| `params` | *any* | {} |

**Returns:** *Promise*<[*ApiRes*](../interfaces/type_bot.apires.md)\>

Defined in: [Connect/Connect.ts:280](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L280)

___

### handleMessage

▸ `Private`**handleMessage**(`data`: *any*): *Promise*<void\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | *any* |

**Returns:** *Promise*<void\>

Defined in: [Connect/Connect.ts:79](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L79)

___

### isConnect

▸ **isConnect**(): *boolean*

WebSocket收否已经连接

**Returns:** *boolean*

Defined in: [Connect/Connect.ts:349](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L349)

___

### isSkip

▸ `Private`**isSkip**(`type`: ``"private"`` \| ``"group"``, `id`: *number*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `type` | ``"private"`` \| ``"group"`` |
| `id` | *number* |

**Returns:** *boolean*

Defined in: [Connect/Connect.ts:112](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L112)

___

### setNextMessage

▸ `Private`**setNextMessage**(`data`: [*GroupMsg*](../modules/type_event.md#groupmsg) \| [*PrivateMsg*](../modules/type_event.md#privatemsg), `event`: MessageEvent \| NextMessageEvent): *function*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | [*GroupMsg*](../modules/type_event.md#groupmsg) \| [*PrivateMsg*](../modules/type_event.md#privatemsg) |
| `event` | MessageEvent \| NextMessageEvent |

**Returns:** (`fn`: (`msg`: *string*, `event`: *any*, `prevEvent`: *any*) => [*Prevent*](../modules/type_bot.md#prevent)) => *void*

Defined in: [Connect/Connect.ts:63](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L63)

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

Defined in: [Connect/Connect.ts:327](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Connect/Connect.ts#L327)
