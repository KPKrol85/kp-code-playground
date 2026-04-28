(function () {
  'use strict';

  var yearNode = document.querySelector('[data-current-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  var copyButton = document.querySelector('[data-copy-email]');
  var feedbackNode = document.querySelector('[data-copy-feedback]');

  if (!copyButton || !feedbackNode) {
    return;
  }

  var defaultLabel = copyButton.textContent.trim();
  var resetTimerId = null;

  function setFeedback(message) {
    feedbackNode.textContent = message;
  }

  function resetButtonLabel() {
    copyButton.textContent = defaultLabel;
    copyButton.removeAttribute('data-state');
  }

  async function copyEmailToClipboard() {
    var email = copyButton.getAttribute('data-copy-email');
    if (!email || !navigator.clipboard || !navigator.clipboard.writeText) {
      setFeedback('Clipboard access is unavailable. Email: hello@kp-code.com');
      copyButton.textContent = 'Email unavailable';
      copyButton.setAttribute('data-state', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setFeedback('Contact email copied: ' + email);
      copyButton.textContent = 'Email copied';
      copyButton.setAttribute('data-state', 'success');
    } catch (_error) {
      setFeedback('Could not copy email. Please use hello@kp-code.com.');
      copyButton.textContent = 'Copy failed';
      copyButton.setAttribute('data-state', 'error');
    }

    if (resetTimerId) {
      window.clearTimeout(resetTimerId);
    }

    resetTimerId = window.setTimeout(function () {
      resetButtonLabel();
      setFeedback('');
    }, 2200);
  }

  copyButton.addEventListener('click', copyEmailToClipboard);
})();
