const express = require("express");
const route = express.Router();
const orderController = require("../Controllers/OrderController");

route.get("/weeklySales", orderController.weeklySales);
route.get("/salesPerWeek", orderController.salesPerWeek);
route.get("/dailySales", orderController.dailySales);
route.get("/weekly", orderController.weeklyOrders);
route.get("/daily", orderController.dailyOrders);
route.get("/", orderController.getAllOrders);
route.get("/:id", orderController.getOrderById);
route.get("/:status", orderController.getOrderByStatus);
route.post("/", orderController.createNewOrder);
route.put("/:id", orderController.updateOrderByID);
route.delete("/:id", orderController.deleteOrderByID);


module.exports = route;
