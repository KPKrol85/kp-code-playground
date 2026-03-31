export const initAccordion = () => {
  const accordionButtons = document.querySelectorAll('[data-accordion-button]');
  if (!accordionButtons.length) return;

  accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion__item');
      if (!item) return;

      const isOpen = item.classList.contains('accordion__item--open');

      accordionButtons.forEach((btn) => {
        const parent = btn.closest('.accordion__item');
        if (!parent) return;

        parent.classList.remove('accordion__item--open');
        btn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('accordion__item--open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
};
