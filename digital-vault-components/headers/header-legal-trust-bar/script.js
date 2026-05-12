(() => {
  const BREAKPOINT = 900;
  const THEME_KEY = 'header-legal-trust-bar-theme';

  const header = document.querySelector('[data-legal-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-panel]');
  const overlay = document.querySelector('[data-overlay]');
  const themeToggle = document.querySelector('[data-theme-toggle]');

  if (!header || !menuToggle || !panel || !overlay || !themeToggle) return;

  const panelSheet = panel.querySelector('.legal-panel__sheet');
  const panelLinks = panel.querySelectorAll('a');
  let lastFocused = null;

  const getFocusable = () =>
    [...panel.querySelectorAll('a[href], button:not([disabled])')].filter(
      (el) => !el.hasAttribute('tabindex') || el.getAttribute('tabindex') !== '-1'
    );

  const setPanelFocusable = (enabled) => {
    panelLinks.forEach((link) => {
      if (enabled) {
        link.removeAttribute('tabindex');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  };

  const lockScroll = (isLocked) => {
    document.body.classList.toggle('is-panel-open', isLocked);
  };

  const isOpen = () => header.classList.contains('is-panel-open');

  const openPanel = () => {
    lastFocused = document.activeElement;
    panel.hidden = false;
    overlay.hidden = false;
    header.classList.add('is-panel-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.querySelector('.visually-hidden').textContent = 'Close legal panel';
    setPanelFocusable(true);
    lockScroll(true);
    requestAnimationFrame(() => {
      const focusables = getFocusable();
      (focusables[0] || panelSheet).focus();
    });
  };

  const closePanel = (returnFocus = false) => {
    panel.hidden = true;
    overlay.hidden = true;
    header.classList.remove('is-panel-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.visually-hidden').textContent = 'Open legal panel';
    setPanelFocusable(false);
    lockScroll(false);

    if (returnFocus) {
      menuToggle.focus();
    } else if (lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  setPanelFocusable(false);

  menuToggle.addEventListener('click', () => {
    if (isOpen()) closePanel();
    else openPanel();
  });

  overlay.addEventListener('click', () => closePanel());

  panel.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.closest('a')) {
      closePanel();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closePanel(true);
      return;
    }

    if (event.key === 'Tab') {
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
    }
  });

  const syncDesktopState = () => {
    if (window.innerWidth >= BREAKPOINT && isOpen()) {
      closePanel(false);
    }
  };

  window.addEventListener('resize', syncDesktopState);

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const toDark = theme !== 'dark';
    themeToggle.setAttribute(
      'aria-label',
      toDark ? 'Switch to dark contrast mode' : 'Switch to light contrast mode'
    );
  };

  const savedTheme = localStorage.getItem(THEME_KEY);
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (preferredDark ? 'dark' : 'light'));

  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 6);
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();
