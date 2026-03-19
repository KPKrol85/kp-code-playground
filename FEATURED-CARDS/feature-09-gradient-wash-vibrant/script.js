(() => {
  const roots = document.querySelectorAll('[data-gwv-root]');

  if (!roots.length) {
    return;
  }

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const applyReducedMotionState = (root) => {
    root.dataset.motion = reducedMotionQuery.matches ? 'reduced' : 'full';
  };

  const createObserver = () => {
    if (!('IntersectionObserver' in window)) {
      return null;
    }

    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          const currentState = card.dataset.gwvState;

          const visible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
          card.dataset.gwvVisible = visible ? 'true' : 'false';

          if (visible) {
            card.dataset.gwvState = currentState === 'active' ? 'active' : 'in-view';
            return;
          }

          if (currentState !== 'active') {
            card.dataset.gwvState = 'idle';
          }
        });
      },
      {
        threshold: [0, 0.45, 0.72],
        rootMargin: '0px 0px -8% 0px',
      }
    );
  };

  const observer = createObserver();

  roots.forEach((root) => {
    applyReducedMotionState(root);

    const cards = root.querySelectorAll('[data-gwv-card]');

    cards.forEach((card) => {
      const link = card.querySelector('.gwv-card__link');

      if (!link) {
        return;
      }

      card.dataset.gwvState = 'idle';
      card.dataset.gwvVisible = 'false';

      if (observer) {
        observer.observe(card);
      } else {
        card.dataset.gwvState = 'in-view';
        card.dataset.gwvVisible = 'true';
      }

      const activate = () => {
        card.dataset.gwvState = 'active';
      };

      const deactivate = () => {
        if (card.matches(':hover') || card.matches(':focus-within')) {
          card.dataset.gwvState = 'active';
          return;
        }

        card.dataset.gwvState = card.dataset.gwvVisible === 'true' ? 'in-view' : 'idle';
      };

      card.addEventListener('pointerenter', activate);
      card.addEventListener('pointerleave', deactivate);
      card.addEventListener('focusin', activate);
      card.addEventListener('focusout', () => {
        window.setTimeout(() => {
          if (!card.matches(':focus-within')) {
            deactivate();
          }
        }, 0);
      });
    });
  });

  const handleMotionPreferenceChange = (event) => {
    roots.forEach((root) => {
      root.dataset.motion = event.matches ? 'reduced' : 'full';
    });
  };

  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);
  } else if (typeof reducedMotionQuery.addListener === 'function') {
    reducedMotionQuery.addListener(handleMotionPreferenceChange);
  }
})();
