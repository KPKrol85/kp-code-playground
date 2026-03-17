(function () {
  const accordion = document.querySelector('[data-accordion]');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('.kp-item'));
  if (!items.length) return;

  accordion.classList.add('is-js');

  const setAccent = (item) => {
    const accent = item?.dataset.accent;
    if (!accent) return;
    accordion.style.setProperty('--glow', accent.includes('#66e3ff') ? 'rgba(102, 227, 255, 0.35)' : 'rgba(160, 136, 255, 0.35)');
  };

  const syncStatusLabel = (item, isOpen) => {
    const label = item.querySelector('.kp-item__status');
    if (!label) return;
    label.textContent = isOpen ? label.dataset.open || 'Open' : label.dataset.closed || 'Closed';
  };

  const setItemState = (item, isActive) => {
    const button = item.querySelector('.kp-item__trigger');
    if (!button) return;

    item.classList.toggle('is-active', isActive);
    button.setAttribute('aria-expanded', isActive ? 'true' : 'false');

    syncStatusLabel(item, isActive);
  };

  const applySingleActive = (activeItem) => {
    items.forEach((item) => setItemState(item, item === activeItem));
    setAccent(activeItem);
    accordion.classList.add('is-focused');
  };

  const getActiveItem = () => items.find((item) => item.classList.contains('is-active')) || items[0];

  items.forEach((item) => {
    const button = item.querySelector('.kp-item__trigger');
    if (!button) return;

    const panelId = button.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;

    button.addEventListener('click', () => {
      applySingleActive(item);
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        applySingleActive(item);
      }
    });

    button.addEventListener('mouseenter', () => {
      const current = getActiveItem();
      if (item !== current) {
        setAccent(item);
      }
    });

    if (panel) {
      panel.hidden = false;
    }
  });

  accordion.addEventListener('mouseleave', () => {
    setAccent(getActiveItem());
  });

  const initialActive = getActiveItem();
  applySingleActive(initialActive);
})();
