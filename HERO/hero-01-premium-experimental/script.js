(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && revealElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.revealIndex || 0);
          entry.target.style.transitionDelay = `${index * 70}ms`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el, index) => {
      el.dataset.revealIndex = String(index);
      observer.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  if (prefersReducedMotion) return;

  const parallaxItems = document.querySelectorAll('[data-parallax]');
  const hero = document.querySelector('.hero-premium');

  if (!hero || !parallaxItems.length) return;

  let rafId = 0;
  let pointerX = 0;
  let pointerY = 0;

  const applyParallax = () => {
    parallaxItems.forEach((item) => {
      const factor = Number(item.dataset.parallax || 0);
      const x = pointerX * factor;
      const y = pointerY * factor;
      item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    rafId = 0;
  };

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    pointerX = event.clientX - (rect.left + rect.width / 2);
    pointerY = event.clientY - (rect.top + rect.height / 2);

    if (!rafId) rafId = window.requestAnimationFrame(applyParallax);
  });

  hero.addEventListener('pointerleave', () => {
    pointerX = 0;
    pointerY = 0;
    if (!rafId) rafId = window.requestAnimationFrame(applyParallax);
  });
})();
