(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-neon-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const mobileLinks = mobilePanel ? mobilePanel.querySelectorAll('a') : [];
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeLabel = document.querySelector('[data-theme-label]');

  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
  const themeKey = 'header-neon-console-theme';

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(themeKey);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (themeButton && themeLabel) {
      themeLabel.textContent = `SYS:${theme.toUpperCase()}`;
      themeButton.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    }
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    if (!menuButton || !mobilePanel) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.neon-header__menu-glyph').textContent = '>_';
    mobilePanel.hidden = true;
    if (returnFocus) menuButton.focus();
  };

  const openMenu = () => {
    if (!menuButton || !mobilePanel) return;
    mobilePanel.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.querySelector('.neon-header__menu-glyph').textContent = '×_';
  };

  if (themeButton) {
    applyTheme(getPreferredTheme());
    themeButton.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(themeKey, next);
      applyTheme(next);
    });
  }

  if (menuButton && mobilePanel) {
    closeMenu();
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu();
      else openMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu({ returnFocus: true });
      }
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (
        menuButton.getAttribute('aria-expanded') === 'true' &&
        !header.contains(target)
      ) {
        closeMenu();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    const onBreakpointChange = (e) => {
      if (e.matches) closeMenu();
    };

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', onBreakpointChange);
    } else {
      desktopQuery.addListener(onBreakpointChange);
    }
  }

  let ticking = false;
  const updateScrolledState = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolledState);
        ticking = true;
      }
    },
    { passive: true }
  );
})();
