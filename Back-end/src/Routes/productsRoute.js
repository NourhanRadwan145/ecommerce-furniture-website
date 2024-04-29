const express = require("express");
const route = express.Router();
const productsController = require("../Controllers/productsController");

route.get("/:id", productsController.getProductByID);
route.get("/", productsController.getAllProducts);
route.get("/:title", productsController.getProductByName);
route.post("/", productsController.createNewProduct);
route.put("/:id", productsController.updateProductByID);
route.delete("/:id", productsController.deleteProductByID);
route.post("/:id/reviews", productsController.addReview);
route.get("/user/product/token", productsController.getUserByToken);
route.post("/product/addtocart", productsController.addToCart);


module.exports = route;