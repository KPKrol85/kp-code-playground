(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const cards = Array.from(document.querySelectorAll('.fc5-card'));
  if (!cards.length) return;

  const canEnhance = () => finePointer.matches && !prefersReduced.matches;

  const resetCard = (card) => {
    card.style.transform = '';
    card.style.setProperty('--spot-x', '50%');
    card.style.setProperty('--spot-y', '50%');
  };

  const onPointerMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    const rx = ((localY / rect.height) - 0.5) * -5;
    const ry = ((localX / rect.width) - 0.5) * 5;

    card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
    card.style.setProperty('--spot-x', `${(localX / rect.width) * 100}%`);
    card.style.setProperty('--spot-y', `${(localY / rect.height) * 100}%`);
  };

  const onPointerLeave = (event) => {
    resetCard(event.currentTarget);
  };

  const bindInteractions = () => {
    cards.forEach((card) => {
      resetCard(card);
      if (!canEnhance()) return;
      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerleave', onPointerLeave);
      card.addEventListener('blur', onPointerLeave, true);
    });
  };

  const unbindInteractions = () => {
    cards.forEach((card) => {
      card.removeEventListener('pointermove', onPointerMove);
      card.removeEventListener('pointerleave', onPointerLeave);
      card.removeEventListener('blur', onPointerLeave, true);
      resetCard(card);
    });
  };

  const refreshMode = () => {
    unbindInteractions();
    bindInteractions();
  };

  bindInteractions();
  finePointer.addEventListener('change', refreshMode);
  prefersReduced.addEventListener('change', refreshMode);
})();
