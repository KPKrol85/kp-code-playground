(() => {
  const yearTarget = document.querySelector('[data-current-year]');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  const ctaFeedback = document.querySelector('[data-cta-feedback]');
  const ctaButtons = document.querySelectorAll('.nv-footer__cta-actions .nv-footer__button');
  ctaButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (ctaFeedback) {
        const action = button.textContent.trim();
        ctaFeedback.textContent = `${action} selected — great choice.`;
      }

      button.classList.add('is-pressed');
      window.setTimeout(() => button.classList.remove('is-pressed'), 220);
      event.preventDefault();
    });
  });

  const mobileQuery = window.matchMedia('(max-width: 759px)');
  const navGroups = document.querySelectorAll('[data-nav-group]');

  const syncNavGroups = () => {
    navGroups.forEach((group, index) => {
      if (!(group instanceof HTMLDetailsElement)) {
        return;
      }

      if (mobileQuery.matches) {
        group.open = index === 0;
      } else {
        group.open = true;
      }
    });
  };

  syncNavGroups();
  mobileQuery.addEventListener('change', syncNavGroups);
})();
