(() => {
  const root = document.documentElement;
  const status = document.querySelector('[data-demo-status]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const loadingButton = document.querySelector('[data-loading-demo]');
  const toggleButton = document.querySelector('[data-toggle-demo]');
  const copyButton = document.querySelector('[data-copy-label]');
  const pressableButtons = Array.from(document.querySelectorAll('.kp-button'));

  const setStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  const updateThemeButton = (theme) => {
    if (!themeToggle) {
      return;
    }

    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light preview' : 'Switch to dark preview');
    themeToggle.querySelector('span').textContent = isDark ? 'Dark preview' : 'Light preview';
  };

  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)');
  const initialTheme = preferredDark.matches ? 'dark' : 'light';
  root.dataset.theme = initialTheme;
  updateThemeButton(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      updateThemeButton(nextTheme);
      setStatus(`Preview switched to ${nextTheme} mode.`);
    });
  }

  if (loadingButton) {
    loadingButton.addEventListener('click', () => {
      if (loadingButton.classList.contains('is-loading')) {
        return;
      }

      loadingButton.classList.add('is-loading');
      loadingButton.setAttribute('aria-busy', 'true');
      setStatus('Loading button is demonstrating an in-progress state.');

      window.setTimeout(() => {
        loadingButton.classList.remove('is-loading');
        loadingButton.removeAttribute('aria-busy');
        setStatus('Loading demo completed and returned to its resting state.');
      }, 1800);
    });
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const isPressed = toggleButton.getAttribute('aria-pressed') === 'true';
      const nextState = !isPressed;
      toggleButton.setAttribute('aria-pressed', String(nextState));
      toggleButton.querySelector('span').textContent = nextState ? 'Selection on' : 'Selection off';
      setStatus(nextState ? 'Toggle button selected.' : 'Toggle button deselected.');
    });
  }

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const text = copyButton.dataset.copyText || 'Editorial Monochrome System';

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          setStatus(`Copied “${text}” to the clipboard.`);
        } else {
          setStatus(`Clipboard API unavailable. Package label: ${text}.`);
        }
      } catch (error) {
        setStatus(`Clipboard copy was blocked. Package label: ${text}.`);
      }
    });
  }

  pressableButtons.forEach((button) => {
    button.addEventListener('pointerdown', () => {
      if (button.disabled) {
        return;
      }
      button.classList.add('is-pressed');
    });

    const clearPressedState = () => button.classList.remove('is-pressed');
    button.addEventListener('pointerup', clearPressedState);
    button.addEventListener('pointerleave', clearPressedState);
    button.addEventListener('blur', clearPressedState);
  });
})();
