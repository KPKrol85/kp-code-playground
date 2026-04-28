(function () {
  const catalog = document.querySelector('.vault-grid');
  const liveRegion = document.querySelector('[data-vault-live-region]');

  if (!catalog || !liveRegion) {
    return;
  }

  catalog.addEventListener('click', function (event) {
    const detailsLink = event.target.closest('[data-vault-details]');

    if (!detailsLink) {
      return;
    }

    const card = detailsLink.closest('.vault-card');
    if (!card) {
      return;
    }

    const name = card.dataset.productName || 'Selected product';
    const status = card.dataset.productStatus || 'Status unavailable';

    liveRegion.textContent = `${name} selected. Current status: ${status}.`;

    const previous = catalog.querySelector('.vault-card.is-selected');
    if (previous && previous !== card) {
      previous.classList.remove('is-selected');
    }

    card.classList.add('is-selected');
  });
})();
