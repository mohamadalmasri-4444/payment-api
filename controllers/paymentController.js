const fs = require("fs");
const path = require("path");
const sendNotification = require("../utils/sendNotification");

exports.handlePayment = (req, res) => {
  const { userId, userName, amount, method } = req.body;

  // تجهيز بيانات العملية
  const paymentData = {
    userId,
    userName,
    amount,
    method,
    status: "pending",
    date: new Date().toISOString()
  };

  // مسار ملف التخزين
  const filePath = path.join(__dirname, "../database/payments.json");

  // قراءة الملف
  const payments = JSON.parse(fs.readFileSync(filePath));

  // إضافة العملية الجديدة
  payments.push(paymentData);

  // حفظ الملف
  fs.writeFileSync(filePath, JSON.stringify(payments, null, 2));

  // إرسال إشعار إلك
  sendNotification(`💰 عملية دفع جديدة من ${userName}`);

  // رد للزبون
  res.json({
    success: true,
    message: "تم تسجيل عملية الدفع، سيتم مراجعتها قريبًا."
  });
};
