(() => {
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
  const root = document.documentElement;
  const body = document.body;
  const menuButton = document.querySelector('[data-menu-button]');
  const panel = document.querySelector('[data-panel]');
  const overlay = document.querySelector('[data-overlay]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const header = document.querySelector('[data-header]');
  const themeKey = 'header-creator-hub-theme';
  let lastFocus = null;

  const getFocusables = () => panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');

  const setThemeLabel = (theme) => {
    const next = theme === 'dark' ? 'day mode' : 'night mode';
    themeToggle.setAttribute('aria-label', `Studio: switch to ${next}`);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem(themeKey, theme);
    setThemeLabel(theme);
  };

  const initTheme = () => {
    const stored = localStorage.getItem(themeKey);
    const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    setThemeLabel(theme);
  };

  const closePanel = ({ returnFocus = false } = {}) => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('inert', '');
    overlay.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    if (returnFocus) (lastFocus || menuButton).focus();
  };

  const openPanel = () => {
    lastFocus = document.activeElement;
    panel.classList.add('is-open');
    panel.removeAttribute('inert');
    panel.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    const first = getFocusables()[0];
    if (first) first.focus();
  };

  const trapFocus = (event) => {
    if (!panel.classList.contains('is-open') || event.key !== 'Tab') return;
    const items = [...getFocusables()];
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  menuButton.addEventListener('click', () => {
    if (panel.classList.contains('is-open')) closePanel();
    else openPanel();
  });

  overlay.addEventListener('click', () => closePanel());
  panel.addEventListener('click', (event) => {
    if (event.target.closest('.creator-panel__link')) closePanel();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && panel.classList.contains('is-open')) closePanel({ returnFocus: true });
    trapFocus(event);
  });

  desktopQuery.addEventListener('change', (e) => {
    if (e.matches) closePanel();
  });

  themeToggle.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  };

  initTheme();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
