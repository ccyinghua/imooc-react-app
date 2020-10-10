export function getRedirectPath({ type, avatar }) {
	// 根据用户信息 返回跳转地址
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo
	let url = type === "boss" ? "/boss" : "/genius";
	if (!avatar) {
		url += "info";
	}
	return url;
}

/**
 * 获取chatid
 * @param {*} userId 聊天对象的id
 * @param {*} targetId 本人即登录人的id
 */
export function getChatId(userId, targetId) {
	return [userId, targetId].sort().join("_");
}
