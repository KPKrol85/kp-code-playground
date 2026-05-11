(() => {
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
  const root = document.documentElement;
  const body = document.body;

  const menuButton = document.querySelector('[data-menu-button]');
  const drawer = document.querySelector('[data-command-drawer]');
  const overlay = document.querySelector('[data-command-overlay]');
  const drawerPanel = drawer?.querySelector('.command-drawer__panel');
  const drawerLinks = drawer ? Array.from(drawer.querySelectorAll('a')) : [];

  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeIcon = themeToggle?.querySelector('.command-header__theme-icon');
  const THEME_KEY = 'header-command-dock-theme';

  let lastFocusedElement = null;

  const getFocusable = () => {
    if (!drawerPanel) return [];
    return Array.from(
      drawerPanel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
  };

  const setDrawerState = (open) => {
    if (!menuButton || !drawer || !overlay) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close command menu' : 'Open command menu');
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    overlay.hidden = !open;
    body.classList.toggle('has-drawer-open', open);

    if (open) {
      lastFocusedElement = document.activeElement;
      const focusables = getFocusable();
      (focusables[0] || drawerPanel).focus();
    } else if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  const trapFocus = (event) => {
    if (!drawer?.classList.contains('is-open') || event.key !== 'Tab') return;
    const focusables = getFocusable();
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (themeIcon) themeIcon.textContent = isDark ? '☾' : '☀';
  };

  const initTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored);
      return;
    }
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setDrawerState(!isOpen);
  });

  overlay?.addEventListener('click', () => setDrawerState(false));
  drawerLinks.forEach((link) => link.addEventListener('click', () => setDrawerState(false)));

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setDrawerState(false);
    trapFocus(event);
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setDrawerState(false);
  });

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  initTheme();
})();
