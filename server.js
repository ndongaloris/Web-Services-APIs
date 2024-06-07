const express = require('express');
const app = express();
const route = require("./routes");
const database  = require("./db/db");
const bodyParser = require('body-parser');

app.use("/", route);

/* ***********************
    * Local Server Information
    * Values from .env (environment) file
*************************/
const port = process.env.PORT;
const host = process.env.HOST;

/**
* Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
* See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
*/
// const URI = process.env.DATABASE_URL;       
// const client = new database(URI);
database.initDb((err) => {
    if(err){
        console.log(err);
    }
    else{
        /* ***********************
        * Log statement to confirm server operation
        *************************/
        app.listen(port, () => {
            console.log(`app listening on ${host}:${port}`)
        });
    }
});