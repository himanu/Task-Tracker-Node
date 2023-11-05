const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./database');
const router = require('./routes');

const app = express();
app.use(bodyParser.json()); 
app.use('/', (req, res, next) => {
    const origin = req.get('origin');
    if (origin === 'http://localhost:3000' || origin === 'https://track-tasks-12.netlify.app')
        res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', ['content-type', 'Authorization']);
    next();
})
app.use(router);

/** test db connection and turn on nodejs server */
sequelize.authenticate().then(() => {
    console.log("Connected to DB");
    /** start nodejs server */
    app.listen(4000, () => {
        console.log("live");
    })
}).catch((err) => {
    console.log("DB connection fails ", err);
})