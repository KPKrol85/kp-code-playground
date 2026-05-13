(() => {
  const footer = document.querySelector('[data-component="footer-dark-neon-system"]');
  if (!footer) return;

  const yearNode = footer.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const feedback = footer.querySelector('[data-feedback]');
  const motionToggle = footer.querySelector('[data-motion-toggle]');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const applyMotionState = (isPaused) => {
    footer.classList.toggle('ns-footer--motion-paused', isPaused);
    if (motionToggle) {
      motionToggle.setAttribute('aria-pressed', String(isPaused));
      motionToggle.textContent = isPaused ? 'Resume signal motion' : 'Pause signal motion';
    }
  };

  applyMotionState(prefersReducedMotion.matches);

  motionToggle?.addEventListener('click', () => {
    const paused = !footer.classList.contains('ns-footer--motion-paused');
    applyMotionState(paused);
  });

  const copyButton = footer.querySelector('[data-copy]');
  copyButton?.addEventListener('click', async () => {
    const copyValue = copyButton.getAttribute('data-copy');
    if (!copyValue) return;

    try {
      await navigator.clipboard.writeText(copyValue);
      if (feedback) feedback.textContent = 'Security contact copied to clipboard.';
    } catch {
      if (feedback) feedback.textContent = 'Copy unavailable. Use security@neonshield.io manually.';
    }
  });

  const groups = footer.querySelectorAll('.ns-footer__group');
  const mql = window.matchMedia('(min-width: 760px)');

  const syncDisclosure = () => {
    groups.forEach((group, index) => {
      const toggle = group.querySelector('.ns-footer__group-toggle');
      if (!toggle) return;

      if (mql.matches) {
        group.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.disabled = true;
      } else {
        toggle.disabled = false;
        const shouldOpen = index === 0;
        group.classList.toggle('is-open', shouldOpen);
        toggle.setAttribute('aria-expanded', String(shouldOpen));
      }
    });
  };

  syncDisclosure();
  mql.addEventListener('change', syncDisclosure);

  groups.forEach((group) => {
    const toggle = group.querySelector('.ns-footer__group-toggle');
    toggle?.addEventListener('click', () => {
      if (toggle.disabled) return;
      const next = toggle.getAttribute('aria-expanded') !== 'true';
      group.classList.toggle('is-open', next);
      toggle.setAttribute('aria-expanded', String(next));
    });
  });
})();
