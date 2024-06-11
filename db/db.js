// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

const {MongoClient} = require("mongodb");

let database;

const initDb = (callback) =>{
    if (database){
        console.log("db is initialized");
        return callback(null, database);
    }
    
    // eslint-disable-next-line no-undef
    MongoClient.connect(process.env.DATABASE_URL)
    .then((client) => {
        database = client;
        return callback(null, database)
    })
    .catch((err) =>{
        callback(err);
    })
}


const getDatabase = () =>{
    if(!database){
        throw Error("database is empty");
    }
    else{
        return database;
    }
}
module.exports = {
    initDb,
    getDatabase,
}