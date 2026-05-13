(() => {
  const yearNode = document.getElementById('footer-year');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const toggleButton = document.querySelector('.footer-legal-trust__toggle');
  const togglePanel = document.getElementById('policy-update-panel');

  if (toggleButton && togglePanel) {
    toggleButton.addEventListener('click', () => {
      const currentlyExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', String(!currentlyExpanded));
      togglePanel.hidden = currentlyExpanded;
    });
  }

  const copyButton = document.querySelector('.footer-legal-trust__copy-btn');
  const feedback = document.querySelector('.footer-legal-trust__copy-feedback');

  if (copyButton && feedback) {
    const supportEmail = copyButton.getAttribute('data-support-email') || '';

    copyButton.addEventListener('click', async () => {
      if (!supportEmail) {
        feedback.textContent = 'Support email unavailable.';
        return;
      }

      try {
        await navigator.clipboard.writeText(supportEmail);
        feedback.textContent = `Copied: ${supportEmail}`;
        copyButton.classList.add('is-copied');
        setTimeout(() => {
          copyButton.classList.remove('is-copied');
        }, 1800);
      } catch (error) {
        feedback.textContent = 'Copy failed. Please copy manually from support@trustlayer.example.';
      }
    });
  }
})();
