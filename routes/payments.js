const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// جلب الطلبات من Google Sheets
router.get("/", async (req, res) => {
  try {
    const sheetUrl =
      "https://docs.google.com/spreadsheets/d/1/edit?usp=sharing&sheet=Sheet1&headers=1&tqx=out:json";

    const response = await fetch(sheetUrl);
    const text = await response.text();

    const json = JSON.parse(text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1));

    const rows = json.table.rows.map(r => ({
      id: r.c[0]?.v,
      userId: r.c[1]?.v,
      userName: r.c[2]?.v,
      amount: r.c[3]?.v,
      method: r.c[4]?.v,
      subscriberId: r.c[5]?.v,
      payment_status: r.c[6]?.v,
      time: r.c[7]?.v
    }));

    res.json({ payments: rows });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "❌ خطأ أثناء قراءة البيانات من Google Sheets" });
  }
});

module.exports = router;
