const dotenv = require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

let database;

const initDb = (callback) =>{
    if (database){
        console.log("db is initialized");
        return callback(null, database);
    }
    MongoClient.connect(process.env.DATABASE_URL)
    .then((client) => {
        database = client;
        return callback(null, database)
    })
    .catch((err) =>{
        callback(err);
    })
}


module.exports = {
    initDb,
    database,
}