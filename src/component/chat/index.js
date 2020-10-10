import React from "react";
import { List, InputItem, NavBar, Icon } from "antd-mobile";
import { connect } from "react-redux";
import { getMegList, sendMsg, recvMsg } from "../../redux/chat.redux";
import { getChatId } from "../../util";
// import io from "socket.io-client";
// const socket = io("ws://localhost:9093");

@connect(
	state => state,
	{ getMegList, sendMsg, recvMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}
	componentDidMount() {
		// 接收全局recvmsg
		// socket.on("recvmsg", data => {
		// 	console.log(data);
		// });

		// 添加判断，在页面刷新时获取，从首页进入时，首页已经获取消息了。
		if (!this.props.chat.chatmsg.length) {
			this.props.getMegList();
			this.props.recvMsg();
		}
	}
	handleSubmit() {
		// 点击发送按钮：向后端发送sendmsg事件，将要发送的数据带过去
		// socket.emit("sendmsg", { text: this.state.text });
		// this.setState({ text: "" });

		const from = this.props.user._id; // 发送人id
		const to = this.props.match.params.user; // 接收人id(从路由上拿)
		const msg = this.state.text;
		this.props.sendMsg({ from, to, msg });
		this.setState({ text: "" });
	}
	render() {
		const userid = this.props.match.params.user;

		const users = this.props.chat.users || {};

		if (!users[userid]) {
			return null;
		}

		const chatid = getChatId(userid, this.props.user._id);
		// this.props.chat.chatmsg是所有的消息列表，
		const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);

		return (
			<div id="chat-page">
				<NavBar
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => {
						this.props.history.goBack();
					}}>
					{users[userid].name}
				</NavBar>
				{chatmsgs.map(v => {
					const avatar = require(`../assets/img/${users[v.from].avatar}.png`);
					return v.from === userid ? (
						<List key={v._id}>
							<List.Item thumb={avatar}>{v.content}</List.Item>
						</List>
					) : (
							<List key={v._id}>
								<List.Item extra={<img src={avatar} />} className="chat-me">
									{v.content}
								</List.Item>
							</List>
						);
				})}
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={v => {
								this.setState({ text: v });
							}}
							extra={<span onClick={() => this.handleSubmit()}>发送</span>}></InputItem>
					</List>
				</div>
			</div>
		);
	}
}

export default Chat;
