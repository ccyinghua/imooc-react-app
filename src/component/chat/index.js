import React from "react";
import { List, InputItem } from "antd-mobile";
import io from "socket.io-client";

const socket = io("ws://localhost:9093");
// 接收全局recvmsg
socket.on("recvmsg", function(data) {
	console.log(data);
});

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}
	handleSubmit() {
		// 点击发送按钮：向后端发送sendmsg事件，将要发送的数据带过去
		socket.emit("sendmsg", { text: this.state.text });
		this.setState({ text: "" });
	}
	render() {
		return (
			<div className="stick-footer">
				<h2>chat with user: {this.props.match.params.user}</h2>
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
		);
	}
}

export default Chat;
