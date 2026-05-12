(() => {
  const root = document.documentElement;
  const panel = document.querySelector('[data-panel]');
  const overlay = document.querySelector('[data-overlay]');
  const menuButton = document.querySelector('[data-menu-button]');
  const modeToggle = document.querySelector('[data-theme-toggle]');
  const modeText = document.querySelector('[data-theme-text]');
  const header = document.querySelector('.ai-header');
  const panelLinks = panel ? panel.querySelectorAll('.ai-panel__link, .ai-panel__cta') : [];

  const themeKey = 'header-ai-signal-theme';
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
  let lastFocus = null;
  let rafId = null;

  const getFocusable = () => {
    if (!panel) return [];
    return [...panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((el) => !el.hasAttribute('hidden'));
  };

  const setPanelFocusability = (open) => {
    if (!panel) return;
    const focusables = getFocusable();
    focusables.forEach((el) => {
      if (open) {
        if (el.dataset.prevTabindex) {
          el.setAttribute('tabindex', el.dataset.prevTabindex);
          delete el.dataset.prevTabindex;
        } else {
          el.removeAttribute('tabindex');
        }
      } else {
        if (!el.hasAttribute('tabindex')) {
          el.dataset.prevTabindex = '';
        } else {
          el.dataset.prevTabindex = el.getAttribute('tabindex') || '';
        }
        el.setAttribute('tabindex', '-1');
      }
    });
  };

  const updateTheme = (theme) => {
    root.dataset.theme = theme;
    const text = theme === 'dark' ? 'AI Mode' : 'Human Mode';
    if (modeText) modeText.textContent = text;
    if (modeToggle) {
      modeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Human Mode' : 'AI Mode'}`);
      modeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  };

  const openPanel = () => {
    if (!panel || !overlay || !menuButton) return;
    lastFocus = document.activeElement;
    panel.hidden = false;
    overlay.hidden = false;
    panel.dataset.open = 'true';
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setPanelFocusability(true);
    const focusables = getFocusable();
    if (focusables[0]) focusables[0].focus();
  };

  const closePanel = (focusTarget = menuButton) => {
    if (!panel || !overlay || !menuButton) return;
    panel.dataset.open = 'false';
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setPanelFocusability(false);
    window.setTimeout(() => {
      panel.hidden = true;
      overlay.hidden = true;
    }, 250);
    if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus();
  };

  const trapFocus = (event) => {
    if (!panel || panel.hidden || event.key !== 'Tab') return;
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

  const initTheme = () => {
    const stored = localStorage.getItem(themeKey);
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    updateTheme(stored || (preferredDark ? 'dark' : 'light'));
  };

  const onScroll = () => {
    if (!header) return;
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      rafId = null;
    });
  };

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closePanel(lastFocus || menuButton);
      } else {
        openPanel();
      }
    });
  }

  if (overlay) overlay.addEventListener('click', () => closePanel(menuButton));

  panelLinks.forEach((link) => {
    link.addEventListener('click', () => closePanel(menuButton));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && panel && !panel.hidden) {
      closePanel(menuButton);
    }
    trapFocus(event);
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches && panel && !panel.hidden) {
      closePanel();
    }
  });

  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      updateTheme(next);
      localStorage.setItem(themeKey, next);
    });
  }

  initTheme();
  setPanelFocusability(false);
  window.addEventListener('scroll', onScroll, { passive: true });
})();
