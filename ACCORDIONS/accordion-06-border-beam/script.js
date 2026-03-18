(() => {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach((accordion) => {
    const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
    const triggers = items
      .map((item) => item.querySelector('.bb-item__trigger'))
      .filter(Boolean);

    const setItemState = (item, expanded) => {
      const trigger = item.querySelector('.bb-item__trigger');
      const panel = item.querySelector('.bb-item__panel');

      if (!trigger || !panel) return;

      item.classList.toggle('is-active', expanded);
      trigger.setAttribute('aria-expanded', String(expanded));
      panel.hidden = !expanded;
    };

    const openItem = (targetItem) => {
      items.forEach((item) => {
        setItemState(item, item === targetItem);
      });
    };

    let activeItem =
      items.find((item) => item.querySelector('.bb-item__trigger')?.getAttribute('aria-expanded') === 'true') ||
      items[0];

    if (activeItem) {
      openItem(activeItem);
    }

    items.forEach((item) => {
      const trigger = item.querySelector('.bb-item__trigger');

      if (!trigger) return;

      trigger.addEventListener('click', () => {
        if (trigger.getAttribute('aria-expanded') === 'true') {
          return;
        }

        activeItem = item;
        openItem(activeItem);
      });

      trigger.addEventListener('keydown', (event) => {
        const currentIndex = triggers.indexOf(trigger);
        if (currentIndex === -1) return;

        let targetIndex = null;

        switch (event.key) {
          case 'ArrowDown':
            targetIndex = (currentIndex + 1) % triggers.length;
            break;
          case 'ArrowUp':
            targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
            break;
          case 'Home':
            targetIndex = 0;
            break;
          case 'End':
            targetIndex = triggers.length - 1;
            break;
          default:
            break;
        }

        if (targetIndex === null) return;

        event.preventDefault();
        triggers[targetIndex]?.focus();
      });
    });
  });
})();
