(() => {
  const storageKey = 'header-education-path-theme';
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
  const root = document.documentElement;

  const header = document.querySelector('[data-education-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const panel = document.querySelector('[data-panel]');
  const panelSheet = panel?.querySelector('.education-panel__sheet');
  const overlay = document.querySelector('[data-panel-overlay]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const panelLinks = panel ? [...panel.querySelectorAll('a')] : [];

  let lastTrigger = null;
  let frameRequested = false;

  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function setTheme(theme) {
    const resolved = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = resolved;
    const isDark = resolved === 'dark';
    if (themeToggle) {
      const text = themeToggle.querySelector('.education-header__theme-text');
      if (text) text.textContent = isDark ? 'Study: Night' : 'Study: Day';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to day study mode' : 'Switch to night study mode');
    }
    localStorage.setItem(storageKey, resolved);
  }

  function initTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark' || saved === 'light') return setTheme(saved);
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function openPanel() {
    if (!panel || !overlay || !menuButton || !panelSheet) return;
    lastTrigger = document.activeElement;
    panel.hidden = false;
    overlay.hidden = false;
    panel.inert = false;
    panel.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close syllabus panel');
    document.body.classList.add('panel-open');
    const firstFocusable = panel.querySelector(focusableSelector);
    firstFocusable?.focus();
  }

  function closePanel({ returnFocus = false } = {}) {
    if (!panel || !overlay || !menuButton) return;
    panel.classList.remove('is-open');
    panel.hidden = true;
    overlay.hidden = true;
    panel.inert = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open syllabus panel');
    document.body.classList.remove('panel-open');
    if (returnFocus) (lastTrigger || menuButton).focus();
  }

  function trapFocus(event) {
    if (!panel || panel.hidden || event.key !== 'Tab') return;
    const nodes = [...panel.querySelectorAll(focusableSelector)].filter(el => !el.hasAttribute('disabled'));
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onDocumentKeydown(event) {
    if (event.key === 'Escape' && panel && !panel.hidden) {
      closePanel({ returnFocus: true });
      return;
    }
    trapFocus(event);
  }

  function onScroll() {
    if (frameRequested || !header) return;
    frameRequested = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
      frameRequested = false;
    });
  }

  function onResizeChange(e) {
    if (e.matches && panel && !panel.hidden) closePanel();
  }

  themeToggle?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  menuButton?.addEventListener('click', () => {
    if (panel?.hidden) openPanel();
    else closePanel({ returnFocus: true });
  });

  overlay?.addEventListener('click', () => closePanel({ returnFocus: true }));
  panelLinks.forEach(link => link.addEventListener('click', () => closePanel()));

  document.addEventListener('keydown', onDocumentKeydown);
  window.addEventListener('scroll', onScroll, { passive: true });
  desktopQuery.addEventListener('change', onResizeChange);

  initTheme();
  closePanel();
})();
