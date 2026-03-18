(function () {
  const accordion = document.querySelector('[data-accordion]');

  if (!accordion) {
    return;
  }

  const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
  const triggers = items.map((item) => item.querySelector('.af-trigger')).filter(Boolean);
  const firstExpandedIndex = items.findIndex(
    (item) => item.querySelector('.af-trigger')?.getAttribute('aria-expanded') === 'true'
  );

  const setItemState = (item, expanded) => {
    const trigger = item.querySelector('.af-trigger');
    const panelId = trigger?.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!trigger || !panel) {
      return;
    }

    item.classList.toggle('is-active', expanded);
    trigger.setAttribute('aria-expanded', String(expanded));
    panel.hidden = !expanded;
  };

  const openItem = (targetItem) => {
    items.forEach((item) => {
      setItemState(item, item === targetItem);
    });
  };

  items.forEach((item, index) => {
    const trigger = item.querySelector('.af-trigger');

    if (!trigger) {
      return;
    }

    setItemState(item, index === firstExpandedIndex || (firstExpandedIndex === -1 && index === 0));

    trigger.addEventListener('click', () => {
      openItem(item);
    });

    trigger.addEventListener('keydown', (event) => {
      const currentIndex = triggers.indexOf(trigger);

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        triggers[(currentIndex + 1) % triggers.length]?.focus();
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        triggers[(currentIndex - 1 + triggers.length) % triggers.length]?.focus();
      }

      if (event.key === 'Home') {
        event.preventDefault();
        triggers[0]?.focus();
      }

      if (event.key === 'End') {
        event.preventDefault();
        triggers[triggers.length - 1]?.focus();
      }
    });
  });
})();
