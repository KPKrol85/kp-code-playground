(() => {
  const buttons = document.querySelectorAll('.btn:not(:disabled)');

  if (!buttons.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener('pointerdown', () => {
      button.classList.add('is-pressed');
    });

    const release = () => {
      button.classList.remove('is-pressed');
    };

    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('pointerleave', release);
    button.addEventListener('blur', release);
  });
})();
