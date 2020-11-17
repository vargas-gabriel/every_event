
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const eventRouter = require('./routes/event.router');
const user_eventRouter = require('./routes/user_event.router');
const phaseRouter = require('./routes/phase.router');
const tempEventRouter = require('./routes/temp.event.router');
const tempPhaseRouter = require('./routes/temp.phase.router');
const postRouter = require('./routes/post.router');
const hashtagRouter = require('./routes/hashtag.router');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/user_event', user_eventRouter);
app.use('/api/phase', phaseRouter);
app.use('/api/tempEvent', tempEventRouter);
app.use('/api/tempPhase', tempPhaseRouter);
app.use('/api/post', postRouter);
app.use('/api/hashtag', hashtagRouter);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
