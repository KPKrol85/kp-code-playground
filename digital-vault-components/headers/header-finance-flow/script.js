(() => {
  const THEME_KEY = 'header-finance-flow-theme';
  const DESKTOP_BREAKPOINT = 900;

  const root = document.documentElement;
  const menuButton = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-panel]');
  const panelSheet = panel?.querySelector('.finance-panel__sheet');
  const overlay = document.querySelector('[data-overlay]');
  const sessionToggle = document.querySelector('[data-session-toggle]');
  const sessionLabel = document.querySelector('[data-session-label]');
  const panelSession = document.querySelector('[data-panel-session]');
  const header = document.querySelector('[data-finance-header]');
  const mobileLinks = Array.from(document.querySelectorAll('.finance-panel__link'));

  let lastFocused = null;
  let rafScheduled = false;

  const focusableSelectors = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const getTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    const label = isDark ? 'Session: Night' : 'Session: Day';
    sessionLabel.textContent = label;
    panelSession.textContent = label;
    sessionToggle.setAttribute('aria-label', isDark ? 'Switch to day session' : 'Switch to night session');
  };

  const setPanelFocusability = (enabled) => {
    const panelElements = panel.querySelectorAll(focusableSelectors);
    panelElements.forEach((element) => {
      if (enabled) {
        if (element.hasAttribute('data-prev-tabindex')) {
          element.setAttribute('tabindex', element.getAttribute('data-prev-tabindex'));
          element.removeAttribute('data-prev-tabindex');
        } else {
          element.removeAttribute('tabindex');
        }
      } else {
        const prev = element.getAttribute('tabindex');
        if (prev !== null) element.setAttribute('data-prev-tabindex', prev);
        element.setAttribute('tabindex', '-1');
      }
    });
  };

  const openPanel = () => {
    lastFocused = document.activeElement;
    panel.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(() => {
      panel.classList.add('is-open');
      overlay.classList.add('is-open');
    });
    document.body.classList.add('is-panel-open');
    menuButton.setAttribute('aria-expanded', 'true');
    setPanelFocusability(true);
    panelSheet.focus();
  };

  const closePanel = ({ returnFocus = false } = {}) => {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-panel-open');
    setPanelFocusability(false);

    window.setTimeout(() => {
      panel.hidden = true;
      overlay.hidden = true;
    }, 250);

    if (returnFocus) {
      menuButton.focus();
    } else if (lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  const trapFocus = (event) => {
    if (panel.hidden || event.key !== 'Tab') return;
    const focusables = Array.from(panel.querySelectorAll(focusableSelectors));
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

  const onScroll = () => {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      rafScheduled = false;
    });
  };

  sessionToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  menuButton.addEventListener('click', () => {
    if (panel.hidden) openPanel();
    else closePanel();
  });

  overlay.addEventListener('click', () => closePanel());

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => closePanel());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      closePanel({ returnFocus: true });
    }
    trapFocus(event);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT && !panel.hidden) {
      closePanel();
    }
  });

  window.addEventListener('scroll', onScroll, { passive: true });

  applyTheme(getTheme());
  setPanelFocusability(false);
})();
