(function initializeCompactAppFooter() {
  const yearNode = document.querySelector('[data-current-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const statusButton = document.querySelector('[data-status-toggle]');
  if (!statusButton) {
    return;
  }

  const statuses = ["Saved locally", "No account required", "Offline-ready"];
  let currentIndex = 0;

  statusButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % statuses.length;
    statusButton.textContent = statuses[currentIndex];
  });
})();
