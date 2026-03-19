(() => {
  const sections = document.querySelectorAll('[data-glow-cards]');
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  sections.forEach((section) => {
    const cards = Array.from(section.querySelectorAll('[data-glow-card]'));

    cards.forEach((card) => {
      const link = card.querySelector('.gb-card__link');
      if (!link) return;

      let frameId = null;
      let latestEvent = null;

      const applyInteraction = () => {
        frameId = null;
        if (!latestEvent) return;

        const rect = card.getBoundingClientRect();
        const x = latestEvent.clientX - rect.left;
        const y = latestEvent.clientY - rect.top;
        const percentX = clamp((x / rect.width) * 100, -8, 108);
        const percentY = clamp((y / rect.height) * 100, -8, 108);

        card.style.setProperty('--glow-x', `${percentX}%`);
        card.style.setProperty('--glow-y', `${percentY}%`);

        if (!prefersReducedMotion) {
          const rotateY = ((percentX - 50) / 50) * 4;
          const rotateX = ((50 - percentY) / 50) * 3.2;
          card.style.setProperty('--gb-tilt-y', `${rotateY.toFixed(2)}deg`);
          card.style.setProperty('--gb-tilt-x', `${rotateX.toFixed(2)}deg`);
        }
      };

      const queueInteraction = (event) => {
        latestEvent = event;
        if (frameId !== null) return;
        frameId = window.requestAnimationFrame(applyInteraction);
      };

      const resetInteraction = () => {
        if (frameId !== null) {
          window.cancelAnimationFrame(frameId);
          frameId = null;
        }

        latestEvent = null;
        card.style.setProperty('--glow-x', '50%');
        card.style.setProperty('--glow-y', '50%');
        card.style.setProperty('--gb-tilt-x', '0deg');
        card.style.setProperty('--gb-tilt-y', '0deg');
      };

      if (supportsFinePointer) {
        card.addEventListener('pointerenter', queueInteraction);
        card.addEventListener('pointermove', queueInteraction);
        card.addEventListener('pointerleave', resetInteraction);
      }

      link.addEventListener('focus', () => {
        card.style.setProperty('--glow-x', '50%');
        card.style.setProperty('--glow-y', '50%');
      });

      link.addEventListener('blur', resetInteraction);

      link.addEventListener('click', () => {
        if (prefersReducedMotion) return;
        card.classList.remove('is-pulsing');
        window.requestAnimationFrame(() => {
          card.classList.add('is-pulsing');
          window.setTimeout(() => card.classList.remove('is-pulsing'), 380);
        });
      });
    });
  });
})();
