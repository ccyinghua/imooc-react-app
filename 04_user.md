# 个人中心

# 目录
- [**一、个人中心**](#一、个人中心)

### <a id="一、个人中心"></a>一、个人中心

列表组件：[src/component/dashboard](https://github.com/ccyinghua/imooc-react-chat/blob/master/src/component/dashboard/index.js)&nbsp;&nbsp;引入个人中心user路由组件

user个人中心路由组件：[src/component/user](https://github.com/ccyinghua/imooc-react-chat/blob/master/src/component/user/index.js)

登出时需清除cookies;并清除redux数据
```javascript
// 安装cookies
cnpm install browser-cookies --save
```
登出清除redux：[src/redux/user.redux.js](https://github.com/ccyinghua/imooc-react-chat/blob/master/src/redux/user.redux.js)


http://localhost:3000/me
![](./resource/04_user/1.png)
