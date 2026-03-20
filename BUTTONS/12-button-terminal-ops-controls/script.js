const tocStatusText = document.querySelector('#toc-status-text');
const tocStatusButtons = document.querySelectorAll('[data-status]');
const tocLoadingButton = document.querySelector('[data-loading-button]');
const tocLoadingLabel = document.querySelector('.toc-loading-label');
const tocToggleButton = document.querySelector('[data-toggle-button]');
const tocCopyButton = document.querySelector('[data-copy-token]');

const setStatus = (message) => {
  if (tocStatusText) {
    tocStatusText.textContent = message;
  }
};

tocStatusButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const { status } = button.dataset;
    if (status) {
      setStatus(status);
    }
  });
});

if (tocLoadingButton && tocLoadingLabel) {
  let tocBusy = false;

  tocLoadingButton.addEventListener('click', () => {
    if (tocBusy) {
      return;
    }

    tocBusy = true;
    tocLoadingButton.classList.add('is-busy');
    tocLoadingButton.setAttribute('aria-busy', 'true');
    tocLoadingButton.disabled = true;
    tocLoadingLabel.textContent = 'Syncing agents';
    setStatus('Agent synchronization in progress');

    window.setTimeout(() => {
      tocLoadingButton.classList.remove('is-busy');
      tocLoadingButton.removeAttribute('aria-busy');
      tocLoadingButton.disabled = false;
      tocLoadingLabel.textContent = 'Sync complete';
      setStatus('Agents synchronized successfully');

      window.setTimeout(() => {
        tocLoadingLabel.textContent = 'Sync agents';
        tocBusy = false;
      }, 1600);
    }, 1800);
  });
}

if (tocToggleButton) {
  tocToggleButton.addEventListener('click', () => {
    const nextPressed = tocToggleButton.getAttribute('aria-pressed') !== 'true';
    tocToggleButton.setAttribute('aria-pressed', String(nextPressed));
    tocToggleButton.classList.toggle('is-active', nextPressed);
    const label = tocToggleButton.querySelector('.toc-toggle-label');

    if (label) {
      label.textContent = nextPressed ? 'Readonly mode enabled' : 'Readonly mode';
    }

    setStatus(nextPressed ? 'Readonly safeguards enabled' : 'Readonly safeguards released');
  });
}

if (tocCopyButton) {
  tocCopyButton.addEventListener('click', async () => {
    const tokenPreview = 'kp_live_ops_47af91';
    const fallbackLabel = tocCopyButton.getAttribute('aria-label');

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }

      await navigator.clipboard.writeText(tokenPreview);
      tocCopyButton.setAttribute('aria-label', 'Access token copied');
      setStatus('Access token copied to clipboard');
    } catch (error) {
      tocCopyButton.setAttribute('aria-label', 'Clipboard unavailable');
      setStatus('Clipboard API unavailable in this environment');
    }

    window.setTimeout(() => {
      if (fallbackLabel) {
        tocCopyButton.setAttribute('aria-label', fallbackLabel);
      }
    }, 1800);
  });
}
