# 聊天列表

# 目录
- [**一、聊天列表**](#一、聊天列表)
<!-- - [**二、前后端实时显示消息**](#二、前后端实时显示消息)
	- [2.1添加聊天路由界面](#2.1添加聊天路由界面)
	- [2.2socket前后端消息互通](#2.2socket前后端消息互通)
- [**三、聊天功能实现**](#三、聊天功能实现)
	- [3.1聊天功能](#3.1聊天功能)
	- [3.2未读消息数](#3.2未读消息数)
	- [3.3聊天头像名称与未读消息调整](#3.3聊天头像名称与未读消息调整)
	- [3.4发送emoji表情](#3.4发送emoji表情) -->


### <a id="一、聊天列表"></a>一、聊天列表
首页引入消息列表Msg组件：[src/component/dashboard](https://github.com/ccyinghua/imooc-react-chat/blob/master/src/component/dashboard/index.js)<br>

添加消息列表页面：[src/component/msg](https://github.com/ccyinghua/imooc-react-chat/blob/master/src/component/msg/index.js)
```javascript
import React from "react";
import { List, Badge } from "antd-mobile";
import { connect } from "react-redux";

@connect(state => state)
class Msg extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getLast(arr) {
		return arr[arr.length - 1];
	}

	render() {
		// 当前登录的id
		const userid = this.props.user._id;
		const userInfo = this.props.chat.users;

		// 按照聊天用户分组，根据chatid
		// msgGroup={chatid值: 消息数组}
		const msgGroup = {};
		this.props.chat.chatmsg.forEach(v => {
			msgGroup[v.chatid] = msgGroup[v.chatid] || [];
			msgGroup[v.chatid].push(v);
		});

		// 最新的聊天消息要放在最前面
		const chatList = Object.values(msgGroup).sort((a, b) => {
			const a_last = this.getLast(a).create_time;
			const b_last = this.getLast(b).create_time;
			return b_last - a_last;
		});

		return (
			<div id="chat-page">
				{chatList.map(v => {
					const lastItem = this.getLast(v); // 最新一条消息数据
					const targetId = v[0].from === userid ? v[0].to : v[0].from; // 聊天对象id
					const unreadNum = v.filter(v => !v.read && v.to === userid).length; // 未读数量
					return (
						<List key={lastItem._id}>
							<List.Item
								extra={<Badge text={unreadNum}></Badge>}
								thumb={userInfo[targetId] && require(`../assets/img/${userInfo[targetId].avatar}.png`)}
								arrow="horizontal"
								onClick={() => {
									this.props.history.push(`/chat/${targetId}`)
								}}
							>
								{lastItem.content}
								<List.Item.Brief>{userInfo[targetId] ? userInfo[targetId].name : ""}</List.Item.Brief>
							</List.Item>
						</List>
					);
				})}
			</div>
		);
	}
}

export default Msg;
```
![](./resource/06_msg/1.png)

<!-- - ### <a id="2.1添加聊天路由界面"></a>2.1添加聊天路由界面 -->


