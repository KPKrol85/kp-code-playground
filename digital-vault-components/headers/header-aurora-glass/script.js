(() => {
  const THEME_KEY = 'header-aurora-glass-theme';
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
  const root = document.documentElement;

  const header = document.querySelector('[data-aurora-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const overlay = document.querySelector('[data-overlay]');
  const themeToggle = document.querySelector('[data-theme-toggle]');

  if (!header || !menuButton || !mobileMenu || !overlay || !themeToggle) return;

  const mobileNavLinks = mobileMenu.querySelectorAll('a');
  let isMenuOpen = false;
  let rafId = null;

  const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };

  const initTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    applyTheme(stored || getSystemTheme());
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.hidden = true;
    overlay.hidden = true;
    if (returnFocus) menuButton.focus();
  };

  const openMenu = () => {
    isMenuOpen = true;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close navigation menu');
    mobileMenu.hidden = false;
    overlay.hidden = false;
  };

  const toggleMenu = () => {
    if (desktopQuery.matches) return;
    if (isMenuOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  menuButton.addEventListener('click', toggleMenu);

  overlay.addEventListener('click', () => closeMenu());

  document.addEventListener('click', (event) => {
    if (!isMenuOpen) return;
    const target = event.target;
    if (target instanceof Node && !mobileMenu.contains(target) && !menuButton.contains(target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMenu({ returnFocus: true });
    }
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  const onResizeDesktop = (event) => {
    if (event.matches) closeMenu();
  };

  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', onResizeDesktop);
  } else {
    desktopQuery.addListener(onResizeDesktop);
  }

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });

  const updateScrollState = () => {
    header.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';
    rafId = null;
  };

  window.addEventListener('scroll', () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(updateScrollState);
  }, { passive: true });

  initTheme();
  updateScrollState();
})();
