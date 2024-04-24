const mongoose = require("mongoose");

let reviewsSchema = new mongoose.Schema({
    "user_id": { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    "name": String, // user name
    "comment": String,
    "rating": Number,
    "date": Date
})


const productsSchema = new mongoose.Schema({
    "title": String,
    "image": String,
    "price": Number,
    "details": String,
    "quantity": Number, // in stock
    "category": String,
    "reviews": [reviewsSchema],
})


module.exports = mongoose.model("products", productsSchema);