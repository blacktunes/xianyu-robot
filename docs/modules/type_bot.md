[xianyu-robot](../README.md) / [Exports](../modules.md) / Type/Bot

# Module: Type/Bot

## Table of contents

### Interfaces

- [AnonymousPlugin](../interfaces/type_bot.anonymousplugin.md)
- [ApiRes](../interfaces/type_bot.apires.md)
- [Plugin](../interfaces/type_bot.plugin.md)
- [PluginConfig](../interfaces/type_bot.pluginconfig.md)
- [WebSocketConfig](../interfaces/type_bot.websocketconfig.md)

### Type aliases

- [PluginFunction](type_bot.md#pluginfunction)
- [Prevent](type_bot.md#prevent)

## Type aliases

### PluginFunction

Ƭ **PluginFunction**: (`bot`: [*Bot*](../classes/bot_bot.bot.md)) => *void* \| *Promise*<void\>

#### Type declaration:

▸ (`bot`: [*Bot*](../classes/bot_bot.bot.md)): *void* \| *Promise*<void\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `bot` | [*Bot*](../classes/bot_bot.bot.md) |

**Returns:** *void* \| *Promise*<void\>

Defined in: [Type/Bot.ts:21](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Bot.ts#L21)

___

### Prevent

Ƭ **Prevent**: *Promise*<boolean \| void\> \| *boolean* \| *void*

是否阻止消息传递
true为阻止

Defined in: [Type/Bot.ts:8](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Type/Bot.ts#L8)
