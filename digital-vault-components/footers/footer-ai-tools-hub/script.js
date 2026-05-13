(() => {
  const root = document.querySelector('.ai-footer');
  if (!root) return;

  const yearNode = root.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const toggleButton = root.querySelector('.ai-footer__toggle');
  const details = root.querySelector('#workflow-details');

  if (toggleButton && details) {
    toggleButton.addEventListener('click', () => {
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', String(!expanded));
      toggleButton.textContent = expanded ? 'Show workflow details' : 'Hide workflow details';
      details.hidden = expanded;
    });
  }

  const copyButton = root.querySelector('.ai-footer__copy-btn');
  const statusNode = root.querySelector('[data-copy-status]');

  const setStatus = (message, copied = false) => {
    if (!statusNode) return;
    statusNode.textContent = message;
    if (copyButton) {
      copyButton.classList.toggle('is-copied', copied);
    }
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch {
      successful = false;
    }
    document.body.removeChild(textarea);
    return successful;
  };

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const endpointNode = root.querySelector(`#${copyButton.dataset.copyTarget}`);
      const endpoint = endpointNode ? endpointNode.textContent.trim() : '';
      if (!endpoint) {
        setStatus('Endpoint unavailable.');
        return;
      }

      let copied = false;
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
          await navigator.clipboard.writeText(endpoint);
          copied = true;
        } catch {
          copied = fallbackCopy(endpoint);
        }
      } else {
        copied = fallbackCopy(endpoint);
      }

      if (copied) {
        setStatus('Endpoint copied to clipboard.', true);
      } else {
        setStatus('Copy failed. Select and copy manually.');
      }
    });
  }
})();
