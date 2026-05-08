function getCart() {
  try {
    return normalizeCart(JSON.parse(localStorage.getItem("cart")) || []);
  } catch (error) {
    return [];
  }
}

function getCartItemKey(item) {
  return [
    item.id || item.name || "",
    item.color || "Black",
    item.size || ""
  ].join("::").toLowerCase();
}

function getProductUrl(item) {
  const productUrls = {
    "tevis-top": "kiro1.html",
    "kilian-skirt": "kiro2.html",
    "blake-clutch": "kiro3.html",
    "milly-pump": "kiro4.html"
  };
  return item.url || productUrls[item.id] || "";
}

function normalizeCart(cart) {
  return cart.reduce((merged, item) => {
    if (!item) return merged;
    const qty = Number(item.qty || 1);
    if (qty <= 0) return merged;

    const existing = merged.find(entry => getCartItemKey(entry) === getCartItemKey(item));
    if (existing) {
      existing.qty = Number(existing.qty || 0) + qty;
    } else {
      merged.push({...item, qty, url: getProductUrl(item)});
    }

    return merged;
  }, []);
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(normalizeCart(cart)));
}

function formatMoney(value) {
  return "$" + Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getCartCount(cart) {
  return cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function updateCartLink(cart) {
  const link = document.getElementById("cartLink");
  if (!link) return;
  const count = getCartCount(cart);
  link.dataset.count = count ? String(count) : "";
  link.setAttribute("aria-label", count ? "Cart (" + count + ")" : "Cart");
}

function renderSummary() {
  const cart = getCart().filter(item => Number(item.qty) > 0);
  const page = document.getElementById("checkoutPage");
  const empty = document.getElementById("emptyCheckout");
  const list = document.getElementById("summaryItems");

  saveCart(cart);
  updateCartLink(cart);

  if (!cart.length) {
    page.style.display = "none";
    empty.style.display = "block";
    return;
  }

  page.style.display = "block";
  empty.style.display = "none";

  list.innerHTML = cart.map(item => {
    const qty = Number(item.qty || 1);
    const price = Number(item.price || 0);
    return `
      <article class="summary-item">
        <img src="${item.image || "images/logo.png"}" alt="${item.name || "Product"}">
        <div>
          <h3>${item.name || "Product"}</h3>
          <p>Color: ${item.color || "Black"}<br>Qty: ${qty}</p>
        </div>
        <p class="summary-price">${formatMoney(price * qty)}</p>
      </article>
    `;
  }).join("");

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  const shipping = 0;
  const taxes = Math.round(subtotal * 0.0825 * 100) / 100;
  const total = subtotal + shipping + taxes;

  document.getElementById("subtotal").textContent = formatMoney(subtotal);
  document.getElementById("shipping").textContent = "Complimentary";
  document.getElementById("taxes").textContent = formatMoney(taxes);
  document.getElementById("total").textContent = formatMoney(total);
}

function updatePaymentFields() {
  const selected = document.querySelector("input[name='payment']:checked");
  const cardFields = document.getElementById("cardFields");
  cardFields.hidden = !selected || !["visa", "unionpay"].includes(selected.value);
}

document.querySelectorAll("input[name='payment']").forEach(input => {
  input.addEventListener("change", updatePaymentFields);
});

document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  const selected = document.querySelector("input[name='payment']:checked");
  const note = document.getElementById("checkoutNote");
  const method = selected ? selected.dataset.label : "selected payment method";
  note.textContent = "Demo order placed with " + method + ". No real payment has been processed.";
});

renderSummary();
updatePaymentFields();
