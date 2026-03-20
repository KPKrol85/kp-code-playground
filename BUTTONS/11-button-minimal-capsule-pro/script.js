(() => {
  const showcase = document.querySelector('.mcp-showcase');
  const status = document.querySelector('[data-demo-status]');
  const themeButtons = document.querySelectorAll('[data-theme-value]');
  const loadingButton = document.querySelector('[data-loading-button]');
  const toggleButton = document.querySelector('[data-toggle-button]');
  const segmentedButtons = document.querySelectorAll('.mcp-segmented__button');

  if (!showcase || !status) {
    return;
  }

  const setStatus = (message) => {
    status.textContent = message;
  };

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = button.dataset.themeValue;
      showcase.dataset.previewTheme = nextTheme;

      themeButtons.forEach((control) => {
        const isSelected = control === button;
        control.classList.toggle('is-selected', isSelected);
        control.setAttribute('aria-pressed', String(isSelected));
      });

      setStatus(`${nextTheme === 'dark' ? 'Dark' : 'Light'} preview active.`);
    });
  });

  segmentedButtons.forEach((button) => {
    button.addEventListener('click', () => {
      segmentedButtons.forEach((control) => {
        const isActive = control === button;
        control.classList.toggle('is-active', isActive);
        control.setAttribute('aria-pressed', String(isActive));
      });

      setStatus(`${button.textContent.trim()} context preview selected.`);
    });
  });

  if (loadingButton) {
    loadingButton.addEventListener('click', () => {
      if (loadingButton.dataset.loading === 'true') {
        return;
      }

      const label = loadingButton.querySelector('.mcp-button__label');
      const originalText = label ? label.textContent : 'Save preferences';

      loadingButton.dataset.loading = 'true';
      loadingButton.setAttribute('aria-busy', 'true');
      if (label) {
        label.textContent = 'Saving…';
      }
      setStatus('Saving state preview started.');

      window.setTimeout(() => {
        loadingButton.dataset.loading = 'false';
        loadingButton.removeAttribute('aria-busy');
        if (label) {
          label.textContent = originalText;
        }
        setStatus('Preferences saved.');
      }, 1600);
    });
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const nextPressed = toggleButton.getAttribute('aria-pressed') !== 'true';
      toggleButton.setAttribute('aria-pressed', String(nextPressed));
      setStatus(nextPressed ? 'Toolbar pin enabled.' : 'Toolbar pin removed.');
    });
  }

  document.querySelectorAll('.mcp-button, .mcp-segmented__button, .mcp-theme-switch__button').forEach((button) => {
    button.addEventListener('pointerdown', () => {
      button.classList.add('is-pressed');
    });

    const clearPressed = () => {
      button.classList.remove('is-pressed');
    };

    button.addEventListener('pointerup', clearPressed);
    button.addEventListener('pointerleave', clearPressed);
    button.addEventListener('blur', clearPressed);
  });
})();
