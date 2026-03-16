(function () {
  const hero = document.querySelector('.premium-hero');

  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const media = hero.querySelector('.premium-hero__media');
  if (!media) {
    return;
  }

  hero.classList.add('premium-hero--interactive');

  media.addEventListener('pointermove', function (event) {
    const bounds = media.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    hero.style.setProperty('--premium-hero-glint-x', (relativeX * 16).toFixed(2) + 'px');
    hero.style.setProperty('--premium-hero-glint-y', (relativeY * 16).toFixed(2) + 'px');
  });

  media.addEventListener('pointerleave', function () {
    hero.style.setProperty('--premium-hero-glint-x', '0px');
    hero.style.setProperty('--premium-hero-glint-y', '0px');
  });
})();
