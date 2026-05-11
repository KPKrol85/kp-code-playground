(() => {
  const storageKey = 'header-app-orbit-theme';
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');

  const root = document.documentElement;
  const header = document.querySelector('[data-orbit-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menuPanel = document.querySelector('[data-menu-panel]');
  const overlay = document.querySelector('[data-menu-overlay]');
  const mobileLinks = menuPanel ? [...menuPanel.querySelectorAll('.orbit-menu__link, .orbit-menu__cta')] : [];
  const themeToggle = document.querySelector('[data-theme-toggle]');

  let lastScrollY = 0;
  let rafId = null;

  const setMobileLinkFocusability = (isOpen) => {
    mobileLinks.forEach((link) => {
      if (isOpen) {
        link.removeAttribute('tabindex');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  };

  const setMenuState = (isOpen, { focusButton = false } = {}) => {
    if (!menuButton || !menuPanel || !overlay) return;

    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

    menuPanel.hidden = !isOpen;
    overlay.hidden = !isOpen;
    menuPanel.dataset.open = String(isOpen);
    setMobileLinkFocusability(isOpen);

    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (!isOpen && focusButton) {
      menuButton.focus();
    }
  };

  const closeMenu = (options = {}) => setMenuState(false, options);

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (!themeToggle) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
  };

  const initTheme = () => {
    const saved = localStorage.getItem(storageKey);
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(saved === 'light' || saved === 'dark' ? saved : preferred);
  };

  const onScroll = () => {
    lastScrollY = window.scrollY;
    if (rafId) return;

    rafId = window.requestAnimationFrame(() => {
      if (header) {
        header.dataset.scrolled = String(lastScrollY > 8);
      }
      rafId = null;
    });
  };

  if (menuButton && menuPanel && overlay) {
    setMobileLinkFocusability(false);

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    overlay.addEventListener('click', () => closeMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (event) => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;
      if (event.key === 'Escape') {
        closeMenu({ focusButton: true });
      }
    });

    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) {
        closeMenu();
      }
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(storageKey, next);
    });
  }

  initTheme();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
