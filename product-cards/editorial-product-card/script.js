(function () {
  const container = document.querySelector('[data-editorial-cards]');
  const status = document.querySelector('[data-editorial-status]');

  if (!container || !status) {
    return;
  }

  const cards = Array.from(container.querySelectorAll('.editorial-card'));

  container.addEventListener('click', (event) => {
    const actionTrigger = event.target.closest('[data-resource-action]');
    if (!actionTrigger || !container.contains(actionTrigger)) {
      return;
    }

    event.preventDefault();

    const card = actionTrigger.closest('.editorial-card');
    if (!card) {
      return;
    }

    cards.forEach((resourceCard) => {
      resourceCard.classList.remove('is-selected');
      resourceCard.removeAttribute('data-selected');
    });

    card.classList.add('is-selected');
    card.setAttribute('data-selected', 'true');

    const title = card.querySelector('.editorial-card__title')?.textContent?.trim();
    const type = card.querySelector('.editorial-card__type')?.textContent?.trim();
    const action = actionTrigger.getAttribute('data-resource-action') || 'Preview';

    if (!title || !type) {
      status.textContent = 'Resource selected.';
      return;
    }

    status.textContent = `${action} selected: ${title} (${type}).`;
  });
})();
