(() => {
  const docEl = document.documentElement;
  const header = document.querySelector('[data-launch-header]');
  const panel = document.querySelector('[data-launch-panel]');
  const overlay = document.querySelector('[data-launch-overlay]');
  const menuButton = document.querySelector('[data-menu-button]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const mobileLinks = panel ? [...panel.querySelectorAll('a')] : [];
  const desktopBreakpoint = window.matchMedia('(min-width: 56.25rem)');
  const themeKey = 'header-product-launch-theme';
  let lastFocus = null;

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const setThemeLabel = (theme) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    themeToggle?.setAttribute('aria-label', `Switch to ${next} mode`);
    themeToggle?.setAttribute('title', `Switch to ${next} mode`);
  };

  const resolveTheme = () => {
    const stored = localStorage.getItem(themeKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    docEl.dataset.theme = theme;
    setThemeLabel(theme);
  };

  const getFocusableInPanel = () => {
    if (!panel) return [];
    return [...panel.querySelectorAll(focusableSelector)].filter((el) => !el.hidden);
  };

  const setPanelA11y = (open) => {
    if (!panel || !overlay) return;
    if (open) {
      panel.hidden = false;
      overlay.hidden = false;
      panel.removeAttribute('inert');
    } else {
      panel.setAttribute('inert', '');
      panel.hidden = true;
      overlay.hidden = true;
    }
  };

  const openPanel = () => {
    if (!panel || !overlay || !menuButton) return;
    lastFocus = document.activeElement;
    setPanelA11y(true);
    panel.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close launch actions');
    document.body.classList.add('is-panel-open');
    const focusables = getFocusableInPanel();
    focusables[0]?.focus();
  };

  const closePanel = (focusMenu = false) => {
    if (!panel || !overlay || !menuButton) return;
    panel.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open launch actions');
    document.body.classList.remove('is-panel-open');
    setPanelA11y(false);
    if (focusMenu) {
      menuButton.focus();
    } else if (lastFocus instanceof HTMLElement) {
      lastFocus.focus();
    }
  };

  const onKeydown = (event) => {
    const isOpen = panel?.classList.contains('is-open');
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closePanel(true);
      return;
    }
    if (event.key !== 'Tab') return;

    const focusables = getFocusableInPanel();
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

  const syncForBreakpoint = (mq) => {
    if (mq.matches && panel?.classList.contains('is-open')) {
      closePanel(false);
    }
  };

  let ticking = false;
  const handleScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      header?.classList.toggle('is-scrolled', window.scrollY > 28);
      ticking = false;
    });
  };

  applyTheme(resolveTheme());
  setPanelA11y(false);

  themeToggle?.addEventListener('click', () => {
    const next = docEl.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(themeKey, next);
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = panel?.classList.contains('is-open');
    if (isOpen) {
      closePanel(false);
    } else {
      openPanel();
    }
  });

  overlay?.addEventListener('click', () => closePanel(false));
  mobileLinks.forEach((link) => link.addEventListener('click', () => closePanel(false)));
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('scroll', handleScroll, { passive: true });
  desktopBreakpoint.addEventListener('change', syncForBreakpoint);
})();
