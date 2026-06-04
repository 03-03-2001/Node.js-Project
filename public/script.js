

emailjs




let total = 0;
const cartEl  = document.getElementById('cart');
const totalEl = document.getElementById('total');
const cart    = {}; // tracks qty per service

function addItem(name, price) {
  if (cart[name]) {
    // already in cart — update qty
    cart[name].qty += 1;
    document.getElementById(`item-${name}`).textContent =
      `${name} × ${cart[name].qty} - ₹${price * cart[name].qty}`;
  } else {
    // first time — create div
    cart[name] = { price, qty: 1 };
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.id = `item-${name}`;
    item.textContent = `${name} × 1 - ₹${price}`;
    cartEl.appendChild(item);
  }
  total += price;
  totalEl.textContent = total;
}

function removeItem(name, price) {
  if (!cart[name]) return; // not in cart, do nothing

  if (cart[name].qty > 1) {
    // more than 1 — just decrease qty
    cart[name].qty -= 1;
    document.getElementById(`item-${name}`).textContent =
      `${name} × ${cart[name].qty} - ₹${price * cart[name].qty}`;
  } else {
    // qty is 1 — remove div entirely
    document.getElementById(`item-${name}`).remove();
    delete cart[name];
  }

  total -= price;
  if (total < 0) total = 0; // safety guard
  totalEl.textContent = total;
}


function sendContactMessage() {
    const name    = document.getElementById("contact-name").value.trim();
    const email   = document.getElementById("contact-email").value.trim();
    const phone   = document.getElementById("contact-phone").value.trim();
    

    // 1. Validate empty fields
    if (!name || !email || !phone) {
        alert("Please fill in all fields.");
        return;
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // 3. Validate phone (digits only, 7–15 chars)
    const phoneRegex = /^\+?[\d\s\-]{7,15}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    // 4. Send data to your backend
    fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone })
    })
    .then(response => {
        if (!response.ok) throw new Error("Server error: " + response.status);
        return response.json();
    })
    .then(data => {
        // 5. Show success only after confirmed send
        document.getElementById("contactSuccess").style.display = "block";

        // 6. Clear the form
        document.getElementById("contact-name").value    = "";
        document.getElementById("contact-email").value   = "";
        document.getElementById("contact-phone").value   = "";
       
    })
    .catch(error => {
        console.error("Failed to send message:", error);
        alert("Something went wrong. Please try again later.");
    });
}