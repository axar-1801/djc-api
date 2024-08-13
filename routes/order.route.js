const express = require("express");
const {
  getOrdersByUser,
  getOrdersByDate,
  getAllOrders,
  getOrdersbyStatus,
} = require("../controllers/order.controller");

const router = express.Router();

router.get("/", getAllOrders);

router.get("/status/:status", getOrdersbyStatus);

router.get("/user/:userid", getOrdersByUser);

router.get("/date/:date", getOrdersByDate);

module.exports = router;
