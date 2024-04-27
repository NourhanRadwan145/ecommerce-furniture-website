const productModel = require("../Models/productsModel");
const productValidate = require("../Utils/productsValidate");
const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

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

/**
 * Add Review to Product
 */
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
      const existingReview = product.reviews.find(review => {
        if (review.user_id){
            return review.user_id.toString() === user_id;
        }
    });
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
  

/**
 * Get User by Token
 */
const getUserByToken = async (req, res) => {
    try {
        const cookie = req.cookies["jwt"];
        if (!cookie) {
            console.log("JWT cookie not found")
            return res.status(401).json({ message: "Unauthorized: JWT cookie not found" });
        }
        const claims = jwt.verify(cookie, "secret"); 
        if (!claims) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        let user = await userModel.findOne({ _id: claims._id });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const { password, ...data } = user.toJSON();
        return res.json({ data: data });
    } catch (error) {
        console.error("Error in GetUserByToken:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


/**
 * add to cart
 */

let addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    try {
      const user = await userModel.findById(user_id);
      const product = await productModel.findById(product_id);
  
      if (!user || !product) 
      {
        return res.status(404).json({ message: "User or product not found" });
      }

      const existingItem = user.carts.find(item => item.product_id.toString() === product_id);
  
      if (existingItem) 
      {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.quantity) {
          return res.status(400).json({ message: "Quantity exceeds stock" });
        } else {
          existingItem.quantity = newQuantity;
          product.quantity -= quantity;
        }
      } else {
        if (quantity > product.quantity) {
          return res.status(400).json({ message: "Quantity exceeds stock" });
        } else {
          user.carts.push({ "product_id": product_id, "quantity": quantity });
        }
      }
  
      await Promise.all([user.save(), product.save()]);
      return res.status(201).json({ message: "Item added to cart successfully", user });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  

module.exports = {
    getAllProducts,
    getProductByName,
    getProductByID,
    createNewProduct,
    updateProductByID,
    deleteProductByID,
    addReview,
    getUserByToken,
    addToCart
}