import React from "react";
import { List, InputItem, NavBar } from "antd-mobile";
import { connect } from "react-redux";
import { getMegList, sendMsg, recvMsg } from "../../redux/chat.redux";
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
		this.props.getMegList();
		this.props.recvMsg();
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
		const user = this.props.match.params.user;
		return (
			<div id="chat-page">
				<NavBar mode="dark">{this.props.match.params.user}</NavBar>
				{this.props.chat.chatmsg.map(v => {
					return v.from === user ? (
						<List key={v._id}>
							<List.Item>{v.content}</List.Item>
						</List>
					) : (
						<List key={v._id}>
							<List.Item extra={""} className="chat-me">
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
							extra={<span onClick={() => this.handleSubmit()}>发送</span>}
						></InputItem>
					</List>
				</div>
			</div>
		);
	}
}

export default Chat;
