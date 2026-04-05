export const initAccordion = () => {
  const accordions = document.querySelectorAll('.accordion');
  if (!accordions.length) return;

  accordions.forEach((accordion, accordionIndex) => {
    const accordionButtons = accordion.querySelectorAll('[data-accordion-button]');

    const syncItemState = (button, isOpen) => {
      const item = button.closest('.accordion__item');
      const panel = item ? item.querySelector('.accordion__panel') : null;
      if (!item || !panel) return;

      item.classList.toggle('accordion__item--open', isOpen);
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      panel.toggleAttribute('hidden', !isOpen);
    };

    accordionButtons.forEach((button, buttonIndex) => {
      const item = button.closest('.accordion__item');
      const panel = item ? item.querySelector('.accordion__panel') : null;
      if (!item || !panel) return;

      if (!panel.id) {
        panel.id = `accordion-panel-${accordionIndex + 1}-${buttonIndex + 1}`;
      }

      button.setAttribute('aria-controls', panel.id);

      const isOpen = item.classList.contains('accordion__item--open') || button.getAttribute('aria-expanded') === 'true';
      syncItemState(button, isOpen);

      button.addEventListener('click', () => {
        const isCurrentlyOpen = item.classList.contains('accordion__item--open');

        accordionButtons.forEach((btn) => syncItemState(btn, false));

        if (!isCurrentlyOpen) {
          syncItemState(button, true);
        }
      });
    });
  });
};
