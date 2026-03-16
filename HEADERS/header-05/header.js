(function initHeader05() {
  const header = document.querySelector('[data-header-05]');

  if (!header) {
    return;
  }

  const menuToggle = header.querySelector('[data-header-05-menu-toggle]');
  const mobilePanel = header.querySelector('[data-header-05-mobile-panel]');
  const themeToggle = header.querySelector('[data-header-05-theme-toggle]');
  const desktopMediaQuery = window.matchMedia('(min-width: 900px)');
  const storageKey = 'header-05-theme';

  const isDark = () => header.classList.contains('header-05--theme-dark');

  const updateThemeToggleLabel = () => {
    if (!themeToggle) {
      return;
    }

    const nextTheme = isDark() ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    themeToggle.setAttribute('title', `Switch to ${nextTheme} theme`);
  };

  const setTheme = (theme) => {
    const darkMode = theme === 'dark';
    header.classList.toggle('header-05--theme-dark', darkMode);
    header.classList.toggle('header-05--theme-light', !darkMode);
    header.setAttribute('data-header-05-theme', theme);
    updateThemeToggleLabel();
  };

  const closeMobileMenu = () => {
    if (!menuToggle || !mobilePanel) {
      return;
    }

    menuToggle.setAttribute('aria-expanded', 'false');
    mobilePanel.hidden = true;
    header.classList.remove('header-05--menu-open');
  };

  const openMobileMenu = () => {
    if (!menuToggle || !mobilePanel) {
      return;
    }

    menuToggle.setAttribute('aria-expanded', 'true');
    mobilePanel.hidden = false;
    header.classList.add('header-05--menu-open');
  };

  const toggleMobileMenu = () => {
    if (!menuToggle) {
      return;
    }

    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  };

  const applyInitialTheme = () => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  };

  menuToggle?.addEventListener('click', toggleMobileMenu);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = isDark() ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  });

  mobilePanel?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', (event) => {
    const isDesktop = desktopMediaQuery.matches;
    const clickedInsideHeader = header.contains(event.target);

    if (!isDesktop && !clickedInsideHeader) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  const handleDesktopChange = (event) => {
    if (event.matches) {
      closeMobileMenu();
    }
  };

  if (typeof desktopMediaQuery.addEventListener === 'function') {
    desktopMediaQuery.addEventListener('change', handleDesktopChange);
  } else if (typeof desktopMediaQuery.addListener === 'function') {
    desktopMediaQuery.addListener(handleDesktopChange);
  }

  applyInitialTheme();
  closeMobileMenu();
})();
