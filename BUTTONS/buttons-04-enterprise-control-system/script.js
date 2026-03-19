(() => {
  const root = document.querySelector('.enterprise-control-system');

  if (!root) {
    return;
  }

  const statusMessage = root.querySelector('[data-status-message]');
  const copyButtons = root.querySelectorAll('[data-copy-label]');
  const segmentedOptions = root.querySelectorAll('[data-segmented] .enterprise-segmented__option');
  const toggleButton = root.querySelector('[data-toggle-selected]');
  const loadingButton = root.querySelector('[data-loading-button]');

  const setStatus = (message, state = 'info') => {
    if (!statusMessage) {
      return;
    }

    statusMessage.textContent = message;
    statusMessage.dataset.state = state;
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const label = button.getAttribute('aria-label') || button.textContent.replace(/\s+/g, ' ').trim();

      if (!label) {
        return;
      }

      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(label);
          setStatus(`Copied variant label: ${label}`, 'success');
          return;
        } catch {
          // Fall back to status only when clipboard write is unavailable.
        }
      }

      setStatus(`Variant label ready to copy: ${label}`, 'info');
    });
  });

  segmentedOptions.forEach((option) => {
    option.addEventListener('click', () => {
      segmentedOptions.forEach((item) => {
        const isSelected = item === option;
        item.classList.toggle('is-selected', isSelected);
        item.setAttribute('aria-pressed', String(isSelected));
      });

      setStatus(`Workspace mode switched to ${option.textContent.trim()}.`, 'info');
    });
  });

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const isSelected = toggleButton.getAttribute('aria-pressed') === 'true';
      const nextState = !isSelected;

      toggleButton.setAttribute('aria-pressed', String(nextState));
      toggleButton.classList.toggle('enterprise-button--selected', nextState);
      setStatus(nextState ? 'Workspace pin enabled.' : 'Workspace pin removed.', 'info');
    });
  }

  if (loadingButton) {
    let loadingTimeout;

    loadingButton.addEventListener('click', () => {
      if (loadingButton.classList.contains('enterprise-button--loading')) {
        return;
      }

      const label = loadingButton.querySelector('.enterprise-button__label');
      if (!label) {
        return;
      }

      const originalLabel = label.textContent;
      loadingButton.classList.add('enterprise-button--loading');
      loadingButton.setAttribute('aria-busy', 'true');
      loadingButton.disabled = true;
      label.textContent = 'Processing…';
      setStatus('Compliance sync started. Button is locked until processing completes.', 'info');

      window.clearTimeout(loadingTimeout);
      loadingTimeout = window.setTimeout(() => {
        label.textContent = 'Sync complete';
        setStatus('Compliance sync completed successfully.', 'success');

        window.setTimeout(() => {
          label.textContent = originalLabel;
          loadingButton.classList.remove('enterprise-button--loading');
          loadingButton.removeAttribute('aria-busy');
          loadingButton.disabled = false;
        }, 1100);
      }, 1600);
    });
  }
})();
