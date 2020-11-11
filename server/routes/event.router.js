const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { Router } = require('express');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res, next) => {
    console.log('in event POST with req.body:', req.body);
    const queryText = `INSERT INTO "event"
    ("name",
    "acronym",
    "website",
    "registration_link",
    "linkedin_oauth",
    "start_date",
    "end_date")
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING "id";`;

    // const eventId = result.rows[0]

    pool 
     .query(queryText, [
        req.body.eventName, 
        req.body.eventAcronym,
        req.body.eventWebsite,
        req.body.eventRegistration,
        req.body.eventOAuth,
        req.body.campaignStart,
        req.body.campaignEnd,
        ])
     .then((result)=>{
         console.log("new event id is:", result.rows[0].id);

         const queryText2 = result.rows[0].id;
         const insertEventJunctionQuery = `
         INSERT INTO "user_event" ("user_id", "event_id")
         VALUES  ($1, $2);
         `;

         
        // SECOND QUERY MAKES USER FOR THAT NEW MEAL
        pool
            .query(insertEventJunctionQuery, [req.user.id, queryText2])
            .then((result) => {
                //Now that both are done, send back success!
                res.sendStatus(201);
                console.log("here is your success message");
            })
            .catch((err) => {
                // catch for second query
                console.log("error second query", err);
                res.sendStatus(500);
            });
        // Catch for first query
    })
    .catch((err) => {
        console.log("error first query", err);
        res.sendStatus(500);
    });
});








    

router.get('/', (req, res) => {
    console.log('req.user', req.user);
    console.log('in event GET');
    const query = `SELECT * FROM user_event WHERE "id" = $1;`;
    const queryParams = [req.user.id]    

    pool.query(query, queryParams)
    .then(results => {
        res.send(results.rows);
    })
    .catch((err) => {
        console.log('err:', err);
        res.sendStatus(500);
    })
});


module.exports = router;