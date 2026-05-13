(() => {
  const yearEl = document.getElementById('current-year');
  const copyBtn = document.querySelector('.dev-console-footer__copy-btn');
  const feedbackEl = document.getElementById('copy-feedback');
  const groupToggles = Array.from(document.querySelectorAll('[data-group-toggle]'));
  let feedbackTimer;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const setFeedback = (message, isError = false) => {
    if (!feedbackEl) return;
    feedbackEl.textContent = message;
    feedbackEl.style.color = isError ? 'var(--console-danger)' : '';
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => {
      feedbackEl.textContent = '';
      feedbackEl.style.color = '';
    }, 2600);
  };

  const fallbackCopy = async (text) => {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.left = '-9999px';
    document.body.appendChild(helper);
    helper.select();

    let success = false;
    try {
      success = document.execCommand('copy');
    } finally {
      document.body.removeChild(helper);
    }

    if (!success) {
      throw new Error('Clipboard unavailable');
    }
  };

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const targetId = copyBtn.getAttribute('data-copy-target');
      const text = targetId ? document.getElementById(targetId)?.textContent?.trim() : '';

      if (!text) {
        setFeedback('Command text not found.', true);
        return;
      }

      copyBtn.disabled = true;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          await fallbackCopy(text);
        }
        copyBtn.classList.add('is-copied');
        setFeedback('Command copied to clipboard.');
      } catch (error) {
        setFeedback('Copy failed. Select and copy manually.', true);
      } finally {
        window.setTimeout(() => {
          copyBtn.disabled = false;
          copyBtn.classList.remove('is-copied');
        }, 850);
      }
    });
  }

  groupToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const group = toggle.closest('[data-group]');
      if (!group) return;

      const isActive = group.classList.contains('is-active');
      document.querySelectorAll('[data-group]').forEach((node) => {
        node.classList.remove('is-active');
        const btn = node.querySelector('[data-group-toggle]');
        if (btn) btn.setAttribute('aria-pressed', 'false');
      });

      if (!isActive) {
        group.classList.add('is-active');
        toggle.setAttribute('aria-pressed', 'true');
      }
    });
  });
})();
