(function () {
  const cards = document.querySelectorAll('.feature-grid .feature-card');

  if (!cards.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return;
  }

  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      const rotateY = ((pointerX / rect.width) - 0.5) * 4;
      const rotateX = ((pointerY / rect.height) - 0.5) * -4;

      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      card.style.setProperty('--feature-card-glow-x', `${(pointerX / rect.width) * 100}%`);
      card.style.setProperty('--feature-card-glow-y', `${(pointerY / rect.height) * 100}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
      card.style.removeProperty('--feature-card-glow-x');
      card.style.removeProperty('--feature-card-glow-y');
    });

    card.addEventListener('blur', () => {
      card.style.transform = '';
    });
  });
})();
