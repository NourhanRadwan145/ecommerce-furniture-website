const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    "title": String,
    "image": String,
    "price": Number,
    "details": String
})


module.exports = mongoose.model("products", productsSchema);