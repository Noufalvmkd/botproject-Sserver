const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");
const  userAuth  = require("../middlewares/userAuth");

// Add or update cart
router.post("/add-cart",userAuth, addToCart);

// Get cart by user ID
router.get("/get-cart", userAuth , getCart);

// Remove item from cart
router.delete("/remove/:productId", userAuth, removeFromCart);


module.exports = router;
