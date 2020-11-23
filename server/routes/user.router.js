const express = require("express");
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated

router.get("/",  (req, res) => {
	console.log('in get user with:', req.body);

	// Send back user object from the session (previously queried from the database)
	res.send(req.user);
});


//GET ALL
router.get('/all',  (req, res) => {
	console.log('in get all users');
    const query = `SELECT "id", "first_name", "last_name" FROM "user" WHERE "id" <> $1;`;
    const queryParams = [req.user.id]

    pool.query(query, queryParams)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR', error);
        res.sendStatus(500);
    })	
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
	console.log("in register", req.body);
	const email = req.body.email;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const password = encryptLib.encryptPassword(req.body.password);
	const ayrshareapikey = req.body.ayrshareapikey;
	const image = req.body.image;
	const queryText = `INSERT INTO "user" (first_name, last_name, email, password, ayrshareapikey, image)
	VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
	

	pool
		.query(queryText, [firstname, lastname, email, password, ayrshareapikey, image])
		.then(() => res.sendStatus(201))
		.catch((error) => {
			console.log("ERROR", error);
			res.sendStatus(500);
		});
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
	res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
	// Use passport's built-in method to log out the user
	req.logout();
	res.sendStatus(200);
});

router.put("/:id", (req, res) => {
	console.log("in edit user", req.body);
	const query = `
	UPDATE "user"
	SET 
	"first_name" = $1,
	"last_name" = $2,
	"email" = $3,
	"image" = $4,
	"ayrshareapikey"= $5
	WHERE "id" = $6
	;`;
	pool
		.query(query, [
			req.body.firstName,
			req.body.lastName,
			req.body.email,
			req.body.image,
			req.body.ayrshareapikey,
			req.body.id,
		])
		.then(() => res.sendStatus(200))
		.catch((error) => {
			console.log("ERROR:", error);
		});
});







module.exports = router;
