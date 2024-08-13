const Order = require("../models/order.model");

const getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find().sort({ order_datetime: -1 });
    res.status(200).json(orderList);
  } catch (err) {
    res.status(500).json({ message: "Orders not found" });
  }
};

const getOrdersbyStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const orderList = await Order.find({ status: status });
    if (orderList.length == 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(201).json(orderList);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders by status" });
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    const userid = req.params.userid;
    const order = await Order.find({ userId: userid });
    if (!order || order.length == 0) {
      return res.status(500).json({ message: "No orders placed" });
    }
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order not found" });
  }
};

const getOrdersByDate = async (req, res) => {
  try {
    const dateString = req.params.date;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    const orders = await Order.find({
      $expr: {
        $eq: [
          { $substr: [{ $toString: "$order_datetime" }, 0, 10] },
          dateString,
        ],
      },
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the specified date" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getOrdersByUser,
  getOrdersByDate,
  getAllOrders,
  getOrdersbyStatus,
};
