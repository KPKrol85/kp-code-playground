(function initPricingEditorial() {
  const component = document.querySelector('.pricing-editorial');
  if (!component) {
    return;
  }

  const toggle = component.querySelector('[data-billing-toggle]');
  if (!toggle) {
    return;
  }

  const buttons = Array.from(toggle.querySelectorAll('.pricing-editorial__toggle-button'));
  const plans = Array.from(component.querySelectorAll('[data-plan]'));

  const formatPrice = (value) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return value;
    }

    return new Intl.NumberFormat('en-US').format(numeric);
  };

  const setBilling = (billing) => {
    buttons.forEach((button) => {
      const isActive = button.dataset.billing === billing;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    plans.forEach((plan) => {
      const price = plan.querySelector('[data-price]');
      const period = plan.querySelector('[data-period]');
      const savings = plan.querySelector('[data-savings]');
      const meta = plan.querySelector('[data-meta]');

      if (price) {
        price.textContent = formatPrice(price.dataset[billing] || price.textContent);
      }

      if (period) {
        period.textContent = period.dataset[billing] || period.textContent;
      }

      if (meta) {
        meta.textContent = meta.dataset[billing] || meta.textContent;
      }

      if (savings) {
        const savingsText = savings.dataset[billing] || '';
        savings.textContent = savingsText;
        savings.hidden = savingsText.length === 0;
      }
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setBilling(button.dataset.billing || 'monthly');
    });
  });
})();
