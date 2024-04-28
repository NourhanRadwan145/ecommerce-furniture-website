const mongoose = require("mongoose");

// Check if the model has already been defined
if (mongoose.models && mongoose.models.products) {
    module.exports = mongoose.models.products; // Export the existing model
} else {
    // Define the products schema
    let reviewsSchema = new mongoose.Schema({
        "user_id": { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        "name": String, // user name
        "comment": String,
        "rating": Number,
        "date": Date
    });

    let productsSchema = new mongoose.Schema({
        "title": String,
        "image": String,
        "price": Number,
        "details": String,
        "quantity": Number, // in stock
        "category": String,
        "reviews": [reviewsSchema],
    });

    // Define the products model
    module.exports = mongoose.model("products", productsSchema);
}
