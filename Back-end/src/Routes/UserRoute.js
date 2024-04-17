const express = require("express")
const Router = express.Router()
const UserController = require("../Controllers/UserController")

Router.get("/", UserController.GetAllUsers)
Router.get("/:id", UserController.GetUserById)
Router.post("/", UserController.AddNewUser)
Router.put("/:id", UserController.UpdateUser)
Router.delete("/:id", UserController.DeleteUser)

module.exports = Router
