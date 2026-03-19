(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const motionLab = document.querySelector('[data-motion-lab]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'kp-signature-motion-theme';

  const getStoredTheme = () => {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // Ignore storage errors and keep the experience functional.
    }
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;

    if (!themeToggle) {
      return;
    }

    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.querySelector('.theme-toggle__text').textContent = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  };

  applyTheme(getStoredTheme() || (prefersDark.matches ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    storeTheme(nextTheme);
  });

  const setPressedState = (button, isPressed) => {
    button.classList.toggle('is-pressed', isPressed);
  };

  motionLab?.querySelectorAll('.signature-button').forEach((button) => {
    button.addEventListener('pointerdown', () => setPressedState(button, true));
    button.addEventListener('pointerup', () => setPressedState(button, false));
    button.addEventListener('pointerleave', () => {
      setPressedState(button, false);
      button.style.removeProperty('--tx');
      button.style.removeProperty('--ty');
      button.style.removeProperty('--pointer-x');
      button.style.removeProperty('--pointer-y');
    });
    button.addEventListener('blur', () => setPressedState(button, false));
  });

  if (!prefersReducedMotion.matches) {
    motionLab?.querySelectorAll('.signature-button--magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const max = 4;
        button.style.setProperty('--tx', `${Math.max(-max, Math.min(max, x * 0.03)).toFixed(2)}px`);
        button.style.setProperty('--ty', `${Math.max(-max, Math.min(max, y * 0.03)).toFixed(2)}px`);
      });
    });

    motionLab?.querySelectorAll('.signature-button--pointer').forEach((button) => {
      const setPointerVars = (event) => {
        const rect = button.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        button.style.setProperty('--pointer-x', `${Math.max(10, Math.min(90, x)).toFixed(1)}%`);
        button.style.setProperty('--pointer-y', `${Math.max(15, Math.min(85, y)).toFixed(1)}%`);
      };

      button.addEventListener('pointerenter', setPointerVars);
      button.addEventListener('pointermove', setPointerVars);
    });
  }

  const loadingButton = document.querySelector('[data-loading-button]');
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

  const confirmButton = document.querySelector('[data-confirm-button]');
  confirmButton?.addEventListener('click', () => {
    const isConfirmed = confirmButton.classList.toggle('is-confirmed');
    const label = confirmButton.querySelector('.signature-button__confirm-label');
    label.textContent = isConfirmed ? 'Seat confirmed' : 'Confirm seat';
    confirmButton.setAttribute('aria-pressed', String(isConfirmed));
  });

  const toggleButton = document.querySelector('[data-toggle-button]');
  toggleButton?.addEventListener('click', () => {
    const isSelected = toggleButton.classList.toggle('is-selected');
    toggleButton.setAttribute('aria-pressed', String(isSelected));
    const status = toggleButton.querySelector('.signature-button__status');
    status.textContent = isSelected ? 'Saved' : 'Idle';
  });

  const handleSchemeChange = (event) => {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  };

  if ('addEventListener' in prefersDark) {
    prefersDark.addEventListener('change', handleSchemeChange);
  } else if ('addListener' in prefersDark) {
    prefersDark.addListener(handleSchemeChange);
  }
})();
