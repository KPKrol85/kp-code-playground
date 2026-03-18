(() => {
  const accordion = document.querySelector('[data-accordion]');

  if (!accordion) {
    return;
  }

  const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
  const triggers = items.map((item) => item.querySelector('[data-accordion-trigger]'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transitionDuration = prefersReducedMotion ? 0 : 320;

  const setExpandedState = (item, expanded) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const panel = item.querySelector('[data-accordion-panel]');

    if (!trigger || !panel) {
      return;
    }

    item.classList.toggle('is-open', expanded);
    trigger.setAttribute('aria-expanded', String(expanded));

    if (expanded) {
      panel.hidden = false;
      return;
    }

    if (transitionDuration === 0) {
      panel.hidden = true;
      return;
    }

    window.setTimeout(() => {
      const isStillCollapsed = trigger.getAttribute('aria-expanded') === 'false';
      if (isStillCollapsed) {
        panel.hidden = true;
      }
    }, transitionDuration);
  };

  const openItem = (targetItem) => {
    items.forEach((item) => {
      setExpandedState(item, item === targetItem);
    });
  };

  const focusTriggerByIndex = (index) => {
    const trigger = triggers[index];
    if (trigger) {
      trigger.focus();
    }
  };

  items.forEach((item, index) => {
    const trigger = triggers[index];
    const panel = item.querySelector('[data-accordion-panel]');

    if (!trigger || !panel) {
      return;
    }

    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    item.classList.toggle('is-open', isExpanded);
    panel.hidden = !isExpanded;

    trigger.addEventListener('click', () => {
      const isActive = trigger.getAttribute('aria-expanded') === 'true';
      if (!isActive) {
        openItem(item);
      }
    });

    trigger.addEventListener('keydown', (event) => {
      const currentIndex = triggers.indexOf(trigger);

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          focusTriggerByIndex((currentIndex + 1) % triggers.length);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          focusTriggerByIndex((currentIndex - 1 + triggers.length) % triggers.length);
          break;
        case 'Home':
          event.preventDefault();
          focusTriggerByIndex(0);
          break;
        case 'End':
          event.preventDefault();
          focusTriggerByIndex(triggers.length - 1);
          break;
        default:
          break;
      }
    });
  });

  const defaultOpenItem =
    items.find(
      (item) =>
        item.querySelector('[data-accordion-trigger]')?.getAttribute('aria-expanded') ===
        'true'
    ) || items[0];

  if (defaultOpenItem) {
    openItem(defaultOpenItem);
  }
})();
