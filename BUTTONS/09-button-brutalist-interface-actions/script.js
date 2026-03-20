(() => {
  const root = document.querySelector('[data-brutalist-actions]');

  if (!root) {
    return;
  }

  const body = document.body;
  const status = root.querySelector('[data-demo-status]');
  const themeToggle = root.querySelector('[data-theme-toggle]');
  const densityToggle = root.querySelector('[data-density-toggle]');
  const loadingButton = root.querySelector('[data-loading-button]');
  const toggleButton = root.querySelector('[data-toggle-button]');

  const setStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  themeToggle?.addEventListener('click', () => {
    const isLight = body.dataset.biaTheme === 'light';
    body.dataset.biaTheme = isLight ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', String(!isLight));
    themeToggle.querySelector('.brutalist-button__label').textContent = isLight
      ? 'Switch to light mode'
      : 'Switch to dark mode';
    setStatus(`${isLight ? 'Dark' : 'Light'} mode active. Contrast tokens updated for the preview surface.`);
  });

  densityToggle?.addEventListener('click', () => {
    const isCompact = body.dataset.biaDensity === 'compact';
    body.dataset.biaDensity = isCompact ? 'comfortable' : 'compact';
    densityToggle.setAttribute('aria-pressed', String(!isCompact));
    densityToggle.querySelector('.brutalist-button__label').textContent = isCompact
      ? 'Compact density'
      : 'Comfortable spacing';
    setStatus(`${isCompact ? 'Comfortable' : 'Compact'} density active. Control sizing and card spacing adjusted.`);
  });

  toggleButton?.addEventListener('click', () => {
    const isPressed = toggleButton.getAttribute('aria-pressed') === 'true';
    toggleButton.setAttribute('aria-pressed', String(!isPressed));
    toggleButton.classList.toggle('is-active', !isPressed);
    toggleButton.querySelector('.brutalist-button__label').textContent = isPressed
      ? 'Arm live monitor'
      : 'Live monitor armed';
    setStatus(isPressed ? 'Live monitor disarmed. Toggle button returned to standby.' : 'Live monitor armed. Toggle button now shows an active stamped state.');
  });

  loadingButton?.addEventListener('click', () => {
    if (loadingButton.classList.contains('brutalist-button--loading')) {
      return;
    }

    const label = loadingButton.querySelector('.brutalist-button__label');
    const original = label?.textContent ?? 'Sync records';

    loadingButton.classList.add('brutalist-button--loading');
    loadingButton.setAttribute('aria-busy', 'true');
    loadingButton.disabled = true;

    if (label) {
      label.textContent = 'Syncing…';
    }

    setStatus('Sync started. Loading button is locked while records are processing.');

    window.setTimeout(() => {
      loadingButton.classList.remove('brutalist-button--loading');
      loadingButton.removeAttribute('aria-busy');
      loadingButton.disabled = false;

      if (label) {
        label.textContent = 'Sync complete';
      }

      setStatus('Sync complete. Loading state cleared and the action is available again.');

      window.setTimeout(() => {
        if (label) {
          label.textContent = original;
        }
      }, 1400);
    }, 1600);
  });
})();
