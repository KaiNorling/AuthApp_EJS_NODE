const router = require("express").Router()



router.get("/", (req, res) => {
	res.render("login");
});

router.get("/:username", async (req, res) => {
	const user = await req.db.users.findOne({
		username: req.params.username,
	});

	if (user) {
		res.render("profile", {
			user: user,
		});
	} else {
		res.render("404");
	}
});



module.exports={
    path:"/login",
    router
}