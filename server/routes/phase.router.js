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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
