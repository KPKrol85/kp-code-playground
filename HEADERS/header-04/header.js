(() => {
  const header = document.querySelector('[data-header-04]');
  if (!header) return;

  const root = document.documentElement;
  const menuToggle = header.querySelector('[data-header-04-menu-toggle]');
  const mobilePanel = header.querySelector('[data-header-04-mobile-panel]');
  const themeToggle = header.querySelector('[data-header-04-theme-toggle]');
  const desktopBreakpoint = window.matchMedia('(min-width: 900px)');

  const setMenuState = (isOpen) => {
    if (!menuToggle || !mobilePanel) return;

    header.classList.toggle('header-04--menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobilePanel.hidden = !isOpen;
  };

  const closeMenu = () => setMenuState(false);

  const applyTheme = (theme) => {
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', normalizedTheme);

    if (themeToggle) {
      const icon = themeToggle.querySelector('.header-04__theme-icon');
      const darkMode = normalizedTheme === 'dark';
      themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light theme' : 'Switch to dark theme');
      if (icon) icon.textContent = darkMode ? '☾' : '☀';
    }
  };

  const initializeTheme = () => {
    const stored = window.localStorage.getItem('header-04-theme');
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  };

  initializeTheme();

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      window.localStorage.setItem('header-04-theme', nextTheme);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!header.classList.contains('header-04--menu-open')) return;
    if (header.contains(event.target)) return;
    closeMenu();
  });

  if (mobilePanel) {
    mobilePanel.addEventListener('click', (event) => {
      const targetLink = event.target.closest('.header-04__mobile-link, .header-04__mobile-cta');
      if (targetLink) closeMenu();
    });
  }

  const handleBreakpointChange = () => {
    if (desktopBreakpoint.matches) closeMenu();
  };

  if (typeof desktopBreakpoint.addEventListener === 'function') {
    desktopBreakpoint.addEventListener('change', handleBreakpointChange);
  } else {
    desktopBreakpoint.addListener(handleBreakpointChange);
  }
})();
