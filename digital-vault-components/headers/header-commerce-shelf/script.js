(() => {
  const doc = document;
  const root = doc.documentElement;
  const body = doc.body;
  const storageKey = 'header-commerce-shelf-theme';
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');

  const toggleBtn = doc.querySelector('[data-shelf-toggle]');
  const closeBtn = doc.querySelector('[data-shelf-close]');
  const shelf = doc.querySelector('[data-commerce-shelf]');
  const panel = shelf?.querySelector('.commerce-shelf__panel');
  const overlay = doc.querySelector('[data-shelf-overlay]');
  const themeToggle = doc.querySelector('[data-theme-toggle]');
  const header = doc.querySelector('[data-commerce-header]');

  let lastFocus = null;
  let isOpen = false;
  let ticking = false;

  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function setShelfFocusable(active) {
    if (!shelf) return;
    shelf.querySelectorAll(focusableSelector).forEach((el) => {
      if (!active) {
        el.dataset.prevTabindex = el.getAttribute('tabindex') ?? '';
        el.setAttribute('tabindex', '-1');
      } else {
        const prev = el.dataset.prevTabindex;
        if (prev === '') el.removeAttribute('tabindex');
        else if (prev) el.setAttribute('tabindex', prev);
        delete el.dataset.prevTabindex;
      }
    });
  }

  function closeShelf(returnFocus = false) {
    if (!isOpen || !shelf || !overlay) return;
    isOpen = false;
    body.classList.remove('is-shelf-open');
    shelf.hidden = true;
    overlay.hidden = true;
    toggleBtn?.setAttribute('aria-expanded', 'false');
    setShelfFocusable(false);
    if (returnFocus && lastFocus instanceof HTMLElement) lastFocus.focus();
  }

  function openShelf() {
    if (!shelf || !overlay || !panel) return;
    lastFocus = doc.activeElement;
    isOpen = true;
    shelf.hidden = false;
    overlay.hidden = false;
    body.classList.add('is-shelf-open');
    toggleBtn?.setAttribute('aria-expanded', 'true');
    setShelfFocusable(true);
    panel.focus();
  }

  function trapFocus(event) {
    if (!isOpen || event.key !== 'Tab' || !shelf) return;
    const focusables = [...shelf.querySelectorAll(focusableSelector)].filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && doc.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && doc.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const nextLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    const icon = theme === 'dark' ? '☾' : '☀︎';
    themeToggle?.setAttribute('aria-label', nextLabel);
    const iconEl = themeToggle?.querySelector('.commerce-header__toggle-icon');
    if (iconEl) iconEl.textContent = icon;
  }

  function initTheme() {
    const saved = localStorage.getItem(storageKey);
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(saved || preferred);
  }

  toggleBtn?.addEventListener('click', () => (isOpen ? closeShelf(false) : openShelf()));
  closeBtn?.addEventListener('click', () => closeShelf(true));
  overlay?.addEventListener('click', () => closeShelf(true));

  shelf?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.closest('.commerce-shelf__link')) {
      closeShelf(false);
    }
  });

  doc.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      closeShelf(true);
    }
    trapFocus(event);
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeShelf(false);
  });

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(storageKey, next);
    applyTheme(next);
  });

  doc.addEventListener('scroll', () => {
    if (!header || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  }, { passive: true });

  setShelfFocusable(false);
  initTheme();
})();
