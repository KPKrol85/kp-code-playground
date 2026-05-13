(() => {
  const footer = document.querySelector('.footer-magazine');
  if (!footer) return;

  const yearEl = footer.querySelector('#footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const form = footer.querySelector('.footer-magazine__form');
  const emailInput = footer.querySelector('#newsletter-email');
  const feedback = footer.querySelector('#newsletter-feedback');

  const setFeedback = (message, type) => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.remove('is-error', 'is-success');
    if (type) feedback.classList.add(type);
  };

  if (form && emailInput && feedback) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = emailInput.value.trim();

      if (!value) {
        emailInput.classList.add('is-invalid');
        emailInput.setAttribute('aria-invalid', 'true');
        setFeedback('Please enter your email address.', 'is-error');
        return;
      }

      if (!emailInput.checkValidity()) {
        emailInput.classList.add('is-invalid');
        emailInput.setAttribute('aria-invalid', 'true');
        setFeedback('Please enter a valid email address.', 'is-error');
        return;
      }

      emailInput.classList.remove('is-invalid');
      emailInput.removeAttribute('aria-invalid');
      setFeedback('Thanks — your demo subscription has been recorded.', 'is-success');
      form.reset();
    });

    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('is-invalid');
      emailInput.removeAttribute('aria-invalid');
      setFeedback('', null);
    });
  }

  const copyButton = footer.querySelector('[data-copy-target]');
  const status = footer.querySelector('.footer-magazine__status');

  if (copyButton && status) {
    copyButton.addEventListener('click', async () => {
      const targetSelector = copyButton.getAttribute('data-copy-target');
      const target = targetSelector ? footer.querySelector(targetSelector) : null;
      const url = `${window.location.origin}${window.location.pathname}#${target?.id || 'archive-title'}`;

      try {
        await navigator.clipboard.writeText(url);
        copyButton.classList.add('is-copied');
        status.textContent = 'Archive link copied for sharing.';
        setTimeout(() => copyButton.classList.remove('is-copied'), 1300);
      } catch {
        status.textContent = 'Copy is unavailable in this browser; copy the page URL manually.';
      }
    });
  }
})();
