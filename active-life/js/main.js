import { initReveal } from "./modules/reveal.js";
import { initHeaderShrink } from "./modules/headerShrink.js";
import { initMobileNav } from "./modules/mobileNav.js";
import { initScheduleFilter } from "./modules/scheduleFilter.js";
import { initThemeToggle } from "./modules/themeToggle.js";

document.documentElement.classList.add("js");

initReveal();
initThemeToggle();

const moduleInitializers = [initHeaderShrink, initMobileNav, initScheduleFilter];
const destroys = [];

export function destroyAll() {
  while (destroys.length) {
    const destroy = destroys.pop();
    if (typeof destroy === "function") {
      destroy();
    }
  }
}

export function initAll() {
  destroyAll();
  moduleInitializers.forEach((initModule) => {
    const destroy = initModule();
    destroys.push(typeof destroy === "function" ? destroy : () => {});
  });
}

initAll();

window.initAll = initAll;
window.destroyAll = destroyAll;

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav__link");

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach((section) => observer.observe(section));
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
