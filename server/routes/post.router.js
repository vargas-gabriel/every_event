const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in post GET with req.user', req.user);
    const queryText = `SELECT * FROM POST`
    pool.query(queryText)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR',error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in post POST with req.body:', req.body); 
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

pool.query(queryText, [req.body.payload,'New Post', null, null, '', null, null])

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

router.delete('/:id', (req, res) => {
    console.log('in post DELETE with req.body:', req.params.id); //body or params?
    const queryText = `DELETE FROM "post" WHERE "id" = $1`;
    pool.query(queryText, [req.params.id])
    .then(() => 
        res.sendStatus(200))
    .catch(error => {
        console.log('ERROR:', error);
    })
});

module.exports = router;
