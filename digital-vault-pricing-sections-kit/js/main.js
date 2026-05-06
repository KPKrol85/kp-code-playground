(function () {
  const navLinks = Array.from(document.querySelectorAll(".pricing-kit__nav-link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setActiveSection(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("pricing-kit__nav-link--active", isActive);
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
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.16, 0.32, 0.55]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll(".pricing-toggle").forEach((toggle) => {
    const buttons = Array.from(toggle.querySelectorAll(".pricing-toggle__button"));
    const section = toggle.closest(".pricing-section");
    if (!section) return;

    function setBilling(period) {
      buttons.forEach((button) => {
        const isActive = button.dataset.billing === period;
        button.classList.toggle("pricing-toggle__button--active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      section.querySelectorAll("[data-monthly][data-yearly]").forEach((price) => {
        price.textContent = price.dataset[period];
      });

      section.querySelectorAll("[data-billing-label]").forEach((label) => {
        label.textContent = period === "yearly" ? "/yr" : "/mo";
      });
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        setBilling(button.dataset.billing);
      });
    });
  });

  document.querySelectorAll(".js-select-plan").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest(".pricing-section");
      const card = button.closest(".pricing-card");
      if (!section || !card) return;

      section.querySelectorAll(".pricing-card--selected").forEach((selectedCard) => {
        selectedCard.classList.remove("pricing-card--selected");
        selectedCard.removeAttribute("aria-live");
      });

      card.classList.add("pricing-card--selected");
      card.setAttribute("aria-live", "polite");
      button.textContent = "Selected";

      section.querySelectorAll(".js-select-plan").forEach((otherButton) => {
        if (otherButton !== button && otherButton.textContent === "Selected") {
          const planTitle = otherButton.closest(".pricing-card")?.querySelector(".pricing-card__title")?.textContent || "Plan";
          otherButton.textContent = `Select ${planTitle}`;
        }
      });
    });
  });
})();
