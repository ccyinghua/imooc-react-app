import React from "react";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
import { connect } from "react-redux";
import { getMegList, sendMsg, recvMsg, readMsg } from "../../redux/chat.redux";
import { getChatId } from "../../util";
// import io from "socket.io-client";
// const socket = io("ws://localhost:9093");

@connect(
	state => state,
	{ getMegList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			showEmoji: false
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
	componentWillUnmount() {
		const to = this.props.match.params.user; // 聊天对象id
		this.props.readMsg(to)
	}
	fixCarousel() {
		setTimeout(() => {
			window.dispatchEvent(new Event("resize"));
		}, 0);
	}
	handleSubmit() {
		// 点击发送按钮：向后端发送sendmsg事件，将要发送的数据带过去
		// socket.emit("sendmsg", { text: this.state.text });
		// this.setState({ text: "" });

		const from = this.props.user._id; // 发送人id
		const to = this.props.match.params.user; // 接收人id(从路由上拿)
		const msg = this.state.text;
		this.props.sendMsg({ from, to, msg });
		this.setState({ text: "", showEmoji: false });
	}
	render() {
		const emoji = "😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠"
			.split(" ")
			.filter(v => v)
			.map(v => ({ text: v }));

		const userid = this.props.match.params.user;
		const users = this.props.chat.users || {};

		if (!users[userid]) {
			return null;
		}

		const chatid = getChatId(userid, this.props.user._id);
		// this.props.chat.chatmsg是所有的消息列表
		const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);

		return (
			<div id="chat-page">
				<NavBar
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => {
						this.props.history.goBack();
					}}
				>
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
								<List.Item extra={<img src={avatar} alt="" />} className="chat-me">
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
							extra={
								<div>
									{/* eslint-disable */}
									<span
										style={{ marginRight: 15 }}
										onClick={() => {
											this.setState({ showEmoji: !this.state.showEmoji });
											this.fixCarousel();
										}}
									>
										😀
									</span>
									<span onClick={() => this.handleSubmit()}>发送</span>
								</div>
							}
						></InputItem>
					</List>

					{this.state.showEmoji ? (
						<Grid
							data={emoji}
							columnNum={9}
							carouselMaxRow={4}
							isCarousel={true}
							onClick={el => {
								this.setState({
									text: this.state.text + el.text
								});
							}}
						/>
					) : null}
				</div>
			</div>
		);
	}
}

export default Chat;
