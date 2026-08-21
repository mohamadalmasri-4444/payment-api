const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// POST /api/payment
router.post("/", paymentController.handlePayment);

module.exports = router;
