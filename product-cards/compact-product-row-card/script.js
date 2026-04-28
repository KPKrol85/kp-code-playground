(function () {
  const list = document.querySelector('[data-product-list]');
  const status = document.querySelector('[data-selection-status]');

  if (!list || !status) {
    return;
  }

  const setSelectedRow = (row) => {
    const rows = list.querySelectorAll('[data-product-row]');

    rows.forEach((item) => {
      const isMatch = item === row;
      item.classList.toggle('is-selected', isMatch);
      item.dataset.selected = isMatch ? 'true' : 'false';

      const button = item.querySelector('[data-select-action]');
      if (button) {
        button.setAttribute('aria-current', isMatch ? 'true' : 'false');
      }
    });

    const selectedName = row.querySelector('.product-row__title')?.textContent?.trim();
    if (selectedName) {
      status.textContent = `Selected product: ${selectedName}`;
    }
  };

  list.addEventListener('click', (event) => {
    const action = event.target.closest('[data-select-action]');
    if (!action) {
      return;
    }

    const row = action.closest('[data-product-row]');
    if (!row) {
      return;
    }

    setSelectedRow(row);
  });
})();
