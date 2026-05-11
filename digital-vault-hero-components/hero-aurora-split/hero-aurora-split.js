(() => {
  const page = document.querySelector('.hero-aurora-split-page');
  if (!page) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = Array.from(document.querySelectorAll('[data-parallax-card]'));
  const tiltContainer = document.querySelector('[data-tilt-container]');
  const tiltCard = document.querySelector('[data-tilt-card]');
  const ctaButtons = Array.from(document.querySelectorAll('.hero-aurora-split-btn'));

  const reveal = () => page.classList.add('hero-aurora-split-ready');
  if (reduceMotion) {
    reveal();
  } else {
    window.requestAnimationFrame(() => setTimeout(reveal, 90));
  }

  ctaButtons.forEach((button) => {
    const clearPress = () => button.classList.remove('is-pressed');
    button.addEventListener('pointerdown', () => button.classList.add('is-pressed'));
    button.addEventListener('pointerup', clearPress);
    button.addEventListener('pointerleave', clearPress);
    button.addEventListener('blur', clearPress);
  });

  if (reduceMotion || !tiltContainer) return;

  let rafId = null;
  const onPointerMove = (event) => {
    const rect = tiltContainer.getBoundingClientRect();
    const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (event.clientY - rect.top) / rect.height - 0.5;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      cards.forEach((card, index) => {
        const depth = (index + 1) * 6;
        card.style.transform = `translate3d(${xRatio * depth}px, ${yRatio * depth}px, 0)`;
      });
      if (tiltCard && window.innerWidth >= 1024) {
        tiltCard.style.transform = `rotateX(${(-yRatio * 3).toFixed(2)}deg) rotateY(${(xRatio * 4).toFixed(2)}deg)`;
      }
    });
  };

  const clearEffects = () => {
    cards.forEach((card) => (card.style.transform = ''));
    if (tiltCard) tiltCard.style.transform = '';
  };

  tiltContainer.addEventListener('pointermove', onPointerMove);
  tiltContainer.addEventListener('pointerleave', clearEffects);
})();
