const Order = require("../models/OrderModel");
const Product = require("../models/productModel");
const Cart = require('../models/cartModel')



const createOrder = async (req, res) => {
  try {
    const { products, shippingInfo, paymentInfo, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    const newOrder = new Order({
      user: req.user.id,
      products: products.map((item) => ({
    product: item.productId, //  store under "product"
    quantity: item.quantity,
    price: item.price,
  })),
      shippingInfo,
      paymentInfo,
      totalAmount,
    });

    await newOrder.save();

    //  Clear cart after order is placed
    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { products: [], totalPrice: 0 } }
    );

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Create Order Error:", error.message);
    res.status(500).json({ message: "Failed to create order" });
  }
};


// @desc    Get logged-in user’s orders
// @route   GET /api/orders/my-orders
// @access  Private (user)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.product", "name price image");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders", error: error.message });
  }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id
// @access  Private (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    order.orderStatus = status;

    // If COD → mark as paid on delivery
    if (status === "delivered" && order.paymentInfo.method === "COD") {
      order.paymentInfo.status = "paid";
    }

    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
