(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const themeToggle = document.querySelector('[data-theme-toggle]');

  if (!header || !nav || !menuToggle || !themeToggle) {
    return;
  }

  const mediaDesktop = window.matchMedia('(min-width: 900px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const THEME_KEY = 'header-01-theme';

  const setMenuState = (isOpen) => {
    nav.classList.toggle('header__nav--open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close main menu' : 'Open main menu');
  };

  const closeMenu = () => setMenuState(false);

  const applyTheme = (theme) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    themeToggle.setAttribute(
      'aria-label',
      nextTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  };

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuToggle.focus();
    }
  });

  nav.addEventListener('click', (event) => {
    const clickedLink = event.target.closest('.header__nav-link');
    if (clickedLink && !mediaDesktop.matches) {
      closeMenu();
    }
  });

  const handleViewportChange = () => {
    if (mediaDesktop.matches) {
      setMenuState(false);
    }
  };

  if (typeof mediaDesktop.addEventListener === 'function') {
    mediaDesktop.addEventListener('change', handleViewportChange);
  } else {
    mediaDesktop.addListener(handleViewportChange);
  }

  const handleScroll = () => {
    const shouldShrink = window.scrollY > 16;
    header.classList.toggle('header--scrolled', shouldShrink);
  };

  window.addEventListener('scroll', handleScroll, {
    passive: true,
  });

  if (!reducedMotion.matches) {
    handleScroll();
  }
})();
