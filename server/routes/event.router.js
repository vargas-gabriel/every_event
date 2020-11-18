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
    "start_date",
    "end_date",
    "hashtag",
    "type")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING "id";`;

    // const eventId = result.rows[0]

    pool //transaction
        .query(queryText, [
            req.body.eventName, 
            req.body.eventAcronym,
            req.body.eventWebsite,
            req.body.eventRegistration,
            req.body.campaignStart,
            req.body.campaignEnd,
            '#', // had to make this default hashtag value, null gave errors
            'In Person' // had to make a default type to avoid errors
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
            
                // console.log("3RD event id is:", queryText2);
                // const queryText3 = result.rows[0].id;
                const insertDefaultPhases = `
                INSERT INTO "phase" ( "event_id", "name", "start_date", "end_date")
                VALUES  ($1, $2, $3, $4);
                `;
                console.log('inserting into phases');
                pool.query(insertDefaultPhases, [queryText2, 'General', req.body.campaignStart, req.body.campaignEnd])
                pool.query(insertDefaultPhases, [queryText2, 'Ticketing', req.body.campaignStart, req.body.campaignEnd])
                pool.query(insertDefaultPhases, [queryText2, 'Speakers', req.body.campaignStart, req.body.campaignEnd])
                pool.query(insertDefaultPhases, [queryText2, 'Sponsors', req.body.campaignStart, req.body.campaignEnd])
                pool.query(insertDefaultPhases, [queryText2, 'Post Event', req.body.campaignStart, req.body.campaignEnd])
                //pool.query(insertDefaultPhases, [queryText2, 'Day Of Event', req.body.campaignStart, req.body.campaignEnd])


            })
            .catch((err) => {
                // catch for second query
                console.log("error second query", err);
                res.sendStatus(500);
            });
    
        })
        .catch((err) => {
        console.log("error first query", err);
        res.sendStatus(500);
    });
});

    

router.get('/', (req, res) => {
    console.log('req.user', req.user);
    console.log('in event GET');
    const query = `SELECT * FROM user_event WHERE "user_id" = $1;`;
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

router.get('/:id', (req, res) => {
    //console.log('in GET by id', req.user.id, req.params.id);
    // const query = `SELECT "user_event"."event_id", "event"."name", "event"."acronym", "event"."event_image", "event"."type", "event"."start_date", 
    //     "event"."end_date", "event"."website", "event"."registration_link", "event"."linkedin_account", "event"."hashtag" FROM "event" 
    //     JOIN "user_event" 
    //     ON "event"."id" = "user_event"."event_id"
    //     WHERE "event"."id" = $1
    //     AND "user_event"."user_id" = $2;`;
    const query = `SELECT * FROM "event" 
        JOIN "user_event" 
        ON "event"."id" = "user_event"."event_id"
        WHERE "event"."id" = $1
        AND "user_event"."user_id" = $2;`;
    const queryParams = [req.params.id, req.user.id]

    pool.query(query, queryParams)
    .then(results => {
        console.log('results from get:id', results.rows[0]);
        res.send(results.rows[0]);
    })
    .catch((err) => {
        console.log('err:', err);
        res.sendStatus(500);
    })
});

router.put('/:id', (req, res) => {
    console.log('router.put hit, req is', req.body, req.params);
    let queryText = `UPDATE "event" SET
                        "event_image" = $1,
                        "acronym" = $2,
                        "website" = $3,
                        "start_date" = $5,
                        "end_date" = $6,
                        "type" = $7,
                        "name" = $8
                        WHERE "id" = $4;`;
    let queryParams = [
        req.body.event_image,
        req.body.acronym,
        req.body.website,
        req.body.id,
        req.body.start_date,
        req.body.end_date,
        req.body.type,
        req.body.name
    ];
    //console.log('router put hit with queryText, queryParams', queryText, queryParams);
    pool.query(queryText, queryParams)
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('we have an error in put', err);
      res.sendStatus(500);
    });
})


module.exports = router;