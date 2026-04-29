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
