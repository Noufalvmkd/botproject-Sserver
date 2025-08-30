const Cart = require("../models/cartModel");
const Product = require("../models/productModel")

// CREATE or UPDATE CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "product ID and quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // ✅ Use `products` instead of `items`
    const existingItemIndex = cart.products.findIndex(p => p.productId.equals(productId));

    if (existingItemIndex !== -1) {
      cart.products[existingItemIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity, price: product.price });
    }

    cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET CART BY USER ID
const getCart = async (req, res) => {
  try {
    const  userId  = req.user.id;
    const cart = await Cart.findOne( { userId } ).populate("products.productId", "name price image");
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart", error: error.message });
  }
};

// REMOVE PRODUCT FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params; // use :productId in the route
    const userId = req.user.id;

    // Step 1: Find user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Step 2: Check if the product exists in cart
    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(400).json({ message: "Item not found in cart" });
    }

    // Step 3: Remove item
    cart.products.splice(itemIndex, 1);

    // Step 4: Recalculate total price
    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Step 5: Save updated cart
    await cart.save();

    return res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart
};
