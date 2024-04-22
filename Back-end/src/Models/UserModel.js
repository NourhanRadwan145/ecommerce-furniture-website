const mongoose = require("mongoose");
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
    "carts": [ { type: mongoose.Schema.Types.ObjectId, ref: "products" }, ],
    "isAdmin": { type: Boolean, default: false } 
})

module.exports = mongoose.model("users", UserSchema)