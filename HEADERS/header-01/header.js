(function header01Init() {
  const header = document.querySelector('[data-header-01]');

  if (!header) {
    return;
  }

  const desktopMedia = window.matchMedia('(min-width: 900px)');
  const menuToggle = header.querySelector('[data-header-01-menu-toggle]');
  const mobilePanel = header.querySelector('[data-header-01-mobile-panel]');
  const themeToggle = header.querySelector('[data-header-01-theme-toggle]');
  const scrollClass = 'header-01--scrolled';
  const openClass = 'header-01--menu-open';
  const storageKey = 'header-01-theme';

  const updateThemeUi = (isDark) => {
    header.setAttribute('data-header-01-theme', isDark ? 'dark' : 'light');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
  };

  const setMenuState = (isOpen) => {
    if (!menuToggle || !mobilePanel) {
      return;
    }

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobilePanel.hidden = !isOpen;
    header.classList.toggle(openClass, isOpen);
  };

  const closeMenu = () => setMenuState(false);

  const onMenuToggleClick = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isExpanded);
  };

  const onOutsideClick = (event) => {
    if (!header.classList.contains(openClass)) {
      return;
    }

    if (!header.contains(event.target)) {
      closeMenu();
    }
  };

  const onEscKey = (event) => {
    if (event.key === 'Escape' && header.classList.contains(openClass)) {
      closeMenu();
      menuToggle.focus();
    }
  };

  const onBreakpointChange = (event) => {
    if (event.matches) {
      closeMenu();
    }
  };

  const onScroll = () => {
    header.classList.toggle(scrollClass, window.scrollY > 6);
  };

  const applyStoredTheme = () => {
    const storedTheme = window.localStorage.getItem(storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      updateThemeUi(storedTheme === 'dark');
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    updateThemeUi(prefersDark);
  };

  if (menuToggle && mobilePanel) {
    setMenuState(false);
    menuToggle.addEventListener('click', onMenuToggleClick);
    document.addEventListener('click', onOutsideClick);
    document.addEventListener('keydown', onEscKey);
    desktopMedia.addEventListener('change', onBreakpointChange);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = header.getAttribute('data-header-01-theme') === 'dark';
      updateThemeUi(!isDark);
      window.localStorage.setItem(storageKey, !isDark ? 'dark' : 'light');
    });
  }

  applyStoredTheme();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
