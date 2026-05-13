(() => {
  const footer = document.querySelector('.creator-footer');
  if (!footer) return;

  const yearTarget = footer.querySelector('[data-current-year]');
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const signupForm = footer.querySelector('.creator-footer__signup');
  const emailInput = footer.querySelector('#creator-email');
  const feedback = footer.querySelector('#signup-feedback');

  const setFeedback = (message, state) => {
    if (!feedback || !emailInput) return;
    feedback.textContent = message;
    feedback.classList.remove('creator-footer__feedback--error', 'creator-footer__feedback--success');
    if (state) {
      feedback.classList.add(`creator-footer__feedback--${state}`);
    }
  };

  const validateEmail = (value) => /^(?:[^\s@]+)@(?:[^\s@]+)\.[^\s@]{2,}$/.test(value);

  signupForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput?.value.trim() ?? '';

    if (!emailInput) return;

    if (!email) {
      emailInput.setAttribute('aria-invalid', 'true');
      setFeedback('Please enter your email address to get creator notes.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      emailInput.setAttribute('aria-invalid', 'true');
      setFeedback('Please enter a valid email address (example: name@domain.com).', 'error');
      return;
    }

    emailInput.removeAttribute('aria-invalid');
    setFeedback('Thanks! You are on the list for weekly creator notes.', 'success');
    signupForm.reset();
  });

  emailInput?.addEventListener('input', () => {
    emailInput.removeAttribute('aria-invalid');
    setFeedback('', null);
  });

  const copyButton = footer.querySelector('[data-copy-email]');
  const copyFeedback = footer.querySelector('#copy-feedback');

  copyButton?.addEventListener('click', async () => {
    const copyValue = copyButton.getAttribute('data-copy-value');
    if (!copyValue || !copyFeedback) return;

    try {
      await navigator.clipboard.writeText(copyValue);
      copyFeedback.textContent = 'Creator email copied.';
    } catch {
      copyFeedback.textContent = 'Copy unavailable. Email: hello@creatorstudio.example';
    }
  });
})();
