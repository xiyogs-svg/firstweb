function setActiveAuthMode(mode) {
  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });

  document.querySelectorAll(".auth-form").forEach(form => {
    form.classList.toggle("active", form.dataset.mode === mode);
  });
}

document.querySelectorAll(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => setActiveAuthMode(tab.dataset.mode));
});

document.querySelectorAll(".auth-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const action = form.dataset.action;
    const note = document.getElementById("authNote");
    const data = new FormData(form);
    const contact = data.get("email") || data.get("phone") || "";

    if (action === "login") {
      localStorage.setItem("mosAccount", JSON.stringify({ contact, signedInAt: new Date().toISOString() }));
      note.textContent = "Signed in. Welcome back to MOS.";
      return;
    }

    if (action === "register") {
      localStorage.setItem("mosAccount", JSON.stringify({ contact, createdAt: new Date().toISOString() }));
      note.textContent = "Account created. You can now continue with MOS.";
      return;
    }

    if (action === "recover") {
      note.textContent = "Recovery instructions have been prepared for " + contact + ".";
    }
  });
});
