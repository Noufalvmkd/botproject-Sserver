const Order = require("../models/OrderModel");
const Product = require("../models/productModel");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (user)
const createOrder = async (req, res) => {
  try {
    const { products, shippingInfo, paymentInfo } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    // calculate total amount
    let totalAmount = 0;
    products.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    const order = new Order({
      user: req.user.id,  // comes from authMiddleware
      products,
      shippingInfo,
      paymentInfo,
      totalAmount
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
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

    order.orderStatus = status || order.orderStatus;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

// @desc    Delete order (optional, for testing/admin)
// @route   DELETE /api/orders/:id
// @access  Private (admin)
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
