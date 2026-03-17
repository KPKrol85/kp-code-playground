(function initAccordionPackage() {
  const root = document.querySelector('[data-accordion-root]');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('[data-accordion-item]'));
  if (!items.length) return;

  root.classList.add('is-enhanced');

  items.forEach((item) => {
    const trigger = item.querySelector('.kp-accordion__trigger');
    const panel = item.querySelector('.kp-accordion__panel');
    if (!trigger || !panel) return;

    const setExpanded = (nextState) => {
      trigger.setAttribute('aria-expanded', String(nextState));
      item.classList.toggle('is-open', nextState);
      panel.hidden = !nextState;
    };

    setExpanded(trigger.getAttribute('aria-expanded') === 'true');

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      setExpanded(!isExpanded);
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      trigger.click();
    });
  });
})();
