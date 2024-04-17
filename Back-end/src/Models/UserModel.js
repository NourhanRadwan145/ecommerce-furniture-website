const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    "username": String,
    "password": String,
    "email": String,
    "gender": String,
    "image": String, 
    "orders": [ ObjectId ],  //  array of orders ids
    "isAdmin": Boolean
})

module.exports = mongoose.model("users", UserSchema)