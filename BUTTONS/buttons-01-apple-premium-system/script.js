const liveRegion = document.querySelector('[data-live-region]');
const copyButtons = document.querySelectorAll('[data-copy]');
const loadingButton = document.querySelector('[data-loading-button]');
const saveToggle = document.querySelector('[data-toggle-save]');
const interactiveButtons = document.querySelectorAll('.btn');

const announce = (message) => {
  if (!liveRegion) return;
  liveRegion.textContent = '';
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 60);
};

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const label = button.dataset.copy || 'Button variant';
    const originalText = button.textContent;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(label);
      }
      button.textContent = 'Copied';
      announce(`${label} copied to clipboard.`);
    } catch (error) {
      button.textContent = 'Copied';
      announce(`${label} ready to copy.`);
    }

    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1400);
  });
});

if (loadingButton) {
  loadingButton.addEventListener('click', () => {
    if (loadingButton.classList.contains('btn--is-loading')) return;

    const label = loadingButton.querySelector('.btn__label');
    const originalText = label?.textContent || 'Sync changes';

    loadingButton.classList.add('btn--is-loading');
    loadingButton.disabled = true;
    loadingButton.setAttribute('aria-busy', 'true');

    if (label) {
      label.textContent = 'Syncing…';
    }

    announce('Sync changes is loading.');

    window.setTimeout(() => {
      loadingButton.classList.remove('btn--is-loading');
      loadingButton.disabled = false;
      loadingButton.removeAttribute('aria-busy');

      if (label) {
        label.textContent = originalText;
      }

      announce('Sync complete.');
    }, 3000);
  });
}

if (saveToggle) {
  saveToggle.addEventListener('click', () => {
    const isPressed = saveToggle.getAttribute('aria-pressed') === 'true';
    const nextState = String(!isPressed);

    saveToggle.setAttribute('aria-pressed', nextState);
    saveToggle.setAttribute('aria-label', isPressed ? 'Save item' : 'Remove saved item');

    announce(isPressed ? 'Item removed from saved.' : 'Item saved.');
  });
}

interactiveButtons.forEach((button) => {
  button.addEventListener('pointerdown', () => {
    if (button.disabled) return;
    button.classList.add('is-pressed');
  });

  const clearPressedState = () => button.classList.remove('is-pressed');

  button.addEventListener('pointerup', clearPressedState);
  button.addEventListener('pointerleave', clearPressedState);
  button.addEventListener('blur', clearPressedState);
});
