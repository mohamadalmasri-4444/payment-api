const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// تفعيل CORS
app.use(cors());

// استقبال JSON
app.use(bodyParser.json());

// تفعيل مجلد public إذا بدك تستخدمه
app.use(express.static("public"));

// ربط المسارات الجديدة
const paymentRoute = require("./routes/payment");
const confirmRoute = require("./routes/confirm");

app.use("/api/payment", paymentRoute);   // تسجيل عملية الدفع
app.use("/api/confirm", confirmRoute);   // تأكيد الدفع وتسليم المنتج

// ⭐⭐ مسار جلب كل عمليات الدفع للداشبورد ⭐⭐
app.get("/api/payments", (req, res) => {
  const fs = require("fs");
  const payments = JSON.parse(fs.readFileSync("payments.json", "utf8"));
  res.json({ payments });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
