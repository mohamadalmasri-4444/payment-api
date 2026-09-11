const sendNotification = require("../utils/sendNotification");
const Payment = require("../models/Payment");

exports.handlePayment = async (req, res) => {
  try {
    const { userId, userName, amount, method, subscriberId } = req.body;

    const newPayment = new Payment({
      id: Date.now(),
      userId,
      userName,
      amount,
      method,
      subscriberId,
      payment_status: false,
      time: new Date()
    });

    await newPayment.save();

    sendNotification(`💰 عملية دفع جديدة من ${userName}`);

    res.json({
      success: true,
      message: "✔ تم تسجيل عملية الدفع، سيتم مراجعتها قريبًا."
    });

  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      success: false,
      message: "❌ حدث خطأ في السيرفر"
    });
  }
};
