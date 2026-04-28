(function () {
  const grid = document.getElementById('premium-resource-grid');
  const status = document.getElementById('selection-status');

  if (!grid || !status) {
    return;
  }

  grid.addEventListener('click', function (event) {
    const button = event.target.closest('.premium-resource__cta');
    if (!button) {
      return;
    }

    const card = button.closest('.premium-resource');
    if (!card) {
      return;
    }

    const cards = grid.querySelectorAll('.premium-resource');
    cards.forEach(function (item) {
      item.classList.remove('premium-resource--active');
    });

    card.classList.add('premium-resource--active');

    const name = card.getAttribute('data-product-name') || 'Premium resource';
    const price = card.getAttribute('data-product-price') || 'N/A';
    status.textContent = `Selected: ${name} (${price}).`;
  });
})();
