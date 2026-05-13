(() => {
  const root = document.querySelector('.vault-footer');
  if (!root) return;

  const yearNode = root.querySelector('[data-current-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const feedback = root.querySelector('#vault-copy-feedback');
  const copyButton = root.querySelector('[data-copy-path]');
  const copyTarget = root.querySelector('#vault-package-path');

  const setFeedback = (message) => {
    if (feedback) feedback.textContent = message;
  };

  const fallbackCopy = (text) => {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.setAttribute('readonly', '');
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.append(temp);
    temp.select();
    const success = document.execCommand('copy');
    temp.remove();
    return success;
  };

  if (copyButton && copyTarget) {
    copyButton.addEventListener('click', async () => {
      const text = copyTarget.textContent?.trim() || '';
      if (!text) {
        setFeedback('Package path unavailable.');
        return;
      }

      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          copied = true;
        } else {
          copied = fallbackCopy(text);
        }
      } catch (error) {
        copied = fallbackCopy(text);
      }

      if (copied) {
        copyButton.classList.add('is-copied');
        setFeedback('Path copied to clipboard.');
        setTimeout(() => copyButton.classList.remove('is-copied'), 1400);
      } else {
        setFeedback('Copy failed. Select and copy the path manually.');
      }
    });
  }

  const detailsButton = root.querySelector('[data-vault-details]');
  const detailsPanel = root.querySelector('#vault-access-details');

  if (detailsButton && detailsPanel) {
    detailsButton.addEventListener('click', () => {
      const expanded = detailsButton.getAttribute('aria-expanded') === 'true';
      detailsButton.setAttribute('aria-expanded', String(!expanded));
      detailsPanel.hidden = expanded;
    });
  }
})();
