const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const passport = require("passport");

/**
 * GET route template
 */
router.get(
	"/auth/linkedin",
	passport.authenticate("linkedin", {
		scope: ["r_emailaddress", "r_liteprofile"],
	})
);
router.get(
	"/auth/linkedin/callback",
	passport.authenticate("linkedin", {
		successRedirect: "/profile",
		failureRedirect: "/login",
	})
);

router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/");
}
/**
 * POST route template
 */
router.post("/", (req, res) => {
	// POST route code here
});

module.exports = router;
