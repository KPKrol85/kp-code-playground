const nsuCards = Array.from(document.querySelectorAll('.nsu-card--interactive'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const setPressedState = (card, isPressed) => {
  card.dataset.pressed = isPressed ? 'true' : 'false';
};

nsuCards.forEach((card) => {
  setPressedState(card, false);

  card.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    setPressedState(card, true);
  });

  ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach((eventName) => {
    card.addEventListener(eventName, () => setPressedState(card, false));
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setPressedState(card, true);
    }
  });

  card.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setPressedState(card, false);
    }
  });
});

if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.pressed = 'true';
          window.setTimeout(() => {
            entry.target.dataset.pressed = 'false';
          }, 220);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.35,
    }
  );

  nsuCards.forEach((card) => revealObserver.observe(card));
}
