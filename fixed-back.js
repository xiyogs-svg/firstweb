function goBack() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.href = "index.html";
}

function createFixedBackButton() {
  if (document.querySelector(".fixed-back")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "fixed-back";
  button.setAttribute("aria-label", "Go back");
  button.innerHTML = "<span>←</span><span>Back</span>";
  button.addEventListener("click", goBack);
  document.body.appendChild(button);
}

createFixedBackButton();
