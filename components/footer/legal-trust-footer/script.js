(() => {
  const yearNode = document.querySelector('[data-current-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const copyButton = document.querySelector('[data-copy-email]');
  if (!copyButton || !navigator.clipboard) {
    return;
  }

  const emailLink = document.querySelector('.ltf-footer__support-email');
  const statusNode = document.getElementById('ltf-copy-status');

  if (!emailLink || !statusNode) {
    return;
  }

  const setStatus = (message) => {
    statusNode.textContent = message;
  };

  copyButton.addEventListener('click', async () => {
    const email = emailLink.textContent?.trim();
    if (!email) {
      setStatus('Email unavailable.');
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setStatus('Support email copied.');
    } catch {
      setStatus('Copy failed. You can select the email manually.');
    }
  });
})();
