const express = require("express");
const cors = require("cors");

const app = express();

// تفعيل CORS
app.use(cors());

// استقبال JSON
app.use(express.json());

// عرض لوحة التحكم
app.use(express.static("dashboard"));

// ربط المسارات
const paymentRoute = require("./routes/payment");
const confirmRoute = require("./routes/confirm");
const paymentsRoute = require("./routes/payments"); // ← ملف جديد مهم

app.use("/api/payment", paymentRoute);     // تسجيل عملية الدفع
app.use("/api/confirm", confirmRoute);     // تأكيد الدفع (يدوي)
app.use("/api/payments", paymentsRoute);   // جلب الطلبات من Google Sheets

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
