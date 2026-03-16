(() => {
  const header = document.querySelector('[data-header-02]');
  if (!header) return;

  const menuToggle = header.querySelector('[data-header-02-menu-toggle]');
  const menuClose = header.querySelector('[data-header-02-menu-close]');
  const mobileNav = header.querySelector('[data-header-02-mobile-nav]');
  const backdrop = header.querySelector('[data-header-02-backdrop]');

  const searchToggle = header.querySelector('[data-header-02-search-toggle]');
  const searchPanel = header.querySelector('[data-header-02-search-panel]');
  const searchInput = header.querySelector('#header-02-search-input');

  const themeToggle = header.querySelector('[data-header-02-theme-toggle]');
  const desktopBreakpoint = window.matchMedia('(min-width: 900px)');

  const openMenu = () => {
    if (!mobileNav || !menuToggle) return;
    mobileNav.hidden = false;
    backdrop.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    if (!mobileNav || !menuToggle) return;
    mobileNav.hidden = true;
    backdrop.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  };

  const openSearch = () => {
    if (!searchPanel || !searchToggle) return;
    searchPanel.hidden = false;
    searchToggle.setAttribute('aria-expanded', 'true');
    searchToggle.setAttribute('aria-label', 'Close search');
    searchInput?.focus();
  };

  const closeSearch = () => {
    if (!searchPanel || !searchToggle) return;
    if (desktopBreakpoint.matches) return;
    searchPanel.hidden = true;
    searchToggle.setAttribute('aria-expanded', 'false');
    searchToggle.setAttribute('aria-label', 'Open search');
  };

  const toggleTheme = () => {
    const isDark = header.classList.toggle('header-02--dark');
    themeToggle?.setAttribute('aria-pressed', String(isDark));
    themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  const syncDesktopState = () => {
    if (desktopBreakpoint.matches) {
      closeMenu();
      if (searchPanel) {
        searchPanel.hidden = false;
      }
      searchToggle?.setAttribute('aria-expanded', 'true');
      searchToggle?.setAttribute('aria-label', 'Search panel is visible');
    } else {
      if (searchPanel) {
        searchPanel.hidden = true;
      }
      searchToggle?.setAttribute('aria-expanded', 'false');
      searchToggle?.setAttribute('aria-label', 'Open search');
    }
  };

  menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuClose?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', () => {
    closeMenu();
    closeSearch();
  });

  searchToggle?.addEventListener('click', () => {
    const isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded && !desktopBreakpoint.matches) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  themeToggle?.addEventListener('click', toggleTheme);

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    if (!desktopBreakpoint.matches && !header.contains(target)) {
      closeMenu();
      closeSearch();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMenu();
    closeSearch();
  });

  desktopBreakpoint.addEventListener('change', syncDesktopState);
  syncDesktopState();
})();
