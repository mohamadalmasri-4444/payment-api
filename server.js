const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// تفعيل CORS
app.use(cors());

// استقبال JSON
app.use(express.json());

// عرض لوحة التحكم من مجلد public
app.use(express.static(path.join(__dirname, "public")));

// ربط المسارات
const paymentRoute = require("./routes/payment");
const confirmRoute = require("./routes/confirm");
const paymentsRoute = require("./routes/payments");

app.use("/api/payment", paymentRoute);     // تسجيل عملية الدفع
app.use("/api/confirm", confirmRoute);     // تأكيد الدفع
app.use("/api/payments", paymentsRoute);   // جلب الطلبات

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
