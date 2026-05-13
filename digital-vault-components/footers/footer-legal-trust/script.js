(() => {
  const footer = document.querySelector('.footer-legal-trust');
  if (!footer) return;

  const yearTarget = footer.querySelector('#footerYear');
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const toggle = footer.querySelector('#policyUpdateToggle');
  const details = footer.querySelector('#policyUpdateDetails');

  if (toggle && details) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;
      toggle.setAttribute('aria-expanded', String(nextState));
      details.hidden = !nextState;
    });
  }

  const copyButton = footer.querySelector('[data-copy-email]');
  const feedback = footer.querySelector('.footer-legal-trust__copy-feedback');
  const supportEmail = 'support@trustlayer.example';

  if (copyButton && feedback && navigator.clipboard) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(supportEmail);
        feedback.textContent = 'Support email copied.';
        feedback.classList.add('is-visible');
      } catch {
        feedback.textContent = 'Unable to copy. Please copy manually from the email link.';
        feedback.classList.add('is-visible');
      }
    });
  } else if (feedback) {
    feedback.textContent = 'Copy action unavailable in this browser. Use the email link above.';
  }
})();
