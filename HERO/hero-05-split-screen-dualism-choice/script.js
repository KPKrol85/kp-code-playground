(() => {
  const hero = document.querySelector('.dualism-hero');

  if (!hero) {
    return;
  }

  const panels = Array.from(hero.querySelectorAll('.path-panel'));
  const toggles = Array.from(hero.querySelectorAll('.dualism-hero__toggle'));
  let activeSide = '';

  const syncToggles = (side) => {
    toggles.forEach((toggle) => {
      const isActive = side && toggle.dataset.target === side;
      toggle.setAttribute('aria-pressed', String(Boolean(isActive)));
    });
  };

  const setActiveSide = (side = '') => {
    activeSide = side;
    hero.dataset.activeSide = side;
    syncToggles(side);
  };

  const clearActiveSide = (side) => {
    if (activeSide !== side) {
      return;
    }

    const focusedInsideHero = hero.contains(document.activeElement);

    if (!focusedInsideHero) {
      setActiveSide('');
    }
  };

  panels.forEach((panel) => {
    const side = panel.dataset.side;

    panel.addEventListener('pointerenter', () => setActiveSide(side));
    panel.addEventListener('pointerleave', () => clearActiveSide(side));
    panel.addEventListener('focusin', () => setActiveSide(side));
    panel.addEventListener('focusout', () => {
      window.requestAnimationFrame(() => clearActiveSide(side));
    });
  });

  toggles.forEach((toggle) => {
    toggle.setAttribute('aria-pressed', 'false');

    toggle.addEventListener('click', () => {
      const nextSide = toggle.dataset.target;
      const shouldReset = activeSide === nextSide;
      setActiveSide(shouldReset ? '' : nextSide);
    });

    toggle.addEventListener('focusin', () => {
      setActiveSide(toggle.dataset.target || '');
    });
  });

  document.addEventListener('pointerdown', (event) => {
    if (!hero.contains(event.target)) {
      setActiveSide('');
    }
  });
})();
