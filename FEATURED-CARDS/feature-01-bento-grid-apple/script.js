(() => {
  const root = document.querySelector('.fc-bento');
  if (!root) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interactiveCards = root.querySelectorAll('.fc-card.is-interactive');

  const updateSpotlight = (card, event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--spot-x', `${x.toFixed(2)}%`);
    card.style.setProperty('--spot-y', `${y.toFixed(2)}%`);
  };

  interactiveCards.forEach((card) => {
    if (!prefersReducedMotion.matches) {
      card.addEventListener('pointermove', (event) => updateSpotlight(card, event), { passive: true });
    }

    card.addEventListener('pointerenter', () => {
      card.dispatchEvent(
        new CustomEvent('featured-card:hoverstart', {
          bubbles: true,
          detail: { title: card.querySelector('.fc-card__title')?.textContent?.trim() || '' },
        })
      );
    });
  });
})();
