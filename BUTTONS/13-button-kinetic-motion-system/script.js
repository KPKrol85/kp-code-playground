(() => {
  const root = document.documentElement;
  const system = document.querySelector('[data-km-system]');
  const themeToggle = document.querySelector('[data-km-theme-toggle]');
  const motionToggle = document.querySelector('[data-km-motion-toggle]');
  const loadingButton = document.querySelector('[data-km-loading]');
  const confirmButton = document.querySelector('[data-km-confirm]');
  const toggleButton = document.querySelector('[data-km-toggle]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const themeStorageKey = 'kp-km-theme';
  const motionStorageKey = 'kp-km-motion';

  const safeGet = (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const safeSet = (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors and keep the demo functional.
    }
  };

  const applyTheme = (theme) => {
    root.dataset.kmTheme = theme;

    if (!themeToggle) {
      return;
    }

    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.querySelector('.km-toggle-chip__text').textContent = isDark ? 'Light mode' : 'Dark mode';
  };

  const applyMotionMode = (mode) => {
    if (!system || !motionToggle) {
      return;
    }

    const reduced = mode === 'reduced';
    system.dataset.kmMotion = reduced ? 'reduced' : 'full';
    motionToggle.setAttribute('aria-pressed', String(reduced));
    motionToggle.querySelector('.km-toggle-chip__text').textContent = reduced ? 'Full motion' : 'Reduced motion';
  };

  applyTheme(safeGet(themeStorageKey) || (prefersDark.matches ? 'dark' : 'light'));
  applyMotionMode(safeGet(motionStorageKey) || (prefersReducedMotion.matches ? 'reduced' : 'full'));

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.kmTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    safeSet(themeStorageKey, nextTheme);
  });

  motionToggle?.addEventListener('click', () => {
    const nextMotion = system?.dataset.kmMotion === 'reduced' ? 'full' : 'reduced';
    applyMotionMode(nextMotion);
    safeSet(motionStorageKey, nextMotion);
  });

  const setPressedState = (button, active) => {
    button.classList.toggle('is-pressed', active);
  };

  system?.querySelectorAll('.km-button').forEach((button) => {
    button.addEventListener('pointerdown', () => setPressedState(button, true));
    button.addEventListener('pointerup', () => setPressedState(button, false));
    button.addEventListener('pointerleave', () => setPressedState(button, false));
    button.addEventListener('blur', () => setPressedState(button, false));
  });

  loadingButton?.addEventListener('click', async () => {
    if (loadingButton.classList.contains('is-loading')) {
      return;
    }

    loadingButton.classList.add('is-loading');
    loadingButton.setAttribute('aria-busy', 'true');
    loadingButton.disabled = true;

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1800);
    });

    loadingButton.classList.remove('is-loading');
    loadingButton.removeAttribute('aria-busy');
    loadingButton.disabled = false;
  });

  confirmButton?.addEventListener('click', () => {
    const confirmed = confirmButton.classList.toggle('is-confirmed');
    confirmButton.setAttribute('aria-pressed', String(confirmed));
    const label = confirmButton.querySelector('.km-button__confirm-text');
    label.textContent = confirmed ? 'Shipment confirmed' : 'Confirm shipment';
  });

  toggleButton?.addEventListener('click', () => {
    const selected = toggleButton.getAttribute('aria-pressed') === 'true';
    const next = !selected;
    toggleButton.setAttribute('aria-pressed', String(next));
    const status = toggleButton.querySelector('.km-button__status');
    status.textContent = next ? 'Pinned' : 'Off';
  });

  const syncThemePreference = (event) => {
    if (!safeGet(themeStorageKey)) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  };

  const syncMotionPreference = (event) => {
    if (!safeGet(motionStorageKey)) {
      applyMotionMode(event.matches ? 'reduced' : 'full');
    }
  };

  if ('addEventListener' in prefersDark) {
    prefersDark.addEventListener('change', syncThemePreference);
    prefersReducedMotion.addEventListener('change', syncMotionPreference);
  } else if ('addListener' in prefersDark) {
    prefersDark.addListener(syncThemePreference);
    prefersReducedMotion.addListener(syncMotionPreference);
  }
})();
