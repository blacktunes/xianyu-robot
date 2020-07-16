# xianyu-robot

本项目基于[node-cq-robot](https://github.com/CaoMeiYouRen/node-cq-robot)
酷Q端需要安装[coolq-http-api](https://github.com/richardchien/coolq-http-api)插件

#### npm
```
npm install -S xianyu-robot
```

#### 使用方法
``` js
import App from 'xianyu-robot'

const app = new App()

app.start()
```

目前还在开发中，没有附带内置插件，实例化可以增加参数，参数为对象

```js
{
  name: string // 机器人名称
  token: string // coolq-http-api的accessToken
  host: string // coolq-http-api的地址
  port: number // coolq-http-api的端口
  plugins: Array<Function> // 处理消息的插件
  init: Array<Function> // 初始化插件
}
```