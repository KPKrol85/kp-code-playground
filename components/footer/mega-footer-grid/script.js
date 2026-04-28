(function () {
  'use strict';

  const root = document.querySelector('.mfg-footer');
  if (!root) return;

  const yearNode = root.querySelector('#mfg-year');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const form = root.querySelector('.mfg-newsletter-form');
  if (!form) return;

  const emailInput = form.querySelector('input[name="email"]');
  const feedback = form.querySelector('#mfg-feedback');

  if (!emailInput || !feedback) return;

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setFeedback(message, type) {
    feedback.textContent = message;
    feedback.classList.remove('is-success', 'is-error');

    if (type) {
      feedback.classList.add(type === 'success' ? 'is-success' : 'is-error');
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      setFeedback('Please enter an email address before subscribing.', 'error');
      emailInput.focus();
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setFeedback('Please use a valid email format, such as name@domain.com.', 'error');
      emailInput.focus();
      return;
    }

    setFeedback('Thanks for subscribing. You are now on the Vault update list.', 'success');
    form.reset();
  });
})();
