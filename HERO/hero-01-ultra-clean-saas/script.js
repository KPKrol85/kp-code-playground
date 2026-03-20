(() => {
  const hero = document.querySelector('[data-hero]');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const primaryCta = document.querySelector('[data-primary-cta]');
  const mockup = document.querySelector('[data-mockup]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!hero) {
    return;
  }

  revealItems.forEach((item, index) => {
    item.style.setProperty('--reveal-index', index.toString());
  });

  const showHero = () => {
    hero.classList.add('is-visible');
    revealItems.forEach((item) => item.classList.add('is-visible'));
  };

  if (reduceMotion.matches) {
    showHero();
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          showHero();
          observerInstance.disconnect();
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(hero);
  } else {
    showHero();
  }

  if (primaryCta && mockup) {
    const activatePeek = () => mockup.classList.add('is-cta-active');
    const deactivatePeek = () => mockup.classList.remove('is-cta-active');

    ['mouseenter', 'focus'].forEach((eventName) => {
      primaryCta.addEventListener(eventName, activatePeek);
    });

    ['mouseleave', 'blur'].forEach((eventName) => {
      primaryCta.addEventListener(eventName, deactivatePeek);
    });
  }

  if (mockup && !reduceMotion.matches && window.matchMedia('(pointer: fine)').matches) {
    mockup.dataset.parallaxReady = 'true';

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    let frameId = null;

    const updateParallax = (event) => {
      const rect = mockup.getBoundingClientRect();
      const relativeY = (event.clientY - rect.top) / rect.height;
      const offset = clamp((relativeY - 0.5) * 18, -8, 8);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        mockup.style.setProperty('--parallax-offset', `${offset.toFixed(2)}px`);
        frameId = null;
      });
    };

    const resetParallax = () => {
      mockup.style.setProperty('--parallax-offset', '0px');
    };

    mockup.addEventListener('pointermove', updateParallax, { passive: true });
    mockup.addEventListener('pointerleave', resetParallax);
  }
})();
