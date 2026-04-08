

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
const items = document.querySelectorAll('.cart-item');
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



const url = "https://api.emaljs.com/api/v1.0/email/send"; 


const data ={
  name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone:document.getElementById("phone").value
}
  fetch("https://api.emailjs.com/api/v1.0/email/send", {
  method: "POST",
  body: JSON.stringify(data)
});







emailjs.init("WQp9xAbC12345");


 document.getElementById("contact-Form").addEventListener("click", function () {

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone:document.getElementById("phone").value,
  };
   const serviceID = "service_yrc4fq2"
  const templateID = "template_9b137vc" 

  emailjs.send(serviceID,templateID,params)

  .then((response) => {
     document.getElementById("name").value ="";
     document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
     console.log('res');
    alert("Thank you for booking! We will get back to you soon." ,response.status, response.text);
  })
  .catch(err => {
     console.error("EmailJS error:", err);
  });

});








