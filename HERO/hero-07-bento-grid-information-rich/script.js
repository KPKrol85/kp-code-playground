(() => {
  const hero = document.querySelector('.bento-hero');

  if (!hero) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const drawer = hero.querySelector('.bento-drawer');
  const openButtons = Array.from(hero.querySelectorAll('[data-open-drawer]'));
  const closeButtons = Array.from(hero.querySelectorAll('[data-close-drawer]'));
  const countTargets = Array.from(hero.querySelectorAll('[data-countup]'));
  const animatedTile = hero.querySelector('.bento-tile--metric');
  let lastTrigger = null;

  if (animatedTile && !prefersReducedMotion.matches) {
    animatedTile.dataset.animate = 'true';
  }

  const setDrawerState = (isOpen, trigger = null) => {
    if (!drawer) {
      return;
    }

    drawer.setAttribute('aria-hidden', String(!isOpen));
    openButtons.forEach((button) => {
      button.setAttribute('aria-expanded', String(isOpen));
    });

    if (isOpen) {
      lastTrigger = trigger;
      const closeButton = drawer.querySelector('.bento-drawer__close');
      window.requestAnimationFrame(() => closeButton?.focus());
      return;
    }

    if (lastTrigger instanceof HTMLElement) {
      lastTrigger.focus();
    }
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setDrawerState(true, button);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setDrawerState(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer?.getAttribute('aria-hidden') === 'false') {
      setDrawerState(false);
    }
  });

  if (countTargets.length && 'IntersectionObserver' in window) {
    const animateValue = (element) => {
      if (element.dataset.counted === 'true') {
        return;
      }

      const target = Number(element.dataset.countTo || 0);
      const suffix = element.dataset.countSuffix || '';
      const duration = prefersReducedMotion.matches ? 0 : 1200;

      if (!target || duration === 0) {
        element.textContent = `${target}${suffix}`;
        element.dataset.counted = 'true';
        return;
      }

      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = `${value}${suffix}`;

        if (progress < 1) {
          window.requestAnimationFrame(tick);
          return;
        }

        element.dataset.counted = 'true';
      };

      window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateValue(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    countTargets.forEach((item) => observer.observe(item));
  }
})();
