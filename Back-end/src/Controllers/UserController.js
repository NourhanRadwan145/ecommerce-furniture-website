// ---------------------------------- All Requires -------------------------------------
const UserModel = require("../Models/UserModel")
const UserValidate = require("../Utils/UserValidate")

// ---------------------------------- Get All Users  ------------------------------------
let GetAllUsers = async (req, res)=>{
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
let AddNewUser = async (req, res)=>{}
// ---------------------------------- Update User By ID  --------------------------------
let UpdateUser = async (req, res)=>{
    const id= req.params.id;  
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
let DeleteUser = async (req, res)=>{}
// ---------------------------------- End Of Controller Functions ------------------------

// ---------------------------------- Export All Functions  ------------------------------
module.exports = {GetAllUsers, GetUserById, AddNewUser, UpdateUser, DeleteUser}
// ---------------------------------- End Of Controller ----------------------------------