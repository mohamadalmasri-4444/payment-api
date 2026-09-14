const fetch = require("node-fetch");

exports.handlePayment = async (req, res) => {
  const { userId, userName, amount, method, subscriberId } = req.body;

  // إنشاء ID فريد لكل عملية
  const newId = Date.now();

  // تجهيز بيانات العملية
  const paymentData = {
    id: newId,
    userId,
    userName,
    amount,
    method,
    subscriberId,
    payment_status: false, // بانتظار التأكيد
    time: new Date().toISOString()
  };

  try {
    // إرسال البيانات إلى Google Sheets
    await fetch(
      "https://script.google.com/macros/s/AKfycbwCNaW6_m6REgr5B60Oa1UvCrjaKLiXdeiM2OFWkywKs9FtnUoQJqnKFmgtC61YKN393A/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData)
      }
    );

    return res.json({
      success: true,
      message: "✔ تم تسجيل عملية الدفع بنجاح"
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "❌ خطأ أثناء إرسال البيانات إلى Google Sheets"
    });
  }
};
