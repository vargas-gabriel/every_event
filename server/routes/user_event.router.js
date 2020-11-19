const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
	console.log("req.user:", req.user);
	console.log("in get user_event");

	const query = `SELECT * FROM event JOIN user_event ON "event"."id" = "user_event"."event_id" WHERE "user_event"."user_id" = $1;`;
	const queryParams = [req.user.id];

	pool
		.query(query, queryParams)
		.then((results) => {
			res.send(results.rows);
		})
		.catch((error) => {
			console.log("ERROR", error);
			res.sendStatus(500);
		});
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
	// POST route code here
});

module.exports = router;
