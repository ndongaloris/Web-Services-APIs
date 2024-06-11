const database = require("../db/db");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res)=>{
    const result = await database.getDatabase().db().collection("users").find();
    result.toArray().then((users) =>{
        res.setHeader("Content-Type", "application/json");
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
        throw Error("error with getSingle function in the user controller", err);
    })
}

const createUser = async(req, res) =>{
        const newDoc = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            favoriteColor: req.body.favoriteColor,
            email: req.body.email,
            birthday: req.body.birthday,
        }

        await database.getDatabase().db().collection("users").insertOne(newDoc).catch((err) =>{
            throw Error("an error occur when trying to Post", err);
        }).then((data) => {
            res.send(data);
        })
}

const updateUser = async (req, res) =>{
    try{ 
        const userId = new ObjectId(req.params.id);
        const newDoc = {}
            if (req.body.firstName !== undefined) newDoc.firstName = req.body.firstName;
            if (req.body.lastName !== undefined) newDoc.lastName= req.body.lastName;
            if (req.body.middleName !== undefined) newDoc.middleName = req.body.middleName;
            if (req.body.favoriteColor !== undefined) newDoc.favoriteColor = req.body.favoriteColor;
            if (req.body.email !== undefined) newDoc.email = req.body.email;
            if (req.body.birthday !== undefined) newDoc.birthday = req.body.birthday;
        
        // const oldDoc = await database.getDatabase().db().collection("users").findOne({});
        await database.getDatabase().db().collection("users").updateOne({_id: userId}, {$set: newDoc})
        .then((data) => {
            res.send(data);
        });
    }catch(err){
        console.log("Update failed", err);
    }
}

const deleteUser = async (req, res) =>{
    try{
        const userId = new ObjectId(req.params.id);
        await database.getDatabase().db().collection("users").deleteOne({_id: userId})
        .then((data) => {
            res.send(data);
        });
    }catch(err){
        throw Error("Delete failed", err)
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}