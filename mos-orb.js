function createMosOrbMarkup() {
  return '<div class="mos-orb"></div><div class="mos-orb-shadow"></div>';
}

function ensureMosLoader() {
  let loader = document.getElementById("mosLoader");
  if (loader) return loader;

  loader = document.createElement("div");
  loader.className = "mos-loader";
  loader.id = "mosLoader";
  loader.innerHTML = `
    <div class="mos-loader-inner">
      ${createMosOrbMarkup()}
      <p class="mos-loader-word">MOS</p>
    </div>
  `;
  document.body.appendChild(loader);
  return loader;
}

function showMosLoading() {
  ensureMosLoader().classList.add("active");
}

function hideMosLoading() {
  ensureMosLoader().classList.remove("active");
}

function getMosCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  } catch (error) {
    return 0;
  }
}

function updateMosCartIcons() {
  const count = getMosCartCount();
  document.querySelectorAll(".nav-cart").forEach(link => {
    link.dataset.count = count ? String(count) : "";
    link.setAttribute("aria-label", count ? "Cart (" + count + ")" : "Cart");
  });
}

function changePreview(previewId, imgSrc, text) {
  const preview = document.getElementById(previewId);
  if (!preview) return;

  const img = preview.querySelector("img");
  const label = preview.querySelector("p");
  if (!img || !label) return;

  preview.classList.add("is-switching");
  setTimeout(() => {
    img.src = imgSrc;
    label.textContent = text;
    preview.classList.remove("is-switching");
  }, 120);
}

const mosMegaMenuData = {
  "Featured": {
    previewId: "preview-featured",
    previewImage: "images/kirolab.png",
    previewText: "KIRO Lab",
    columns: [
      {
        title: "Editorial",
        links: [
          ["KIRO Lab", "kiro.html", "images/kirolab.png"],
          ["Seasonal Objects", "#", "images/pic3.jpg"],
          ["Material Study", "#", "images/pic2.jpg"]
        ]
      },
      {
        title: "Featured",
        links: [
          ["New Forms", "kiro.html", "images/kirolab.png"],
          ["Accessories Edit", "aiden.html", "images/aiden.png"],
          ["Archive Notes", "#", "images/pic4.jpg"]
        ]
      },
      {
        title: "Stories",
        links: [
          ["Mass", "#", "images/pic5.jpg"],
          ["Order", "#", "images/pic6.jpg"],
          ["Surge", "#", "images/kiro1.jpg"]
        ]
      }
    ]
  },
  "Shop": {
    previewId: "preview-shop",
    previewImage: "images/kirolab.png",
    previewText: "All Products",
    columns: [
      {
        title: "Shop",
        links: [
          ["All Products", "kiro.html", "images/kirolab.png"],
          ["Jewelry", "kiro.html", "images/kiro1.jpg"],
          ["Accessories", "aiden.html", "images/aiden.png"]
        ]
      },
      {
        title: "Category",
        links: [
          ["Tops", "kiro.html", "images/case21.png"],
          ["Skirts", "kiro.html", "images/kiro2.3.png"],
          ["Shoes", "aiden.html", "images/kiro5.11.png"]
        ]
      },
      {
        title: "Finish",
        links: [
          ["Silver", "#", "images/pic4.jpg"],
          ["Black", "#", "images/pic5.jpg"],
          ["Gold", "#", "images/pic6.jpg"]
        ]
      }
    ]
  },
  "Collections": {
    previewId: "preview-collections",
    previewImage: "images/pic3.jpg",
    previewText: "Spring / Summer 2026",
    columns: [
      {
        title: "Collections",
        links: [
          ["KIRO", "kiro.html", "images/kirolab.png"],
          ["AIDEN", "aiden.html", "images/aiden.png"],
          ["MOS Lab", "#", "images/pic3.jpg"]
        ]
      },
      {
        title: "Season",
        links: [
          ["Spring / Summer 2026", "#", "images/pic4.jpg"],
          ["Resort 2026", "#", "images/pic5.jpg"],
          ["Archive", "#", "images/pic6.jpg"]
        ]
      },
      {
        title: "Index",
        links: [
          ["Mass", "#", "images/kiro1.jpg"],
          ["Order", "#", "images/pic2.jpg"],
          ["Surge", "#", "images/kiro2.3.png"]
        ]
      }
    ]
  },
  "Art of Living": {
    previewId: "preview-living",
    previewImage: "images/aiden.png",
    previewText: "Art of Living",
    columns: [
      {
        title: "Objects",
        links: [
          ["Bags", "aiden.html", "images/aiden.png"],
          ["Objects", "#", "images/pic5.jpg"],
          ["Belts", "#", "images/pic6.jpg"]
        ]
      },
      {
        title: "Spaces",
        links: [
          ["Home", "#", "images/pic3.jpg"],
          ["Travel", "#", "images/pic4.jpg"],
          ["Daily Rituals", "#", "images/kiro1.jpg"]
        ]
      },
      {
        title: "Series",
        links: [
          ["AIDEN", "aiden.html", "images/aiden.png"],
          ["Archive", "#", "images/pic2.jpg"],
          ["MOS Lab", "#", "images/kirolab.png"]
        ]
      }
    ]
  },
  "Fragrances": {
    previewId: "preview-fragrances",
    previewImage: "images/pic4.jpg",
    previewText: "Fragrances",
    columns: [
      {
        title: "Fragrances",
        links: [
          ["All Fragrances", "#", "images/pic4.jpg"],
          ["Signature Scents", "#", "images/pic5.jpg"],
          ["Discovery Set", "#", "images/pic6.jpg"]
        ]
      },
      {
        title: "Notes",
        links: [
          ["Amber", "#", "images/pic2.jpg"],
          ["Wood", "#", "images/pic3.jpg"],
          ["Floral", "#", "images/kiro1.jpg"]
        ]
      },
      {
        title: "Ritual",
        links: [
          ["Body", "#", "images/kirolab.png"],
          ["Home Scent", "#", "images/aiden.png"],
          ["Travel Format", "#", "images/case21.png"]
        ]
      }
    ]
  },
  "Gifts": {
    previewId: "preview-gifts",
    previewImage: "images/kirolab.png",
    previewText: "Gifts",
    columns: [
      {
        title: "Gifts",
        links: [
          ["Gift Edit", "#", "images/kirolab.png"],
          ["New Arrivals", "kiro.html", "images/kiro1.jpg"],
          ["Accessories", "aiden.html", "images/aiden.png"]
        ]
      },
      {
        title: "Occasion",
        links: [
          ["For Her", "#", "images/pic3.jpg"],
          ["For Him", "#", "images/pic4.jpg"],
          ["For Home", "#", "images/pic5.jpg"]
        ]
      },
      {
        title: "Service",
        links: [
          ["Gift Card", "#", "images/pic6.jpg"],
          ["Wrapping", "#", "images/pic2.jpg"],
          ["Personal Notes", "#", "images/case21.png"]
        ]
      }
    ]
  }
};

function createMegaMenu(menuData) {
  const menu = document.createElement("div");
  menu.className = "mega-menu";

  const links = document.createElement("div");
  links.className = "mega-links";

  menuData.columns.forEach(columnData => {
    const column = document.createElement("div");
    column.className = "mega-column";

    const title = document.createElement("h4");
    title.textContent = columnData.title;
    column.appendChild(title);

    columnData.links.forEach(([label, href, image]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      link.addEventListener("mouseenter", () => {
        changePreview(menuData.previewId, image, label);
      });
      column.appendChild(link);
    });

    links.appendChild(column);
  });

  const preview = document.createElement("div");
  preview.className = "mega-preview";
  preview.id = menuData.previewId;
  preview.innerHTML = `<img src="${menuData.previewImage}" alt=""><p>${menuData.previewText}</p>`;

  menu.appendChild(links);
  menu.appendChild(preview);
  return menu;
}

function positionMegaMenu(menu) {
  const rect = menu.getBoundingClientRect();
  const padding = 16;
  const overflowRight = rect.right - (window.innerWidth - padding);
  const overflowLeft = padding - rect.left;
  let shift = 0;

  if (overflowRight > 0) shift -= overflowRight;
  if (overflowLeft > 0) shift += overflowLeft;

  menu.style.setProperty("--mega-menu-left", `${shift}px`);
  menu.classList.toggle("is-shifted", shift !== 0);
}

function enhanceMosMegaMenus() {
  document.querySelectorAll(".nav-left").forEach(nav => {
    Array.from(nav.children).forEach(child => {
      if (child.classList && child.classList.contains("nav-item")) return;
      if (!(child instanceof HTMLAnchorElement)) return;

      const label = child.textContent.trim();
      const menuData = mosMegaMenuData[label];
      if (!menuData) return;

      const item = document.createElement("div");
      item.className = "nav-item";
      child.replaceWith(item);
      item.appendChild(child);
      item.appendChild(createMegaMenu(menuData));
    });
  });

  document.querySelectorAll(".nav-left .nav-item").forEach(item => {
    const menu = item.querySelector(".mega-menu");
    if (!menu) return;
    item.addEventListener("mouseenter", () => positionMegaMenu(menu));
    window.addEventListener("resize", () => positionMegaMenu(menu));
  });
}

function shouldShowMosLoading(link) {
  if (!link || link.target === "_blank" || link.hasAttribute("download")) return false;
  if (link.hasAttribute("onclick")) return false;
  if (link.getAttribute("href") === "#") return false;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === window.location.pathname && url.hash) return false;

  return url.pathname.endsWith(".html") || url.protocol === "file:";
}

document.addEventListener("click", event => {
  if (event.defaultPrevented) return;

  const link = event.target.closest("a");
  if (!shouldShowMosLoading(link)) return;
  showMosLoading();
});

window.addEventListener("pageshow", hideMosLoading);
window.addEventListener("pageshow", updateMosCartIcons);
document.addEventListener("DOMContentLoaded", () => {
  enhanceMosMegaMenus();
  updateMosCartIcons();
});
