(() => {
  const accordion = document.querySelector('[data-accordion]');

  if (!accordion) {
    return;
  }

  const items = Array.from(accordion.querySelectorAll('[data-item]'));
  const triggers = items.map((item) => item.querySelector('[data-accordion-trigger]'));

  const setItemState = (item, expanded) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const panel = item.querySelector('[data-accordion-panel]');
    const indicator = item.querySelector('.tb-accordion__indicator');

    if (!trigger || !panel || !indicator) {
      return;
    }

    item.classList.toggle('is-open', expanded);
    item.classList.toggle('is-read', item.classList.contains('is-read') || expanded);
    trigger.setAttribute('aria-expanded', String(expanded));
    panel.hidden = !expanded;
    indicator.textContent = expanded ? '[-]' : '[+]';
  };

  const openItem = (currentItem) => {
    items.forEach((item) => {
      setItemState(item, item === currentItem);
    });
  };

  items.forEach((item, index) => {
    const trigger = item.querySelector('[data-accordion-trigger]');

    if (!trigger) {
      return;
    }

    const shouldStartOpen = index === 0;
    setItemState(item, shouldStartOpen);

    trigger.addEventListener('click', () => {
      openItem(item);
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
      }

      event.preventDefault();

      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (index + direction + triggers.length) % triggers.length;
      triggers[nextIndex]?.focus();
    });
  });
})();
