(function initPricingService() {
  const component = document.querySelector('[data-pricing-service]');

  if (!component) {
    return;
  }

  const cards = component.querySelectorAll('[data-package-card]');

  cards.forEach((card) => {
    const primaryAction = card.querySelector('.pricing-service__cta--primary');

    if (!primaryAction) {
      return;
    }

    primaryAction.addEventListener('focus', () => {
      cards.forEach((item) => item.classList.remove('is-active'));
      card.classList.add('is-active');
    });

    primaryAction.addEventListener('blur', () => {
      card.classList.remove('is-active');
    });
  });
})();
