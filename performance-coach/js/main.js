import { initReveal } from "./modules/reveal.js";
import { initScrollType } from "./modules/scroll-type.js";
import { initScrollSpy } from "./modules/scrollspy.js";
import { initMobileNav } from "./modules/mobile-nav.js";
import { initCounters } from "./modules/counters.js";

initReveal();
initScrollType();
initScrollSpy();
initMobileNav();
initCounters();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/performance-coach/service-worker.js");
  });
}
