(() => {
  const yearTarget = document.querySelector('[data-current-year]');
  if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());

  const copyButton = document.querySelector('[data-copy-version]');
  const versionNode = document.getElementById('fcc-version');
  const feedbackNode = document.getElementById('fcc-copy-feedback');

  const setCopyFeedback = (message, copied = false) => {
    if (!copyButton || !feedbackNode) return;
    copyButton.dataset.state = copied ? 'copied' : '';
    copyButton.textContent = copied ? 'Copied' : 'Copy';
    feedbackNode.textContent = message;
  };

  copyButton?.addEventListener('click', async () => {
    if (!versionNode) return;

    try {
      await navigator.clipboard.writeText(versionNode.textContent?.trim() ?? '');
      setCopyFeedback('Version copied to clipboard.', true);
      window.setTimeout(() => setCopyFeedback(''), 1600);
    } catch {
      setCopyFeedback('Copy failed. Please copy manually.');
    }
  });

  const toggleButton = document.querySelector('[data-system-toggle]');
  const detailsPanel = document.getElementById('fcc-system-details');
  const storageKey = 'fcc-system-panel-expanded';

  const setPanelState = (expanded) => {
    if (!toggleButton || !detailsPanel) return;
    toggleButton.setAttribute('aria-expanded', String(expanded));
    toggleButton.textContent = expanded ? 'Hide details' : 'Show details';
    detailsPanel.hidden = !expanded;
  };

  const storedState = window.localStorage.getItem(storageKey);
  if (storedState === 'true') setPanelState(true);

  toggleButton?.addEventListener('click', () => {
    const nextExpanded = toggleButton.getAttribute('aria-expanded') !== 'true';
    setPanelState(nextExpanded);
    window.localStorage.setItem(storageKey, String(nextExpanded));
  });
})();
