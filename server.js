/* eslint-disable no-undef */
const express = require('express');
const app = express();
const route = require("./routes");
const cors = require("cors");
const bodyParser = require('body-parser');


/* ***********************
 * Middleware
 * ************************/

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use("/", route);

// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
/* ***********************
    * Local Server Information
    * Values from .env (environment) file
*************************/
const port = process.env.PORT;
const host = process.env.HOST;

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

const db = require('./models');
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    /* ***********************
    * Log statement to confirm server operation
    *************************/
    app.listen(port, () => {
        console.log(`app listening on ${host}:${port}`)
    });
    console.log('Connected to the database!');
})
.catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});