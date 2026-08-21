const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// إنشاء التطبيق
const app = express();

// تفعيل CORS
app.use(cors());

// تفعيل استقبال JSON
app.use(bodyParser.json());

// تفعيل مجلد public لعرض صفحات HTML
app.use(express.static("public"));


// ربط المسارات
const paymentRoute = require("./routes/payment");
const confirmRoute = require("./routes/confirm");

app.use("/api/payment", paymentRoute);
app.use("/api/confirm", confirmRoute);

// تخزين الطلبات مؤقتاً داخل Array
let orders = [];

// مسار إنشاء طلب جديد
app.post('/api/create-order', (req, res) => {
    const { name, phone, payment_method } = req.body;

    const newOrder = {
        id: orders.length + 1,
        name,
        phone,
        payment_method,
        time: new Date().toLocaleString(),
        status: "pending"
    };

    orders.push(newOrder);

    res.json({
        success: true,
        message: "Order created successfully",
        order: newOrder
    });
});

// مسار عرض كل الطلبات
app.get('/api/orders', (req, res) => {
    res.json({
        success: true,
        orders: orders
    });
});

// مسار تأكيد الدفع
app.post('/api/confirm-payment', (req, res) => {
    const { order_id } = req.body;

    // البحث عن الطلب
    const order = orders.find(o => o.id === order_id);

    if (!order) {
        return res.json({
            success: false,
            message: "Order not found"
        });
    }

    // تغيير حالة الطلب
    order.status = "confirmed";

    res.json({
        success: true,
        message: "Payment confirmed",
        order: order
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

