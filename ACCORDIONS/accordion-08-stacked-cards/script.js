(() => {
  const accordions = document.querySelectorAll('[data-stacked-accordion]');

  accordions.forEach((accordion) => {
    const items = Array.from(accordion.querySelectorAll('[data-item]'));
    const triggers = items.map((item) => item.querySelector('[data-trigger]'));

    const setActiveItem = (nextItem) => {
      items.forEach((item, index) => {
        const trigger = item.querySelector('[data-trigger]');
        const panel = item.querySelector('[data-panel]');
        const isActive = item === nextItem;
        const activeIndex = items.indexOf(nextItem);
        const isAfterActive = activeIndex !== -1 && index > activeIndex;

        item.style.setProperty('--stack-index', index);
        item.classList.toggle('is-active', isActive);
        item.classList.toggle('is-after-active', !isActive && isAfterActive);
        item.classList.toggle('is-dimmed', !isActive && activeIndex !== -1);

        trigger.setAttribute('aria-expanded', String(isActive));
        panel.hidden = !isActive;
      });
    };

    items.forEach((item, index) => {
      item.style.setProperty('--stack-index', index);

      const trigger = item.querySelector('[data-trigger]');
      trigger.addEventListener('click', () => {
        if (!item.classList.contains('is-active')) {
          setActiveItem(item);
        }
      });

      trigger.addEventListener('keydown', (event) => {
        const currentIndex = triggers.indexOf(trigger);

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          const nextTrigger = triggers[(currentIndex + 1) % triggers.length];
          nextTrigger.focus();
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          const prevTrigger = triggers[(currentIndex - 1 + triggers.length) % triggers.length];
          prevTrigger.focus();
        }

        if (event.key === 'Home') {
          event.preventDefault();
          triggers[0].focus();
        }

        if (event.key === 'End') {
          event.preventDefault();
          triggers[triggers.length - 1].focus();
        }
      });
    });

    const defaultActive = items.find((item) => item.classList.contains('is-active')) || items[0];
    setActiveItem(defaultActive);
  });
})();
