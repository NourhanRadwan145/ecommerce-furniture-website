// ---------------------------------- All Requires -------------------------------------
const UserModel = require("../Models/UserModel")
const ProductModel = require("../Models/productsModel")
const UserValidate = require("../Utils/UserValidate")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")



// ---------------------------------- Get All Users  ------------------------------------
let GetAllUsers = async (req, res) => {
    // => for testing routes
    let users = await UserModel.find({})
    return res.json(users)
}
// ---------------------------------- Get User By ID  -----------------------------------
let GetUserById = async (req, res) => {
    let userid = req.params.id
    let user = await UserModel.findById(userid)
    return res.json(user)

}
// ---------------------------------- Add New User  -------------------------------------
let AddNewUser = async (req, res) => { }
// ---------------------------------- Update User By ID  --------------------------------
// let UpdateUser = async (req, res) => { }
// ---------------------------------- Delete User By ID  ---------------------------------
// let DeleteUser = async (req, res) => { }
// ---------------------------------- End Of Controller Functions ------------------------
// ---------------------------------- Cart Operations ------------------------

// ---------------------------------- Add Product To Cart ------------------------

const AddProductToCart = async (req, res) => {
    const { userid, productid, quantity } = req.body;

    try {
        const product = await ProductModel.findById(productid);
        if (!product || product.quantity <= 0) {
            return res.status(404).json({ message: "Product not found or out of stock" });
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userid },
            { $push: { carts: { product: productid, quantity } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};




// ---------------------------------- Remove Product From Cart ------------------------
let RemoveProductFromCart = async (req, res) => {
    const { userid, productid } = req.body;

    try {
        const user = await UserModel.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItem = user.carts.find(item => item.product.toString() === productid);
        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in user's cart" });
        }

        const CartItemQunatity = cartItem.quantity;

        user.carts = user.carts.filter(item => item.product.toString() !== productid);
        await user.save();

        const product = await ProductModel.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.quantity += CartItemQunatity;
        await product.save();

        res.status(200).json({ message: "Product removed from cart successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};





// ---------------------------------- Update Product Quantity ------------------------
let IncreaseProductQuantity = async (req, res) => {
    const { userid, productid } = req.body;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userid, "carts.product": productid },
            { $inc: { "carts.$.quantity": 1 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await ProductModel.findById(productid);
        if (!product || product.quantity == 0) {
            return res.status(404).json({ message: "Product not found or out of stoke" });
        }
        product.quantity -= 1;
        await product.save();

        res.status(200).json({ message: "Product quantity increased successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


let DecreaseProductQuantity = async (req, res) => {
    const { userid, productid } = req.body;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userid, "carts.product": productid },
            { $inc: { "carts.$.quantity": -1 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await ProductModel.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.quantity += 1;
        await product.save();

        res.status(200).json({ message: "Product quantity decreased successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// ---------------------------------- End Of Cart Operations ------------------------


let UpdateUser = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        // Find the user by ID and update
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Send the updated user data back
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error updating user", error: error.message });
    }
};


// ---------------------------------- Delete User By ID  ---------------------------------
let DeleteUser = async (req, res) => { }
// ---------------------------------- Login User  ---------------------------------------
let LoginUser = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send({ message: "Invalid Email or Password" })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).send({ message: "Invalid Email or Password" })
    }
    const { _id } = user.toJSON()
    const token = jwt.sign({ _id: _id }, "secret")
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 30 * 60 * 60 * 1000
    })
    return res.status(200).json({ message: "User Logged In Successfully", user: user })

}
// ---------------------------------- Register User  ------------------------------------
let RegisterUser = async (req, res) => {
    let { error } = UserValidate(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    try {
        let name = req.body.username
        let email = req.body.email
        let password = req.body.password
        let gender = req.body.gender

        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)

        let checkUser = await UserModel.findOne({ email: email })
        if (checkUser) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        else {
            let newUser = new UserModel({
                username: name,
                email: email,
                password: hashedPassword,
                gender: gender
            })
            let savedUser = await newUser.save()
            const { _id } = savedUser.toJSON()
            // const secretKey = crypto.randomBytes(32).toString("hex") 
            const token = jwt.sign({ _id: _id }, "secret")
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 24 * 30 * 60 * 60 * 1000
            })
            // console.log(token)
            return res.status(201).json({ message: "User Created Successfully", user: savedUser })
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


// ---------------------------------- Export All Functions  ------------------------------
module.exports = { GetAllUsers, GetUserById, AddNewUser, UpdateUser, DeleteUser, LoginUser, RegisterUser, AddProductToCart, RemoveProductFromCart, IncreaseProductQuantity, DecreaseProductQuantity }
// ---------------------------------- End Of Controller ----------------------------------