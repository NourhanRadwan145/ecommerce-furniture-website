const express = require("express")
const Router = express.Router()
const UserController = require("../Controllers/UserController")

Router.get("/:id", UserController.GetUserById)
Router.get("/", UserController.GetAllUsers)
Router.post("/", UserController.AddNewUser)
Router.put("/:id", UserController.UpdateUser)
Router.delete("/:id", UserController.DeleteUser)

// Cart Routes
// Router.get("/cart", UserController.GetCartByUserId)
Router.post("/cart/add", UserController.AddProductToCart)
Router.delete("/cart/remove", UserController.RemoveProductFromCart)
Router.put("/cart/decrease", UserController.DecreaseProductQuantity)
Router.put("/cart/increase", UserController.IncreaseProductQuantity)

module.exports = Router
