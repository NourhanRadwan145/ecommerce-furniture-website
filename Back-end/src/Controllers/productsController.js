const productModel = require("../Models/productsModel");
const productValidate = require("../Utils/productsValidate");

/**
 * Get all Products
 */
async function getAllProducts(req, res) {
    // ==> for testing routes
    let Products = await productModel.find({});
    return res.json({ "All Products": Products });
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
    //
    let productId = req.params.id;
    let product = await productModel.findById(productId);
    return res.json(product);
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


module.exports = {
    getAllProducts,
    getProductByName,
    getProductByID,
    createNewProduct,
    updateProductByID,
    deleteProductByID,
}