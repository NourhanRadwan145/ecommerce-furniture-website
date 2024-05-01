// ---------------------------------- All Requires -------------------------------------
const UserModel = require("../Models/UserModel");
const UserValidate = require("../Utils/UserValidate");
const bcrypt = require("bcryptjs");
const cloudUpload = require("../Utils/Cloudinary");
// ---------------------------------- Get All Users  ------------------------------------
let GetAllUsers = async (req, res) => {
  // => for testing routes
  try {
    let users = await UserModel.find({});
    if (!users) return res.json({ message: "No Users Found" });
    return res.json(users);
  } catch (err) {
    return res.json(err);
  }
};
// ---------------------------------- Get User By ID  -----------------------------------
let GetUserById = async (req, res) => {
  try {
    console.log(req.params.id);
    let user = await UserModel.findById(req.params.id);
    if (!user) return res.json({ message: "No User Found" });
    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
};
// ---------------------------------- Add New User  -------------------------------------
let AddNewUser = async (req, res) => {
  try {
    let { error } = UserValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let salt = await bcrypt.genSalt(10);
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, salt);

    // Adding Image to Cloudinary

    let uploadedImage = await cloudUpload(req.files[0].path);
    console.log(uploadedImage);

    let user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      image: uploadedImage.url,
      gender: req.body.gender,
    });
    console.log(user);
    await user.save();
    return res.json({ message: "User Added Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------------------------- Update User By ID  --------------------------------
let UpdateUser = async (req, res) => {
  try {
    let { error } = UserValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let salt = await bcrypt.genSalt(10);
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, salt);
    let user = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        // password: hashedPassword,
        // image: req.body.image,
      },
      { new: true }
    );
    if (!user) return res.json({ message: "No User Found" });
    return res.json({ message: "User Updated Successfully" });
  } catch (err) {
    return res.json(err);
  }
};
// ---------------------------------- Delete User By ID  ---------------------------------
let DeleteUser = async (req, res) => {
  try {
    let user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.json({ message: "No User Found" });
    return res.json({ message: "User Deleted Successfully" });
  } catch (err) {
    return res.json(err);
  }
};
// ---------------------------------- Upload Image  --------------------------------------
let uploadImage = async (req, res) => {
  console.log(req.files[0]);
  res.json({ message: "Image Uploaded Successfully" });
};

// ---------------------------------- End Of Controller Functions ------------------------

// ---------------------------------- Export All Functions  ------------------------------
module.exports = {
  GetAllUsers,
  GetUserById,
  AddNewUser,
  UpdateUser,
  DeleteUser,
  uploadImage,
};
// ---------------------------------- End Of Controller ----------------------------------
