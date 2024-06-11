/* eslint-disable no-undef */
const express = require('express');
const app = express();
const route = require("./routes");
const cors = require("cors");
const database  = require("./db/db");

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use("/", route);

/* ***********************
    * Local Server Information
    * Values from .env (environment) file
*************************/
const port = process.env.PORT;
const host = process.env.HOST;


database.initDb((err) => {
    if(err){
        console.log(err);
    }
    else{
        const db = require('./models');
        db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Connected to the database!');
        })
        .catch((err) => {
            console.log('Cannot connect to the database!', err);
            process.exit();
        });
        /* ***********************
        * Log statement to confirm server operation
        *************************/
        app.listen(port, () => {
            console.log(`app listening on ${host}:${port}`)
        });
    }
});