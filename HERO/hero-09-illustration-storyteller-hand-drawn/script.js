(() => {
  const hero = document.querySelector('[data-hero]');
  const stage = document.querySelector('[data-stage]');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const primaryCta = document.querySelector('[data-primary-cta]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');

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
        threshold: 0.28,
      }
    );

    observer.observe(hero);
  } else {
    showHero();
  }

  if (primaryCta && stage && !reduceMotion.matches) {
    const setActive = () => {
      stage.dataset.ctaActive = 'true';
    };

    const clearActive = () => {
      stage.dataset.ctaActive = 'false';
    };

    ['mouseenter', 'focus'].forEach((eventName) => {
      primaryCta.addEventListener(eventName, setActive);
    });

    ['mouseleave', 'blur'].forEach((eventName) => {
      primaryCta.addEventListener(eventName, clearActive);
    });
  }

  if (!stage || reduceMotion.matches || !finePointer.matches) {
    return;
  }

  stage.dataset.parallaxReady = 'true';

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  let frameId = null;

  const updateParallax = (event) => {
    const rect = stage.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const translateY = clamp((relativeY - 0.5) * -12, -6, 6);
    const rotate = clamp((relativeX - 0.5) * 4, -2, 2);

    if (frameId) {
      cancelAnimationFrame(frameId);
    }

    frameId = window.requestAnimationFrame(() => {
      stage.style.setProperty('--parallax-y', `${translateY.toFixed(2)}px`);
      stage.style.setProperty('--parallax-rotate', `${rotate.toFixed(2)}deg`);
      frameId = null;
    });
  };

  const resetParallax = () => {
    stage.style.setProperty('--parallax-y', '0px');
    stage.style.setProperty('--parallax-rotate', '0deg');
  };

  stage.addEventListener('pointermove', updateParallax, { passive: true });
  stage.addEventListener('pointerleave', resetParallax);
})();
