(function () {
  const grid = document.querySelector('.free-resource-grid');
  const status = document.querySelector('[data-live-status]');

  if (!grid || !status) {
    return;
  }

  const defaultButtonLabel = 'Download free';

  grid.addEventListener('click', (event) => {
    const cta = event.target.closest('[data-resource-cta]');
    if (!cta) {
      return;
    }

    const card = cta.closest('[data-resource-card]');
    if (!card) {
      return;
    }

    const title = card.querySelector('.free-resource__title')?.textContent?.trim() || 'selected resource';

    grid.querySelectorAll('[data-resource-card]').forEach((resourceCard) => {
      resourceCard.classList.toggle('is-ready', resourceCard === card);
    });

    const originalLabel = cta.dataset.baseLabel || defaultButtonLabel;
    cta.dataset.baseLabel = originalLabel;
    cta.firstChild.textContent = 'Ready to download';

    status.textContent = `"${title}" is selected and ready to download.`;

    window.clearTimeout(Number(cta.dataset.resetTimeout || 0));
    const timeoutId = window.setTimeout(() => {
      cta.firstChild.textContent = originalLabel;
    }, 1600);
    cta.dataset.resetTimeout = String(timeoutId);
  });
})();
