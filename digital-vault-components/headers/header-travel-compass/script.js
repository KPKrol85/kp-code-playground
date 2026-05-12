(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-travel-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const drawer = document.querySelector('[data-travel-drawer]');
  const overlay = document.querySelector('[data-drawer-overlay]');
  const drawerLinks = [...document.querySelectorAll('.travel-drawer__link')];
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeLabel = document.querySelector('[data-theme-label]');

  const storageKey = 'header-travel-compass-theme';
  const desktopMQ = window.matchMedia('(min-width: 56.25rem)');
  let lastFocusedElement = null;

  const getFocusable = () => [...drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeLabel.textContent = isDark ? 'Night' : 'Sunrise';
    themeButton.setAttribute('aria-label', isDark ? 'Switch to Sunrise mode' : 'Switch to Night mode');
    localStorage.setItem(storageKey, theme);
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      return;
    }
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const openDrawer = () => {
    if (desktopMQ.matches) return;
    lastFocusedElement = document.activeElement;
    drawer.dataset.open = 'true';
    drawer.removeAttribute('inert');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close itinerary menu');
    document.body.style.overflow = 'hidden';
    const focusables = getFocusable();
    focusables[0]?.focus();
  };

  const closeDrawer = (returnFocus = false) => {
    drawer.dataset.open = 'false';
    drawer.setAttribute('inert', '');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open itinerary menu');
    document.body.style.overflow = '';
    if (returnFocus && lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  const trapFocus = (event) => {
    if (drawer.dataset.open !== 'true' || event.key !== 'Tab') return;
    const focusables = getFocusable();
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
  };

  let ticking = false;
  const updateHeaderScrollState = () => {
    header.classList.toggle('travel-header--scrolled', window.scrollY > 12);
    ticking = false;
  };

  menuButton.addEventListener('click', () => {
    if (drawer.dataset.open === 'true') {
      closeDrawer(true);
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', () => closeDrawer(true));
  drawerLinks.forEach((link) => link.addEventListener('click', () => closeDrawer(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.dataset.open === 'true') {
      closeDrawer(true);
      menuButton.focus();
    }
    trapFocus(event);
  });

  themeButton.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  desktopMQ.addEventListener('change', (event) => {
    if (event.matches) {
      closeDrawer(false);
    }
  });

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderScrollState);
      ticking = true;
    }
  }, { passive: true });

  initializeTheme();
  closeDrawer(false);
  updateHeaderScrollState();
})();
