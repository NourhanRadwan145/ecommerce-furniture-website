const mongoose = require("mongoose");

let cartSchema = new mongoose.Schema({
    "product_id": { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    "quantity": Number
})

const UserSchema = new mongoose.Schema({
    "username": {type:String,
        required:true,
    },
    "password": {type:String,
        required:true,
    },
    "email": {type:String,
        unique:true,
        required:true,
    },
    "gender": { 
        type: String, 
        enum: ['male', 'female']
    },
    "image": String, 
    "orders": [ { type: mongoose.Schema.Types.ObjectId, ref: "orders" }, ],
    "carts": [cartSchema],
    "isAdmin": { type: Boolean, default: false } 
})

module.exports = mongoose.model("users", UserSchema)