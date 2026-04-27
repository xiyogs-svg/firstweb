function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    return [];
  }
}

function updateCartLink() {
  const cart = getCart();
  const link = document.getElementById("cartLink");
  if (!link) return;

  const count = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  link.textContent = count ? "Cart (" + count + ")" : "Cart";
}

function addToCart() {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({...product, qty: 1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
}

updateCartLink();
