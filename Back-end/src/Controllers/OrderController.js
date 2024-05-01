const OrderModel = require("../Models/OrderModel");
const orderModel = require("../Models/OrderModel");
const orderValidate = require("../Utils/OrderValidate");

/**
 * Get all orders
 */
let getAllOrders = async (req, res) => {
  // ==> for testing routes
  let pipeline = [
    {
      $project: {
        userId: 1,
        username: 1,
        totalPrice: 1,
        status: 1,
        products: 1,
        date: 1,
        daysDifference: {
          $floor: {
            $divide: [
              { $subtract: [new Date(), "$date"] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
    },
  ];
  let orders = await orderModel.aggregate(pipeline);
  // console.log(orders);
  return res.json(orders);
};


/**
 * Get order by status
 */
let getOrderByStatus = (req, res) => {
  //
};

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
};

/**
 * Update order by ID
 */
let updateOrderByID = async (req, res) => {
  try {
    let order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

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
/**
 * Get weekly orders
 */
let weeklyOrders = async (req, res) => {
  try {
    let pipeline = [
      {
        $match: {
          date: {
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // Filter orders from the last 7 days
          },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 }, // Count the number of orders
        },
      },
    ];
    let orders = await orderModel.aggregate(pipeline);
    console.log(orders);
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
/**
 * Get daily orders
 */
let dailyOrders = async (req, res) => {
  try {
    let pipeline = [
      {
        $match: {
          date: {
            $gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // Filter orders from the last 1 days
          },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 }, // Count the number of orders
        },
      },
    ];
    let orders = await orderModel.aggregate(pipeline);
    console.log(orders);
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
/**
 * Get weekly sales
 */
let weeklySales = async (req, res) => {
  try {
    let pipeline = [
      {
        $match: {
          date: {
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // Filter orders from the last 7 days
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" }, // Count the number of orders
        },
      },
    ];
    let orders = await orderModel.aggregate(pipeline);
    console.log(orders);
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
/**
 * Get daily sales
 */
let dailySales = async (req, res) => {
  try {
    let pipeline = [
      {
        $match: {
          date: {
            $gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // Filter orders from the last 1 days
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" }, // Count the number of orders
        },
      },
    ];
    let orders = await orderModel.aggregate(pipeline);
    console.log(orders);
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
/**
 * Get sales per week
 */
let salesPerWeek = async (req, res) => {
  try {
    let pipeline = [
      {
        $group: {
          _id: { $week: "$date" },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ];
    let orders = await orderModel.aggregate(pipeline);
    console.log(orders);
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderByStatus,
  getOrderById,
  createNewOrder,
  updateOrderByID,
  deleteOrderByID,
  weeklyOrders,
  dailyOrders,
  weeklySales,
  dailySales,
  salesPerWeek,
};
