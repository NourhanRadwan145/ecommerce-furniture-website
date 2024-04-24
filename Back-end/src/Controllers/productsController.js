const productModel = require("../Models/productsModel");
const productValidate = require("../Utils/productsValidate");

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
    //
};

/**
 * Update Product by ID
 */
let updateProductByID = async (req, res) => {
    //
};

/**
 * Delete Product by ID
 */
let deleteProductByID = async (req, res) => {
    //
};

let addReview = async (req, res) => {
    const { user_id, name, comment, rating } = req.body;
    // console.log('User:', user_id);
    const { id } = req.params;
    try {
      const product = await productModel.findById(id).exec();
      if (!product) 
      {
        return res.status(404).json({ message: "Product not found" });
      }
      const existingReview = product.reviews.find(review => review.user_id.equals(user_id));
      if (existingReview) 
      {
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
      return res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
      console.error('Error adding review:', error);
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
}