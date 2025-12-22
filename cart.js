document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemList = document.querySelector(".cart-item-list");
  const cartTotalPrice = document.querySelector(".cart-total-price");
  let total = 0;

  if (cart.length === 0) {
    cartItemList.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalPrice.innerHTML = "<p>Total: ₦0.00</p>";
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;">
      <div>
        <p>${item.name}</p>
        <p>${item.price}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemList.appendChild(itemDiv);

    // Parse price, remove non-numeric characters
    const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ""));
    total += priceNum;
  });

  cartTotalPrice.innerHTML = `<p>Total: ₦${total.toFixed(2)}</p>`;

  // Add remove functionality
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload(); // Reload to update display
    }
  });
});
