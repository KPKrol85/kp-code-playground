const focusableSelectors = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
];

function getFocusableElements(container) {
  if (!container) return [];
  return [...container.querySelectorAll(focusableSelectors.join(","))].filter((element) => {
    if (element.hasAttribute("disabled")) return false;
    if (element.getAttribute("aria-hidden") === "true") return false;
    return element.offsetParent !== null || element === document.activeElement;
  });
}

export function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-mobile-nav]");
  const closeBtn = document.querySelector("[data-nav-close]");
  const desktopQuery = window.matchMedia("(min-width: 700px)");

  if (!toggle || !nav || !closeBtn) return;

  let isOpen = false;
  let lastFocused = null;
  let previousBodyOverflow = "";
  let previousBodyPaddingRight = "";
  const backgroundState = new Map();

  const collectBackgroundElements = () => {
    const result = [];
    const seen = new Set();

    const addElement = (element) => {
      if (!element || seen.has(element) || element === nav || nav.contains(element) || element.contains(nav)) return;
      seen.add(element);
      result.push(element);
    };

    const bodyChildren = [...document.body.children];
    bodyChildren.forEach(addElement);

    const header = nav.closest("header");
    if (header) {
      [...header.children].forEach(addElement);
    }

    return result;
  };

  const hideBackgroundFromAssistiveTech = () => {
    backgroundState.clear();
    collectBackgroundElements().forEach((element) => {
      backgroundState.set(element, {
        ariaHidden: element.getAttribute("aria-hidden"),
        inert: "inert" in element ? element.inert : null
      });
      element.setAttribute("aria-hidden", "true");
      if ("inert" in element) {
        element.inert = true;
      }
    });
  };

  const restoreBackgroundForAssistiveTech = () => {
    backgroundState.forEach((previousState, element) => {
      if (previousState.ariaHidden === null) {
        element.removeAttribute("aria-hidden");
      } else {
        element.setAttribute("aria-hidden", previousState.ariaHidden);
      }

      if (previousState.inert !== null) {
        element.inert = previousState.inert;
      }
    });
    backgroundState.clear();
  };

  const lockBodyScroll = () => {
    previousBodyOverflow = document.body.style.overflow;
    previousBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  };

  const unlockBodyScroll = () => {
    document.body.style.overflow = previousBodyOverflow;
    document.body.style.paddingRight = previousBodyPaddingRight;
  };

  const focusInitialElement = () => {
    const focusable = getFocusableElements(nav);
    if (focusable.length) {
      focusable[0].focus();
      return;
    }

    nav.focus();
  };

  const openNav = () => {
    if (isOpen) return;

    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : toggle;
    nav.hidden = false;
    nav.inert = false;
    toggle.setAttribute("aria-expanded", "true");

    lockBodyScroll();
    hideBackgroundFromAssistiveTech();
    focusInitialElement();

    isOpen = true;
  };

  const closeNav = ({ restoreFocus = true } = {}) => {
    if (!isOpen && nav.hidden) return;

    nav.inert = true;
    nav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");

    unlockBodyScroll();
    restoreBackgroundForAssistiveTech();

    isOpen = false;

    if (restoreFocus) {
      const focusTarget = lastFocused && document.contains(lastFocused) ? lastFocused : toggle;
      focusTarget.focus();
    }
  };

  const syncViewportState = () => {
    if (desktopQuery.matches) {
      closeNav({ restoreFocus: false });
      return;
    }

    nav.inert = nav.hidden;
  };

  const trapFocus = (event) => {
    if (!isOpen || nav.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeNav();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusableElements(nav);
    if (!focusable.length) {
      event.preventDefault();
      nav.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!nav.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  toggle.addEventListener("click", () => {
    if (isOpen) {
      closeNav();
      return;
    }

    openNav();
  });

  closeBtn.addEventListener("click", () => closeNav());

  nav.addEventListener("click", (event) => {
    if (event.target === nav) {
      closeNav();
    }
  });

  document.addEventListener("keydown", trapFocus);

  nav.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => closeNav());
  });

  desktopQuery.addEventListener("change", syncViewportState);
  syncViewportState();
}
