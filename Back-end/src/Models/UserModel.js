const mongoose = require("mongoose");

let cartSchema = new mongoose.Schema({
    "product": { type: mongoose.Schema.Types.ObjectId, ref: "products" },
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
    "image": {type: String, default: "https://res.cloudinary.com/dh7osyxvl/image/upload/v1714489565/Users/pngwing.com_10_lnfy4w.png"}, 
    "orders": [ { type: mongoose.Schema.Types.ObjectId, ref: "orders" }, ],
    "carts": [cartSchema],
    "isAdmin": { type: Boolean, default: false } 
})

module.exports = mongoose.model("users", UserSchema)