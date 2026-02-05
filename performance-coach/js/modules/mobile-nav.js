export const initMobileNav = () => {
  const toggle = document.querySelector(".header__toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  const links = nav.querySelectorAll("a");

  const closeNav = () => {
    nav.classList.remove("nav--open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      links[0]?.focus();
    }
  });

  links.forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
      toggle.focus();
    }
  });
};
