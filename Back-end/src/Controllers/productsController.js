const ProductModel = require('../Models/ProductsModel'); 

/**
 * Get all Products with filtering and searching
 */
async function getAllProducts(req, res) {
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