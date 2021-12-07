xianyu-robot / [Exports](modules.md)

# 咸鱼Bot

**可使用Http Api的的QQ机器人框架**
(~~虽然版本号很高，但是其实还有很多不完善的地方，随时会有大改的可能性~~)

**客户端请使用[go-cqhttp](https://github.com/Mrs4s/go-cqhttp)**

### 安装方法
```sh
npm install -S xianyu-robot
# yarn add xianyu-robot
```

### 使用方法
推荐使用`TypeScript`开发以获得较为完整的类型提示
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

### 文档
[详细文档](https://blacktunes.github.io/xianyu-robot-doc/)

### 项目参考
开发中大量参考了以下项目，在此表示感谢
* [node-cq-robot](https://github.com/CaoMeiYouRen/node-cq-robot)
* [cq-websocket](https://github.com/momocow/node-cq-websocket)

### LICENSE
本项目使用LGPL协议，仅作为库使用时不必开源，但出现对项目源码进行修改，则需要将你修改后的版本进行开源。
