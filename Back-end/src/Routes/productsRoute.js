const express = require("express");
const route = express.Router();
const productsController = require("../Controllers/productsController");

route.get("/:id", productsController.getProductByID);
route.get("/:title", productsController.getProductByName);
route.get("/", productsController.getAllProducts);
route.post("/", productsController.createNewProduct);
route.put("/:id", productsController.updateProductByID);
route.delete("/:id", productsController.deleteProductByID);
route.post("/:id/reviews", productsController.addReview);


module.exports = route;