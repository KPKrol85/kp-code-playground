(function footerCommandCenter() {
  const form = document.querySelector('.fcc-newsletter__form');
  if (!form) return;

  const emailInput = form.querySelector('input[name="email"]');
  const feedback = form.querySelector('.fcc-newsletter__feedback');
  const yearTarget = document.getElementById('fcc-year');

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const setFeedback = (message, type) => {
    if (!feedback) return;

    feedback.textContent = message;
    feedback.classList.remove('is-error', 'is-success');

    if (type === 'error') {
      feedback.classList.add('is-error');
    }

    if (type === 'success') {
      feedback.classList.add('is-success');
    }
  };

  const isValidEmail = (value) => {
    if (typeof value !== 'string') return false;
    const normalized = value.trim();
    if (!normalized) return false;

    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!emailInput) {
      setFeedback('Unable to submit right now. Please refresh and try again.', 'error');
      return;
    }

    const value = emailInput.value;

    if (!value.trim()) {
      emailInput.setAttribute('aria-invalid', 'true');
      setFeedback('Please enter your email address to subscribe.', 'error');
      emailInput.focus();
      return;
    }

    if (!isValidEmail(value)) {
      emailInput.setAttribute('aria-invalid', 'true');
      setFeedback('Please enter a valid email address in the format name@example.com.', 'error');
      emailInput.focus();
      return;
    }

    emailInput.removeAttribute('aria-invalid');
    setFeedback('You are subscribed. Practical updates will be sent to your inbox.', 'success');
    form.reset();
  });
})();
