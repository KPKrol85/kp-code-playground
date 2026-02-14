const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function trapFocus(container, event) {
  if (event.key !== "Tab") {
    return;
  }

  const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("hidden"),
  );

  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function announce(message, liveRegion) {
  if (!liveRegion) {
    return;
  }
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 20);
}
