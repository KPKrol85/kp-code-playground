(function () {
  const accordion = document.querySelector('[data-accordion]');

  if (!accordion) {
    return;
  }

  const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
  const triggers = items
    .map((item) => item.querySelector('[data-accordion-trigger]'))
    .filter(Boolean);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getParts = (item) => ({
    trigger: item.querySelector('[data-accordion-trigger]'),
    panel: item.querySelector('[data-accordion-panel]')
  });

  const resetPanelStyles = (panel) => {
    panel.style.height = '';
    panel.style.opacity = '';
  };

  const closePanel = (panel) => {
    if (panel.hidden) {
      return;
    }

    if (reducedMotion) {
      panel.hidden = true;
      resetPanelStyles(panel);
      return;
    }

    const currentHeight = panel.scrollHeight;
    panel.style.height = `${currentHeight}px`;
    panel.style.opacity = '1';

    requestAnimationFrame(() => {
      panel.style.height = '0px';
      panel.style.opacity = '0';
    });

    const onCloseEnd = (event) => {
      if (event.propertyName !== 'height') {
        return;
      }

      panel.hidden = true;
      resetPanelStyles(panel);
      panel.removeEventListener('transitionend', onCloseEnd);
    };

    panel.addEventListener('transitionend', onCloseEnd);
  };

  const openPanel = (panel) => {
    panel.hidden = false;

    if (reducedMotion) {
      resetPanelStyles(panel);
      return;
    }

    const targetHeight = panel.scrollHeight;
    panel.style.height = '0px';
    panel.style.opacity = '0';

    requestAnimationFrame(() => {
      panel.style.height = `${targetHeight}px`;
      panel.style.opacity = '1';
    });

    const onOpenEnd = (event) => {
      if (event.propertyName !== 'height') {
        return;
      }

      resetPanelStyles(panel);
      panel.removeEventListener('transitionend', onOpenEnd);
    };

    panel.addEventListener('transitionend', onOpenEnd);
  };

  const setActiveItem = (targetItem) => {
    items.forEach((item) => {
      const { trigger, panel } = getParts(item);

      if (!trigger || !panel) {
        return;
      }

      const shouldExpand = item === targetItem;
      item.classList.toggle('is-active', shouldExpand);
      trigger.setAttribute('aria-expanded', String(shouldExpand));

      if (shouldExpand) {
        openPanel(panel);
      } else {
        closePanel(panel);
      }
    });
  };

  items.forEach((item, index) => {
    const { trigger, panel } = getParts(item);

    if (!trigger || !panel) {
      return;
    }

    trigger.addEventListener('click', () => {
      if (!item.classList.contains('is-active')) {
        setActiveItem(item);
      }
    });

    trigger.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        return;
      }

      event.preventDefault();

      let nextIndex = index;

      if (event.key === 'ArrowDown') {
        nextIndex = (index + 1) % triggers.length;
      } else if (event.key === 'ArrowUp') {
        nextIndex = (index - 1 + triggers.length) % triggers.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = triggers.length - 1;
      }

      triggers[nextIndex]?.focus();
    });
  });

  const initialActive =
    items.find((item) => item.querySelector('[data-accordion-trigger]')?.getAttribute('aria-expanded') === 'true') ||
    items[0];

  items.forEach((item) => {
    const { trigger, panel } = getParts(item);

    if (!trigger || !panel) {
      return;
    }

    const isExpanded = item === initialActive;
    item.classList.toggle('is-active', isExpanded);
    trigger.setAttribute('aria-expanded', String(isExpanded));
    panel.hidden = !isExpanded;
    resetPanelStyles(panel);
  });
})();
