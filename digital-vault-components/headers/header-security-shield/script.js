(() => {
  const DESKTOP_BREAKPOINT = 900;
  const THEME_KEY = "header-security-shield-theme";

  const docEl = document.documentElement;
  const body = document.body;
  const header = document.querySelector("[data-security-header]");
  const panel = document.querySelector("[data-security-panel]");
  const overlay = document.querySelector("[data-overlay]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const closeBtn = document.querySelector("[data-panel-close]");
  const themeToggle = document.querySelector("[data-theme-toggle]");

  if (!panel || !overlay || !menuToggle || !themeToggle) return;

  const panelLinks = [...panel.querySelectorAll("a")];
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");

  let isOpen = false;
  let lastFocused = null;
  let rafPending = false;

  const getFocusableElements = () => [...panel.querySelectorAll(focusableSelector)];

  const applyTheme = (theme) => {
    docEl.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Activate light secure mode" : "Activate dark secure mode");
    themeToggle.setAttribute("aria-pressed", String(isDark));
  };

  const initialTheme = localStorage.getItem(THEME_KEY)
    || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const next = docEl.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  const setPanelAccessibility = (open) => {
    panel.toggleAttribute("inert", !open);
    if (!open) {
      getFocusableElements().forEach((el) => el.setAttribute("tabindex", "-1"));
      return;
    }
    getFocusableElements().forEach((el) => {
      if (el.dataset.restoreTabindex) {
        el.setAttribute("tabindex", el.dataset.restoreTabindex);
        delete el.dataset.restoreTabindex;
      } else {
        el.removeAttribute("tabindex");
      }
    });
  };

  const openPanel = () => {
    if (isOpen) return;
    isOpen = true;
    lastFocused = document.activeElement;
    panel.hidden = false;
    overlay.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close secure access panel");
    body.dataset.scrollLock = "true";
    setPanelAccessibility(true);
    (getFocusableElements()[0] || panel).focus();
  };

  const closePanel = ({ returnFocus = false } = {}) => {
    if (!isOpen) return;
    isOpen = false;
    panel.hidden = true;
    overlay.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open secure access panel");
    body.dataset.scrollLock = "false";
    setPanelAccessibility(false);
    if (returnFocus && lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  setPanelAccessibility(false);

  menuToggle.addEventListener("click", () => (isOpen ? closePanel() : openPanel()));
  overlay.addEventListener("click", () => closePanel());
  closeBtn?.addEventListener("click", () => closePanel({ returnFocus: true }));
  panelLinks.forEach((link) => link.addEventListener("click", () => closePanel()));

  document.addEventListener("keydown", (event) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closePanel({ returnFocus: true });
      menuToggle.focus();
      return;
    }

    if (event.key === "Tab") {
      const focusables = getFocusableElements();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      closePanel();
    }
  });

  const onScroll = () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      header?.classList.toggle("is-scrolled", window.scrollY > 8);
      rafPending = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
})();
