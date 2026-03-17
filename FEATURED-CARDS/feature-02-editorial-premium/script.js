(() => {
  const cards = document.querySelectorAll('.f2ep__card');
  if (!cards.length) return;

  const updateGlowPosition = (card, event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 40}ms`;

    card.addEventListener('pointermove', (event) => {
      updateGlowPosition(card, event);
    });

    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });

    card.addEventListener('focus', () => {
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });

    card.addEventListener('blur', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });
})();
