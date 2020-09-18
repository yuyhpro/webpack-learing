// 服务器
// 启动服务指令:
// 方法一  nodemon server.js
//   第一次使用要全局安装 npm i nodemon -g
// nodemon server.js
// 方法二 直接使用 node server.js
const express = require('express');
const app = express();
app.use(express.static('build', { maxAge: 1000 * 3600 }));
app.listen(3000)