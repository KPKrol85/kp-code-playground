(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-lcm-theme-toggle]');
  const loadingButton = document.querySelector('[data-lcm-loading]');
  const loadingStatus = document.querySelector('[data-lcm-loading-status]');
  const selectButton = document.querySelector('[data-lcm-toggle]');
  const selectStatus = document.querySelector('[data-lcm-toggle-status]');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.dataset.lcmTheme === 'dark';
      if (isDark) {
        delete root.dataset.lcmTheme;
      } else {
        root.dataset.lcmTheme = 'dark';
      }

      const pressed = String(!isDark);
      themeToggle.setAttribute('aria-pressed', pressed);
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to noir presentation' : 'Switch to light presentation');
    });
  }

  if (loadingButton && loadingStatus) {
    let loadingTimeout = null;

    loadingButton.addEventListener('click', () => {
      if (loadingButton.getAttribute('aria-busy') === 'true') {
        return;
      }

      loadingButton.setAttribute('aria-busy', 'true');
      loadingButton.querySelector('.lcm-button__text').textContent = 'Preparing checkout';
      loadingStatus.textContent = 'Loading · secure checkout preparation in progress';

      loadingTimeout = window.setTimeout(() => {
        loadingButton.removeAttribute('aria-busy');
        loadingButton.querySelector('.lcm-button__text').textContent = 'Checkout prepared';
        loadingStatus.textContent = 'Ready · checkout prepared successfully';

        window.setTimeout(() => {
          loadingButton.querySelector('.lcm-button__text').textContent = 'Prepare checkout';
          loadingStatus.textContent = 'Idle · ready for interaction';
        }, 1400);
      }, 1600);
    });

    window.addEventListener('beforeunload', () => {
      if (loadingTimeout) {
        window.clearTimeout(loadingTimeout);
      }
    });
  }

  if (selectButton && selectStatus) {
    selectButton.addEventListener('click', () => {
      const nextPressed = selectButton.getAttribute('aria-pressed') !== 'true';
      selectButton.setAttribute('aria-pressed', String(nextPressed));
      selectButton.querySelector('.lcm-button__text').textContent = nextPressed
        ? 'Signature finish selected'
        : 'Select signature finish';
      selectStatus.textContent = nextPressed ? 'Selected · signature finish active' : 'Not selected';
    });
  }
})();
