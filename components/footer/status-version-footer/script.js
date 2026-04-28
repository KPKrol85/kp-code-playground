(() => {
  const yearTarget = document.querySelector('[data-year]');
  const refreshButton = document.querySelector('[data-refresh-btn]');
  const refreshTime = document.querySelector('[data-refresh-time]');
  const refreshAnnouncement = document.querySelector('[data-refresh-announcement]');

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const formatTimestamp = (date) =>
    new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);

  const updateStatusDemo = () => {
    const now = new Date();
    const formatted = formatTimestamp(now);

    if (refreshTime) {
      refreshTime.textContent = `Refreshed locally at ${formatted}`;
    }

    if (refreshAnnouncement) {
      refreshAnnouncement.textContent = `Demo refresh completed at ${formatted}. No external systems were queried.`;
    }
  };

  if (refreshButton) {
    refreshButton.addEventListener('click', updateStatusDemo);
  }
})();
