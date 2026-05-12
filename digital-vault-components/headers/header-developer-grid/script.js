(() => {
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
  const body = document.body;
  const root = document.documentElement;
  const header = document.querySelector('.devgrid-header');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const overlay = document.querySelector('[data-overlay]');
  const panel = document.getElementById('devgrid-panel');
  const panelSheet = panel?.querySelector('.devgrid-panel__sheet');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const themeKey = 'header-developer-grid-theme';

  let isOpen = false;
  let lastFocus = null;
  let rafId = null;

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    if (!themeToggle) return;
    const next = theme === 'dark' ? 'UI: Dark' : 'UI: Light';
    themeToggle.textContent = next;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light interface' : 'Switch to dark interface');
  };

  const initTheme = () => {
    const stored = localStorage.getItem(themeKey);
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(stored || system);
  };

  const toggleFocusableInPanel = (enabled) => {
    panel?.querySelectorAll(focusableSelector).forEach((el) => {
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

  const closePanel = ({ restoreFocus = false } = {}) => {
    if (!panel || !overlay || !menuButton || !isOpen) return;
    isOpen = false;
    panel.classList.remove('is-open');
    panel.hidden = true;
    overlay.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    body.style.touchAction = '';
    toggleFocusableInPanel(false);
    if (restoreFocus && lastFocus instanceof HTMLElement) lastFocus.focus();
  };

  const openPanel = () => {
    if (!panel || !overlay || !menuButton || isOpen) return;
    isOpen = true;
    lastFocus = document.activeElement;
    panel.hidden = false;
    overlay.hidden = false;
    panel.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';
    toggleFocusableInPanel(true);
    const first = panel.querySelector(focusableSelector);
    (first || panelSheet)?.focus();
  };

  const trapFocus = (event) => {
    if (!isOpen || event.key !== 'Tab' || !panel) return;
    const list = [...panel.querySelectorAll(focusableSelector)].filter((el) => el.offsetParent !== null);
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  menuButton?.addEventListener('click', () => (isOpen ? closePanel() : openPanel()));
  overlay?.addEventListener('click', () => closePanel());
  panel?.addEventListener('click', (event) => {
    if (event.target.matches('.devgrid-panel__link')) closePanel();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) closePanel({ restoreFocus: true });
    trapFocus(event);
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closePanel();
  });

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(themeKey, next);
  });

  const updateScrollState = () => {
    if (!header) return;
    const apply = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      rafId = null;
    };
    if (rafId === null) rafId = window.requestAnimationFrame(apply);
  };

  window.addEventListener('scroll', updateScrollState, { passive: true });

  initTheme();
  toggleFocusableInPanel(false);
})();
