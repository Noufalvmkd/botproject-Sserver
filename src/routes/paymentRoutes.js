const express = require("express");
const userAuth = require("../middlewares/userAuth");

const createPayment = require("../controllers/paymentController");

const router = express.Router();

// POST /payment/create-checkout-session
router.post("/createpayment", userAuth , createPayment);

module.exports = router ;
