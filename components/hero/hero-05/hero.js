(function () {
  const mediaElements = document.querySelectorAll('[data-hero-glow]');

  if (!mediaElements.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    return;
  }

  const updateGlowPosition = (event, element) => {
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    element.style.setProperty('--hero-05-glow-x', `${Math.max(0, Math.min(100, x))}%`);
    element.style.setProperty('--hero-05-glow-y', `${Math.max(0, Math.min(100, y))}%`);
  };

  mediaElements.forEach((element) => {
    element.addEventListener('pointerenter', () => {
      element.classList.add('is-glow-active');
    });

    element.addEventListener('pointermove', (event) => {
      updateGlowPosition(event, element);
    });

    element.addEventListener('pointerleave', () => {
      element.classList.remove('is-glow-active');
    });
  });
})();
