const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// اتصال MongoDB
require("./db");

const app = express();

// تفعيل CORS
app.use(cors());

// استقبال JSON
app.use(bodyParser.json());

// تفعيل مجلد public (لوحة الداشبورد)
app.use(express.static("public"));

// ربط المسارات
const paymentRoute = require("./routes/payment");
const confirmRoute = require("./routes/confirm");
const Payment = require("./models/Payment");

// تسجيل عملية الدفع
app.use("/api/payment", paymentRoute);

// تأكيد الدفع
app.use("/api/confirm", confirmRoute);

// ⭐⭐ جلب كل عمليات الدفع للداشبورد ⭐⭐
app.get("/api/payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ time: -1 });

    res.json({
      success: true,
      payments
    });

  } catch (error) {
    console.error("Payments Error:", error);

    res.status(500).json({
      success: false,
      message: "❌ خطأ في جلب العمليات"
    });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
