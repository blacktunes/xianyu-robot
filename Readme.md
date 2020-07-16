# xianyu-robot

本项目基于[node-cq-robot](https://github.com/CaoMeiYouRen/node-cq-robot)
酷Q端需要安装[coolq-http-api](https://github.com/richardchien/coolq-http-api)插件

#### npm
```
npm install -S xianyu-robot
```

#### 使用方法
``` js
// TypeScript
import App from 'xianyu-robot'

const app = new App()

app.start()

// Node
const App = require('../dist/main').default

const app = new App()

app.start()
```

目前还在开发中，没有附带内置插件，可以添加对象参数

```js
{
  name: string // 机器人名称
  token: string // coolq-http-api的accessToken
  host: string // coolq-http-api的地址
  port: number // coolq-http-api的端口
}
```

可以使用`init`和`plugin`方法载入插件

```js
// init方法载入的函数会插入到初始化函数中
app.init(test)
// plugin方法载入的函数会插入到讨论组和群组消息处理函数中
app.plugin(test)
```