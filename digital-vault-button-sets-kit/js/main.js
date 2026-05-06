(function () {
  const root = document.documentElement;
  const header = document.querySelector(".product-header__bar");
  const navLinks = Array.from(document.querySelectorAll(".section-nav__link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updateHeaderOffset() {
    if (!header) return;
    root.style.setProperty("--header-height", `${Math.round(header.getBoundingClientRect().height)}px`);
  }

  function setActiveSection(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("section-nav__link--active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  updateHeaderOffset();
  window.addEventListener("resize", updateHeaderOffset, { passive: true });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", link.getAttribute("href"));
      setActiveSection(target.id);
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (activeEntry) {
          setActiveSection(activeEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-24% 0px -56% 0px",
        threshold: [0.16, 0.32, 0.55]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll(".js-loading-button").forEach((button) => {
    const label = button.querySelector("span:last-child");
    const initialText = label ? label.textContent : button.textContent;

    button.addEventListener("click", () => {
      if (button.classList.contains("is-complete")) return;

      button.setAttribute("aria-busy", "true");
      button.disabled = true;
      if (label) label.textContent = "Working";

      window.setTimeout(() => {
        button.classList.add("is-complete");
        button.classList.remove("button--loading");
        button.classList.add("button--success");
        button.removeAttribute("aria-busy");
        button.disabled = false;
        if (label) label.textContent = "Complete";

        window.setTimeout(() => {
          button.classList.remove("is-complete", "button--success");
          button.classList.add("button--loading");
          if (label) label.textContent = initialText;
        }, 1400);
      }, reducedMotionQuery.matches ? 120 : 760);
    });
  });
})();
