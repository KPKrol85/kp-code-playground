(function () {
  const bundleGrid = document.querySelector('.bundle-grid');

  if (!bundleGrid) {
    return;
  }

  bundleGrid.addEventListener('click', (event) => {
    const toggleButton = event.target.closest('[data-preview-toggle]');

    if (!toggleButton || !bundleGrid.contains(toggleButton)) {
      return;
    }

    const previewId = toggleButton.getAttribute('aria-controls');
    if (!previewId) {
      return;
    }

    const preview = document.getElementById(previewId);
    if (!preview || !preview.hasAttribute('data-preview')) {
      return;
    }

    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!isExpanded));
    toggleButton.textContent = isExpanded ? 'View included details' : 'Hide details';
    preview.classList.toggle('is-open', !isExpanded);
  });
})();
