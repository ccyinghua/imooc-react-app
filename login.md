# 登录注册

将04_express+axios项目为基础(已添加redux/router/express/axios/antd-mobile等)进行开发：[04_express+axios](https://github.com/ccyinghua/React/tree/master/04_express%2Baxios)

首先将之前项目多余的页面文件去掉，变成一个空项目。src下保留config.js/index.js/reducer.js，在src下建立component(组件)/container(页面性文件)/redux文件夹。

空项目放于demo分支下载： [https://github.com/ccyinghua/imooc-react-chat/tree/demo](https://github.com/ccyinghua/imooc-react-chat/tree/demo)


首先项目基于cookie用户验证：
- express依赖cookie-parser ，需要npm install cookie-parser –save安装
- cookie类似于一张身份卡，登录后服务器端返回，你带着cookie就可以访问受限资源
- 页cookie的管理浏览器会自动处理

下载cookie-parser
```javascript
cnpm install cookie-parser --save
```


