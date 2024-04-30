const productModel = require("../Models/productsModel");
const productValidate = require("../Utils/productsValidate");
const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

/**
 * Get all Products
 */
const getAllProducts = async (req, res) => {
    try {
        let query = {};

        // Filtering logic by (Price and Category)
        if (req.query.minPrice) {
            query.price = { $gte: parseInt(req.query.minPrice) };
        }
        if (req.query.maxPrice) {
            query.price = { ...query.price, $lte: parseInt(req.query.maxPrice) };
        }
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Search logic
        if (req.query.searchTerm) {
            query.title = { $regex: new RegExp(req.query.searchTerm, 'i') };
        }

        const products = await productModel.find(query);
        res.json(products);
    } catch (err) {
        console.error('Error loading products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
let deleteProductByID = async (req, res) => {};
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
          console.log("Invalid token");
          return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      let user = await userModel.findOne({ _id: claims._id });
      if (!user) {
        console.log("User not found");
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
  const { user_id, product, quantity } = req.body;
  // console.log(quantity);

  try {
    const user = await userModel.findById(user_id);
    const productt = await productModel.findById(product);

    if (!user || !productt) 
    {
      return res.status(404).json({ message: "User or product not found" });
    }

    const existingItem = user.carts.find(item => item.product.toString() === product);

    if (existingItem) 
    {
      const newQuantity = existingItem.quantity + quantity;
      // console.log(quantity);
      // console.log(existingItem.quantity);
      // console.log(newQuantity);
      // console.log(productt.quantity);
        existingItem.quantity = newQuantity;
        productt.quantity -= quantity;
      // }
      await productt.save();
    } else {
        user.carts.push({ "product": product, "quantity": quantity });
        productt.quantity -= quantity;
      // }
      await productt.save();
    }
    await user.save();
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