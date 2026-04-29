(() => {
  const root = document.querySelector('.cc__accordion');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('.cc-item'));
  const summarySlots = {
    healthy: document.querySelector('[data-summary="healthy"]'),
    warning: document.querySelector('[data-summary="warning"]'),
    urgent: document.querySelector('[data-summary="urgent"]')
  };

  const setOpenState = (item, open) => {
    const trigger = item.querySelector('.cc-item__trigger');
    const panel = item.querySelector('.cc-item__panel');

    item.classList.toggle('cc-item--open', open);
    trigger.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };

  const closeAll = () => items.forEach((item) => setOpenState(item, false));

  const updateSummary = () => {
    const counts = items.reduce(
      (acc, item) => {
        const state = item.dataset.state;
        if (acc[state] !== undefined) acc[state] += 1;
        return acc;
      },
      { healthy: 0, warning: 0, urgent: 0 }
    );

    Object.entries(counts).forEach(([state, value]) => {
      const slot = summarySlots[state];
      if (slot) slot.textContent = String(value);
    });
  };

  items.forEach((item) => {
    const trigger = item.querySelector('.cc-item__trigger');
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (!isOpen) setOpenState(item, true);
    });
  });

  updateSummary();
})();
