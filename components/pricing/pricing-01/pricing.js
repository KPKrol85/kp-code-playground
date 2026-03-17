(function initPricingPremium() {
  var component = document.querySelector('[data-component="pricing-01"]');

  if (!component) {
    return;
  }

  var toggle = component.querySelector('[data-billing-toggle]');
  var valueNodes = component.querySelectorAll('[data-price], [data-period], [data-savings], [data-meta]');

  if (!toggle || !valueNodes.length) {
    return;
  }

  function updateValues(isYearly) {
    var billingState = isYearly ? 'yearly' : 'monthly';

    valueNodes.forEach(function (node) {
      var nextValue = node.dataset[billingState];

      if (typeof nextValue !== 'string') {
        return;
      }

      node.textContent = nextValue;
    });

    toggle.setAttribute('aria-checked', String(isYearly));
    component.setAttribute('data-billing', billingState);
  }

  toggle.addEventListener('click', function () {
    var isYearly = toggle.getAttribute('aria-checked') !== 'true';
    updateValues(isYearly);
  });

  updateValues(false);
})();
