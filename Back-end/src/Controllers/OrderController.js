const OrderModel = require("../Models/OrderModel");
const orderModel = require("../Models/OrderModel");
const orderValidate = require("../Utils/OrderValidate");


/**
 * Get all orders
 */
let getAllOrders = async (req, res) => {
    // ==> for testing routes
    let orders = await orderModel.find({});
    return res.json(orders);
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
let getOrderById = async (req, res) => {
    let orderId = req.params.id;
    let order = await OrderModel.findById(orderId);
    return res.json(order);
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
let deleteOrderByID = async(req, res) => {
    const orderId = req.params.id;  // ID from the URL parameter

    if (!orderId) {
        return res.status(400).send({ message: "Order ID is required" });
    }

    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.send({ message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        res.status(500).send({ message: "Error deleting order", error: error.message });
    }
}

module.exports = {
    getAllOrders,
    getOrderByStatus,
    getOrderById,
    createNewOrder,
    updateOrderByID,
    deleteOrderByID,
}