const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
    "userId": ObjectId,  // refere to the user
    "items": [{          // array of products
        "productId": ObjectId,   // refere to product id
        "quantity": Number
        }
    ],
})

module.exports = mongoose.model("carts", CartSchema)