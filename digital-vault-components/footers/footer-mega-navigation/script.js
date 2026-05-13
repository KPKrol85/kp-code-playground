(function () {
  const footer = document.querySelector('.footer-mega');
  if (!footer) return;

  const yearNode = footer.querySelector('[data-current-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const mq = window.matchMedia('(min-width: 760px)');
  const groups = [...footer.querySelectorAll('[data-footer-group]')].map((group, index) => {
    const button = group.querySelector('.footer-mega__group-toggle');
    const list = group.querySelector('.footer-mega__link-list');
    if (!button || !list) return null;

    const listId = `footer-mega-group-${index + 1}`;
    list.id = list.id || listId;
    button.setAttribute('aria-controls', list.id);

    button.addEventListener('click', () => {
      if (mq.matches) return;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      list.hidden = expanded;
    });

    return { button, list };
  }).filter(Boolean);

  const syncGroupState = () => {
    groups.forEach(({ button, list }) => {
      const desktop = mq.matches;
      button.setAttribute('aria-expanded', 'true');
      list.hidden = false;
      if (!desktop) {
        button.setAttribute('aria-expanded', 'false');
        list.hidden = true;
      }
    });
  };

  syncGroupState();
  mq.addEventListener('change', syncGroupState);

  const copyBtn = footer.querySelector('.footer-mega__copy-btn');
  const copyFeedback = footer.querySelector('.footer-mega__copy-feedback');
  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      const value = copyBtn.getAttribute('data-copy-value') || '';
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        copyFeedback.textContent = `Copied: ${value}`;
      } catch (error) {
        copyFeedback.textContent = 'Unable to copy. Please copy manually.';
      }
    });
  }
})();
