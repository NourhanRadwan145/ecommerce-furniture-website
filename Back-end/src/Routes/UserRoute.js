const express = require("express")
const Router = express.Router()
const UserController = require("../Controllers/UserController")

Router.post("/:id/cart", UserController.AddProductToCart);
Router.get("/", UserController.GetAllUsers)
Router.get("/:id/cart", UserController.GetCartByUserId);
Router.get("/:id/orders", UserController.GetOrdersByUserId);
Router.post("/:id/order", UserController.AddProductToOrder);
Router.get("/:id", UserController.GetUserById)
Router.post("/", UserController.AddNewUser)
Router.put("/:id", UserController.UpdateUser)
Router.delete("/:id", UserController.DeleteUser)
Router.post("/login", UserController.LoginUser)
Router.post("/register", UserController.RegisterUser)


module.exports = Router
