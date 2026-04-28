const dealGrid = document.querySelector('.limited-deal-grid');
const liveStatus = document.querySelector('[data-selected-status]');

if (dealGrid && liveStatus) {
  const cards = Array.from(dealGrid.querySelectorAll('.deal-card'));

  const formatCountdown = (targetDate) => {
    const milliseconds = targetDate.getTime() - Date.now();
    if (milliseconds <= 0) {
      return null;
    }

    const totalMinutes = Math.floor(milliseconds / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  const applyCountdown = () => {
    cards.forEach((card) => {
      const countdownNode = card.querySelector('[data-countdown]');
      if (!countdownNode) {
        return;
      }

      const rawEndDate = card.dataset.dealEnd;
      const parsedDate = rawEndDate ? new Date(rawEndDate) : null;

      if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
        countdownNode.textContent = 'Promo status available in product details';
        return;
      }

      const output = formatCountdown(parsedDate);
      countdownNode.textContent = output ?? 'Promo status available in product details';
    });
  };

  applyCountdown();
  window.setInterval(applyCountdown, 60000);

  dealGrid.addEventListener('click', (event) => {
    const cta = event.target.closest('.deal-card__cta');
    if (!cta) {
      return;
    }

    event.preventDefault();
    const parentCard = cta.closest('.deal-card');
    if (!parentCard) {
      return;
    }

    cards.forEach((card) => {
      card.classList.toggle('is-selected', card === parentCard);
    });

    const productName = parentCard.dataset.productName || 'Selected product';
    const productPrice = parentCard.dataset.productPrice || 'Current promotional price';
    liveStatus.textContent = `${productName} selected at ${productPrice} promotional pricing.`;
  });
}
