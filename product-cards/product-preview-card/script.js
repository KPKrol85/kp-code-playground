(function () {
  const showcase = document.querySelector('.preview-showcase');
  const status = document.querySelector('[data-preview-status]');

  if (!showcase || !status) {
    return;
  }

  showcase.addEventListener('click', function (event) {
    const link = event.target.closest('[data-live-preview]');

    if (!link) {
      return;
    }

    event.preventDefault();

    const card = link.closest('.preview-card');
    if (!card) {
      return;
    }

    const title = card.dataset.productTitle || 'Selected product';

    showcase.querySelectorAll('.preview-card.is-active').forEach(function (activeCard) {
      activeCard.classList.remove('is-active');
    });

    card.classList.add('is-active');
    status.textContent = 'Live preview status: ' + title + ' selected for quick visual review.';
  });
})();
