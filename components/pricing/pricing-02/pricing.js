(function initPricingCompare() {
  const component = document.querySelector('.pricing-compare');

  if (!component) {
    return;
  }

  const toggleButtons = component.querySelectorAll('[data-billing-trigger]');
  const prices = component.querySelectorAll('[data-price]');
  const periods = component.querySelectorAll('[data-period]');
  const savings = component.querySelectorAll('[data-savings]');
  const billingNote = component.querySelector('[data-billing-note]');

  const setBilling = (billingMode) => {
    const isYearly = billingMode === 'yearly';

    toggleButtons.forEach((button) => {
      const isActive = button.dataset.billingTrigger === billingMode;
      button.classList.toggle('pricing-compare__toggle-button--active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    prices.forEach((price) => {
      const value = price.dataset[billingMode];
      if (value) {
        price.textContent = value;
      }
    });

    periods.forEach((period) => {
      period.textContent = isYearly ? '/month, billed annually' : '/month';
    });

    savings.forEach((saving) => {
      const value = saving.dataset[billingMode] || '';
      saving.textContent = value;
    });

    if (billingNote) {
      billingNote.textContent = isYearly
        ? 'Annual billing selected — save up to 20% on all plans.'
        : 'Save up to 20% with annual billing.';
    }
  };

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setBilling(button.dataset.billingTrigger || 'monthly');
    });
  });

  setBilling('monthly');
})();
