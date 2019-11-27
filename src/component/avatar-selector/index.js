import React from "react";
import { List, Grid } from "antd-mobile";

class AvatarSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const avatarList = "boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra"
			.split(",")
			.map(v => ({
				icon: require(`./img/${v}.png`),
				text: v
			}));
		const gridHeader = this.state.icon ? (
			<div>
				<span>已选择图像</span>
				<img style={{ width: 20 }} src={this.state.icon} alt="" />
			</div>
		) : (
			"请选择图像"
		);
		return (
			<div>
				<List renderHeader={() => gridHeader}>
					<Grid
						data={avatarList}
						columnNum={5}
						onClick={elm => {
							this.setState(elm);
							this.props.selectAvatar(elm.text);
						}}
					/>
				</List>
			</div>
		);
	}
}

export default AvatarSelector;