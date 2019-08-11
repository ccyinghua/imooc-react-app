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
// User.remove({age: 10}, function(err, doc) {
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


