// جلب الطلبات من السيرفر
async function loadOrders() {
    const res = await fetch('/api/payments');
    const data = await res.json();

    const container = document.getElementById('orders');
    container.innerHTML = '';

    data.payments.forEach(payment => {
        const div = document.createElement('div');
        div.className = 'order';

        const statusText = payment.payment_status ? '✔ مؤكد' : '⏳ بانتظار التأكيد';

        div.innerHTML = `
            <strong>طلب #${payment.id}</strong><br>
            الاسم: ${payment.userName}<br>
            رقم المستخدم: ${payment.userId}<br>
            طريقة الدفع: ${payment.method}<br>
             الوقت: ${new Date(payment.time).toLocaleString("ar-SY", { timeZone: "Asia/Damascus" })}<br>
            الحالة: <span class="status">${statusText}</span><br>
            <button class="btn" onclick="confirmPayment(${payment.id})"
                ${payment.payment_status ? 'disabled' : ''}>
                ✔ تأكيد الدفع
            </button>
        `;

        container.appendChild(div);
    });
}

// تأكيد الدفع
async function confirmPayment(id) {
    const res = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_id: id })
    });

    const data = await res.json();
    alert(data.message);

    loadOrders(); // تحديث الصفحة
}

// تحميل الطلبات عند فتح الصفحة
loadOrders();
setInterval(loadOrders, 5000);
