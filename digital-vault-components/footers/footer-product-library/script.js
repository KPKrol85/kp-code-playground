(() => {
  const footer = document.querySelector('.footer-product-library');
  if (!footer) return;

  const yearTarget = footer.querySelector('[data-current-year]');
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const disclosureButton = footer.querySelector('.footer-product-library__disclosure-btn');
  const disclosurePanel = footer.querySelector('#license-summary-panel');

  if (disclosureButton && disclosurePanel) {
    disclosureButton.addEventListener('click', () => {
      const expanded = disclosureButton.getAttribute('aria-expanded') === 'true';
      disclosureButton.setAttribute('aria-expanded', String(!expanded));
      disclosurePanel.hidden = expanded;
    });
  }

  const copyButton = footer.querySelector('.footer-product-library__copy-btn');
  const copyFeedback = footer.querySelector('.footer-product-library__copy-feedback');

  if (copyButton && copyFeedback) {
    copyButton.addEventListener('click', async () => {
      const copyValue = copyButton.dataset.copyTarget || '';
      let copied = false;
      try {
        await navigator.clipboard.writeText(copyValue);
        copied = true;
      } catch (_error) {
        copied = false;
      }

      if (copied) {
        copyButton.classList.add('is-copied');
        copyFeedback.textContent = 'Package path copied.';
      } else {
        copyFeedback.textContent = 'Copy unavailable. Select and copy manually.';
      }

      window.setTimeout(() => {
        copyButton.classList.remove('is-copied');
        copyFeedback.textContent = '';
      }, 2400);
    });
  }

  const mobileQuery = window.matchMedia('(max-width: 759px)');
  const navGroups = [...footer.querySelectorAll('.footer-product-library__group')];

  const syncGroupDisclosure = () => {
    navGroups.forEach((group) => {
      const toggle = group.querySelector('.footer-product-library__group-toggle');
      const list = group.querySelector('ul');
      if (!toggle || !list) return;

      if (!list.id) {
        list.id = `fpl-group-list-${Math.random().toString(36).slice(2, 9)}`;
      }
      toggle.setAttribute('aria-controls', list.id);

      if (mobileQuery.matches) {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        list.hidden = !expanded;
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        list.hidden = false;
      }
    });
  };

  navGroups.forEach((group) => {
    const toggle = group.querySelector('.footer-product-library__group-toggle');
    const list = group.querySelector('ul');
    if (!toggle || !list) return;

    toggle.addEventListener('click', () => {
      if (!mobileQuery.matches) return;
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      list.hidden = expanded;
    });
  });

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', syncGroupDisclosure);
  } else {
    mobileQuery.addListener(syncGroupDisclosure);
  }

  syncGroupDisclosure();
})();
