import React from "react";
import PropTypes from "prop-types";
import { Card, WhiteSpace, WingBlank } from "antd-mobile";
import { withRouter } from "react-router-dom";

@withRouter
class UserCard extends React.Component {
	static propTypes = {
		userlist: PropTypes.array.isRequired
	};

	handleClick(v) {
		// v._id用户在mongoDB的唯一标识
		this.props.history.push(`chat/${v._id}`);
	}

	render() {
		return (
			<WingBlank>
				{this.props.userlist.map((v, i) => {
					return v.avatar ? (
						<div key={i} onClick={() => this.handleClick(v)}>
							<WhiteSpace></WhiteSpace>
							<Card>
								<Card.Header
									title={v.user}
									thumb={require(`../assets/img/${v.avatar}.png`)}
									extra={<span>{v.title}</span>}
								/>
								<Card.Body>
									{v.type === "boss" ? <div>公司：{v.company}</div> : null}
									{v.desc.split("\n").map(d => (
										<div key={d}>{d}</div>
									))}
									{v.type === "boss" ? <div>薪资:{v.money}</div> : null}
								</Card.Body>
							</Card>
						</div>
					) : null;
				})}
			</WingBlank>
		);
	}
}

export default UserCard;
