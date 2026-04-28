(() => {
  const yearElement = document.getElementById('msf-current-year');

  if (!yearElement) {
    return;
  }

  const currentYear = new Date().getFullYear();
  yearElement.textContent = String(currentYear);
})();
