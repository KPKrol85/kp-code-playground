const accordions = document.querySelectorAll('[data-accordion]');

accordions.forEach((accordion) => {
  const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
  const triggers = items.map((item) => item.querySelector('.neo-item__trigger'));

  const setItemState = (item, expanded) => {
    const trigger = item.querySelector('.neo-item__trigger');
    const panel = item.querySelector('.neo-item__panel');

    item.classList.toggle('is-open', expanded);
    trigger.setAttribute('aria-expanded', String(expanded));
    panel.hidden = !expanded;
  };

  const openItem = (targetItem) => {
    items.forEach((item) => {
      const shouldOpen = item === targetItem;
      setItemState(item, shouldOpen);
    });

    if ('vibrate' in navigator) {
      navigator.vibrate(8);
    }
  };

  items.forEach((item, index) => {
    const trigger = triggers[index];
    const expanded = trigger.getAttribute('aria-expanded') === 'true';

    setItemState(item, expanded);

    trigger.addEventListener('click', () => {
      if (item.classList.contains('is-open')) {
        return;
      }

      openItem(item);
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
      }

      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (index + direction + triggers.length) % triggers.length;
      triggers[nextIndex].focus();
    });
  });

  if (!items.some((item) => item.classList.contains('is-open')) && items[0]) {
    openItem(items[0]);
  }
});
