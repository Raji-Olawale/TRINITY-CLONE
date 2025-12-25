document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemList = document.querySelector(".cart-item-list");
  const cartTotalPrice = document.querySelector(".cart-total-price");

  function updateCartDisplay() {
    cartItemList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemList.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalPrice.innerHTML = "<p>Total: ₦0.00</p>";
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      const quantity = item.quantity || 1;
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ""));
      const itemTotal = priceNum * quantity;
      total += itemTotal;

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;">
        <div>
          <p>${item.name}</p>
          <p>${item.price}</p>
          <div class="quantity-controls">
            <button class="decrement-btn" data-index="${index}">-</button>
            <span class="quantity">${quantity}</span>
            <button class="increment-btn" data-index="${index}">+</button>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemList.appendChild(itemDiv);
    });

    cartTotalPrice.innerHTML = `<p>Total: ₦${total.toFixed(2)}</p>`;
  }

  updateCartDisplay();

  // Add increment, decrement, and remove functionality
  document.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("increment-btn")) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    } else if (e.target.classList.contains("decrement-btn")) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    } else if (e.target.classList.contains("remove-btn")) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  });
});
