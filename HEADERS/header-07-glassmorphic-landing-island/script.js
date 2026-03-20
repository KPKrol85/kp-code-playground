(() => {
  const storageKey = 'gli-theme-preference';
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const mobileLinks = mobilePanel ? Array.from(mobilePanel.querySelectorAll('a')) : [];
  const mediaTheme = window.matchMedia('(prefers-color-scheme: dark)');

  root.classList.remove('no-js');

  if (!header) return;

  const getStoredTheme = () => {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const storeTheme = (value) => {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // Ignore storage failures and keep the runtime theme only.
    }
  };

  const resolveTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    return mediaTheme.matches ? 'dark' : 'light';
  };

  const syncThemeUi = (theme) => {
    const isDark = theme === 'dark';
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(!isDark));
      themeToggle.setAttribute(
        'aria-label',
        isDark ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeToggle.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }
  };

  const applyTheme = (theme, persist = false) => {
    syncThemeUi(theme);
    if (persist) {
      storeTheme(theme);
    }
  };

  const setScrolledState = () => {
    header.dataset.scrolled = window.scrollY > 12 ? 'true' : 'false';
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuToggle || !mobilePanel) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    header.dataset.mobileOpen = 'false';
    mobilePanel.hidden = true;

    if (restoreFocus) {
      menuToggle.focus();
    }
  };

  const openMenu = () => {
    if (!menuToggle || !mobilePanel) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    header.dataset.mobileOpen = 'true';
    mobilePanel.hidden = false;

    if (mobileLinks[0]) {
      window.requestAnimationFrame(() => mobileLinks[0].focus());
    }
  };

  const toggleMenu = () => {
    if (!menuToggle || !mobilePanel) return;
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu({ restoreFocus: true });
    } else {
      openMenu();
    }
  };

  applyTheme(resolveTheme());
  setScrolledState();
  header.dataset.mobileOpen = 'false';
  if (mobilePanel) {
    mobilePanel.hidden = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu({ restoreFocus: true });
      }
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (header.dataset.mobileOpen === 'true' && !header.contains(target)) {
        closeMenu();
      }
    });
  }

  window.addEventListener('scroll', setScrolledState, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });

  const handleSystemThemeChange = () => {
    if (!getStoredTheme()) {
      applyTheme(resolveTheme());
    }
  };

  if (typeof mediaTheme.addEventListener === 'function') {
    mediaTheme.addEventListener('change', handleSystemThemeChange);
  } else if (typeof mediaTheme.addListener === 'function') {
    mediaTheme.addListener(handleSystemThemeChange);
  }
})();
