import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./container/login";
import Register from "./container/register";
import Authroute from "./component/authroute";
import BossInfo from "./container/bossinfo";
import GeniusInfo from "./container/geniusinfo";
import Dashboard from "./component/dashboard";

import reducers from "./reducer";
import "./config.js";
import "./index.css";

// 新建store
const store = createStore(
	reducers,
	compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

// 将store等传递给App组件
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Authroute></Authroute>
				{/* Switch只渲染命中的第一个模板组件 */}
				<Switch>
					<Route path="/bossinfo" component={BossInfo} />
					<Route path="/geniusinfo" component={GeniusInfo} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route component={Dashboard} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
