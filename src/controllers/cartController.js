const Cart = require("../models/cartModel");

// CREATE or UPDATE CART
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, price } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price }],
        totalPrice: quantity * price
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price });
      }

      cart.totalPrice += quantity * price;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

// GET CART BY USER ID
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId", "name price image");
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart", error: error.message });
  }
};

// REMOVE PRODUCT FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

    const removedItem = cart.items.splice(itemIndex, 1)[0];
    cart.totalPrice -= removedItem.quantity * removedItem.price;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from cart", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart
};
