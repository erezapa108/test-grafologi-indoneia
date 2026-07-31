document.addEventListener("DOMContentLoaded", () => {
//buka tutup hamburger-menu
const burgerBtn = document.getElementById("burgerBtn");
const mainMenu = document.getElementById("mainMenu");

function closeAllDropdowns() {
  document.querySelectorAll("li.has-dropdown.open").forEach((li) => {
    li.classList.remove("open");
    const trigger = li.querySelector(".menu-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
}

burgerBtn.addEventListener("click", () => {
  mainMenu.classList.toggle("open");
  closeAllDropdowns();
});

// Nav links dropdown item
mainMenu
  .querySelectorAll("a.menu-link, a.dropdown-item, .item-title, .item-more")
  .forEach((link) => {
    link.addEventListener("click", () => {
      mainMenu.classList.remove("open");
      closeAllDropdowns();
    });
  });

// Dropdown trigger
document.querySelectorAll(".menu-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const parentLi = trigger.closest(".has-dropdown");
    const isOpen = parentLi.classList.contains("open");
    document.querySelectorAll("li.has-dropdown.open").forEach((li) => {
      if (li !== parentLi) {
        li.classList.remove("open");
        li.querySelector(".menu-trigger").setAttribute(
          "aria-expanded",
          "false",
        );
      }
    });
    parentLi.classList.toggle("open", !isOpen);
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });
});

// Menutup dropdown saat klik di luar target
document.addEventListener("click", (e) => {
  if (!e.target.closest(".has-dropdown")) {
    closeAllDropdowns();
  }
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

});
