# xianyu-robot

~~酷Q端需要安装[coolq-http-api](https://github.com/richardchien/coolq-http-api)插件~~
因酷Q已停运，请改用[cqhttp-mirai](https://github.com/yyuueexxiinngg/cqhttp-mirai)
**可能会改用mirai-go，会面临下一次大改**

#### npm
```
npm install -S xianyu-robot
```

#### 使用方法
``` ts
// TypeScript
import App from 'xianyu-robot'

const app = new App()

app.start()

// JavaScript
const App = require('xianyu-robot').default

const app = new App()

app.start()
```

构造函数可以添加多个参数

```js
config: {
  name: string // 机器人名称
  token: string // coolq-http-api的accessToken
  host: string // coolq-http-api的地址
  port: number // coolq-http-api的端口
}

debug: boolean = false // 是否启用debug，debug模式下所有API不会实际调用

dirname: string = __dirname // 本地配置保存目录，会保存在目录下的config文件夹

nolisten: boolean = false // 是否不监听bot收到的消息
```
使用`admin`可以设置管理员，可用于指定只有管理员可用的指令和接收通知，请在载入插件和`start`前调用
```js
// 设置管理员，用于接收管理员消息
// qq 管理员Q号
// id 群组ID
app.admin(qq, id)
```

可以使用`init`和`plugin`方法载入插件，请在`start`之前载入，否则会报错

```js
// plugin方法载入的函数会插入到讨论组和群组消息处理函数中
app.plugin(Plugin)

// 载入多个插件可以见写成以下形式
app
  .plugin(Plugin1)
  .plugin(Plugin2)
  .plugin(Plugin3)
```

插件为类的形式，请继承`BotPlugin`编写

也可不使用插件直接使用方法处理消息
使用`message`方法会在接收到消息时触发
```ts
app.message((from: number, fromQQ: number, msg: string, msgId: number) => {
  // function
})
```
使用`init`方法将会在bot链接成功后触发
```ts
app.init(() => {
  // function
})
```

本项目参考自[node-cq-robot](https://github.com/CaoMeiYouRen/node-cq-robot)