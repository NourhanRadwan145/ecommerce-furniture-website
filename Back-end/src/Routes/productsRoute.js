const express = require("express");
const route = express.Router();
const productsController = require("../Controllers/productsController");
const multerConfig = require("../Middlewares/multer");

route.get("/", productsController.getAllProducts);
route.get("/name/:title", productsController.getProductByName);
route.get("/:id", productsController.getProductByID);
route.post("/", multerConfig, productsController.createNewProduct);
route.put("/:id", multerConfig, productsController.updateProductByID);
route.delete("/:id", productsController.deleteProductByID);
route.post("/:id/reviews", productsController.addReview);

module.exports = route;
