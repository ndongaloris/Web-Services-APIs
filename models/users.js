const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const userSchema = new Schema({
    firstName: {
        firstName: String,
        require: true},
    lastName: {
        lastName: String,
        require: true},
    middleName: {
        middleName: String,
        require: true},
    favoriteColor: {
        favoriteColor: String,
        require: true},
    email: {
        email: String,
        require: true},
    birthday: {
        birthday: String,
        require: true},
})

const userModel = model("Users", userSchema)

module.exports = userModel;