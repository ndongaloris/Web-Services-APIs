const database = require("../db/db");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res)=>{
    const result = await database.getDatabase().db().collection("users").find();
    result.toArray().then((users) =>{
        res.setHeader("COntent-Type", "application/json");
        res.status(200).json(users)
    }).catch((err) => {
        console.log("error with getAll function in the user controller", err);
    })
}

const getSingle = async (req, res)=>{
    const userId = new ObjectId(req.params.id);
    const result = await database.getDatabase().db().collection("users").find({_id: userId});
    result.toArray().then((users) =>{
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0])
    }).catch((err) => {
        console.log("error with getSingle function in the user controller", err);
    })
}

module.exports = {
    getAll,
    getSingle
}