(() => {
  const cards = Array.from(document.querySelectorAll('.neon-card'));
  const liveRegion = document.getElementById('selection-status');

  if (!cards.length) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const resetCardGlow = (card) => {
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '35%');
  };

  cards.forEach((card) => {
    resetCardGlow(card);
  });

  const handlePointerMove = (event) => {
    if (motionQuery.matches) return;

    const card = event.target.closest('.neon-card');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--pointer-x', `${Math.min(100, Math.max(0, x)).toFixed(2)}%`);
    card.style.setProperty('--pointer-y', `${Math.min(100, Math.max(0, y)).toFixed(2)}%`);
  };

  document.addEventListener('pointermove', handlePointerMove, { passive: true });

  document.addEventListener('pointerleave', (event) => {
    const card = event.target.closest('.neon-card');
    if (!card) return;
    resetCardGlow(card);
  }, true);

  motionQuery.addEventListener('change', (event) => {
    if (!event.matches) return;
    cards.forEach((card) => {
      resetCardGlow(card);
    });
  });

  document.addEventListener('click', (event) => {
    const cta = event.target.closest('.neon-card__cta');
    if (!cta) return;

    event.preventDefault();

    const card = cta.closest('.neon-card');
    if (!card) return;

    cards.forEach((item) => {
      item.classList.toggle('is-selected', item === card);
    });

    if (liveRegion) {
      const product = card.dataset.productName || 'selected product';
      liveRegion.textContent = `Selected asset: ${product}`;
    }
  });
})();
