(() => {
  const root = document.querySelector('.rd-footer');
  if (!root) return;

  const yearEl = root.querySelector('#rd-current-year');
  const lastCheckedEl = root.querySelector('#rd-last-checked');
  const liveRegion = root.querySelector('#rd-live-region');
  const detailsToggle = root.querySelector('#rd-details-toggle');
  const detailsPanel = root.querySelector('#rd-details-panel');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const formatLocalCheck = (date) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${formatter.format(date)} (local demo check)`;
  };

  const announce = (message) => {
    if (!liveRegion) return;
    liveRegion.textContent = message;
  };

  if (detailsToggle && detailsPanel) {
    detailsToggle.addEventListener('click', () => {
      const isExpanded = detailsToggle.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;
      detailsToggle.setAttribute('aria-expanded', String(nextState));
      detailsPanel.hidden = !nextState;
    });
  }

  const copyButtons = root.querySelectorAll('[data-action="copy-version"], [data-action="copy-docs"]');

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy-value');
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        button.classList.add('is-copied');
        const label = button.getAttribute('data-action') === 'copy-version' ? 'Version copied' : 'Docs URL copied';
        announce(`${label}: ${value}`);
        window.setTimeout(() => button.classList.remove('is-copied'), 1400);
      } catch {
        announce('Clipboard access is unavailable in this environment.');
      }
    });
  });

  const refreshButton = root.querySelector('[data-action="refresh-check"]');
  if (refreshButton && lastCheckedEl) {
    refreshButton.addEventListener('click', () => {
      const now = new Date();
      lastCheckedEl.textContent = formatLocalCheck(now);
      lastCheckedEl.dateTime = now.toISOString();
      announce('Local last checked timestamp updated.');
    });
  }
})();
