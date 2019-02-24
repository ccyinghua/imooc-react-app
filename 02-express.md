# express

- [**一、下载express**](#一、下载express)
- [**二、nodemon**](#二、nodemon)
- [**三、MongoDB**](#三、MongoDB)
- [**四、mongoose**](#四、mongoose)

### <a id="一、下载express"></a>一、下载express

```
cnpm install express --save
```

新建server/server.js
```javascript
const express = require('express');
// 新建app
const app = express();

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
})

app.get('/data', function(req, res) {
  res.json({
    name: 'imooc',
    type: 'IT'
  });
})

app.listen(9093, function() {
  console.log('Node app start at port 9093');
})
```
```javascript
// 命令
cd server
node server.js
```
输入网址：<br>
localhost:9093 出现hello world <br>
localhost:9093/data  出现json数据 <br>
说明express运行成功。

### <a id="二、nodemon"></a>二、nodemon

避免修改一次要重启node server.js，下载nodemon, 修改后自动重启

```javascript
cnpm install -g nodemon

// 运行
nodemon server.js
```

### <a id="三、MongoDB"></a>三、MongoDB

MongoDb安装与环境搭建： [https://www.cnblogs.com/ccyinghua/p/7887713.html](https://www.cnblogs.com/ccyinghua/p/7887713.html)

### <a id="四、mongoose"></a>四、mongoose

```
cnpm install mongoose --save
```
mongoose链接mongo：mongodb://127.0.0.1:27017/imooc，并使用imooc这个集合。

mongoose的增删改查操作测试：<br/>
server/server.js
```javascript
const express = require('express');
const mongoose = require('mongoose');

// 链接mongo 并且使用imooc这个集合，mongo若没有imooc会自动新建
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL)

// 连接成功操作
mongoose.connection.on("connected",function(){
	console.log("MongoDB connected success.")
})

// 类似于mysql的表 mongo里有文档、字段的概念
// 创建一个model模型
const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: Number, require: true}    
}))
// ---------- mongoose增删改查 -----------
// 新增一条数据
// User.create({
//   user: 'mark',
//   age: 10
// }, function(err, doc) {
//   if (!err) {
//     console.log(doc);
//   } else {
//     console.log(err);
//   }
// })

// 删除数据
// User.remove({age: 18}, function(err, doc) {
//   console.log(doc)
// })

// 更新数据
// User.update({'user': 'mark'}, {'$set': {age: 26}}, function(err, doc) {
//   console.log(doc)
// })

// 新建app
const app = express();

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
})

app.get('/data', function(req, res) {
  // 查询数据
  User.find({}, function(err, doc) {
    res.json(doc)
  })
  // res.json({
  //   name: 'imooc',
  //   type: 'IT'
  // });
})

app.listen(9093, function() {
  console.log('Node app start at port 9093');
})
```







