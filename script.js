/*
  NOTEPAD INFINITY SITE CONFIGURATION

  Add real payment-provider checkout URLs here after setup.
  Leave them blank until checkout has been tested.

  Do not put secret API keys in this file.
*/
const CONFIG = {
  downloadUrl: "downloads/notepad-infinity.html",

  payments: {
    lifetime: "",
    monthly: "",
    storage2: "",
    storage7: "",
    storage16: ""
  }
};

function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".navlinks");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-checkout]").forEach(button => {
    button.addEventListener("click", () => {
      const plan = button.dataset.checkout;
      const url = CONFIG.payments[plan];

      if (!url) {
        showToast(
          "Checkout isn't configured yet. No payment has been taken."
        );
        return;
      }

      if (!url.startsWith("https://")) {
        showToast("This checkout link is invalid. Please contact support.");
        return;
      }

      window.location.assign(url);
    });
  });

  document.querySelectorAll("[data-download]").forEach(link => {
    link.addEventListener("click", event => {
      const url = CONFIG.downloadUrl;

      if (!url) {
        event.preventDefault();
        showToast("The app download hasn't been configured yet.");
        return;
      }

      link.href = url;
    });
  });

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});