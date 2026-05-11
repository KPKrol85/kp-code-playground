(() => {
  const storageKey = 'header-commerce-shelf-theme';
  const desktopBreakpoint = window.matchMedia('(min-width: 56.25rem)');
  const root = document.documentElement;
  const body = document.body;

  const header = document.querySelector('[data-commerce-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const shelf = document.querySelector('[data-shelf-panel]');
  const overlay = document.querySelector('[data-overlay]');
  const themeToggle = document.querySelector('[data-theme-toggle]');

  if (!menuButton || !shelf || !overlay || !themeToggle) return;

  const panel = shelf.querySelector('.commerce-shelf__panel');
  const closeSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  const getFocusable = () => Array.from(panel.querySelectorAll(closeSelectors));

  const setShelfInteractivity = (isOpen) => {
    shelf.hidden = !isOpen;
    overlay.hidden = !isOpen;
    shelf.inert = !isOpen;
  };

  const openShelf = () => {
    lastFocused = document.activeElement;
    body.dataset.shelfOpen = 'true';
    body.style.overflow = 'hidden';
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close product shelf menu');
    setShelfInteractivity(true);
    getFocusable()[0]?.focus();
  };

  const closeShelf = (returnToButton = false) => {
    body.dataset.shelfOpen = 'false';
    body.style.overflow = '';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open product shelf menu');
    setShelfInteractivity(false);

    if (returnToButton) {
      menuButton.focus();
    } else if (lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  const toggleShelf = () => (body.dataset.shelfOpen === 'true' ? closeShelf() : openShelf());

  menuButton.addEventListener('click', toggleShelf);
  overlay.addEventListener('click', () => closeShelf());

  shelf.addEventListener('click', (event) => {
    if (event.target.closest('.commerce-shelf__link, .commerce-shelf__quick-links a, .commerce-header__cta--mobile')) {
      closeShelf();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (body.dataset.shelfOpen !== 'true') return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeShelf(true);
      return;
    }

    if (event.key === 'Tab') {
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
    }
  });

  const syncDesktop = () => {
    if (desktopBreakpoint.matches && body.dataset.shelfOpen === 'true') {
      closeShelf();
    }
  };
  desktopBreakpoint.addEventListener('change', syncDesktop);
  window.addEventListener('resize', syncDesktop, { passive: true });

  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const savedTheme = localStorage.getItem(storageKey);
  const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : preferredTheme;

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    localStorage.setItem(storageKey, theme);
  };

  applyTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const updated = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(updated);
  });

  let ticking = false;
  const setScrolled = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(setScrolled);
    },
    { passive: true }
  );

  setShelfInteractivity(false);
  body.dataset.shelfOpen = 'false';
})();
