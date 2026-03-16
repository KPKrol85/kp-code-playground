(function () {
  const accordion = document.querySelector('[data-accordion]');

  if (!accordion) {
    return;
  }

  const items = Array.from(accordion.querySelectorAll('.accordion__item'));

  const closeItem = (item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    if (!trigger || !panel) {
      return;
    }

    trigger.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    item.classList.remove('accordion__item--expanded');
  };

  const openItem = (item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    if (!trigger || !panel) {
      return;
    }

    trigger.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    item.classList.add('accordion__item--expanded');
  };

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    if (!trigger || !panel) {
      return;
    }

    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    item.classList.toggle('accordion__item--expanded', isExpanded);
    panel.hidden = !isExpanded;

    trigger.addEventListener('click', () => {
      const currentlyExpanded = trigger.getAttribute('aria-expanded') === 'true';

      items.forEach((otherItem) => {
        if (otherItem !== item) {
          closeItem(otherItem);
        }
      });

      if (currentlyExpanded) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
})();
