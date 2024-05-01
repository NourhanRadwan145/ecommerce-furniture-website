const orderModel = require("../Models/OrderModel");
const orderValidate = require("../Utils/OrderValidate");

// const faker = require("@faker-js/faker");
// const numFakeOrders = 10;

// const generateFakeOrders = (numOrders) => {
//   const statuses = ["pending", "accepted", "rejected"];

//   return Array.from({ length: numOrders }, () => {
//     return {
//       username: faker.faker.internet.userName(),
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       totalPrice: faker.faker.commerce.price(),
//       date: faker.faker.date.recent(),
//     };
//   });
// };

// const insertFakeOrders = async (numOrders) => {
//   const fakeOrders = generateFakeOrders(numOrders);
//   await orderModel.insertMany(fakeOrders);
// };
// insertFakeOrders(numFakeOrders);
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
let getOrderById = (req, res) => {
  //
};

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
    console.log(req.params.id, req.body);
    // let order = await orderModel.findById(req.params.id);
    // console.log(order);
    let order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // console.log(order);
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
let deleteOrderByID = (req, res) => {
  //
};
/***
 * Counting Orders For last Seven Days
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
