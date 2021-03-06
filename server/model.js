const mongoose = require("mongoose");
// 链接mongo 并且使用imooc-chat这个集合，mongo若没有imooc-chat会自动新建
const DB_URL = "mongodb://localhost:27017/imooc-chat";
mongoose.connect(DB_URL);

// 解决警告：Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.set("useFindAndModify", false);

// 连接成功操作
mongoose.connection.on("connected", function() {
	console.log("MongoDB connected success.");
});

const models = {
	user: {
		user: { type: String, require: true },
		pwd: { type: String, require: true },
		type: { type: String, require: true },
		//头像
		avatar: { type: String },
		// 个人简介或者职位简介
		desc: { type: String },
		// 职位名
		title: { type: String },
		// 如果你是boss 还有两个字段
		company: { type: String },
		money: { type: String }
	},
	// 聊天模型
	chat: {
		chatid: { type: String, require: true },
		from: { type: String, require: true }, // 发消息的用户id
		to: { type: String, require: true }, // 接消息的用户id
		read: { type: Boolean, default: false }, // 已读未读
		content: { type: String, require: true, default: "" },
		create_time: { type: Number, default: new Date().getTime() }
	}
};

for (let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
	getModel: function(name) {
		return mongoose.model(name);
	}
};
