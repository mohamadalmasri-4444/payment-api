const fs = require("fs");
const path = require("path");
const deliverProduct = require("../utils/deliverProduct");

exports.confirmPayment = (req, res) => {
  const { userId } = req.body;

  const filePath = path.join(__dirname, "../database/payments.json");

  // قراءة العمليات
  const payments = JSON.parse(fs.readFileSync(filePath));

  // البحث عن العملية
  const payment = payments.find(p => p.userId === userId && p.status === "pending");

  if (!payment) {
    return res.json({
      success: false,
      message: "ما لقيت عملية دفع معلّقة لهالزبون."
    });
  }

  // تحديث حالة العملية
  payment.status = "confirmed";

  // حفظ الملف
  fs.writeFileSync(filePath, JSON.stringify(payments, null, 2));

  // تسليم المنتج تلقائيًا
  deliverProduct(userId);

  // رد
  res.json({
    success: true,
    message: "تم تأكيد الدفع وتسليم المنتج للزبون."
  });
};
