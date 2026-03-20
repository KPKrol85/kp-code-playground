(() => {
  const root = document.documentElement;
  const status = document.querySelector('[data-status]');
  const themeButtons = document.querySelectorAll('[data-theme-value]');
  const loadingButton = document.querySelector('[data-loading-button]');
  const loadingLabel = loadingButton?.querySelector('.cgc-button__label');
  const toggleButton = document.querySelector('[data-pressed-toggle]');

  const updateStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = button.dataset.themeValue || 'dark';
      root.dataset.theme = nextTheme;

      themeButtons.forEach((chip) => {
        const isActive = chip === button;
        chip.classList.toggle('is-active', isActive);
        chip.setAttribute('aria-pressed', String(isActive));
      });

      updateStatus(
        nextTheme === 'light'
          ? 'Previewing light command mode.'
          : 'Previewing dark command mode.'
      );
    });
  });

  loadingButton?.addEventListener('click', () => {
    if (loadingButton.classList.contains('is-loading')) {
      return;
    }

    loadingButton.classList.add('is-loading');
    loadingButton.disabled = true;
    loadingButton.setAttribute('aria-busy', 'true');
    if (loadingLabel) {
      loadingLabel.textContent = 'Synchronizing…';
    }
    updateStatus('Secure sync in progress. Telemetry link is being verified.');

    window.setTimeout(() => {
      loadingButton.classList.remove('is-loading');
      loadingButton.disabled = false;
      loadingButton.setAttribute('aria-busy', 'false');
      if (loadingLabel) {
        loadingLabel.textContent = 'Run Secure Sync';
      }
      updateStatus('Secure sync complete. Command surface is ready.');
    }, 1800);
  });

  toggleButton?.addEventListener('click', () => {
    const isPressed = toggleButton.getAttribute('aria-pressed') === 'true';
    const nextPressed = !isPressed;

    toggleButton.setAttribute('aria-pressed', String(nextPressed));
    toggleButton.textContent = nextPressed ? 'Shield Mode · Armed' : 'Shield Mode · Standby';
    updateStatus(
      nextPressed
        ? 'Shield mode armed. Passive protection is now active.'
        : 'Shield mode returned to standby.'
    );
  });
})();
