const fetch = require("node-fetch");
const Payment = require("../models/Payment");

const MANYCHAT_API_KEY = "4672631:27aaf6553a80206edbaaa35e78e3e9d2";

exports.confirmPayment = async (req, res) => {
  try {
    const id = req.body.payment_id;

    // 1) جلب العملية من MongoDB
    const payment = await Payment.findOne({ id });

    if (!payment) {
      return res.json({
        success: false,
        message: "❌ لم يتم العثور على العملية"
      });
    }

    // 2) تعديل حالة الدفع
    payment.payment_status = true;
    await payment.save();

    // 3) جلب subscriberId
    const subscriberId = payment.subscriberId;

    // 4) إرسال كلمة done لتشغيل الفلو عبر Trigger
    await fetch("https://api.manychat.com/fb/telegram/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MANYCHAT_API_KEY}`
      },
      body: JSON.stringify({
        subscriber_id: Number(subscriberId),
        message: { text: "done" }
      })
    });

    return res.json({
      success: true,
      message: "✔ تم تأكيد الدفع وتشغيل فلو التسليم عبر Trigger"
    });

  } catch (error) {
    console.error("Confirm Error:", error);

    return res.json({
      success: false,
      message: "⚠️ تم التأكيد لكن صار خطأ باستدعاء ManyChat API"
    });
  }
};
