const body = document.body;
const liveRegion = document.querySelector('[data-live-region]');
const drawer = document.querySelector('[data-drawer]');
const toggleButton = document.querySelector('[data-drawer-toggle]');
const overlay = document.querySelector('[data-drawer-overlay]');
const mainContent = document.querySelector('[data-main-content]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const hapticTriggers = document.querySelectorAll('[data-haptic-trigger]');

const focusableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

let lastFocusedElement = null;
let touchStartX = 0;
let touchCurrentX = 0;
let swipeTracking = false;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const announce = (message) => {
  if (!liveRegion) return;
  liveRegion.textContent = '';
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 40);
};

const triggerHaptic = () => {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  navigator.vibrate(12);
};

const getFocusableElements = () => {
  if (!drawer) return [];
  return [...drawer.querySelectorAll(focusableSelector)].filter((element) => {
    return !element.hasAttribute('hidden') && !element.closest('[hidden]');
  });
};

const isDrawerOpen = () => drawer?.classList.contains('is-open');

const lockScroll = () => {
  body.classList.add('drawer-open');
};

const unlockScroll = () => {
  body.classList.remove('drawer-open');
};

const setMainInert = (shouldInert) => {
  if (!mainContent) return;

  if (shouldInert) {
    mainContent.setAttribute('aria-hidden', 'true');
    mainContent.inert = true;
  } else {
    mainContent.removeAttribute('aria-hidden');
    mainContent.inert = false;
  }
};

const openDrawer = () => {
  if (!drawer || !toggleButton || !overlay || isDrawerOpen()) return;

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : toggleButton;
  toggleButton.setAttribute('aria-expanded', 'true');
  toggleButton.setAttribute('aria-label', 'Close navigation drawer');
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  overlay.hidden = false;
  overlay.classList.add('is-visible');
  drawer.parentElement.style.pointerEvents = 'auto';
  lockScroll();
  setMainInert(true);

  if (!prefersReducedMotion.matches) {
    triggerHaptic();
  }

  const focusTargets = getFocusableElements();
  const primaryTarget = focusTargets[0] || drawer;
  window.setTimeout(() => {
    primaryTarget.focus();
  }, prefersReducedMotion.matches ? 0 : 120);

  announce('Navigation drawer opened.');
};

const closeDrawer = ({ restoreFocus = true } = {}) => {
  if (!drawer || !toggleButton || !overlay || !isDrawerOpen()) return;

  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-label', 'Open navigation drawer');
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('is-visible');
  lockScroll();
  unlockScroll();
  setMainInert(false);

  const finishClose = () => {
    overlay.hidden = true;
    drawer.parentElement.style.pointerEvents = 'none';
  };

  if (prefersReducedMotion.matches) {
    finishClose();
  } else {
    window.setTimeout(finishClose, 280);
  }

  if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
    window.setTimeout(() => {
      lastFocusedElement.focus();
    }, prefersReducedMotion.matches ? 0 : 40);
  }

  announce('Navigation drawer closed.');
};

const handleKeydown = (event) => {
  if (!isDrawerOpen()) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeDrawer();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusableElements = getFocusableElements();
  if (!focusableElements.length) {
    event.preventDefault();
    drawer.focus();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
};

const handleThemeToggle = () => {
  if (!themeToggle) return;
  const checked = themeToggle.getAttribute('aria-checked') === 'true';
  const nextState = String(!checked);
  themeToggle.setAttribute('aria-checked', nextState);
  body.classList.toggle('theme-preview', !checked);
  announce(!checked ? 'Theme preview switched to light mode.' : 'Theme preview switched to dark mode.');
};

const onTouchStart = (event) => {
  if (!isDrawerOpen()) return;
  const target = event.target;
  if (!(target instanceof Element) || !target.closest('[data-drawer]')) return;

  touchStartX = event.touches[0].clientX;
  touchCurrentX = touchStartX;
  swipeTracking = true;
};

const onTouchMove = (event) => {
  if (!swipeTracking || !drawer) return;
  touchCurrentX = event.touches[0].clientX;
  const deltaX = Math.min(0, touchCurrentX - touchStartX);
  const limitedDelta = Math.max(deltaX, -96);
  drawer.style.transform = `translateX(${limitedDelta}px)`;
};

const onTouchEnd = () => {
  if (!swipeTracking || !drawer) return;

  const deltaX = touchCurrentX - touchStartX;
  swipeTracking = false;
  drawer.style.removeProperty('transform');

  if (deltaX < -72) {
    closeDrawer();
  }
};

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    if (isDrawerOpen()) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', () => closeDrawer());
}

if (themeToggle) {
  themeToggle.addEventListener('click', handleThemeToggle);
}

hapticTriggers.forEach((trigger) => {
  trigger.addEventListener('click', triggerHaptic);
});

document.addEventListener('keydown', handleKeydown);
drawer?.addEventListener('touchstart', onTouchStart, { passive: true });
drawer?.addEventListener('touchmove', onTouchMove, { passive: true });
drawer?.addEventListener('touchend', onTouchEnd);
drawer?.addEventListener('touchcancel', onTouchEnd);

window.addEventListener('resize', () => {
  if (!isDrawerOpen() || !drawer) return;
  drawer.style.removeProperty('transform');
});
