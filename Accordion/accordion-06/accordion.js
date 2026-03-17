(function () {
  const accordion = document.querySelector('[data-kp-accordion]');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
  if (!items.length) return;

  const getParts = (item) => ({
    trigger: item.querySelector('.kp-item__trigger'),
    panel: item.querySelector('.kp-item__panel')
  });

  const setOpenState = (item, isOpen) => {
    const { trigger, panel } = getParts(item);
    if (!trigger || !panel) return;

    item.classList.toggle('is-open', isOpen);
    trigger.setAttribute('aria-expanded', String(isOpen));
    panel.hidden = !isOpen;
  };

  accordion.dataset.enhanced = 'true';

  let hasOpenItem = false;
  items.forEach((item, index) => {
    const { trigger, panel } = getParts(item);
    if (!trigger || !panel) return;

    const shouldStartOpen = trigger.getAttribute('aria-expanded') === 'true' && !hasOpenItem;
    setOpenState(item, shouldStartOpen || (!hasOpenItem && index === 0));
    hasOpenItem = hasOpenItem || shouldStartOpen || index === 0;

    trigger.addEventListener('click', () => {
      const isAlreadyOpen = item.classList.contains('is-open');
      items.forEach((otherItem) => setOpenState(otherItem, false));
      setOpenState(item, !isAlreadyOpen);
      if (isAlreadyOpen) {
        setOpenState(item, true);
      }
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        trigger.click();
      }
    });
  });
})();
