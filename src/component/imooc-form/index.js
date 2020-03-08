import React from "react";

// 简单高阶组件
export default function imoocForm(Comp) {
	return class WrapperComp extends React.Component {
		constructor(props) {
			super(props);
			this.state = {};
			this.handleChange = this.handleChange.bind(this);
		}
		handleChange(key, val) {
			console.log(key, val);
			this.setState({
				[key]: val
			});
		}
		render() {
			return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>;
		}
	};
}
