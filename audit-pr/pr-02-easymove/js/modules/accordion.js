export const initAccordion = () => {
  const accordionButtons = document.querySelectorAll('[data-accordion-button]');
  if (!accordionButtons.length) return;

  const accordionItems = Array.from(accordionButtons)
    .map((button) => {
      const panelId = button.getAttribute('aria-controls');
      if (!panelId) return null;

      const panel = document.getElementById(panelId);
      if (!panel) return null;

      return {
        button,
        panel,
        item: panel.closest('.accordion__item')
      };
    })
    .filter(Boolean);

  if (!accordionItems.length) return;

  const setItemState = ({ button, panel, item }, isOpen) => {
    button.setAttribute('aria-expanded', String(isOpen));
    panel.hidden = !isOpen;
    if (item) {
      item.classList.toggle('accordion__item--open', isOpen);
    }
  };

  accordionItems.forEach((entry) => {
    const isExpanded = entry.button.getAttribute('aria-expanded') === 'true';
    setItemState(entry, isExpanded);

    entry.button.addEventListener('click', () => {
      const shouldOpen = entry.button.getAttribute('aria-expanded') !== 'true';

      accordionItems.forEach((item) => {
        setItemState(item, false);
      });

      if (shouldOpen) {
        setItemState(entry, true);
      }
    });
  });
};
