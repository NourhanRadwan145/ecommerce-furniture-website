const productModel = require("../Models/productsModel");
const productValidate = require("../Utils/productsValidate");
const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const cloudUpload = require("../Utils/Cloudinary");

/**
 * Get all Products with optional category filter
 */
const getAllProducts = async (req, res) => {
  try {
    let query = {};
    if (req.query.minPrice) {
      query.price = { $gte: parseInt(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      query.price = { ...query.price, $lte: parseInt(req.query.maxPrice) };
    }
    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.searchTerm) {
      query.title = { $regex: new RegExp(req.query.searchTerm, "i") };
    }

    const products = await productModel.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
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
  console.log(req.body);
  try {
    let { error } = productValidate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let uploadedImage = await cloudUpload(req.files[0].path);

    let product = new productModel({
      title: req.body.title,
      details: req.body.details,
      price: req.body.price,
      quantity: req.body.productQuantity,
      category: req.body.productCategory,
      image: uploadedImage.url,
    });
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
    if (req.files[0] !== undefined) {
      let uploadedImage = await cloudUpload(req.files[0].path);
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
/**
 * Add Review Method
 */
let addReview = async (req, res) => {
  const { user_id, name, comment, rating } = req.body;
  const { id } = req.params;
  try {
    const product = await productModel.findById(id).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingReview = product.reviews.find((review) => {
      if (review.user_id) {
        return review.user_id.toString() === user_id;
      }
    });
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
      return res
        .status(401)
        .json({ message: "Unauthorized: JWT cookie not found" });
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * add to cart
 */

let addToCart = async (req, res) => {
  const { user_id, product, quantity } = req.body;

  try {
    const user = await userModel.findById(user_id);
    const productt = await productModel.findById(product);

    if (!user || !productt) {
      return res.status(404).json({ message: "User or product not found" });
    }

    const existingItem = user.carts.find(
      (item) => item.product.toString() === product
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      existingItem.quantity = newQuantity;
      productt.quantity -= quantity;
      await productt.save();
    } else {
      user.carts.push({ product: product, quantity: quantity });
      productt.quantity -= quantity;
      await productt.save();
    }
    await user.save();
    return res
      .status(201)
      .json({ message: "Item added to cart successfully", user });
  } catch (error) {
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
  getUserByToken,
  addToCart,
};
