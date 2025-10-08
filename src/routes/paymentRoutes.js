const express = require("express");
const userAuth = require("../middlewares/userAuth");

const {createPayment , paymentSuccess} = require("../controllers/paymentController");

const router = express.Router();

// POST /payment/create-checkout-session
router.post("/createpayment", userAuth , createPayment);
router.post("/payment-success", userAuth, paymentSuccess);

module.exports = router ;
