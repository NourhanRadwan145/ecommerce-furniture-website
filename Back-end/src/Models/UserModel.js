const mongoose = require("mongoose");

let cartSchema = new mongoose.Schema({
    "product": { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    "quantity": Number
})

const UserSchema = new mongoose.Schema({
    "username": String,
    "password": String,
    "email": String,
    "gender": { type: String , enum:["male", "female"] },
    "image": String, 
    "orders": [ { type: mongoose.Schema.Types.ObjectId, ref: "orders" }, ],
    "carts": [cartSchema],
    "isAdmin": Boolean
})

module.exports = mongoose.model("users", UserSchema)