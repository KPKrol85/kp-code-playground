(() => {
  const root = document.querySelector('.gis-featured-cards');
  if (!root) return;

  const cards = Array.from(root.querySelectorAll('.gis-card'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let sectionVisible = false;

  const setIdleState = (active) => {
    cards.forEach((card, index) => {
      const shouldIdle = active && !prefersReducedMotion.matches;
      card.classList.toggle('is-idle', shouldIdle);
      if (shouldIdle) {
        card.style.setProperty('--gis-idle-delay', `${index * 120}ms`);
      } else {
        card.style.removeProperty('--gis-idle-delay');
      }
    });
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  const idleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        sectionVisible = entry.isIntersecting;
        setIdleState(sectionVisible);
      });
    },
    {
      threshold: 0.35,
    }
  );

  cards.forEach((card) => revealObserver.observe(card));
  idleObserver.observe(root);

  const syncMotionPreference = () => setIdleState(sectionVisible);
  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', syncMotionPreference);
  } else if (typeof prefersReducedMotion.addListener === 'function') {
    prefersReducedMotion.addListener(syncMotionPreference);
  }
})();
