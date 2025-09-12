const express = require("express");
const userAuth = require("../middlewares/userAuth");

const createPayment = require("../controllers/paymentController");

const router = express.Router();

// POST /payment/create-checkout-session
router.post("/create-checkout-session", userAuth , createPayment);

module.exports = router ;
