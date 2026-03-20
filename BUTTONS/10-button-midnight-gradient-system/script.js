const mdgRoot = document.querySelector('.mdg-system');
const mdgLive = document.querySelector('[data-mdg-live]');
const mdgDensityButtons = document.querySelectorAll('[data-density]');
const mdgEmphasisToggle = document.querySelector('[data-emphasis-toggle]');
const mdgLoadingButton = document.querySelector('[data-mdg-loading]');
const mdgLoadingLabel = mdgLoadingButton?.querySelector('.mdg-btn__label');
const mdgToggleButton = document.querySelector('[data-mdg-toggle]');
const mdgSelectButton = document.querySelector('[data-mdg-select]');
const mdgButtons = document.querySelectorAll('.mdg-btn');

const mdgAnnounce = (message) => {
  if (!mdgLive) return;
  mdgLive.textContent = '';
  window.setTimeout(() => {
    mdgLive.textContent = message;
  }, 40);
};

mdgDensityButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const density = button.dataset.density;
    if (!mdgRoot || !density) return;

    mdgRoot.dataset.density = density;
    mdgDensityButtons.forEach((chip) => {
      const isActive = chip === button;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-pressed', String(isActive));
    });

    mdgAnnounce(`${density} density enabled.`);
  });
});

if (mdgEmphasisToggle && mdgRoot) {
  mdgEmphasisToggle.addEventListener('click', () => {
    const boosted = mdgRoot.dataset.boosted === 'true';
    const nextValue = String(!boosted);

    mdgRoot.dataset.boosted = nextValue;
    mdgEmphasisToggle.setAttribute('aria-pressed', nextValue);
    mdgEmphasisToggle.classList.toggle('is-active', !boosted);

    mdgAnnounce(!boosted ? 'Hero emphasis boosted.' : 'Hero emphasis returned to default.');
  });
}

if (mdgLoadingButton && mdgLoadingLabel) {
  mdgLoadingButton.addEventListener('click', () => {
    if (mdgLoadingButton.classList.contains('mdg-btn--is-loading')) return;

    const originalLabel = mdgLoadingLabel.textContent;
    mdgLoadingButton.classList.add('mdg-btn--is-loading');
    mdgLoadingButton.disabled = true;
    mdgLoadingButton.setAttribute('aria-busy', 'true');
    mdgLoadingLabel.textContent = 'Syncing…';
    mdgAnnounce('Billing sync started.');

    window.setTimeout(() => {
      mdgLoadingButton.classList.remove('mdg-btn--is-loading');
      mdgLoadingButton.disabled = false;
      mdgLoadingButton.removeAttribute('aria-busy');
      mdgLoadingLabel.textContent = originalLabel;
      mdgAnnounce('Billing sync complete.');
    }, 2800);
  });
}

if (mdgToggleButton) {
  mdgToggleButton.addEventListener('click', () => {
    const isPressed = mdgToggleButton.getAttribute('aria-pressed') === 'true';
    const nextState = String(!isPressed);

    mdgToggleButton.setAttribute('aria-pressed', nextState);
    mdgToggleButton.setAttribute('aria-label', isPressed ? 'Save item' : 'Remove saved item');
    mdgAnnounce(isPressed ? 'Item removed from saved.' : 'Item saved.');
  });
}

if (mdgSelectButton) {
  mdgSelectButton.addEventListener('click', () => {
    const isPressed = mdgSelectButton.getAttribute('aria-pressed') === 'true';
    const nextState = String(!isPressed);

    mdgSelectButton.setAttribute('aria-pressed', nextState);
    mdgSelectButton.textContent = isPressed ? 'Enable annual billing' : 'Annual billing selected';
    mdgAnnounce(isPressed ? 'Annual billing filter cleared.' : 'Annual billing filter selected.');
  });
}

mdgButtons.forEach((button) => {
  button.addEventListener('pointerdown', () => {
    if (button.disabled) return;
    button.classList.add('is-pressed');
  });

  const resetPressed = () => button.classList.remove('is-pressed');

  button.addEventListener('pointerup', resetPressed);
  button.addEventListener('pointerleave', resetPressed);
  button.addEventListener('blur', resetPressed);
});
