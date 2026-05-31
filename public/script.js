

emailjs




let total = 0;
const cart = document.getElementById('cart');
const totalEl = document.getElementById('total');


function addItem(name, price) {
 const item = document.createElement('div');
  item.className = 'cart-item';
  item.textContent = `${name} - ₹${price}`;

 
  cart.appendChild(item);


total += price;
totalEl.textContent = total;
}


function removeItem(name, price) {
const items = document.querySelectorAll('.remove');
for (let item of items) {
if (item.textContent.includes(name)) {
item.remove();
total -= price;
if (total < 0) total = 0;
totalEl.textContent = total;
break;
}
}
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