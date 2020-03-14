import axios from "axios";
import io from "socket.io-client";

const socket = io("ws://localhost:9093");

// 获取聊天列表
const MSG_LIST = "MSG_LIST";
// 读取信息
const MSG_RECV = "MSG_RECV";
// 标识已读
const MSG_READ = "MSG_READ";

const initState = {
	chatmsg: [],
	unread: 0 // 未读消息的数量
};

// reducer处理函数
export function chat(state = initState, action) {
	switch (action.type) {
		case MSG_LIST:
			return { ...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length };
		case MSG_RECV:
			return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1 };
		case MSG_READ:
			return { ...state, isAuth: false, msg: action.msg };
		default:
			return state;
	}
}

function msgList(msgs) {
	return { type: MSG_LIST, payload: msgs };
}

function msgRecv(msg) {
	return { type: MSG_RECV, payload: msg };
}

// 获取消息列表
export function getMegList(userinfo) {
	return dispatch => {
		axios.get("/user/getmsglist").then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(msgList(res.data.msgs));
			}
		});
	};
}

// 发送信息
export function sendMsg({ from, to, msg }) {
	return dispatch => {
		// console.log({ from, to, msg });
		socket.emit("sendmsg", { from, to, msg });
	};
}

// 接收信息
export function recvMsg() {
	return dispatch => {
		// 接收全局recvmsg
		socket.on("recvmsg", data => {
			// console.log("recvmsg", data);
			dispatch(msgRecv(data));
		});
	};
}
