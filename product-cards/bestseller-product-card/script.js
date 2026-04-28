const grid = document.querySelector('[data-bestseller-grid]');
const status = document.querySelector('[data-selection-status]');

if (grid && status) {
  grid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-bestseller-select]');
    if (!trigger) {
      return;
    }

    event.preventDefault();

    const card = trigger.closest('.bestseller-card');
    if (!card) {
      return;
    }

    const cards = grid.querySelectorAll('.bestseller-card');
    cards.forEach((item) => item.classList.remove('is-selected'));
    card.classList.add('is-selected');

    const name = card.dataset.productName || 'Selected product';
    const metric = card.dataset.keyMetric || 'social proof updated';
    status.textContent = `Selected bestseller: ${name} — ${metric}.`;
  });
}
