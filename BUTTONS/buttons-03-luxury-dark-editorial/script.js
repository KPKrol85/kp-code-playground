(() => {
  const root = document.querySelector('.lde-showcase');
  if (!root) return;

  const liveRegion = root.querySelector('.lde-live-region');
  const copyButtons = root.querySelectorAll('[data-copy-label]');
  const copyAllButton = root.querySelector('[data-copy-all]');
  const loadingButton = root.querySelector('[data-loading-button]');
  const toggleButton = root.querySelector('[data-toggle-button]');
  const confirmButton = root.querySelector('[data-confirm-button]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const announce = (message) => {
    if (!liveRegion) return;
    liveRegion.textContent = '';
    window.setTimeout(() => {
      liveRegion.textContent = message;
    }, 30);
  };

  const copyText = async (text, trigger) => {
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'absolute';
      helper.style.opacity = '0';
      document.body.append(helper);
      helper.select();

      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }

      helper.remove();
    }

    if (trigger) {
      const originalText = trigger.textContent;
      trigger.textContent = copied ? 'Copied' : 'Copy failed';
      window.setTimeout(() => {
        trigger.textContent = originalText;
      }, 1200);
    }

    announce(copied ? `${text} copied.` : `Unable to copy ${text}.`);
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const label = button.dataset.copyLabel || 'Button label';
      copyText(label, button);
    });
  });

  copyAllButton?.addEventListener('click', () => {
    copyText('BUTTONS / buttons-03-luxury-dark-editorial', copyAllButton);
  });

  root.querySelectorAll('.lde-button').forEach((button) => {
    button.addEventListener('pointerdown', () => {
      if (button.disabled) return;
      button.classList.add('is-pressed');
      if (prefersReducedMotion.matches) return;
      window.setTimeout(() => button.classList.remove('is-pressed'), 140);
    });

    button.addEventListener('pointerup', () => button.classList.remove('is-pressed'));
    button.addEventListener('pointerleave', () => button.classList.remove('is-pressed'));
  });

  loadingButton?.addEventListener('click', () => {
    if (loadingButton.classList.contains('is-loading')) return;

    const label = loadingButton.querySelector('.lde-button__label');
    loadingButton.classList.add('is-loading');
    loadingButton.setAttribute('aria-busy', 'true');

    if (label) {
      label.textContent = 'Generating secure access code';
    }

    announce('Generating secure access code.');

    window.setTimeout(() => {
      loadingButton.classList.remove('is-loading');
      loadingButton.removeAttribute('aria-busy');
      if (label) {
        label.textContent = 'Access code ready';
      }
      announce('Access code ready.');

      window.setTimeout(() => {
        if (label) {
          label.textContent = 'Generate access code';
        }
      }, 1800);
    }, 2200);
  });

  toggleButton?.addEventListener('click', () => {
    const isPressed = toggleButton.getAttribute('aria-pressed') === 'true';
    const nextState = String(!isPressed);
    toggleButton.setAttribute('aria-pressed', nextState);
    toggleButton.textContent = nextState === 'true' ? 'Editorial mode on' : 'Editorial mode off';
    announce(nextState === 'true' ? 'Editorial mode enabled.' : 'Editorial mode disabled.');
  });

  confirmButton?.addEventListener('click', () => {
    confirmButton.classList.add('is-confirmed');
    confirmButton.textContent = 'Appointment confirmed';
    announce('Appointment confirmed.');

    window.setTimeout(() => {
      confirmButton.classList.remove('is-confirmed');
      confirmButton.textContent = 'Confirm appointment';
    }, 2000);
  });
})();
