const express = require("express");
const Router = express.Router();
const UserController = require("../Controllers/UserController");
const multerConfig = require("../Middlewares/multer");

// Router.post("/upload", multerConfig, UserController.uploadImage);
Router.get("/", UserController.GetAllUsers);
Router.get("/:id", UserController.GetUserById);
Router.post("/", multerConfig, UserController.AddNewUser);
Router.put("/:id", UserController.UpdateUser);
Router.delete("/:id", UserController.DeleteUser);

module.exports = Router;
