const productModel = require("../Models/productsModel");
const productValidate = require("../Utils/productsValidate");
const cloudUpload = require("../Utils/Cloudinary");

/**
 * Get all Products
 */
async function getAllProducts(req, res) {
  // ==> for testing routes
  let Products = await productModel.find({});
  return res.json(Products);
}

/**
 * Get Product by name
 */
let getProductByName = async (req, res) => {
  //
};

/**
 * Get Product by ID
 */
let getProductByID = async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Create a new Product
 */
let createNewProduct = async (req, res) => {
  try {
    let { error } = productValidate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let uploadedImage = await cloudUpload(req.files[0].path);

    let product = new productModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      image: uploadedImage.url,
    });
    console.log(product);
    await product.save();
    return res.json({ message: "Product Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update Product by ID
 */
let updateProductByID = async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);
    // console.log(uploadedImage);
    console.log(product);
    if (req.files[0] !== undefined) {
      let uploadedImage = await cloudUpload(req.files[0].path);
      console.log("Image uploaded");
      product.image = uploadedImage.url;
    }
    product.title = req.body.title;
    product.details = req.body.details;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.category = req.body.category;

    let productUpdated = await productModel.findByIdAndUpdate(
      req.params.id,
      product,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(productUpdated);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * Delete Product by ID
 */
let deleteProductByID = async (req, res) => {
  try {
    let product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

let addReview = async (req, res) => {
  const { user_id, name, comment, rating } = req.body;
  // console.log('User:', user_id);
  const { id } = req.params;
  try {
    const product = await productModel.findById(id).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingReview = product.reviews.find((review) =>
      review.user_id.equals(user_id)
    );
    if (existingReview) {
      product.reviews.splice(product.reviews.indexOf(existingReview), 1);
    }
    const review = {
      user_id,
      name,
      comment,
      rating,
      date: new Date(),
    };
    product.reviews.push(review);
    await product.save();
    return res
      .status(201)
      .json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductByName,
  getProductByID,
  createNewProduct,
  updateProductByID,
  deleteProductByID,
  addReview,
};
