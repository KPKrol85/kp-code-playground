(function () {
  const yearNode = document.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const chips = document.querySelectorAll('[data-chip]');
  if (!chips.length) {
    return;
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((node) => node.classList.remove('is-active'));
      chip.classList.add('is-active');
    });
  });
})();
