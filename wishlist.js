document.addEventListener("DOMContentLoaded", () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistItemList = document.querySelector(".wishlist-item-list");
  const wishlistItems = document.querySelector(".wishlist-items");

  if (wishlist.length === 0) {
    wishlistItemList.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("wishlist-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <p>${item.name}</p>
        <p>${item.price}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    wishlistItemList.appendChild(itemDiv);
  });

  // Add remove functionality
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      location.reload(); // Reload to update display
    }
  });
});
