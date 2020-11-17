const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});


router.put('/', (req, res) => {
    console.log('in hashtag put with req.body', req.body);
    const queryText = `UPDATE "event" SET
    "hashtag" = $1
    WHERE "id" = $2
    ;`;
    const queryParams = [req.body.hashtag, req.body.event_id]
    pool.query(queryText, queryParams)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('err:', err);
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
