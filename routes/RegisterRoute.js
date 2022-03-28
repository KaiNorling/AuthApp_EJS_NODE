const router = require("express").Router()
const efu = require("express-fileupload")
const path = require("path")
const hashPassword = require("../modules/bcrypt")




router.get("/", (req, res) => {
	res.render("register");
});

router.post("/",	efu(["avatar", "resume"]),async (req, res) => {
		const oldUser = await req.db.users.findOne({
			$or: [
				{
					email: req.body.email,
				},
				{
					username: req.body.username,
				},
			],
		});

		if (oldUser) {res.render("register", {error: "Username or Email already exists",});}

		const avatarName =
			req.files.avatar.md5 +
			"." +
			req.files.avatar.name.split(".")[
				req.files.avatar.name.split(".").length - 1
			];

		req.files.avatar.mv(
			path.join(__dirname, "..", "public", "avatars", avatarName)
		);

		const resumeName =
			req.files.resume.md5 +
			"." +
			req.files.resume.name.split(".")[
				req.files.resume.name.split(".").length - 1
			];

		req.files.resume.mv(
			path.join(__dirname, "..", "public", "resumes", resumeName)
		);

		const newUser = await req.db.users.insertOne({
			email: req.body.email,
			username: req.body.username,
			password: await hashPassword(req.body.password),
			resume: resumeName,
			avatar: avatarName,
		});

		res.redirect("/register");
	}
);



module.exports={
    path:"/register",
    router
}