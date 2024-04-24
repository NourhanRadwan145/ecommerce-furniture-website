// ---------------------------------- All Requires -------------------------------------
const UserModel = require("../Models/UserModel")
const UserValidate = require("../Utils/UserValidate")

// ---------------------------------- Get All Users  ------------------------------------
let GetAllUsers = async (req, res) => {
    // => for testing routes
    let users = await UserModel.find({})
    return res.json(users)
}
// ---------------------------------- Get User By ID  -----------------------------------
let GetUserById = async (req, res) => {
    let userId = req.params.id
    let user = await UserModel.findById(userId)
    return res.json(user)

}
// ---------------------------------- Add New User  -------------------------------------
let AddNewUser = async (req, res) => { }
// ---------------------------------- Update User By ID  --------------------------------
let UpdateUser = async (req, res) => { }
// ---------------------------------- Delete User By ID  ---------------------------------
let DeleteUser = async (req, res) => { }
// ---------------------------------- End Of Controller Functions ------------------------
// ---------------------------------- Cart Operations ------------------------

// ---------------------------------- Add Product To Cart ------------------------

const AddProductToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $push: { carts: { product: productId, quantity } } },
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
    const { userId, productId } = req.body;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { carts: { product: productId } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Product removed from cart successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

}
// ---------------------------------- Update Product Quantity ------------------------
let IncreaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId, "carts.product": productId },
            { $inc: { "carts.$.quantity": 1 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Product quantity increased successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

}
let DecreaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId, "carts.product": productId },
            { $inc: { "carts.$.quantity": -1 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Product quantity decreased successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
// ---------------------------------- Get Cart By User ID ------------------------
// let GetCartByUserId = async (req, res) => {
//     const { } = req.body;

//     try {
//         const user = await UserModel.findById(userId);

//         if (!user) {
//             return res.send(404).json({ message: "User not found" });
//         }

//         res.send(200).json({ cart: user.carts });
//         // res.status(200).json({ cart: user.carts });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// }
// ---------------------------------- End Of Cart Operations ------------------------

// ---------------------------------- Export All Functions  ------------------------------
module.exports = {
    GetAllUsers,
    GetUserById,
    AddNewUser,
    UpdateUser,
    DeleteUser,
    AddProductToCart,
    RemoveProductFromCart,
    IncreaseProductQuantity,
    DecreaseProductQuantity,
}
// ---------------------------------- End Of Controller ----------------------------------