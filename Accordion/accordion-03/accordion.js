(() => {
  const component = document.querySelector('[data-accordion03]');
  if (!component) return;

  const items = Array.from(component.querySelectorAll('.kp-accordion03__item'));
  const mediaCards = Array.from(component.querySelectorAll('.kp-accordion03__media-card'));

  if (!items.length || !mediaCards.length) return;

  const activateItem = (nextItem) => {
    const mediaId = nextItem.dataset.mediaTarget;

    items.forEach((item) => {
      const trigger = item.querySelector('.kp-accordion03__trigger');
      const expanded = item === nextItem;

      item.classList.toggle('is-active', expanded);
      if (trigger) {
        trigger.setAttribute('aria-expanded', String(expanded));
      }
    });

    mediaCards.forEach((card) => {
      card.classList.toggle('is-active', card.dataset.mediaId === mediaId);
    });

    const hasActive = items.some((item) => item.classList.contains('is-active'));
    component.querySelector('.kp-accordion03__items')?.classList.toggle('has-active', hasActive);
  };

  items.forEach((item) => {
    const trigger = item.querySelector('.kp-accordion03__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => activateItem(item));

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateItem(item);
      }
    });
  });

  const defaultItem = items.find((item) => item.classList.contains('is-active')) || items[0];
  activateItem(defaultItem);
})();
