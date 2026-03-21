const root = document.documentElement;
const hero = document.querySelector('.mesh-hero');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (hero) {
  const state = {
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    strength: 0,
    targetStrength: 0,
    rafId: null,
  };

  const setMeshVars = () => {
    root.style.setProperty('--pointer-x', `${state.currentX.toFixed(2)}px`);
    root.style.setProperty('--pointer-y', `${state.currentY.toFixed(2)}px`);
    root.style.setProperty('--pointer-strength', state.strength.toFixed(3));
  };

  const animate = () => {
    state.currentX += (state.targetX - state.currentX) * 0.08;
    state.currentY += (state.targetY - state.currentY) * 0.08;
    state.strength += (state.targetStrength - state.strength) * 0.08;

    setMeshVars();

    const isSettled =
      Math.abs(state.currentX - state.targetX) < 0.12 &&
      Math.abs(state.currentY - state.targetY) < 0.12 &&
      Math.abs(state.strength - state.targetStrength) < 0.01;

    if (!isSettled || state.targetStrength > 0) {
      state.rafId = window.requestAnimationFrame(animate);
      return;
    }

    state.rafId = null;
  };

  const startAnimation = () => {
    if (state.rafId !== null) return;
    state.rafId = window.requestAnimationFrame(animate);
  };

  const resetMotion = () => {
    state.targetX = 0;
    state.targetY = 0;
    state.targetStrength = 0;
    startAnimation();
  };

  const handlePointerMove = (event) => {
    if (prefersReducedMotion.matches) return;

    const rect = hero.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    const movementX = Math.abs(event.movementX || 0);
    const movementY = Math.abs(event.movementY || 0);
    const velocity = Math.min(1, (movementX + movementY) / 36);

    state.targetX = relativeX * 42;
    state.targetY = relativeY * 34;
    state.targetStrength = 0.1 + velocity * 0.55;

    startAnimation();
  };

  const handlePointerLeave = () => {
    resetMotion();
  };

  const applyMotionMode = () => {
    if (prefersReducedMotion.matches) {
      resetMotion();
      setMeshVars();
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      return;
    }

    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', handlePointerLeave, { passive: true });
  };

  applyMotionMode();

  const onPreferenceChange = () => {
    if (state.rafId !== null) {
      window.cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }

    state.currentX = 0;
    state.currentY = 0;
    state.targetX = 0;
    state.targetY = 0;
    state.strength = 0;
    state.targetStrength = 0;
    setMeshVars();
    applyMotionMode();
  };

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', onPreferenceChange);
  } else if (typeof prefersReducedMotion.addListener === 'function') {
    prefersReducedMotion.addListener(onPreferenceChange);
  }
}
