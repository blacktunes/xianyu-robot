[xianyu-robot](../README.md) / [Exports](../modules.md) / [Type/Bot](../modules/type_bot.md) / WebSocketConfig

# Interface: WebSocketConfig

[Type/Bot](../modules/type_bot.md).WebSocketConfig

## Table of contents

### Properties

- [accessToken](type_bot.websocketconfig.md#accesstoken)
- [host](type_bot.websocketconfig.md#host)
- [port](type_bot.websocketconfig.md#port)
- [reconnection](type_bot.websocketconfig.md#reconnection)
- [reconnectionAttempts](type_bot.websocketconfig.md#reconnectionattempts)
- [reconnectionDelay](type_bot.websocketconfig.md#reconnectiondelay)
- [timeout](type_bot.websocketconfig.md#timeout)
- [wss](type_bot.websocketconfig.md#wss)

## Properties

### accessToken

• `Optional` **accessToken**: *string*

API访问token

Defined in: Type/Bot.ts:33

___

### host

• `Optional` **host**: *string*

Defined in: Type/Bot.ts:34

___

### port

• `Optional` **port**: *number*

Defined in: Type/Bot.ts:35

___

### reconnection

• `Optional` **reconnection**: *boolean*

是否连线错误时自动重连

Defined in: Type/Bot.ts:39

___

### reconnectionAttempts

• `Optional` **reconnectionAttempts**: *number*

连续连线失败的次数不超过这个值

Defined in: Type/Bot.ts:43

___

### reconnectionDelay

• `Optional` **reconnectionDelay**: *number*

重复连线的延迟时间, 单位: ms

Defined in: Type/Bot.ts:47

___

### timeout

• `Optional` **timeout**: *number*

API超时时间, 单位: ms

Defined in: Type/Bot.ts:51

___

### wss

• `Optional` **wss**: *boolean*

Defined in: Type/Bot.ts:29
