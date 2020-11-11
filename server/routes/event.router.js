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
    VALUES ($1,$2,$3,$4,$5,$6,$7);`;
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
     .then(()=>res.sendStatus(201))
     .catch((err) => {
         console.log('err:', err);
         res.sendStatus(500);
    })
});
    


module.exports = router;