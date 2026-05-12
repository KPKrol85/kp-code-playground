(() => {
  const BREAKPOINT = 900;
  const THEME_KEY = "header-luxury-atelier-theme";

  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-panel]");
  const overlay = document.querySelector("[data-overlay]");
  const themeButton = document.querySelector("[data-theme-toggle]");

  if (!menuButton || !panel || !overlay || !themeButton || !header) return;

  const panelLinks = [...panel.querySelectorAll("a")];
  let lastFocused = null;
  let isOpen = false;
  let scrollTicking = false;

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  const getThemePreference = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const next = theme === "dark" ? "light" : "dark";
    themeButton.setAttribute("aria-label", `Switch to ${next} tone`);
  };

  const setTheme = (theme) => {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  };

  const getFocusable = () =>
    [...panel.querySelectorAll(focusableSelector)].filter((el) => !el.hasAttribute("inert") && el.offsetParent !== null);

  const setPanelState = (open) => {
    isOpen = open;
    menuButton.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    overlay.hidden = !open;
    overlay.classList.toggle("is-visible", open);
    document.body.classList.toggle("is-scroll-locked", open);

    if (open) {
      panel.removeAttribute("inert");
      lastFocused = document.activeElement;
      requestAnimationFrame(() => {
        const [firstFocusable] = getFocusable();
        firstFocusable?.focus();
      });
    } else {
      panel.setAttribute("inert", "");
      if (lastFocused instanceof HTMLElement) {
        lastFocused.focus();
      }
    }
  };

  const closePanel = ({ returnToMenu = false } = {}) => {
    if (!isOpen) return;
    setPanelState(false);
    if (returnToMenu) menuButton.focus();
  };

  const handleTrap = (event) => {
    if (!isOpen || event.key !== "Tab") return;
    const focusable = getFocusable();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      header.classList.toggle("is-scrolled", window.scrollY > 32);
      scrollTicking = false;
    });
  };

  menuButton.addEventListener("click", () => setPanelState(!isOpen));
  overlay.addEventListener("click", () => closePanel());
  panelLinks.forEach((link) => link.addEventListener("click", () => closePanel()));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanel({ returnToMenu: true });
    handleTrap(event);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= BREAKPOINT) {
      closePanel();
      panel.setAttribute("inert", "");
    }
  });

  themeButton.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
  });

  window.addEventListener("scroll", handleScroll, { passive: true });

  applyTheme(getThemePreference());
  setPanelState(false);
  handleScroll();
})();
