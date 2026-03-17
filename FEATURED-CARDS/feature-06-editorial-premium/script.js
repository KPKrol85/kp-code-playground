(() => {
  const cards = document.querySelectorAll('.epfc-card');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (prefersReducedMotion || !finePointer) {
    return;
  }

  const maxTilt = 7;

  cards.forEach((card) => {
    let frame = null;
    let pointerX = 0;
    let pointerY = 0;

    const reset = () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--glare-x');
      card.style.removeProperty('--glare-y');
      card.style.removeProperty('--shadow-x');
      card.style.removeProperty('--shadow-y');
    };

    const update = () => {
      const bounds = card.getBoundingClientRect();
      const localX = Math.max(0, Math.min(pointerX - bounds.left, bounds.width));
      const localY = Math.max(0, Math.min(pointerY - bounds.top, bounds.height));

      const ratioX = bounds.width ? localX / bounds.width : 0.5;
      const ratioY = bounds.height ? localY / bounds.height : 0.5;

      const rotateY = (ratioX - 0.5) * (maxTilt * 2);
      const rotateX = (0.5 - ratioY) * (maxTilt * 2);

      card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--glare-x', `${(ratioX * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${(ratioY * 100).toFixed(1)}%`);
      card.style.setProperty('--shadow-x', `${(rotateY * -1.1).toFixed(1)}px`);
      card.style.setProperty('--shadow-y', `${(20 + Math.abs(rotateX) * 0.8).toFixed(1)}px`);

      frame = null;
    };

    const onMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    card.style.willChange = 'transform';

    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
      reset();
    });

    card.addEventListener('blur', reset);
  });
})();
