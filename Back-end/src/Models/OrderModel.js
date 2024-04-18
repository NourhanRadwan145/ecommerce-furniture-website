const mongoose = require("mongoose");

const OredersSchema = new mongoose.Schema({
    "userId": { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    "username": String,
    "date": Date,
    "totalPrice": Number,
    "products": [ { type: mongoose.Schema.Types.ObjectId, ref: "products" } ],
    "status": String, //====> Pending, Accepted, Rejected
})

module.exports = mongoose.model("orders", OredersSchema);