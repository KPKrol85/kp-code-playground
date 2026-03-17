(function () {
  var root = document.querySelector('[data-pricing-toggle]');
  if (!root) {
    return;
  }

  var toggle = root.querySelector('[data-pricing-toggle-button]');
  var savings = root.querySelector('[data-pricing-savings]');
  var priceValues = document.querySelectorAll('.pricing__price-value');
  var periodValues = document.querySelectorAll('[data-pricing-period]');
  var metaValues = document.querySelectorAll('[data-pricing-meta]');
  var labels = root.querySelectorAll('.pricing__billing-label');

  var metaContent = {
    monthly: [
      'Billed monthly, cancel anytime.',
      'Billed monthly, includes premium onboarding.',
      'Billed monthly, annual contract available.'
    ],
    yearly: [
      'Billed yearly at $288, two months included.',
      'Billed yearly at $780, save $168 annually.',
      'Billed yearly at $1464, includes strategic reviews.'
    ]
  };

  function setLabelState(isYearly) {
    labels.forEach(function (label, index) {
      var shouldBeActive = isYearly ? index === 1 : index === 0;
      label.classList.toggle('pricing__billing-label--active', shouldBeActive);
    });
  }

  function updatePrices(isYearly) {
    priceValues.forEach(function (valueEl, index) {
      var nextValue = isYearly ? valueEl.dataset.yearly : valueEl.dataset.monthly;
      valueEl.textContent = '$' + nextValue;

      if (metaValues[index]) {
        metaValues[index].textContent = isYearly ? metaContent.yearly[index] : metaContent.monthly[index];
      }
    });

    periodValues.forEach(function (periodEl) {
      periodEl.textContent = isYearly ? '/month, billed yearly' : '/month';
    });

    if (savings) {
      savings.textContent = isYearly ? '18% saved annually' : 'Save up to 18%';
    }
  }

  function applyState(isYearly) {
    toggle.setAttribute('aria-checked', isYearly ? 'true' : 'false');
    updatePrices(isYearly);
    setLabelState(isYearly);
  }

  toggle.addEventListener('click', function () {
    var isYearly = toggle.getAttribute('aria-checked') !== 'true';
    applyState(isYearly);
  });

  applyState(false);
})();
