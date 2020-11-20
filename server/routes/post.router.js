const express = require("express");
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
const SocialPost = require("social-post-api");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
	console.log("in post GET with req.user", req.user);
	const queryText = `SELECT * FROM POST`;
	pool
		.query(queryText)
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
router.post("/", rejectUnauthenticated, (req, res) => {
	console.log("in post POST with req.body:", req.body);
	const queryText = `INSERT INTO "post"
    ("phase_id",
    "name",
    "send_date",
    "send_time",
    "post_text",
    "image",
    "response_id")
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING "id";`;

	pool
		.query(queryText, [
			req.body.payload,
			"New Post",
			null,
			null,
			"",
			null,
			null,
		])

		.then((result) => {
			//res.send(result)
			res.sendStatus(201);
		})
		.catch((err) => {
			// catch for second query
			console.log("error second query", err);
			res.sendStatus(500);
		});
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
	console.log("in post DELETE with req.body:", req.params.id); //body or params?
	const queryText = `DELETE FROM "post" WHERE "id" = $1`;
	pool
		.query(queryText, [req.params.id])
		.then(() => res.sendStatus(200))
		.catch((error) => {
			console.log("ERROR:", error);
		});
});
//THIS IS CURRENTLY: SAVE POST TO DB
router.put("/savepost", rejectUnauthenticated, async (req, res) => {
	console.log("save post to db with:", req.body);
	const queryText = `UPDATE "post" SET
    "name" = $1,
    "send_date" = $2,
    "send_time" = $3,
    "post_text" = $4
    WHERE "id" = $5`;
	pool
		.query(queryText, [
			req.body.name,
			req.body.send_date,
			req.body.send_time,
			req.body.post_text,
			req.body.id,
		])
		.then(() => res.sendStatus(200))
		.catch((error) => {
			console.log("ERROR:", error);
		});
});
//THIS IS CURRENTLY: SAVE POST TO DB AND IMMEDIATELY POST
router.put("/saveandpostnow", rejectUnauthenticated, async (req, res) => {
	console.log("in post PUT with req.body:", req.body); //body or params?
	const queryText = `UPDATE "post" SET
        "name" = $1,
        "send_date" = $2,
        "send_time" = $3,
        "post_text" = $4
        WHERE "id" = $5`;
	pool
		.query(queryText, [
			req.body.name,
			req.body.send_date,
			req.body.send_time,
			req.body.post_text,
			req.body.id,
		])
		.then(() => res.sendStatus(200))
		.catch((error) => {
			console.log("ERROR:", error);
		})
		//SEND POST TO AYRSHARE
		//GET USER API KEY
		//let dbRes = pool.query(`SELECT * FROM users WHERE id=req.user.id;`)
		.then((result) => {
			console.log("result", result.rows);
			res.send(result.rows);
			run();
		})
		.catch((err) => {
			console.log("we have an error in update post", err);
			res.sendStatus(500);
		});
	//console.log('dbres is', dbRes);
	let ayrshareToken = req.user.ayrshareapikey;
	console.log(ayrshareToken);
	let dateTime = req.body.send_date + "T" + req.body.send_time + ":00Z";
	console.log(dateTime);
	//let ayrshareToken = dbRes.row[0].ayrshareapikey
	getPostData = () => {
		console.log("in getpostdata");
		(postContent = req.body.post_text),
			(social = new SocialPost(ayrshareToken));
		console.log("ayrshareToken", ayrshareToken);
		return {
			post: postContent,
			shorten_links: true,
			platforms: ["linkedin"],
			//scheduleDate: dateTime,
		};
	};
	run = async () => {
		content = getPostData();
		json = await social.post(content).catch(console.error);
		console.log(json);
	};
});
//THIS IS CURRENTLY: SAVE AND DEPLOY A SCHEDULED POST TO AYRSHARE
router.put("/:id", rejectUnauthenticated, async (req, res) => {
	console.log("in post PUT with req.body:", req.body); //body or params?
	const queryText = `UPDATE "post" SET
        "name" = $1,
        "send_date" = $2,
        "send_time" = $3,
        "post_text" = $4
        WHERE "id" = $5`;
	pool
		.query(queryText, [
			req.body.name,
			req.body.send_date,
			req.body.send_time,
			req.body.post_text,
			req.body.id,
		])
		.then(() => res.sendStatus(200))
		.catch((error) => {
			console.log("ERROR:", error);
		})
		//SEND POST TO AYRSHARE
		//GET USER API KEY
		//let dbRes = pool.query(`SELECT * FROM users WHERE id=req.user.id;`)
		.then((result) => {
			console.log("result", result.rows);
			res.send(result.rows);
			run();
		})
		.catch((err) => {
			console.log("we have an error in update post", err);
			res.sendStatus(500);
		});
	//console.log('dbres is', dbRes);
	let ayrshareToken = req.user.ayrshareapikey;
	console.log(ayrshareToken);
	let dateTime = req.body.send_date + "T" + req.body.send_time + ":00Z";
	console.log(dateTime);
	//let ayrshareToken = dbRes.row[0].ayrshareapikey
	getPostData = () => {
		console.log("in getpostdata");
		(postContent = req.body.post_text),
			(social = new SocialPost(ayrshareToken));
		console.log("ayrshareToken", ayrshareToken);
		return {
			post: postContent,
			shorten_links: true,
			platforms: ["linkedin"],
			scheduleDate: dateTime,
		};
	};
	run = async () => {
		content = getPostData();
		json = await social.post(content).catch(console.error);
		console.log(json);
	};
});

module.exports = router;
