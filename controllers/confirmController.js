const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const MANYCHAT_API_KEY = "4672631:27aaf6553a80206edbaaa35e78e3e9d2";
const BOOK_DELIVERY_FLOW_ID = "content20260809224301_09409";

exports.confirmPayment = async (req, res) => {
  const filePath = path.join(__dirname, "../payments.json");

  const payments = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const id = req.body.payment_id;
  const payment = payments.find(p => p.id == id);

  if (!payment) {
    return res.json({
      success: false,
      message: "❌ لم يتم العثور على العملية"
    });
  }

  // 1) تعديل حالة الدفع
  payment.payment_status = true;

  fs.writeFileSync(filePath, JSON.stringify(payments, null, 2));

  // 2) جلب subscriberId
  const subscriberId = payment.subscriberId;

  // 3) تشغيل Flow التسليم عبر ManyChat API
  try {
    await fetch("https://api.manychat.com/fb/sending/sendFlow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MANYCHAT_API_KEY}`
      },
      body: JSON.stringify({
        flow_id: BOOK_DELIVERY_FLOW_ID,
        subscriber_id: subscriberId
      })
    });

    return res.json({
      success: true,
      message: "✔ تم تأكيد الدفع وتشغيل فلو التسليم"
    });

  } catch (error) {
    console.error(error);

    return res.json({
      success: false,
      message: "⚠️ تم التأكيد لكن صار خطأ باستدعاء ManyChat API"
    });
  }
};
