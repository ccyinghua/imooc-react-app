import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./container/login";
import Register from "./container/register";
import Authroute from "./component/authroute";

import reducers from "./reducer";
import "./config.js";

// 新建store
const store = createStore(
	reducers,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

// 将store等传递给App组件
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Authroute></Authroute>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
