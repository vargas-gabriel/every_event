const express = require("express");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");

const passport = require("./strategies/user.strategy");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const config = require("../config");
const session = require("express-session");

// Route includes
const userRouter = require("./routes/user.router");
const eventRouter = require("./routes/event.router");
const user_eventRouter = require("./routes/user_event.router");
const phaseRouter = require("./routes/phase.router");
const linkedinRouter = require("./routes/linkedin.router");
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new LinkedInStrategy(
		{
			clientID: config.linkedinAuth.clientID,
			clientSecret: config.linkedinAuth.clientSecret,
			callbackURL: config.linkedinAuth.callbackURL,
			scope: ["r_emailaddress", "r_liteprofile"],
		},
		function (token, tokenSecret, profile, done) {
			return done(null, profile);
		}
	)
);
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: "SECRET",
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/user_event", user_eventRouter);
app.use("/api/phase", phaseRouter);
app.use("/api/linkedin", linkedinRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
