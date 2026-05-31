

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
    var name = document.getElementById("contact-name").value;
    var email = document.getElementById("contact-email").value;
    var phone = document.getElementById("contact-phone").value;
    var message = document.getElementById("contact-message").value;

    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    document.getElementById("contactSuccess").style.display = "block";

    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-phone").value = "";
    document.getElementById("contact-message").value = "";
}