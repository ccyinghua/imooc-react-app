import axios from "axios";
import { getRedirectPath } from "../util";

const AUTH_AUCCESS = "AUTH_AUCCESS";
const LOGOUT = "LOGOUT";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";

const initState = {
	redirectTo: "",
	isAuth: false,
	msg: "",
	user: "",
	type: ""
};

// reducer处理函数
export function user(state = initState, action) {
	switch (action.type) {
		case AUTH_AUCCESS:
			return { ...state, msg: "", redirectTo: getRedirectPath(action.payload), ...action.payload };
		case LOAD_DATA:
			return { ...state, ...action.payload };
		case ERROR_MSG:
			return { ...state, isAuth: false, msg: action.msg };
		case LOGOUT:
			return { ...initState, redirectTo: "/login" };
		default:
			return state;
	}
}

function authSuccess(obj) {
	const { pwd, ...data } = obj; // redux数据显示去除密码，防止密码泄露
	return { type: AUTH_AUCCESS, payload: data };
}

function errorMsg(msg) {
	return { msg, type: ERROR_MSG };
}

export function loadData(userinfo) {
	return { type: LOAD_DATA, payload: userinfo };
}

export function login({ user, pwd }) {
	if (!user || !pwd) {
		return errorMsg("用户密码必须输入");
	}
	return dispatch => {
		axios.post("/user/login", { user, pwd }).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess(res.data.data));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		});
	};
}

export function regisger({ user, pwd, repeatpwd, type }) {
	if (!user || !pwd || !type) {
		return errorMsg("用户名密码必须输入");
	}
	if (pwd !== repeatpwd) {
		return errorMsg("密码和确认密码不同");
	}
	return dispatch => {
		axios.post("/user/register", { user, pwd, type }).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess({ user, pwd, type }));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		});
	};
}

export function update(data) {
	return dispatch => {
		axios.post("/user/update", data).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess(res.data.data));
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		});
	};
}

export function logoutSubmit() {
	return { type: LOGOUT };
}
