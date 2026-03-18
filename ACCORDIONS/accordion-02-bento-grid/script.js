const accordions = document.querySelectorAll('[data-accordion]');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

accordions.forEach((accordion) => {
  const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
  const triggers = items.map((item) => item.querySelector('.vault-bento-card__trigger'));

  const closeItem = (item) => {
    const trigger = item.querySelector('.vault-bento-card__trigger');
    const panel = item.querySelector('.vault-bento-card__panel');

    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
  };

  const openItem = (item, { moveIntoView = true } = {}) => {
    const trigger = item.querySelector('.vault-bento-card__trigger');
    const panel = item.querySelector('.vault-bento-card__panel');

    items.forEach((accordionItem) => {
      if (accordionItem !== item) {
        closeItem(accordionItem);
      }
    });

    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.hidden = false;

    if (moveIntoView) {
      requestAnimationFrame(() => {
        const triggerRect = trigger.getBoundingClientRect();
        const cardRect = item.getBoundingClientRect();
        const viewTop = 24;
        const viewBottom = window.innerHeight - 24;

        if (triggerRect.top < viewTop || cardRect.bottom > viewBottom) {
          trigger.scrollIntoView({
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }
      });
    }
  };

  items.forEach((item, index) => {
    const trigger = triggers[index];
    const panel = item.querySelector('.vault-bento-card__panel');
    const shouldBeOpen = item.classList.contains('is-open') || trigger.getAttribute('aria-expanded') === 'true';

    if (shouldBeOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    } else {
      closeItem(item);
    }

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      if (!isExpanded) {
        openItem(item);
      }
    });

    trigger.addEventListener('keydown', (event) => {
      const keyMap = {
        ArrowDown: 1,
        ArrowRight: 1,
        ArrowUp: -1,
        ArrowLeft: -1
      };

      if (!(event.key in keyMap)) {
        return;
      }

      event.preventDefault();
      const nextIndex = (index + keyMap[event.key] + triggers.length) % triggers.length;
      triggers[nextIndex].focus();
    });
  });

  const openItemOnLoad = items.find((item) => item.classList.contains('is-open')) || items[0];
  openItem(openItemOnLoad, { moveIntoView: false });
});
