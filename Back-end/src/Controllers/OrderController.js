const orderModel = require("../Models/OrderModel");
const orderValidate = require("../Utils/OrderValidate");


/**
 * Get all orders
 */
let getAllOrders = async (req, res) => {
    // ==> for testing routes
    // let orders = await orderModel.find({});
    // return res.json(orders);
}


/**
 * Get order by status
 */
let getOrderByStatus = (req, res) => {
    //
}

/**
 * Get order by ID
 */
let getOrderById = (req, res) => {
    //
}

/**
 * Create a new order
 */
let createNewOrder = (req, res) => {
    //
}

/**
 * Update order by ID
 */
let updateOrderByID = (req, res) => {
    //
}

/**
 * Delete order by ID
 */
let deleteOrderByID = (req, res) => {
    //
}

module.exports = {
    getAllOrders,
    getOrderByStatus,
    getOrderById,
    createNewOrder,
    updateOrderByID,
    deleteOrderByID,
}