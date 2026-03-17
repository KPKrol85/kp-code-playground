(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const cards = document.querySelectorAll('[data-tilt-card]');

  cards.forEach((card) => {
    const intensity = card.classList.contains('fc-card--hero') ? 8 : 6;

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * intensity;
      const rotateX = ((y / rect.height) - 0.5) * -intensity;

      card.style.transform = `translateY(-4px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    };

    const reset = () => {
      card.style.transform = '';
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', reset);
    card.addEventListener('blur', reset, true);
  });
})();
