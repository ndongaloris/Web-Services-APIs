const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    favoriteColor: String,
    email: String,
    birthday: String,
})

const userModel = model("Users", userSchema)

module.exports = userModel;