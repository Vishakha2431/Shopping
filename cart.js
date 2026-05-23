let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cart-container");
let totalBox = document.getElementById("total");
let payBtn=document.getElementById("rzp-button1")
function displayCart() {
 container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<h2>Your cart is empty 🛒</h2>";
    totalBox.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    let div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" />
      <div class="details">
        <h3>${item.title}</h3>
        <p class="price">$${item.price}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;

    container.appendChild(div);
  });

  totalBox.innerText = "Total: $" + total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();

// 4. RAZORPAY PAYMENT
payBtn.onclick = function (e) {

    let totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

    var options = {
        key: "rzp_test_SsihVpyTV8z1Xl",
        amount: totalAmount * 100,
        currency: "INR",
        name: "MyShop Checkout",
        description: "Order Payment",
        theme: { color: "#000" },

        handler: function (response) {
            alert("Payment Successful 🎉");

            // clear cart after payment
            localStorage.removeItem("cart");
            window.location.reload();
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();

    e.preventDefault();
};