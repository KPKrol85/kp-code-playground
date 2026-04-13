export const initReveal = () => {
  const revealRoots = document.querySelectorAll('[data-reveal]');
  if (!revealRoots.length) return;

  const revealTargets = [];

  revealRoots.forEach((root) => {
    const childSelector = root.dataset.revealChildren;
    const staggerStep = Number.parseInt(root.dataset.revealStagger || '', 10);
    const childTargets = childSelector
      ? Array.from(root.querySelectorAll(childSelector))
      : [];
    const targets = childTargets.length ? childTargets : [root];

    targets.forEach((target, index) => {
      if (target.classList.contains('reveal')) return;

      target.classList.add('reveal');

      if (!Number.isNaN(staggerStep) && staggerStep > 0 && targets.length > 1) {
        target.style.setProperty('--reveal-delay', `${index * staggerStep}ms`);
      }

      revealTargets.push(target);
    });
  });

  if (!revealTargets.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => {
      target.style.removeProperty('--reveal-delay');
      target.classList.add('reveal--visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('reveal--visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });

  revealTargets.forEach((target) => observer.observe(target));
};
