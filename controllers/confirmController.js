exports.confirmPayment = async (req, res) => {
  // بما أن التخزين صار على Google Sheets، والتأكيد يدوي،
  // ما عاد في داعي نقرأ أو نكتب داخل ملف JSON

  return res.json({
    success: true,
    message: "✔ تم تأكيد الدفع يدويًا — التخزين الآن على Google Sheets"
  });
};
