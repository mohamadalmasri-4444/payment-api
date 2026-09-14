// جلب الطلبات من السيرفر (Google Sheets)
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
            الوقت: ${payment.time}<br>
            الحالة: <span class="status">${statusText}</span><br>
            <button class="btn" onclick="confirmPayment(${payment.id})">
                ✔ تأكيد الدفع
            </button>
        `;

        container.appendChild(div);
    });
}

// تأكيد الدفع (يدوي فقط)
function confirmPayment(id) {
    alert("✔ تم تأكيد الدفع يدويًا — التخزين الآن على Google Sheets");
}

// تحميل الطلبات عند فتح الصفحة
loadOrders();
setInterval(loadOrders, 5000);
