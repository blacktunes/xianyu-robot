## 简介
**咸鱼Bot**是运行于[Node.js](https://nodejs.org/)，使用[TypeScript](https://www.typescriptlang.org/)编写的自用**HTTP API**框架。

因为并没有人使用所以更新比较随心所欲，经过多次重写，现在已是较为完善(自认为)的Bot框架。

## 快速开始
运行**咸鱼Bot**需要**Node.js**环境，和**HTTP API**客户端，请先安装。

::: warning 注意事项
- **咸鱼Bot**的API与事件根据[go-http](https://github.com/Mrs4s/go-cqhttp)编写，与其它的**HTTP API**客户端不一定兼容，所以不推荐使用其它**HTTP API**客户端。
- 目前仅支持websocket链接。
:::

### 安装
```sh
npm install xianyu-robot
# yarn add xianyu-robot
```

### 使用
> 推荐使用**TypeScript**开发
```ts
import App from 'xianyu-robot'

const app = new App()
app.start()
```

## App
除`start`和`command`方法外，其它方法可连续调用，如：
```ts
app
  .admin(10001)
  .plugin(PluginA)
  .plugin(PluginB)
  .plugin(PluginC)
  .start()
```

### 设置管理员
```ts
app.admin(10001)
```

### 添加群号黑/白名单
设置后插件和命令将会对列表中的群号无效/有效，黑名单和白名单不能同时使用，否则将会报错。
```ts
app.black([10001])
// app.white([10001])
```

### init
添加bot链接成功后会立刻执行的方法
```ts
app.init(bot => {
  console.log('运行init方法')
})
```

### 载入插件
```ts
app.plugin(PluginName, PluginOption)
```

### start
启动方法，请在最后调用
该方法有4个参数，均为可选属性，分别为：
- WS设置
- 是否开启debug（开启后所有API方法将不会真正调用）
- 指定ID不显示消息日志（若为`true`则不显示所有消息日志）
- 指定ID不使用内置指令
以下为默认属性
```ts
app.start({
  wss: false, // 是否使用wss
  accessToken: '', // API的访问token
  host: '127.0.0.1', // 客户端地址
  port: 6700, // 客服端端口
  reconnection: true, // 是否连线错误时自动重连
  reconnectionAttempts: 1000, // 连续连线失败的次数不超过这个值
  reconnectionDelay: 1000 // 重复连线的延迟时间, 单位: ms
}, false, false, [])

```
该方法为异步函数，可使用`then`在Bot完全启动后执行某方法
```ts
app.start()
  .then(bot => {
    console.log('Bot已启动')
  })
```

### 加载命令
```ts
app.command('tst')
  .action('group', e => {
    console.log('触发指令')
  })
```