(() => {
  const grid = document.querySelector('.update-release-demo__grid');
  const statusRegion = document.querySelector('[data-update-status]');

  if (!grid) {
    return;
  }

  const toggleLabel = (button, expanded) => {
    button.textContent = expanded ? 'Hide full changelog' : 'Show full changelog';
    button.setAttribute('aria-expanded', String(expanded));
  };

  grid.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-toggle]');
    if (toggle) {
      const controlsId = toggle.getAttribute('aria-controls');
      if (!controlsId) {
        return;
      }

      const details = document.getElementById(controlsId);
      if (!details) {
        return;
      }

      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      details.classList.toggle('is-open', !expanded);
      toggleLabel(toggle, !expanded);
      return;
    }

    const cta = event.target.closest('[data-update-select]');
    if (!cta) {
      return;
    }

    event.preventDefault();
    const card = cta.closest('[data-update-card]');
    if (!card) {
      return;
    }

    const selected = grid.querySelector('.update-card.is-selected');
    if (selected && selected !== card) {
      selected.classList.remove('is-selected');
    }

    card.classList.add('is-selected');

    const product = card.querySelector('.update-card__product')?.textContent?.trim() || 'Product';
    const version = card.querySelector('.update-card__version')?.textContent?.trim() || 'latest version';

    if (statusRegion) {
      statusRegion.textContent = `Selected update: ${product} ${version}. Ready to continue with this release.`;
    }
  });
})();
