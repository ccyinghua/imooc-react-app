const express = require("express");
const utils = require("utility");

const Router = express.Router();
const model = require("./model");
const User = model.getModel("user");
const Chat = model.getModel("chat");
const _filter = { pwd: 0, __v: 0 };

// 清空聊天记录
// Chat.remove({}, function(e, d) {});

Router.get("/list", function (req, res) {
	const { type } = req.query;
	// User.remove({},function(e,d){})
	User.find({ type }, function (err, doc) {
		return res.json({ code: 0, data: doc });
	});
});
Router.post("/update", function (req, res) {
	const userid = req.cookies.userid;
	if (!userid) {
		return json.dumps({ code: 1 });
	}
	const body = req.body;
	User.findByIdAndUpdate(userid, body, function (err, doc) {
		const data = Object.assign(
			{},
			{
				user: doc.user,
				type: doc.type
			},
			body
		);
		return res.json({ code: 0, data });
	});
});
Router.post("/login", function (req, res) {
	const { user, pwd } = req.body;
	User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
		if (!doc) {
			return res.json({ code: 1, msg: "用户名或者密码错误" });
		}
		res.cookie("userid", doc._id);
		return res.json({ code: 0, data: doc });
	});
});
Router.post("/register", function (req, res) {
	const { user, pwd, type } = req.body;
	User.findOne({ user }, function (err, doc) {
		if (doc) {
			return res.json({ code: 1, msg: "用户名重复" });
		}

		const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
		userModel.save(function (e, d) {
			if (e) {
				return res.json({ code: 1, msg: "后端出错了" });
			}
			const { user, type, _id } = d;
			res.cookie("userid", _id);
			return res.json({ code: 0, data: { user, type, _id } });
		});
	});
});
Router.get("/info", function (req, res) {
	const { userid } = req.cookies;
	if (!userid) {
		return res.json({ code: 1 });
	}
	User.findOne({ _id: userid }, _filter, function (err, doc) {
		if (err) {
			return res.json({ code: 1, msg: "后端出错了" });
		}
		if (doc) {
			return res.json({ code: 0, data: doc });
		}
	});
	// 用户有没有cookie
});

// 获取聊天列表
Router.get("/getmsglist", function (req, res) {
	// const user = req.cookies.user;

	const user = req.cookies.userid;

	User.find({}, function (e, userdoc) {
		let users = {};
		userdoc.forEach(v => {
			users[v._id] = { name: v.user, avatar: v.avatar };
		});

		Chat.find({ $or: [{ from: user }, { to: user }] }, function (err, doc) {
			if (!err) {
				return res.json({ code: 0, msgs: doc, users: users });
			}
		});
	});

	// Chat.find({}, function(err, doc) {
	// 	if (!err) {
	// 		return res.json({ code: 0, msgs: doc });
	// 	}
	// });
});

Router.post('/readmsg', function (req, res) {
	const { userid } = req.cookies;
	const { from } = req.body;

	Chat.update(
		{ from, to: userid },
		{ '$set': { read: true } },
		{ 'multi': true },
		function (err, doc) {
			// doc: {n: 1, nModified: 0, ok: 1} n-消息数,nModified-修改了几条,ok修改是否成功
			if (!err) {
				return res.json({ code: 0, num: doc.nModified });
			}
			return res.json({ code: 1, msg: "修改失败" });
		});
})

function md5Pwd(pwd) {
	const salt = "imooc_is_good_3957x8yza6!@#IUHJh~~";
	return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
