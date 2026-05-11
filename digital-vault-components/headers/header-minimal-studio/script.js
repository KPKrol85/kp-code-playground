(() => {
  const STORAGE_KEY = 'header-minimal-studio-theme';
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');

  const root = document.documentElement;
  const header = document.querySelector('[data-minimal-header]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuPanel = document.getElementById('minimal-menu-panel');
  const menuOverlay = document.querySelector('[data-menu-overlay]');
  const mobileLinks = menuPanel ? Array.from(menuPanel.querySelectorAll('a')) : [];

  let lastFocus = null;

  const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (!themeToggle) return;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  };

  const initTheme = () => {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    applyTheme(storedTheme || getSystemTheme());
  };

  const setMenuFocusable = (isOpen) => {
    mobileLinks.forEach((link) => {
      if (isOpen) {
        link.removeAttribute('tabindex');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  };

  const closeMenu = (shouldReturnFocus = false) => {
    if (!menuPanel || !menuToggle || !menuOverlay) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuPanel.classList.remove('is-open');
    menuOverlay.hidden = true;
    setMenuFocusable(false);
    window.setTimeout(() => {
      menuPanel.hidden = true;
    }, 180);

    if (shouldReturnFocus && lastFocus) {
      lastFocus.focus();
    }
  };

  const openMenu = () => {
    if (!menuPanel || !menuToggle || !menuOverlay) return;
    menuPanel.hidden = false;
    menuOverlay.hidden = false;
    requestAnimationFrame(() => menuPanel.classList.add('is-open'));
    menuToggle.setAttribute('aria-expanded', 'true');
    setMenuFocusable(true);
  };

  const toggleMenu = () => {
    const isOpen = menuToggle?.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
    });
  }

  if (menuToggle && menuPanel && menuOverlay) {
    setMenuFocusable(false);

    menuToggle.addEventListener('click', () => {
      lastFocus = menuToggle;
      toggleMenu();
    });

    menuOverlay.addEventListener('click', () => closeMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });

    document.addEventListener('click', (event) => {
      const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (!isMenuOpen) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!menuPanel.contains(target) && !menuToggle.contains(target)) {
        closeMenu();
      }
    });

    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) {
        closeMenu();
      }
    });
  }

  if (header) {
    let ticking = false;
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  initTheme();
})();
