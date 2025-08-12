const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");

// Add or update cart
router.post("/", addToCart);

// Get cart by user ID
router.get("/:userId", getCart);

// Remove item from cart
router.put("/remove", removeFromCart);

module.exports = router;
