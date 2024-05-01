const express = require("express")
const Router = express.Router()
const UserController = require("../Controllers/UserController")
const multerConfig = require("../Middlewares/multer");

Router.get("/", UserController.GetAllUsers)
Router.get("/:id/cart", UserController.GetCartByUserId);
Router.get("/:id/orders", UserController.GetOrdersByUserId);
Router.post("/:id/order", UserController.AddProductToOrder);
Router.get("/:id", UserController.GetUserById)
Router.post("/", multerConfig, UserController.AddNewUser);
Router.put("/:id", UserController.UpdateUser)
Router.delete("/:id", UserController.DeleteUser)
Router.post("/login", UserController.LoginUser)
Router.post("/register", UserController.RegisterUser)
Router.get("/user/user", UserController.GetUserByToken)
Router.post("/user/logout", UserController.userLogout)
Router.put("/cart/decrease", UserController.DecreaseProductQuantity)
Router.put("/cart/increase", UserController.IncreaseProductQuantity)
Router.delete("/cart/remove", UserController.RemoveProductFromCart)



module.exports = Router;
