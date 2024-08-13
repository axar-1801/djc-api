const express = require("express");
const {
  getProductsList,
  getProductById,
  addProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/", getProductsList);

router.get("/:id", getProductById);

router.post("/", addProduct);

module.exports = router;
