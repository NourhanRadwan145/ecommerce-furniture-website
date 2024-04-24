const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: Number
});

const UserSchema = new mongoose.Schema({
    "username": String,
    "password": String,
    "email": String,
    "gender": String,
    "image": String,
    "orders": [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" },],
    "carts": [],
    "isAdmin": Boolean
})

module.exports = mongoose.model("users", UserSchema)