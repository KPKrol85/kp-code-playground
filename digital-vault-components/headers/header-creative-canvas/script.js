(() => {
  const breakpoint = window.matchMedia('(min-width: 56.25rem)');
  const header = document.querySelector('[data-canvas-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu-panel]');
  const overlay = document.querySelector('[data-overlay]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeLabel = document.querySelector('[data-theme-label]');
  const themeKey = 'header-creative-canvas-theme';

  if (!menuButton || !menu || !overlay || !themeButton || !themeLabel) return;

  const focusables = () => menu.querySelectorAll('a, button, [tabindex]');

  const setMenuFocusable = (enabled) => {
    focusables().forEach((el) => {
      if (enabled) {
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex', '-1');
      }
    });
  };

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeLabel.textContent = isDark ? 'Canvas: Ink' : 'Canvas: Light';
    themeButton.setAttribute('aria-label', isDark ? 'Switch to canvas light mode' : 'Switch to canvas ink mode');
    localStorage.setItem(themeKey, theme);
  };

  const openMenu = () => {
    menu.hidden = false;
    overlay.hidden = false;
    menu.dataset.open = 'true';
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.querySelector('.visually-hidden').textContent = 'Close creative menu';
    setMenuFocusable(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = ({ focusButton = false } = {}) => {
    menu.dataset.open = 'false';
    menu.hidden = true;
    overlay.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.visually-hidden').textContent = 'Open creative menu';
    setMenuFocusable(false);
    document.body.style.overflow = '';
    if (focusButton) menuButton.focus();
  };

  const toggleMenu = () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu(); else openMenu();
  };

  const preferredTheme = () => {
    const stored = localStorage.getItem(themeKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  setTheme(preferredTheme());
  closeMenu();

  themeButton.addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });
  menuButton.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', () => closeMenu({ focusButton: true }));

  menu.querySelectorAll('.canvas-menu__link, .canvas-menu__cta').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('click', (event) => {
    if (menu.hidden) return;
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu({ focusButton: true });
    }
  });

  breakpoint.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  let ticking = false;
  const updateScroll = () => {
    header.classList.toggle('canvas-header--scrolled', window.scrollY > 10);
    ticking = false;
  };

  document.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
})();
