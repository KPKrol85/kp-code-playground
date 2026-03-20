(() => {
  document.documentElement.classList.add('js');

  const header = document.querySelector('[data-header]');
  const utilityBar = document.querySelector('[data-utility-bar]');
  const navigation = document.querySelector('[data-navigation]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const panelTrigger = document.querySelector('[data-panel-trigger]');
  const panel = document.querySelector('[data-panel]');
  const accessibilityTrigger = document.querySelector('[data-accessibility-trigger]');
  const accessibilityPanel = document.querySelector('[data-accessibility-panel]');
  const contrastToggle = document.querySelector('[data-contrast-toggle]');
  const textButtons = document.querySelectorAll('[data-text-size]');
  const desktopQuery = window.matchMedia('(min-width: 921px)');

  if (!header || !navigation) {
    return;
  }

  const state = {
    condensed: false,
    mobileOpen: false,
    panelOpen: false,
    accessibilityOpen: false,
    textScale: 'default',
    highContrast: false,
  };

  const syncCondensed = () => {
    const threshold = utilityBar ? utilityBar.offsetHeight + 24 : 56;
    const shouldCondense = window.scrollY > threshold;

    if (shouldCondense === state.condensed) {
      return;
    }

    state.condensed = shouldCondense;
    header.classList.toggle('is-condensed', shouldCondense);
  };

  const setMobileNavigation = (open) => {
    state.mobileOpen = open;
    navigation.dataset.open = String(open);
    mobileToggle?.setAttribute('aria-expanded', String(open));
    document.body.dataset.menuOpen = open ? 'true' : 'false';
  };

  const setPanelOpen = (open) => {
    if (!panelTrigger || !panel) {
      return;
    }

    state.panelOpen = open;
    panel.hidden = !open;
    panelTrigger.setAttribute('aria-expanded', String(open));
  };

  const setAccessibilityOpen = (open) => {
    if (!accessibilityTrigger || !accessibilityPanel) {
      return;
    }

    state.accessibilityOpen = open;
    accessibilityPanel.hidden = !open;
    accessibilityTrigger.setAttribute('aria-expanded', String(open));
  };

  const applyTextScale = (value) => {
    state.textScale = value;

    if (value === 'increase') {
      document.documentElement.dataset.textScale = 'lg';
      return;
    }

    delete document.documentElement.dataset.textScale;
  };

  const applyContrast = (value) => {
    state.highContrast = value;
    contrastToggle?.setAttribute('aria-pressed', String(value));

    if (value) {
      document.documentElement.dataset.contrast = 'high';
      return;
    }

    delete document.documentElement.dataset.contrast;
  };

  const syncDesktopMode = () => {
    if (desktopQuery.matches) {
      navigation.dataset.open = 'true';
      document.body.dataset.menuOpen = 'false';
      mobileToggle?.setAttribute('aria-expanded', 'false');
    } else {
      navigation.dataset.open = state.mobileOpen ? 'true' : 'false';
    }
  };

  syncDesktopMode();
  syncCondensed();
  setPanelOpen(false);
  setAccessibilityOpen(false);

  window.addEventListener('scroll', syncCondensed, { passive: true });
  window.addEventListener('resize', syncCondensed);
  desktopQuery.addEventListener('change', () => {
    if (desktopQuery.matches) {
      setMobileNavigation(false);
      setPanelOpen(false);
    }
    syncDesktopMode();
  });

  mobileToggle?.addEventListener('click', () => {
    const nextOpen = !state.mobileOpen;
    setMobileNavigation(nextOpen);

    if (!nextOpen) {
      setPanelOpen(false);
    }
  });

  panelTrigger?.addEventListener('click', () => {
    const nextOpen = !state.panelOpen;
    setPanelOpen(nextOpen);
  });

  accessibilityTrigger?.addEventListener('click', () => {
    setAccessibilityOpen(!state.accessibilityOpen);
  });

  contrastToggle?.addEventListener('click', () => {
    applyContrast(!state.highContrast);
  });

  textButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.textSize;
      applyTextScale(action === 'increase' ? 'increase' : 'reset');
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (
      state.panelOpen &&
      panel &&
      panelTrigger &&
      target instanceof Node &&
      !panel.contains(target) &&
      !panelTrigger.contains(target)
    ) {
      setPanelOpen(false);
    }

    if (
      state.accessibilityOpen &&
      accessibilityPanel &&
      accessibilityTrigger &&
      target instanceof Node &&
      !accessibilityPanel.contains(target) &&
      !accessibilityTrigger.contains(target)
    ) {
      setAccessibilityOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (state.panelOpen) {
      setPanelOpen(false);
      panelTrigger?.focus();
    }

    if (state.accessibilityOpen) {
      setAccessibilityOpen(false);
      accessibilityTrigger?.focus();
    }

    if (state.mobileOpen && !desktopQuery.matches) {
      setMobileNavigation(false);
      mobileToggle?.focus();
    }
  });
})();
