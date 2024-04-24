const express = require("express");
const route = express.Router();
const productsController = require("../Controllers/productsController");

route.get("/", productsController.getAllProducts);
route.get("/name/:title", productsController.getProductByName);
route.get("/:id", productsController.getProductByID);
route.post("/", productsController.createNewProduct);
route.put("/:id", productsController.updateProductByID);
route.delete("/:id", productsController.deleteProductByID);
route.post("/:id/reviews", productsController.addReview);


module.exports = route;