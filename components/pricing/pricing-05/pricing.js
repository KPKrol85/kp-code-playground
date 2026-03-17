(function initPricing05() {
  const section = document.querySelector('[data-component="pricing-05"]');
  if (!section) {
    return;
  }

  const toggle = section.querySelector('[data-billing-toggle]');
  const priceNodes = section.querySelectorAll('[data-price]');
  const periodNodes = section.querySelectorAll('[data-period]');
  const savingsNodes = section.querySelectorAll('[data-savings]');
  const metaNodes = section.querySelectorAll('[data-meta]');

  const setBillingMode = (yearlyEnabled) => {
    const mode = yearlyEnabled ? 'yearly' : 'monthly';

    if (toggle) {
      toggle.setAttribute('aria-pressed', String(yearlyEnabled));
    }

    priceNodes.forEach((node) => {
      const nextValue = node.dataset[mode];
      if (nextValue) {
        node.textContent = nextValue;
      }
    });

    periodNodes.forEach((node) => {
      const nextValue = node.dataset[mode];
      if (nextValue) {
        node.textContent = nextValue;
      }
    });

    savingsNodes.forEach((node) => {
      const nextValue = node.dataset[mode] || '';
      node.textContent = nextValue;
      node.hidden = nextValue.length === 0;
    });

    metaNodes.forEach((node) => {
      const nextValue = node.dataset[mode];
      if (nextValue) {
        node.textContent = nextValue;
      }
    });
  };

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isYearly = toggle.getAttribute('aria-pressed') !== 'true';
      setBillingMode(isYearly);
    });
  }

  setBillingMode(false);

  const faqTriggers = section.querySelectorAll('.pricing-trust__faq-trigger');

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? section.querySelector(`#${panelId}`) : null;

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) {
        panel.hidden = isExpanded;
      }
    });
  });
})();
