(function () {
  const navLinks = Array.from(document.querySelectorAll(".nav-pill"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", link.getAttribute("href"));
      setActiveNav(target.id);
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveNav(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.18, 0.35, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll("[data-copy-link]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = button.getAttribute("data-copy-link");
      const url = new URL(target, window.location.href).href;
      const previousText = button.textContent;

      try {
        await navigator.clipboard.writeText(url);
        button.textContent = "Copied";
      } catch (error) {
        button.textContent = "Link ready";
        window.location.hash = target;
      }

      window.setTimeout(() => {
        button.textContent = previousText;
      }, 1400);
    });
  });

  document.querySelectorAll(".faq-document details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;

      document.querySelectorAll(".faq-document details").forEach((other) => {
        if (other !== detail) {
          other.open = false;
        }
      });
    });
  });
})();
