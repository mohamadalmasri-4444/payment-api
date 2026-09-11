const mongoose = require("../db");

const PaymentSchema = new mongoose.Schema({
  id: Number,
  subscriberId: String,
  userName: String,
  userId: String,
  method: String,
  amount: Number,
  time: Date,
  payment_status: Boolean
});

module.exports = mongoose.model("Payment", PaymentSchema);
