(() => {
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
  const themeKey = 'header-calm-wellness-theme';

  const header = document.querySelector('[data-wellness-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const overlay = document.querySelector('[data-overlay]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeState = document.querySelector('[data-theme-state]');

  if (!menuToggle || !mobileMenu || !overlay || !themeToggle || !themeState) return;

  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const mobileLinks = [...mobileMenu.querySelectorAll('a')];
  let escapeShouldRestoreFocus = false;

  const setMobileFocusable = (isOpen) => {
    mobileMenu.querySelectorAll(focusableSelector).forEach((el) => {
      if (isOpen) {
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex', '-1');
      }
    });
  };

  const openMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.hidden = false;
    overlay.hidden = false;
    document.body.classList.add('is-menu-open');
    setMobileFocusable(true);
  };

  const closeMenu = (restoreFocus = false) => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    overlay.hidden = true;
    document.body.classList.remove('is-menu-open');
    setMobileFocusable(false);
    if (restoreFocus) menuToggle.focus();
  };

  const isOpen = () => menuToggle.getAttribute('aria-expanded') === 'true';

  menuToggle.addEventListener('click', () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', () => closeMenu());

  document.addEventListener('click', (event) => {
    if (!isOpen()) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const clickedInsideMenu = mobileMenu.contains(target) || menuToggle.contains(target);
    if (!clickedInsideMenu) closeMenu();
  });

  mobileLinks.forEach((link) => link.addEventListener('click', () => closeMenu()));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      escapeShouldRestoreFocus = true;
      closeMenu(escapeShouldRestoreFocus);
      escapeShouldRestoreFocus = false;
    }
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const nextTheme = theme === 'dark' ? 'Day' : 'Night';
    themeState.textContent = theme === 'dark' ? 'Night' : 'Day';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  };

  const getInitialTheme = () => {
    const saved = localStorage.getItem(themeKey);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  applyTheme(getInitialTheme());

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(themeKey, next);
    applyTheme(next);
  });

  setMobileFocusable(false);

  let pending = false;
  const onScroll = () => {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(() => {
      pending = false;
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();
