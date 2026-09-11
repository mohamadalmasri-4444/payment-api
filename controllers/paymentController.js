const fs = require("fs");
const path = require("path");
const sendNotification = require("../utils/sendNotification");

exports.handlePayment = (req, res) => {
  const { userId, userName, amount, method, subscriberId } = req.body;

  const filePath = path.join(__dirname, "../payments.json");

  // قراءة الملف
  const payments = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // إنشاء ID جديد للعملية
  const newId = payments.length > 0 ? payments[payments.length - 1].id + 1 : 1;

  // تجهيز بيانات العملية
  const paymentData = {
    id: newId,
    userId,
    userName,
    amount,
    method,
    subscriberId,          // ← أضفناه هون
    payment_status: false, // بانتظار التأكيد
    time: new Date().toISOString()
  };

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
