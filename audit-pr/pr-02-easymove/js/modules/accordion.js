const setAccordionItemState = (item, button, panel, isOpen) => {
  item.classList.toggle('accordion__item--open', isOpen);
  button.setAttribute('aria-expanded', String(isOpen));
  panel.hidden = !isOpen;
};

export const initAccordion = () => {
  const accordionItems = document.querySelectorAll('.accordion__item');
  if (!accordionItems.length) return;

  const accordionEntries = [];

  accordionItems.forEach((item, index) => {
    const button = item.querySelector('[data-accordion-button]');
    const panel = item.querySelector('.accordion__panel');
    if (!button || !panel) return;

    if (!button.id) {
      button.id = `accordion-button-${index + 1}`;
    }

    if (!panel.id) {
      panel.id = `accordion-panel-${index + 1}`;
    }

    button.setAttribute('aria-controls', panel.id);
    panel.setAttribute('aria-labelledby', button.id);

    const isOpen = button.getAttribute('aria-expanded') === 'true' || item.classList.contains('accordion__item--open');
    setAccordionItemState(item, button, panel, isOpen);

    accordionEntries.push({ item, button, panel });
  });

  accordionEntries.forEach(({ item, button, panel }) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      accordionEntries.forEach((entry) => {
        setAccordionItemState(entry.item, entry.button, entry.panel, false);
      });

      if (!isOpen) {
        setAccordionItemState(item, button, panel, true);
      }
    });
  });
};
