(function () {
  const demoRoot = document.querySelector('.category-grid');
  const status = document.querySelector('[data-selection-status]');

  if (!demoRoot || !status) {
    return;
  }

  const cards = Array.from(demoRoot.querySelectorAll('[data-category-card]'));

  demoRoot.addEventListener('click', function (event) {
    const cta = event.target.closest('[data-explore-category]');
    if (!cta) {
      return;
    }

    event.preventDefault();

    const card = cta.closest('[data-category-card]');
    if (!card) {
      return;
    }

    cards.forEach(function (item) {
      item.classList.remove('is-selected');
    });

    card.classList.add('is-selected');

    const categoryName = card.dataset.categoryName || 'Selected category';
    const count = card.dataset.categoryCount || 'available items';
    status.textContent = `${categoryName} selected. ${count} ready to explore.`;
  });

  demoRoot.addEventListener('focusin', function (event) {
    const cta = event.target.closest('[data-explore-category]');
    if (!cta) {
      return;
    }

    const card = cta.closest('[data-category-card]');
    if (!card) {
      return;
    }

    cards.forEach(function (item) {
      item.classList.toggle('is-emphasized', item === card && !item.classList.contains('is-selected'));
    });
  });

  demoRoot.addEventListener('focusout', function () {
    cards.forEach(function (item) {
      item.classList.remove('is-emphasized');
    });
  });
})();
