# Event

该类有三个属性：
- groupList: 用于消息日志的群名缓存
- updateGroupsList： 更新群名缓存
- on： 监听消息

通常情况下你只需要使用`on`方法，该方法用于监听指定类型的消息，如创建群消息监听：
```ts
this.Bot.Event.on('message.group', e => {
  console.log('收到一条群消息')
})
```
::: tip 执行顺序
监听器具会根据创建顺序依次执行，可通过返回`true`拦截消息传递
:::

消息类型和相应如下：

## websocket初始化完成
**type**: `ws.ready`

websocket初次连接成功后触发，该事件用于内部初始化，只会触发一次，请勿使用

## websocket连接成功
**type**: `ws.connect`

websocket连接成功后触发

## websocket连接断开
**type**: `ws.connect`

websocket连接断开后触发

## websocket连接错误
**type**: `ws.error`

**响应**：`Error`

websocket连接发生错误后触发

## 私聊信息
**type**: `message.private`

## 群消息
**type**: `message.group`

## 群消息撤回
**type**: `notice.group_recall`

## 好友消息撤回
**type**: `notice.friend_recall`

## 群内提示事件
**type**: `notice.notify`

龙王等事件

## 群管理员变动
**type**: `notice.group_admin`

## 群成员减少
**type**: `notice.group_decrease`

## 群成员增加
**type**: `notice.group_increase`

## 群禁言
**type**: `notice.group_ban`

## 群文件上传
**type**: `notice.group_upload`

## 群成员名片更新
**type**: `notice.group_card`

## 加好友请求
**type**: `request.friend`

## 加群请求/邀请
**type**: `request.group`

## 心跳事件
**type**: `meta_event.heartbeat`

## 列表外事件
**type**: `other`