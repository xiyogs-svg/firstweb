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
  link.dataset.count = count ? String(count) : "";
  link.setAttribute("aria-label", count ? "Cart (" + count + ")" : "Cart");
}

function addToCart() {
  const cart = getCart();
  const color = product.color || "Black";
  const cartProduct = {...product, color};
  const existing = cart.find(item => item.id === cartProduct.id && item.color === cartProduct.color);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({...cartProduct, qty: 1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  if (window.showMosLoading) showMosLoading();
  window.location.href = "cart.html";
}

function initColorSwatches() {
  const label = document.getElementById("selectedColor");
  const swatches = [...document.querySelectorAll(".swatch[data-color]")];
  if (!label || !swatches.length) return;

  swatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      swatches.forEach(item => item.classList.remove("active"));
      swatch.classList.add("active");
      product.color = swatch.dataset.color;
      label.textContent = product.color;
    });
  });
}

function initProductGallery() {
  const main = document.querySelector(".product-main");
  const mainImg = document.getElementById("productMainImg");
  const thumbs = [...document.querySelectorAll(".product-thumb")];
  if (!main || !mainImg || !thumbs.length) return;

  function selectThumb(button, shouldZoom) {
    thumbs.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    mainImg.src = button.dataset.image;

    if (shouldZoom) {
      main.classList.add("zooming");
      mainImg.style.transformOrigin = "center";
    }
  }

  thumbs.forEach(button => {
    button.addEventListener("mouseenter", () => selectThumb(button, true));
    button.addEventListener("focus", () => selectThumb(button, true));
    button.addEventListener("click", () => selectThumb(button, true));
  });

  main.addEventListener("mousemove", event => {
    const rect = main.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    main.classList.add("zooming");
    mainImg.style.transformOrigin = `${x}% ${y}%`;
  });

  main.addEventListener("mouseleave", () => {
    main.classList.remove("zooming");
    mainImg.style.transformOrigin = "center";
  });
}

updateCartLink();
initColorSwatches();
initProductGallery();
