(() => {
  const footerRoot = document.querySelector('.footer-split-cta');

  if (!footerRoot) {
    return;
  }

  const yearTarget = footerRoot.querySelector('[data-current-year]');
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const primaryCta = footerRoot.querySelector('[data-demo-primary]');
  const feedback = footerRoot.querySelector('[data-cta-feedback]');

  if (!primaryCta || !feedback) {
    return;
  }

  primaryCta.addEventListener('click', () => {
    feedback.textContent = 'Demo action selected.';
    window.setTimeout(() => {
      feedback.textContent = '';
    }, 2200);
  });
})();
