import React from "React";
import Logo from "../../component/logo";
import { List, InputItem, Radio, WhiteSpace, Button } from "antd-mobile";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { regisger } from "../../redux/user.redux";

@connect(
	state => state.user,
	{ regisger }
)
class Rehister extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: "",
			pwd: "",
			repeatpwd: "",
			type: "genius" // 或者boss
		};

		this.handleRegister = this.handleRegister.bind(this);
	}

	handleChange(key, val) {
		// state发生变化，组件进入重新渲染的流程
		this.setState({
			[key]: val
		});
	}
	handleRegister() {
		this.props.regisger(this.state);
	}

	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<List>
					{this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
					<InputItem onChange={v => this.handleChange("user", v)}>用户名</InputItem>
					<WhiteSpace />
					<InputItem type="password" onChange={v => this.handleChange("pwd", v)}>
						密码
					</InputItem>
					<WhiteSpace />
					<InputItem type="password" onChange={v => this.handleChange("repeatpwd", v)}>
						确认密码
					</InputItem>
					<WhiteSpace />
					<RadioItem checked={this.state.type === "genius"} onChange={() => this.handleChange("type", "genius")}>
						牛人
					</RadioItem>
					<RadioItem checked={this.state.type === "boss"} onChange={() => this.handleChange("type", "boss")}>
						BOSS
					</RadioItem>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleRegister}>
						注册{" "}
					</Button>
				</List>
			</div>
		);
	}
}

export default Rehister;
