(function () {
  const picksRoot = document.querySelector('[data-creator-picks]');
  const status = document.querySelector('[data-pick-status]');

  if (!picksRoot || !status) {
    return;
  }

  picksRoot.addEventListener('click', (event) => {
    const cta = event.target.closest('.creator-pick__cta');

    if (!cta) {
      return;
    }

    const card = cta.closest('.creator-pick');

    if (!card) {
      return;
    }

    const productName = card.dataset.productName;

    if (!productName) {
      return;
    }

    const cards = picksRoot.querySelectorAll('.creator-pick');

    cards.forEach((item) => {
      item.classList.remove('is-selected');
      const button = item.querySelector('.creator-pick__cta');

      if (button) {
        button.removeAttribute('aria-current');
      }
    });

    card.classList.add('is-selected');
    cta.setAttribute('aria-current', 'true');
    status.textContent = `Active creator pick: ${productName}.`;
  });
})();
