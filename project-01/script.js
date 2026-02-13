(() => {
  const hero = document.querySelector('.hero');

  if (!hero) {
    return;
  }

  const layers = Array.from(hero.querySelectorAll('.hero__layer'));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let enabled = !prefersReduced.matches;
  let pointerX = 0;
  let pointerY = 0;
  let rafId = null;

  const resetLayers = () => {
    layers.forEach((layer) => {
      layer.style.transform = 'translate3d(0, 0, 0)';
    });
  };

  const animate = () => {
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth) || 0;
      const x = pointerX * (depth / 35);
      const y = pointerY * (depth / 35);
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    rafId = null;
  };

  const onPointerMove = (event) => {
    if (!enabled) {
      return;
    }

    const bounds = hero.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX = relativeX * 26;
    pointerY = relativeY * 26;

    if (!rafId) {
      rafId = window.requestAnimationFrame(animate);
    }
  };

  const applyMotionPreference = (event) => {
    enabled = !event.matches;

    if (!enabled) {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      resetLayers();
    }
  };

  hero.addEventListener('pointermove', onPointerMove);
  prefersReduced.addEventListener('change', applyMotionPreference);

  if (!enabled) {
    resetLayers();
  }
})();
