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
    "milly-pump": "kiro4.html",
    "bare-earth-01": "bare-earth-01.html"
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

function getWishlist() {
  try {
    return normalizeCart(JSON.parse(localStorage.getItem("wishlist")) || []);
  } catch (error) {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(normalizeCart(wishlist)));
}

function getCurrentProduct() {
  const color = product.color || "Black";
  return {...product, color, url: getProductUrl(product)};
}

function addProductToCart(cartProduct, qty) {
  const cart = getCart();
  const productQty = Number(qty || 1);
  const existing = cart.find(item => getCartItemKey(item) === getCartItemKey(cartProduct));

  if (existing) {
    existing.qty = Number(existing.qty || 0) + productQty;
  } else {
    cart.push({...cartProduct, qty: productQty});
  }

  saveCart(cart);
  updateCartLink();
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
  addProductToCart(getCurrentProduct(), 1);
  if (window.showMosLoading) showMosLoading();
  window.location.href = "cart.html";
}

function updateWishlistButton() {
  const button = document.getElementById("wishlistButton");
  if (!button) return;

  const current = getCurrentProduct();
  const isAdded = getWishlist().some(item => getCartItemKey(item) === getCartItemKey(current));
  button.classList.toggle("is-added", isAdded);
  button.innerHTML = `<span aria-hidden="true">${isAdded ? "♥" : "♡"}</span>${isAdded ? "Added to Wishlist" : "Add to Wishlist"}`;
  button.setAttribute("aria-label", isAdded ? "Open wishlist" : "Add to wishlist");
}

function ensureWishlistDrawer() {
  if (document.getElementById("wishlistDrawer")) return;

  const shade = document.createElement("div");
  shade.className = "wishlist-shade";
  shade.id = "wishlistShade";
  shade.addEventListener("click", closeWishlistDrawer);

  const drawer = document.createElement("aside");
  drawer.className = "wishlist-drawer";
  drawer.id = "wishlistDrawer";
  drawer.setAttribute("aria-label", "My Wishlist");
  drawer.innerHTML = `
    <div class="wishlist-head">
      <button class="wishlist-back" type="button" onclick="closeWishlistDrawer()" aria-label="Close wishlist">›</button>
      <h2>My Wishlist</h2>
    </div>
    <p class="wishlist-note">Wishlist is not saved permanently yet. Please <a href="login.html">log in</a> or <a href="register.html">Create Account</a> to save it.</p>
    <div class="wishlist-items" id="wishlistItems"></div>
    <p class="wishlist-empty" id="wishlistEmpty">Your wishlist is empty.</p>
    <div class="wishlist-footer">
      <button class="wishlist-action" type="button" onclick="addAllWishlistToCart()">Add All To Cart</button>
      <button class="wishlist-action" type="button" onclick="closeWishlistDrawer()">Continue Shopping</button>
    </div>
  `;

  document.body.append(shade, drawer);
}

function renderWishlistDrawer() {
  ensureWishlistDrawer();

  const wishlist = getWishlist().filter(item => Number(item.qty) > 0);
  const items = document.getElementById("wishlistItems");
  const empty = document.getElementById("wishlistEmpty");
  saveWishlist(wishlist);
  updateWishlistButton();

  if (!wishlist.length) {
    items.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  items.innerHTML = wishlist.map((item, index) => {
    const url = getProductUrl(item);
    const image = `<img src="${item.image || "images/logo.png"}" alt="${item.name || "Product"}">`;
    return `
      <article class="wishlist-item">
        ${url ? `<a class="wishlist-product-link" href="${url}" aria-label="View ${item.name || "Product"}">${image}</a>` : image}
        <div class="wishlist-info">
          <h3>${item.name || "Product"}</h3>
          <p>${item.color || "Black"}</p>
          <p>${formatWishlistMoney(item.price)}</p>
          <div class="wishlist-row">
            <div class="wishlist-qty" aria-label="Quantity">
              <button type="button" onclick="changeWishlistQty(${index}, -1)">−</button>
              <span>${Number(item.qty || 1)}</span>
              <button type="button" onclick="changeWishlistQty(${index}, 1)">+</button>
            </div>
            <button class="wishlist-add-cart" type="button" onclick="addWishlistItemToCart(${index})">Add To Cart</button>
          </div>
        </div>
        <button class="wishlist-remove" type="button" onclick="removeWishlistItem(${index})" aria-label="Remove ${item.name || "Product"}">⌫</button>
      </article>
    `;
  }).join("");
}

function formatWishlistMoney(value) {
  return "$" + Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function openWishlistDrawer() {
  renderWishlistDrawer();
  document.getElementById("wishlistShade").classList.add("active");
  document.getElementById("wishlistDrawer").classList.add("active");
}

function closeWishlistDrawer() {
  const shade = document.getElementById("wishlistShade");
  const drawer = document.getElementById("wishlistDrawer");
  if (shade) shade.classList.remove("active");
  if (drawer) drawer.classList.remove("active");
}

function toggleWishlist() {
  const wishlist = getWishlist();
  const current = getCurrentProduct();
  const existing = wishlist.find(item => getCartItemKey(item) === getCartItemKey(current));

  if (!existing) {
    wishlist.push({...current, qty: 1});
    saveWishlist(wishlist);
  }

  openWishlistDrawer();
  updateWishlistButton();
}

function changeWishlistQty(index, amount) {
  const wishlist = getWishlist();
  if (!wishlist[index]) return;

  wishlist[index].qty = Math.max(1, Number(wishlist[index].qty || 1) + amount);
  saveWishlist(wishlist);
  renderWishlistDrawer();
}

function removeWishlistItem(index) {
  const wishlist = getWishlist();
  wishlist.splice(index, 1);
  saveWishlist(wishlist);
  renderWishlistDrawer();
}

function addWishlistItemToCart(index) {
  const wishlist = getWishlist();
  const item = wishlist[index];
  if (!item) return;

  addProductToCart(item, Number(item.qty || 1));
  renderWishlistDrawer();
}

function addAllWishlistToCart() {
  getWishlist().forEach(item => addProductToCart(item, Number(item.qty || 1)));
  renderWishlistDrawer();
}

function initWishlist() {
  const addButton = document.querySelector(".add-btn");
  if (!addButton || document.getElementById("wishlistButton")) return;

  const button = document.createElement("button");
  button.className = "wishlist-button";
  button.id = "wishlistButton";
  button.type = "button";
  button.addEventListener("click", toggleWishlist);
  addButton.insertAdjacentElement("afterend", button);
  ensureWishlistDrawer();
  updateWishlistButton();
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
      updateWishlistButton();
    });
  });
}

function initProductGallery() {
  const main = document.querySelector(".product-main");
  const mainImg = document.getElementById("productMainImg");
  const thumbs = [...document.querySelectorAll(".product-thumb")];
  if (!main || !mainImg || !thumbs.length) return;
  const images = thumbs.map(button => button.dataset.image).filter(Boolean);
  let activeIndex = Math.max(0, images.indexOf(mainImg.getAttribute("src")));

  function selectThumb(button, shouldZoom) {
    thumbs.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    mainImg.src = button.dataset.image;
    activeIndex = Math.max(0, images.indexOf(button.dataset.image));

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

  const viewer = document.createElement("div");
  viewer.className = "product-lightbox";
  viewer.setAttribute("aria-label", "Product image viewer");
  viewer.innerHTML = `
    <div class="product-lightbox-frame">
      <img id="productLightboxImage" src="${images[activeIndex] || mainImg.src}" alt="${product.name || "Product"}">
      <div class="product-lightbox-controls">
        <button type="button" class="product-lightbox-prev" aria-label="Previous image">‹</button>
        <button type="button" class="product-lightbox-close" aria-label="Close image viewer">×</button>
        <button type="button" class="product-lightbox-next" aria-label="Next image">›</button>
      </div>
    </div>
  `;
  document.body.appendChild(viewer);

  const viewerImg = viewer.querySelector("#productLightboxImage");
  const prevButton = viewer.querySelector(".product-lightbox-prev");
  const nextButton = viewer.querySelector(".product-lightbox-next");
  const closeButton = viewer.querySelector(".product-lightbox-close");

  function syncViewerImage() {
    viewerImg.src = images[activeIndex] || mainImg.src;
  }

  function openViewer() {
    activeIndex = Math.max(0, images.indexOf(mainImg.getAttribute("src")));
    syncViewerImage();
    viewer.classList.add("active");
    document.body.classList.add("lightbox-open");
  }

  function closeViewer() {
    viewer.classList.remove("active");
    document.body.classList.remove("lightbox-open");
  }

  function moveViewer(amount) {
    if (!images.length) return;
    activeIndex = (activeIndex + amount + images.length) % images.length;
    syncViewerImage();
  }

  main.addEventListener("click", openViewer);
  closeButton.addEventListener("click", closeViewer);
  prevButton.addEventListener("click", () => moveViewer(-1));
  nextButton.addEventListener("click", () => moveViewer(1));
  viewer.addEventListener("click", event => {
    if (event.target === viewer) closeViewer();
  });

  document.addEventListener("keydown", event => {
    if (!viewer.classList.contains("active")) return;
    if (event.key === "Escape") closeViewer();
    if (event.key === "ArrowLeft") moveViewer(-1);
    if (event.key === "ArrowRight") moveViewer(1);
  });
}

updateCartLink();
initColorSwatches();
initProductGallery();
initWishlist();
