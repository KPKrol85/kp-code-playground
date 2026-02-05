export function initReveal() {
  const root = document.documentElement;
  root.classList.add("js");

  const elements = document.querySelectorAll("[data-reveal]");

  if (!elements.length) {
    return;
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    elements.forEach((el) => {
      el.classList.add("is-revealed");
      el.dataset.revealReady = "true";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          entry.target.dataset.revealReady = "true";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => {
    if (el.dataset.revealReady === "true") {
      return;
    }

    observer.observe(el);
    el.dataset.revealReady = "true";
  });
}
