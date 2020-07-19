# xianyu-robot

本项目基于[node-cq-robot](https://github.com/CaoMeiYouRen/node-cq-robot)
酷Q端需要安装[coolq-http-api](https://github.com/richardchien/coolq-http-api)插件

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

目前还在开发中，没有太多内置插件，可以添加对象参数

```js
{
  name: string // 机器人名称
  token: string // coolq-http-api的accessToken
  host: string // coolq-http-api的地址
  port: number // coolq-http-api的端口
}
```
使用`admin`可以设置管理员，可用于指定只有管理员可用的指令和接收通知，请在载入插件和`start`前调用
```js
// 设置管理员，用于接收管理员消息
// type 0-私聊, 1-群组, 2-讨论组
// qq 管理员Q号
// id 群组ID
// type不为0时必须设置id
app.admin(type, qq, id)
```

可以使用`init`和`plugin`方法载入插件，请在`start`之前载入，否则会报错

插件形式为类，请在插件类的构造函数中调用`applyPlugin`和`applyInit`载入处理消息的方法

```js
// init方法载入的函数会插入到初始化函数中
app.init(Plugin)

// plugin方法载入的函数会插入到讨论组和群组消息处理函数中
app.plugin(Plugin)

// 载入多个插件可以见写成以下形式
app
  .plugin(Plugin1)
  .plugin(Plugin2)
  .plugin(Plugin3)

```
`start`可传入目录地址，会读取该目录下的`./config/config.json`，同时也会把其它插件的通用配置保存到该文件
```js
app.start(__dirname)
```
其它内置插件
```js
// 创建mysql链接池
app.createPool()

// 获取格式化后的日期和时间
app.getTime()

// 利用async/await暂时中断执行
app.sleep()

// 发送消息
app.send()

// 将通用设置保存到本地
app.saveConfig()
```
