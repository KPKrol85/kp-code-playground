(() => {
  const mqDesktop = window.matchMedia('(min-width: 56.25rem)');
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-vault-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const panel = document.querySelector('[data-vault-panel]');
  const overlay = document.querySelector('[data-vault-overlay]');
  const themeToggleButtons = Array.from(document.querySelectorAll('[data-theme-toggle]'));

  if (!menuButton || !panel || !overlay) return;

  const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  let isOpen = false;
  let lastFocused = null;
  let scrollQueued = false;

  const setThemeState = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('header-vault-navigator-theme', theme);
    const next = theme === 'dark' ? 'light' : 'dark';
    themeToggleButtons.forEach((button) => {
      button.setAttribute('aria-label', `Switch to ${next} vault mode`);
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  };

  const initTheme = () => {
    const stored = localStorage.getItem('header-vault-navigator-theme');
    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored);
      return;
    }
    setThemeState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const getFocusable = () => Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR));

  const setPanelTabbing = (enabled) => {
    getFocusable().forEach((el) => {
      if (!enabled) {
        el.dataset.prevTabindex = el.getAttribute('tabindex') ?? '';
        el.setAttribute('tabindex', '-1');
      } else {
        const prev = el.dataset.prevTabindex;
        if (prev === '') el.removeAttribute('tabindex');
        else el.setAttribute('tabindex', prev);
        delete el.dataset.prevTabindex;
      }
    });
  };

  const openPanel = () => {
    isOpen = true;
    lastFocused = document.activeElement;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close mini vault panel');
    overlay.hidden = false;
    overlay.classList.add('is-visible');
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    setPanelTabbing(true);
    body.classList.add('vault-panel-open');
    const focusables = getFocusable();
    (focusables[0] || panel).focus();
  };

  const closePanel = ({ returnFocus = false } = {}) => {
    if (!isOpen) return;
    isOpen = false;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open mini vault panel');
    overlay.classList.remove('is-visible');
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    setPanelTabbing(false);
    body.classList.remove('vault-panel-open');
    window.setTimeout(() => {
      if (!isOpen) overlay.hidden = true;
    }, 240);

    if (returnFocus) {
      menuButton.focus();
    } else if (lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  const trapFocus = (event) => {
    if (!isOpen || event.key !== 'Tab') return;
    const focusables = getFocusable();
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleScroll = () => {
    if (scrollQueued || !header) return;
    scrollQueued = true;
    window.requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 32);
      scrollQueued = false;
    });
  };

  menuButton.addEventListener('click', () => (isOpen ? closePanel() : openPanel()));
  overlay.addEventListener('click', () => closePanel());

  panel.addEventListener('click', (event) => {
    const trigger = event.target.closest('a');
    if (trigger) closePanel();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      closePanel({ returnFocus: true });
    }
    trapFocus(event);
  });

  mqDesktop.addEventListener('change', (event) => {
    if (event.matches) closePanel();
  });

  themeToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setThemeState(nextTheme);
    });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });

  setPanelTabbing(false);
  initTheme();
  handleScroll();
})();
