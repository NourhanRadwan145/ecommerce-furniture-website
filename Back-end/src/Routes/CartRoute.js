const express = require("express")
const Router = express.Router()
const CartController = require("../Controllers/CartController")

Router.get("/", CartController.GetAllCarts)
Router.get("/:id", CartController.GetCartById)
Router.post("/", CartController.AddNewCart)
Router.put("/:id", CartController.UpdateCart)
Router.delete("/:id", CartController.DeleteCart)

module.exports = Router