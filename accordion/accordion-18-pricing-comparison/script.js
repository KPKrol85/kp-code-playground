(() => {
  const accordion = document.querySelector('[data-accordion]');
  if (!accordion) return;

  const triggers = Array.from(accordion.querySelectorAll('.pricing-item__trigger'));

  const closeItem = (trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;

    trigger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    panel.setAttribute('hidden', '');
  };

  const openItem = (trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;

    trigger.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');
    requestAnimationFrame(() => panel.classList.add('is-open'));
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';

      triggers.forEach(closeItem);
      if (shouldOpen) openItem(trigger);
    });
  });

  const initialOpen = triggers.find((trigger) => trigger.getAttribute('aria-expanded') === 'true') || triggers[0];
  triggers.forEach(closeItem);
  if (initialOpen) openItem(initialOpen);
})();
