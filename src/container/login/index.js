import React from "React";
import Logo from "../../component/logo";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/user.redux";

// 高阶组件
// // 属性代理
// function WrapperHello(Comp) {
// 	class WrapComp extends React.Component {
// 		render() {
// 			return (
// 				<div>
// 					<p>这是HOC高阶组件特有元素</p>
// 					<Comp {...this.props}></Comp>
// 				</div>
// 			);
// 		}
// 	}
// 	return WrapComp;
// }

// @WrapperHello
// class Hello extends React.Component {
// 	render() {
// 		return <h2>hello i live haihai</h2>;
// 	}
// }

// // 反向继承
// function WrapperHello(Comp) {
// 	class WrapComp extends Comp {
// 		componentDidMount() {
// 			console.log("高阶组件新增的生命周期，加载完成");
// 		}
// 		render() {
// 			return <Comp></Comp>;
// 		}
// 	}
// 	return WrapComp;
// }

// @WrapperHello
// class Hello extends React.Component {
// 	render() {
// 		return <h2>hello i live haihai</h2>;
// 	}
// }

// 装饰器模式
@connect(state => state.user, { login })
class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: "",
			pwd: ""
		};

		// 方法绑定this
		this.register = this.register.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChange(key, val) {
		// state发生变化，组件进入重新渲染的流程
		this.setState({
			[key]: val
		});
	}
	register() {
		this.props.history.push("/register"); // 跳转至注册页面
	}
	handleLogin() {
		this.props.login(this.state);
	}

	render() {
		return (
			<div>
				{this.props.redirectTo && this.props.redirectTo !== "/login" ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
						<InputItem onChange={v => this.handleChange("user", v)}>用户</InputItem>
						<WhiteSpace />
						<InputItem onChange={v => this.handleChange("pwd", v)}>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button onClick={this.handleLogin} type="primary">
						登录
					</Button>
					<WhiteSpace />
					<Button onClick={this.register} type="primary">
						注册
					</Button>
				</WingBlank>
			</div>
		);
	}
}

export default Login;
