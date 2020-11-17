const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // console.log('req.body:', req.body);
    //console.log('in get phase with req.body:', req.body);

    const query = `SELECT * FROM phase;`;//I think we may need a junction of phase_event if we want to get with event_id?
    // const queryParams = [req.body.id]

    pool.query(query)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.put('/:id', (req, res) => {
    // POST route code here
    console.log('phase post', req.user.id, req.params);
    let checkParams = [req.user.id, req.params.id];
    let query = `
        SELECT "phase"."id", "phase"."name", "event"."id" AS "event_id", "phase"."start_date", "phase"."end_date", "event"."name" AS "event_name", "event"."hashtag", "post"."name" AS "post_name", "post"."post_text" FROM "phase"
        JOIN "event"
        ON "phase"."event_id" = "event"."id"
        JOIN "user_event"
        ON "user_event"."event_id" = "event"."id"
        JOIN "post" 
        ON "phase"."id" = "post"."phase_id"
        WHERE "user_id" = $1
        AND "phase"."id" = $2;
        `
    pool.query(query, checkParams)
    .then(result => {
        console.log('result.rows', result.rows[0]);
        //result.rows[0].start_date = result.rows[0].start_date.split('T', 1)[0];
        res.send(result.rows[0]);
    })
    .catch(err => {
        console.log('error in phase put, you might not have access', err);
        res.sendStatus(500);
    });

});

module.exports = router;
