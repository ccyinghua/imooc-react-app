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
