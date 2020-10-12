import React from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import { Route } from "react-router-dom";
import Boss from "../boss";
import Genius from "../genius";
import NavLinkBar from "../navLink";
import User from "../user";
import Msg from "../msg";
import { getMegList, recvMsg } from "../../redux/chat.redux";
import QueueAnim from 'rc-queue-anim';

@connect(
	state => state,
	{ getMegList, recvMsg }
)
class Dashboard extends React.Component {
	componentDidMount() {
		// 添加判断，防止来回切换重复获取消息
		if (!this.props.chat.chatmsg.length) {
			this.props.getMegList();
			this.props.recvMsg();
		}
	}

	render() {
		const { pathname } = this.props.location;
		const user = this.props.user;
		const navList = [
			{
				path: "/boss",
				text: "牛人",
				icon: "boss",
				title: "牛人列表",
				component: Boss,
				hide: user.type === "genius"
			},
			{
				path: "/genius",
				text: "boss",
				icon: "job",
				title: "BOSS列表",
				component: Genius,
				hide: user.type === "boss"
			},
			{
				path: "/msg",
				text: "消息",
				icon: "msg",
				title: "消息列表",
				component: Msg
			},
			{
				path: "/me",
				text: "我",
				icon: "user",
				title: "个人中心",
				component: User
			}
		];

		// 让动画生效，只渲染一个Route,根据当前的path决定
		const page = navList.find(v => v.path === pathname);

		return (
			<div>
				<NavBar mode="dark" className="fixed-header">
					{navList.find(v => v.path === pathname) ? navList.find(v => v.path === pathname).title : ""}
				</NavBar>
				<div style={{ marginTop: 45 }}>
					{/* Switch只渲染命中的第一个模板组件 */}
					{/* <Switch>
						{navList.map(v => (
							<Route key={v.path} path={v.path} component={v.component} />
						))}
					</Switch> */}
					<QueueAnim type="scaleX" duration={800}>
						<Route key={page.path} path={page.path} component={page.component} />
					</QueueAnim>
				</div>
				<NavLinkBar data={navList} />
			</div>
		);
	}
}

export default Dashboard;
