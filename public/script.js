

emailjs

console.log("meaasge");


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

// Make sure this exists in your <script> tag or .js file
function sendMail() {
    const name    = document.getElementById("contact-name").value.trim();
    const email   = document.getElementById("contact-email").value.trim();
    const phone   = document.getElementById("contact-phone").value.trim();
  

    // ✅ Validate empty fields
    if (!name || !email || !phone) {
        alert("Please fill in all fields.");
        return;
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // ✅ Button loading state
    const btn = document.getElementById("bookNow");
    btn.disabled  = true;
    btn.innerText = "Sending...";

    // ✅ EmailJS v4 send method
    emailjs.send(
        "YOUR_SERVICE_ID",   // 🔁 Replace with your Service ID
        "YOUR_TEMPLATE_ID",  // 🔁 Replace with your Template ID
        {
            from_name:  name,
            from_email: email,
            phone:      phone,
           
        }
    )
    .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("✅ Message sent successfully! We'll contact you soon.");

        // Clear form fields
        document.getElementById("contact-name").value    = "";
        document.getElementById("contact-email").value   = "";
        document.getElementById("contact-phone").value   = "";
       

        // Reset button
        btn.disabled  = false;
        btn.innerText = "Book Now";
    })
    .catch(function (error) {
        console.error("FAILED...", error);
        alert("❌ Failed to send message. Please try again.");

        // Reset button
        btn.disabled  = false;
        btn.innerText = "Book Now";
    });
}