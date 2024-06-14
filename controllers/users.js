const ObjectId = require("mongodb").ObjectId; 
const database = require("../models");
const User = database.users;

exports.getAll = (req, res)=>{
    User.find().then((users) =>{
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users)
    }).catch((err) => {
        console.log("error with getAll function in the user controller", err);
    })
}

exports.getSingle = (req, res)=>{
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
        }
    const userId = new ObjectId(req.params.id);
    User.find({_id: userId}).then((users) =>{
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0])
    }).catch((err) => {
        throw Error("error with getSingle function in the user controller", err);
    })
}

exports.createUser =(req, res) =>{
        const newDoc = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            favoriteColor: req.body.favoriteColor,
            email: req.body.email,
            birthday: req.body.birthday,
        })

        newDoc.save(newDoc).then((data) => {
            res.send(data);
        }).catch((err) =>{
            throw Error("an error occur when trying to Post", err);
        })
}

exports.updateUser = (req, res) =>{
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const newDoc = {}
        if (req.body.firstName !== undefined) newDoc.firstName = req.body.firstName;
        if (req.body.lastName !== undefined) newDoc.lastName= req.body.lastName;
        if (req.body.middleName !== undefined) newDoc.middleName = req.body.middleName;
        if (req.body.favoriteColor !== undefined) newDoc.favoriteColor = req.body.favoriteColor;
        if (req.body.email !== undefined) newDoc.email = req.body.email;
        if (req.body.birthday !== undefined) newDoc.birthday = req.body.birthday;
    
    // const oldDoc = database.getDatabase().db().collection("users").findOne({});
    User.updateOne({_id: userId}, {$set: newDoc})
    .then((data) => {
        res.send(data);
    }).catch((err) =>{
        throw Error("Update failed", err);
    })
}

exports.deleteUser = (req, res) =>{
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.id);
    User.deleteOne({_id: userId})
    .then((data) => {
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    }).catch((err) =>{
        throw Error("Delete failed", err);
    })
}