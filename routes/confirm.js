const express = require("express");
const router = express.Router();
const confirmController = require("../controllers/confirmController");

// POST /api/confirm
router.post("/", confirmController.confirmPayment);

module.exports = router;
