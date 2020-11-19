const express = require("express");
const pool = require("../modules/pool");
const axios = require("axios");
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { Router } = require("express");
require("dotenv").config();

const router = express.Router();

router.put("/:id", rejectUnauthenticated, (req, res) => {
	console.log("temp.phase.router.put hit,", req.user.id, req.params.id);

	let check = pool
		.query(
			`SELECT "phase"."id", "phase"."name" FROM "phase"
                           JOIN "event"
                           ON "phase"."event_id" = "event"."id"
                           JOIN "user_event"
                           ON "user_event"."event_id" = "event"."id"
                           WHERE "user_id" = $1
                           AND "phase"."id" = $2;`,
			[req.user.id, req.params.id]
		)
		.then((results) => {
			//console.log('result.rows', results.rows);    No need to match user id with event or phase on non GET route
			if (results.rows.length === 0) {
				console.log("You are unauthorized");
			}
		});

	let queryText = `UPDATE "phase" SET
                     "name" = $1,
                     "start_date" = $2,
                     "end_date" = $3
                     WHERE "id" = $4`;
	let queryParams = [
		req.body.name,
		req.body.start_date,
		req.body.end_date,
		req.body.id,
	];
	console.log(
		"router put hit with queryText, queryParams",
		queryText,
		queryParams
	);
	pool
		.query(queryText, queryParams)
		.then((result) => {
			res.sendStatus(201);
		})
		.catch((err) => {
			console.log("we have an error in put", err);
			res.sendStatus(500);
		});
});

module.exports = router;
