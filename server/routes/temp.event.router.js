const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { Router } = require('express');
require('dotenv').config();

const router = express.Router();

router.put('/:id', (req, res) => {
   console.log('temp.event router.put hit, req is', req.user.id, req.params);
   let queryText = `SELECT * FROM "event"
                     JOIN "user_event"
                     ON "user_event"."event_id" = "event"."id"
                     WHERE "user_id" = $1
                     AND "event"."id" = $2;`;
   let checkParams = [req.user.id, req.params];
   //console.log('router put hit with queryText, queryParams', queryText, queryParams);
   pool.query(queryText, checkParams)
   .then(result => {
      console.log('result', result.rows);
      res.send(result.rows);
   }).catch(err => {
      console.log('we have an error in put', err);
      res.sendStatus(500);
   });
})


module.exports = router;