const axios = require("axios");

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
    time: new Date().toLocaleString("ar-SY", { timeZone: "Asia/Damascus" })

  };

  try {
    // إرسال البيانات إلى SheetDB
    await axios.post("https://sheetdb.io/api/v1/ufuv0arvnthjs", paymentData);

    return res.json({
      success: true,
      message: "✔ تم تسجيل عملية الدفع بنجاح"
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "❌ خطأ أثناء إرسال البيانات إلى SheetDB"
    });
  }
};
