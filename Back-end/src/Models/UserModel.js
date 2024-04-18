const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    "username": String,
    "password": String,
    "email": String,
    "gender": String,
    "image": String, 
    "orders": [ { type: mongoose.Schema.Types.ObjectId, ref: "orders" }, ],
    "carts": [ { type: mongoose.Schema.Types.ObjectId, ref: "products" }, ],
    "isAdmin": Boolean
})

module.exports = mongoose.model("users", UserSchema)