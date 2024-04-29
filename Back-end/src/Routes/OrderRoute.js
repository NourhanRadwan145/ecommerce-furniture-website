const express = require("express");
const route = express.Router();
const orderController = require("../Controllers/OrderController")

route.get("/", orderController.getAllOrders);
route.get("/:id", orderController.getOrderById);
route.get("/:status", orderController.getOrderByStatus);
route.post("/", orderController.createNewOrder);
route.put("/:id", orderController.updateOrderByID);
route.delete("/:id", orderController.deleteOrderByID);
//route.put('/api/orders/users/:userId/orders/:orderId', orderController.updateOrderByUserId);



module.exports = route;