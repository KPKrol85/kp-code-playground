(() => {
  const root = document.querySelector('.footer-docs');
  if (!root) return;

  const yearSlot = root.querySelector('[data-year]');
  const versionSelect = root.querySelector('[data-version-select]');
  const versionOutput = root.querySelector('[data-version-output]');
  const metaVersion = root.querySelector('[data-meta-version]');
  const metaChannel = root.querySelector('[data-meta-channel]');
  const treeToggle = root.querySelector('[data-tree-toggle]');
  const treeList = root.querySelector('[data-tree-list]');
  const copyButton = root.querySelector('[data-copy-url]');
  const copyStatus = root.querySelector('[data-copy-status]');

  if (yearSlot) {
    yearSlot.textContent = String(new Date().getFullYear());
  }

  const storageKey = 'docsbridge_selected_version';

  const channelFromVersion = (value) => {
    if (value.includes('legacy')) return 'legacy';
    if (value.includes('preview')) return 'preview';
    return 'stable';
  };

  const applyVersion = (value, persist = false) => {
    if (versionOutput) versionOutput.textContent = value;
    if (metaVersion) metaVersion.textContent = value;
    if (metaChannel) metaChannel.textContent = channelFromVersion(value);
    if (persist) {
      try {
        localStorage.setItem(storageKey, value);
      } catch (_error) {
        // Ignore storage limitations and continue as progressive enhancement.
      }
    }
  };

  if (versionSelect) {
    try {
      const savedVersion = localStorage.getItem(storageKey);
      if (savedVersion && Array.from(versionSelect.options).some((opt) => opt.value === savedVersion)) {
        versionSelect.value = savedVersion;
      }
    } catch (_error) {
      // Ignore storage limitations and continue as progressive enhancement.
    }

    applyVersion(versionSelect.value);

    versionSelect.addEventListener('change', () => {
      applyVersion(versionSelect.value, true);
    });
  }

  if (treeToggle && treeList) {
    treeToggle.addEventListener('click', () => {
      const expanded = treeToggle.getAttribute('aria-expanded') === 'true';
      treeToggle.setAttribute('aria-expanded', String(!expanded));
      treeList.hidden = expanded;
    });
  }

  if (copyButton && copyStatus) {
    copyButton.addEventListener('click', async () => {
      const target = window.location.href;
      try {
        await navigator.clipboard.writeText(target);
        copyStatus.textContent = 'Docs URL copied to clipboard.';
        copyButton.classList.add('is-copied');
      } catch (_error) {
        copyStatus.textContent = 'Clipboard unavailable. Copy the URL from your browser address bar.';
      }

      window.setTimeout(() => {
        copyButton.classList.remove('is-copied');
      }, 1300);
    });
  }
})();
