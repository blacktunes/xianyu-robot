[xianyu-robot](../README.md) / [Exports](../modules.md) / [Tools/CQCode](../modules/tools_cqcode.md) / CQCODE

# Class: CQCODE

[Tools/CQCode](../modules/tools_cqcode.md).CQCODE

CQ码

## Table of contents

### Constructors

- [constructor](tools_cqcode.cqcode.md#constructor)

### Methods

- [at](tools_cqcode.cqcode.md#at)
- [cardimage](tools_cqcode.cqcode.md#cardimage)
- [customMusic](tools_cqcode.cqcode.md#custommusic)
- [customNode](tools_cqcode.cqcode.md#customnode)
- [customReply](tools_cqcode.cqcode.md#customreply)
- [face](tools_cqcode.cqcode.md#face)
- [forward](tools_cqcode.cqcode.md#forward)
- [gift](tools_cqcode.cqcode.md#gift)
- [image](tools_cqcode.cqcode.md#image)
- [json](tools_cqcode.cqcode.md#json)
- [music](tools_cqcode.cqcode.md#music)
- [node](tools_cqcode.cqcode.md#node)
- [poke](tools_cqcode.cqcode.md#poke)
- [record](tools_cqcode.cqcode.md#record)
- [redbag](tools_cqcode.cqcode.md#redbag)
- [reply](tools_cqcode.cqcode.md#reply)
- [share](tools_cqcode.cqcode.md#share)
- [tts](tools_cqcode.cqcode.md#tts)
- [video](tools_cqcode.cqcode.md#video)
- [xml](tools_cqcode.cqcode.md#xml)

## Constructors

### constructor

\+ **new CQCODE**(): [*CQCODE*](tools_cqcode.cqcode.md)

**Returns:** [*CQCODE*](tools_cqcode.cqcode.md)

## Methods

### at

▸ **at**(`qqId`: *number*, `isNoSpace?`: *boolean*): *string*

**`某人(at)`** 

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `qqId` | *number* | - | -1 为全体 |
| `isNoSpace` | *boolean* | false | 默认为假 At后添加空格，可使At更规范美观。如果不需要添加空格，请置本参数为true |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:44](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L44)

___

### cardimage

▸ **cardimage**(`file`: *string*, `minwidth?`: *number*, `minheight?`: *number*, `maxwidth?`: *number*, `maxheight?`: *number*, `source?`: *string*, `icon?`: *string*): *string*

xml大图

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `file` | *string* | - | 和image的file字段对齐，支持也是一样的 |
| `minwidth` | *number* | 400 | 默认不填为400，最小width |
| `minheight` | *number* | 400 | 默认不填为400，最小height |
| `maxwidth` | *number* | 500 | 默认不填为500，最大width |
| `maxheight` | *number* | 1000 | 默认不填为1000，最大height |
| `source` | *string* | '' | 分享来源的名称，可以留空 |
| `icon` | *string* | '' | 分享来源的icon图标url，可以留空 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:224](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L224)

___

### customMusic

▸ **customMusic**(`url`: *string*, `audio`: *string*, `title`: *string*, `content?`: *string*, `image?`: *string*): *string*

音乐自定义分享

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | 点击后跳转目标 URL |
| `audio` | *string* | 音乐 URL |
| `title` | *string* | 标题 |
| `content?` | *string* | 发送时可选, 内容描述 |
| `image?` | *string* | 发送时可选, 图片 URL |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:76](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L76)

___

### customNode

▸ **customNode**(`name`: *string*, `uin`: *number*, `content`: [*Message*](../modules/type_message.md#message)): [*NodeMessage*](../interfaces/type_message.nodemessage.md)

自定义合并转发消息节点
需要使用单独的API /send_group_forward_msg 发送，并且由于消息段较为复杂，仅支持Array形式入参。

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | *string* | 发送者显示名字 |
| `uin` | *number* | 发送者QQ号 |
| `content` | [*Message*](../modules/type_message.md#message) | 具体消息 |

**Returns:** [*NodeMessage*](../interfaces/type_message.nodemessage.md)

Defined in: [Tools/CQCode.ts:186](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L186)

___

### customReply

▸ **customReply**(`text`: *string*, `qq`: *number*, `time?`: *number*, `seq?`: *number*): *string*

自定义回复

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | *string* | 自定义回复的信息 |
| `qq` | *number* | 自定义回复时的自定义QQ |
| `time?` | *number* | 自定义回复时的时间, 格式为Unix时间 |
| `seq?` | *number* | 起始消息序号, 可通过 get_msg 获得 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:113](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L113)

___

### face

▸ **face**(`id`: *number*): *string*

QQ表情
https://github.com/kyubotics/coolq-http-api/wiki/%E8%A1%A8%E6%83%85-CQ-%E7%A0%81-ID-%E8%A1%A8

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | *number* | 表情id |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:13](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L13)

___

### forward

▸ **forward**(`id`: *number*): *string*

合并转发

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | *number* | 合并转发ID, 需要通过 /get_forward_msg API获取转发的具体内容 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:161](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L161)

___

### gift

▸ **gift**(`qq`: *number*, `id`: ``0`` \| ``1`` \| ``2`` \| ``3`` \| ``4`` \| ``5`` \| ``6`` \| ``7`` \| ``8`` \| ``9`` \| ``10`` \| ``11`` \| ``12`` \| ``13``): *string*

发送礼物
仅支持免费礼物,发送群礼物消息无法撤回

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `qq` | *number* | 接收礼物的成员 |
| `id` | ``0`` \| ``1`` \| ``2`` \| ``3`` \| ``4`` \| ``5`` \| ``6`` \| ``7`` \| ``8`` \| ``9`` \| ``10`` \| ``11`` \| ``12`` \| ``13`` | 礼物的类型 0 甜Wink 1 快乐肥宅水 2 幸运手链 3 卡布奇诺 4 猫咪手表 5 绒绒手套 6 彩虹糖果 7 坚强 8 告白话筒 9 牵你的手 10 可爱猫咪 11 神秘面具 12 我超忙的 13 爱心口罩 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:153](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L153)

___

### image

▸ **image**(`file`: *string*, `cache?`: ``0`` \| ``1``, `type?`: ``"flash"`` \| ``"show"``, `id?`: ``40000`` \| ``40001`` \| ``40002`` \| ``40003`` \| ``40004`` \| ``40005``, `c?`: ``2`` \| ``3``): *string*

图片

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `file` | *string* | - | 图片文件名或URL |
| `cache` | ``0`` \| ``1`` | 1 | 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 1 |
| `type?` | ``"flash"`` \| ``"show"`` | - | 图片类型，flash 表示闪照，show 表示秀图，默认普通图片 |
| `id` | ``40000`` \| ``40001`` \| ``40002`` \| ``40003`` \| ``40004`` \| ``40005`` | 40000 | 发送秀图时的特效id，默认为40000 |
| `c?` | ``2`` \| ``3`` | - | 通过网络下载图片时的线程数, 默认单线程. (在资源不支持并发时会自动处理) |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:88](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L88)

___

### json

▸ **json**(`data`: *string*, `resid?`: *number*): *string*

发送json卡片

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | *string* | - | json内容，json的所有字符串记得实体化处理 |
| `resid` | *number* | 0 | 默认不填为0, 走小程序通道, 填了走富文本通道发送 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:210](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L210)

___

### music

▸ **music**(`type`: ``"qq"`` \| ``"163"``, `id`: *number*): *string*

音乐分享

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"qq"`` \| ``"163"`` | 分别表示使用 QQ 音乐、网易云音乐、虾米音乐 |
| `id` | *number* | 歌曲 ID |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:64](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L64)

___

### node

▸ **node**(`id`: *number*): [*NodeMessage*](../interfaces/type_message.nodemessage.md)

合并转发消息节点
需要使用单独的API /send_group_forward_msg 发送，并且由于消息段较为复杂，仅支持Array形式入参。

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | *number* | 转发消息id |

**Returns:** [*NodeMessage*](../interfaces/type_message.nodemessage.md)

Defined in: [Tools/CQCode.ts:170](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L170)

___

### poke

▸ **poke**(`qq`: *number*): *string*

戳一戳(仅群聊)

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `qq` | *number* | 需要戳的成员 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:129](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L129)

___

### record

▸ **record**(`file`: *string*, `magic?`: ``0`` \| ``1``, `cache?`: ``0`` \| ``1``, `proxy?`: ``0`` \| ``1``, `timeout?`: *number*): *string*

语音

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `file` | *string* | - | 语音文件名 |
| `magic` | ``0`` \| ``1`` | 0 | 发送时可选, 默认 0, 设置为 1 表示变声 |
| `cache` | ``0`` \| ``1`` | 1 | 只在通过网络 URL 发送时有效, 表示是否使用已缓存的文件, 默认 1 |
| `proxy` | ``0`` \| ``1`` | 1 | 只在通过网络 URL 发送时有效, 表示是否通过代理下载文件 ( 需通过环境变量或配置文件配置代理 ) , 默认 1 |
| `timeout?` | *number* | - | 只在通过网络 URL 发送时有效, 单位秒, 表示下载网络文件的超时时间 , 默认不超时 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:25](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L25)

___

### redbag

▸ **redbag**(`title`: *string*): *string*

红包

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | *string* | 祝福语/口令 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:121](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L121)

___

### reply

▸ **reply**(`id`: *number*): *string*

回复

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | *number* | 回复时所引用的消息id, 必须为本群消息. |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:102](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L102)

___

### share

▸ **share**(`url`: *string*, `title?`: *string*, `content?`: *string*, `image?`: *string*): *string*

链接分享

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | *string* | - | 分享的链接 |
| `title` | *string* | '' | 分享的标题 |
| `content?` | *string* | - | 分享的简介 |
| `image?` | *string* | - | 分享的图片链接 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:55](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L55)

___

### tts

▸ **tts**(`text`: *string*): *string*

文本转语音
通过TX的TTS接口，采用的音源与登录账号的性别有关

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | *string* | 内容 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:233](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L233)

___

### video

▸ **video**(`file`: *string*, `cover?`: *string*, `c?`: ``2`` \| ``3``): *string*

短视频

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | *string* | 视频地址, 支持http和file发送 |
| `cover?` | *string* | 视频封面, 支持http, file和base64发送, 格式必须为jpg |
| `c?` | ``2`` \| ``3`` | 通过网络下载视频时的线程数, 默认单线程. (在资源不支持并发时会自动处理) |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:35](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L35)

___

### xml

▸ **xml**(`data`: *string*): *string*

发送xml卡片

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | *string* | xml内容，xml中的value部分，记得实体化处理 |

**Returns:** *string*

Defined in: [Tools/CQCode.ts:201](https://github.com/blacktunes/xianyu-robot/blob/2c773a6/src/Tools/CQCode.ts#L201)
