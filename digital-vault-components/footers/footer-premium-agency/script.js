(() => {
  const footer = document.querySelector('.agency-footer');

  if (!footer) {
    return;
  }

  const yearTarget = footer.querySelector('[data-current-year]');
  const copyButton = footer.querySelector('[data-copy-email]');
  const statusTarget = footer.querySelector('[data-copy-status]');
  const emailLink = footer.querySelector('#agencyEmailLink');
  const disclosureButton = footer.querySelector('[data-disclosure-toggle]');
  const disclosurePanel = footer.querySelector('#availabilityDetails');

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const showStatus = (message, isCopied = false) => {
    if (!statusTarget || !copyButton) {
      return;
    }

    statusTarget.textContent = message;
    copyButton.dataset.state = isCopied ? 'copied' : 'idle';
  };

  const fallbackCopy = (text) => {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'absolute';
    helper.style.left = '-9999px';

    document.body.append(helper);
    helper.select();

    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (_error) {
      success = false;
    }

    helper.remove();
    return success;
  };

  const copyEmail = async () => {
    if (!copyButton || !emailLink) {
      return;
    }

    const email = emailLink.textContent?.trim();
    if (!email) {
      showStatus('Email unavailable right now.');
      return;
    }

    let copied = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch (_error) {
        copied = fallbackCopy(email);
      }
    } else {
      copied = fallbackCopy(email);
    }

    if (copied) {
      showStatus('Email copied to clipboard.', true);
    } else {
      showStatus('Copy failed. Please use your email app.');
    }
  };

  copyButton?.addEventListener('click', copyEmail);

  disclosureButton?.addEventListener('click', () => {
    if (!disclosurePanel) {
      return;
    }

    const expanded = disclosureButton.getAttribute('aria-expanded') === 'true';
    disclosureButton.setAttribute('aria-expanded', String(!expanded));
    disclosurePanel.hidden = expanded;
  });
})();
