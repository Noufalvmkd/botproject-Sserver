const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");
const  userAuth  = require("../middlewares/userAuth");
const adminAuth = require("../middlewares/adminAuth");

router.post("/create-order", userAuth, createOrder);
router.get("/my-orders", userAuth, getMyOrders);

router.get("/get-all-orders", adminAuth, getAllOrders);
router.put("/update-order-status/:id", adminAuth, updateOrderStatus);
router.delete("/delete-order/:id", adminAuth, deleteOrder);



module.exports = router;
