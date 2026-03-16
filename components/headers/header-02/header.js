(() => {
  const header = document.querySelector('[data-commerce-header]');

  if (!header) {
    return;
  }

  const menuToggle = header.querySelector('[data-menu-toggle]');
  const mobileDrawer = header.querySelector('[data-mobile-drawer]');
  const drawerClose = header.querySelector('[data-drawer-close]');
  const searchToggle = header.querySelector('[data-search-toggle]');
  const searchPanel = header.querySelector('[data-search-panel]');
  const overlay = header.querySelector('[data-overlay]');

  const setMenuState = (isOpen) => {
    if (!menuToggle || !mobileDrawer || !overlay) {
      return;
    }

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = false;
    mobileDrawer.classList.toggle('is-open', isOpen);
    overlay.hidden = !isOpen;

    if (!isOpen) {
      setTimeout(() => {
        if (!mobileDrawer.classList.contains('is-open')) {
          mobileDrawer.hidden = true;
        }
      }, 220);
    }
  };

  const setSearchState = (isOpen) => {
    if (!searchToggle || !searchPanel) {
      return;
    }

    searchToggle.setAttribute('aria-expanded', String(isOpen));
    searchPanel.hidden = !isOpen;

    if (isOpen) {
      const input = searchPanel.querySelector('.commerce-header__search-input');
      input?.focus();
    }
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
    if (!isOpen) {
      setSearchState(false);
    }
  });

  drawerClose?.addEventListener('click', () => {
    setMenuState(false);
    menuToggle?.focus();
  });

  searchToggle?.addEventListener('click', () => {
    const isOpen = searchToggle.getAttribute('aria-expanded') === 'true';
    setSearchState(!isOpen);
    if (!isOpen) {
      setMenuState(false);
    }
  });

  overlay?.addEventListener('click', () => {
    setMenuState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    setMenuState(false);
    setSearchState(false);
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (searchPanel && searchToggle && !searchPanel.hidden) {
      const clickedInsideSearch = searchPanel.contains(target) || searchToggle.contains(target);
      if (!clickedInsideSearch) {
        setSearchState(false);
      }
    }
  });

  const desktopQuery = window.matchMedia('(min-width: 760px)');
  const handleDesktopChange = (event) => {
    if (!event.matches) {
      return;
    }

    setMenuState(false);
    setSearchState(false);
  };

  desktopQuery.addEventListener('change', handleDesktopChange);
})();
