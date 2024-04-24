const productModel = require("../Models/productsModel");

/**
 * Get all Products with filtering and searching
 */
async function getAllProducts(req, res) {
    try {
        let query = {};

        // Filtering logic
        if (req.query.minPrice) {
            query.price = { $gte: parseInt(req.query.minPrice) };
        }
        if (req.query.maxPrice) {
            query.price = { ...query.price, $lte: parseInt(req.query.maxPrice) };
        }

        // Search logic
        if (req.query.searchTerm) {
            query.title = { $regex: new RegExp(req.query.searchTerm, 'i') };
        }

        const products = await productModel.find(query);
        res.json({ "All Products": products });
    } catch (err) {
        console.error('Error loading products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
