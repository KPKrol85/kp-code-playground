(() => {
  const root = document.documentElement;
  const feedback = document.querySelector('[data-feedback]');
  const themeSwitch = document.querySelector('[data-theme-switch]');
  const loadingButton = document.querySelector('[data-loading-button]');
  const toggleButton = document.querySelector('[data-toggle-button]');
  const copyButtons = [...document.querySelectorAll('[data-copy-label]')];
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  let manualTheme = false;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    if (themeSwitch) {
      const isDark = theme === 'dark';
      themeSwitch.setAttribute('aria-pressed', String(isDark));
      const text = themeSwitch.querySelector('.supc-theme-button__text');
      if (text) {
        text.textContent = manualTheme ? (isDark ? 'Dark theme' : 'Light theme') : 'Auto theme';
      }
    }
  };

  const syncSystemTheme = () => {
    if (!manualTheme) {
      applyTheme(media.matches ? 'dark' : 'light');
    }
  };

  syncSystemTheme();

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', syncSystemTheme);
  }

  themeSwitch?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    manualTheme = true;
    applyTheme(isDark ? 'light' : 'dark');
    if (feedback) {
      feedback.textContent = `Theme preview switched to ${isDark ? 'light' : 'dark'} mode.`;
    }
  });

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const label = button.innerText.replace(/\s+/g, ' ').trim() || button.getAttribute('aria-label') || 'Button variant';
      button.dataset.pressed = 'true';
      window.setTimeout(() => {
        delete button.dataset.pressed;
      }, 180);

      if (feedback) {
        feedback.textContent = `Preview interaction: ${label}.`;
      }

      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(label);
          if (feedback) {
            feedback.textContent = `Copied variant label: ${label}.`;
          }
        } catch (_error) {
          if (feedback) {
            feedback.textContent = `Preview interaction: ${label}. Clipboard access was unavailable.`;
          }
        }
      }
    });
  });

  loadingButton?.addEventListener('click', () => {
    if (loadingButton.dataset.loading === 'true') {
      return;
    }

    const label = loadingButton.querySelector('.supc-button__label');
    loadingButton.dataset.loading = 'true';
    loadingButton.setAttribute('aria-busy', 'true');
    if (label) {
      label.textContent = 'Syncing…';
    }
    if (feedback) {
      feedback.textContent = 'Loading state preview started.';
    }

    window.setTimeout(() => {
      loadingButton.dataset.loading = 'false';
      loadingButton.removeAttribute('aria-busy');
      if (label) {
        label.textContent = 'Synced successfully';
      }
      if (feedback) {
        feedback.textContent = 'Loading state preview completed.';
      }

      window.setTimeout(() => {
        if (label) {
          label.textContent = 'Sync library';
        }
        delete loadingButton.dataset.loading;
      }, 1400);
    }, 1800);
  });

  toggleButton?.addEventListener('click', () => {
    const isPressed = toggleButton.getAttribute('aria-pressed') === 'true';
    const nextState = !isPressed;
    const label = toggleButton.querySelector('.supc-button__label');
    toggleButton.setAttribute('aria-pressed', String(nextState));
    if (label) {
      label.textContent = nextState ? 'Approved' : 'Approve changes';
    }
    if (feedback) {
      feedback.textContent = nextState ? 'Success toggle selected.' : 'Success toggle reset.';
    }
  });
})();
