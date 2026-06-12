



console.log("meaasge");


let total = 0;
const cartEl = document.getElementById('cart');
const totalEl = document.getElementById('total');
const cart = {}; // tracks qty per service

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
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();



  if (!name || !email || !phone) {
    alert("Please fill in all fields.");
    return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }


  const btn = document.getElementById("bookNow");
  btn.disabled = true;
  btn.innerText = "Sending...";

  //
emailjs.send(
  "service_yrc4fq2",
  "template_9b137vc",
  {
    name: name,   
    email: email,  
    phone: phone, 
  }
)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      alert(" Message sent successfully! We'll contact you soon.");

     
      document.getElementById("contact-name").value = "";
      document.getElementById("contact-email").value = "";
      document.getElementById("contact-phone").value = "";


     
      btn.disabled = false;
      btn.innerText = "Book Now";
    })
    .catch(function (error) {
      console.error("FAILED...", error);
      alert("Failed to send message. Please try again.");

      
      btn.disabled = false;
      btn.innerText = "Book Now";
    });
}