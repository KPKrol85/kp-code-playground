(() => {
  const yearTarget = document.getElementById('current-year');
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const status = document.getElementById('newsletter-status');
  const submitButton = document.getElementById('newsletter-submit');
  const copyRssButton = document.getElementById('copy-rss-btn');

  const joinedKey = 'footerNewsletterEngineJoined';

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const setStatus = (message, type = '') => {
    if (!status) return;

    status.textContent = message;
    status.classList.remove('is-error', 'is-success');

    if (type) {
      status.classList.add(type);
    }
  };

  const markInvalid = (message) => {
    emailInput.classList.add('is-invalid');
    emailInput.setAttribute('aria-invalid', 'true');
    setStatus(message, 'is-error');
  };

  const clearInvalid = () => {
    emailInput.classList.remove('is-invalid');
    emailInput.removeAttribute('aria-invalid');
    if (status.classList.contains('is-error')) {
      setStatus('');
    }
  };

  const validateEmail = (email) => {
    const trimmed = email.trim();
    if (!trimmed) {
      return { valid: false, message: 'Please enter your email address.' };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(trimmed)) {
      return { valid: false, message: 'Enter a valid email format, like you@company.com.' };
    }

    return { valid: true, message: '' };
  };

  const applyJoinedState = () => {
    submitButton.disabled = true;
    emailInput.value = '';
    setStatus('You joined this demo list on this browser. No real signup was sent.', 'is-success');
  };

  if (localStorage.getItem(joinedKey) === 'true') {
    applyJoinedState();
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const { valid, message } = validateEmail(emailInput.value);

    if (!valid) {
      markInvalid(message);
      return;
    }

    clearInvalid();
    localStorage.setItem(joinedKey, 'true');
    applyJoinedState();
  });

  emailInput?.addEventListener('input', () => {
    clearInvalid();
  });

  copyRssButton?.addEventListener('click', async () => {
    const copyText = copyRssButton.dataset.copyText || '';
    if (!copyText) return;

    try {
      await navigator.clipboard.writeText(copyText);
      setStatus('RSS link copied to clipboard.', 'is-success');
    } catch {
      setStatus('Could not copy automatically. RSS: ' + copyText, 'is-error');
    }
  });
})();
