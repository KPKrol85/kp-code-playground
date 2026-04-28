const cardGrid = document.querySelector('[data-card-grid]');
const statusRegion = document.querySelector('[data-selected-status]');

if (cardGrid && statusRegion) {
  cardGrid.addEventListener('click', (event) => {
    const cta = event.target.closest('.saas-card__cta');
    if (!cta) {
      return;
    }

    const card = cta.closest('.saas-card');
    if (!card) {
      return;
    }

    cardGrid.querySelectorAll('.saas-card.is-selected').forEach((selectedCard) => {
      selectedCard.classList.remove('is-selected');
      selectedCard.removeAttribute('data-selected');
    });

    card.classList.add('is-selected');
    card.setAttribute('data-selected', 'true');

    const productName = card.dataset.productName || 'Unknown product';
    const productState = card.dataset.productState || 'Status unavailable';
    statusRegion.textContent = `Selected product: ${productName} (${productState})`;
  });
}
