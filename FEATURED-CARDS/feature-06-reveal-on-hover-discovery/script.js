(() => {
  const roots = document.querySelectorAll('[data-rohd-root]');

  if (!roots.length) {
    return;
  }

  const prefersCoarsePointer = window.matchMedia('(pointer: coarse)');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  roots.forEach((root, rootIndex) => {
    const cards = [...root.querySelectorAll('[data-rohd-card]')];

    cards.forEach((card, cardIndex) => {
      const toggle = card.querySelector('[data-rohd-toggle]');
      const title = card.querySelector('.rohd-card__title');
      const detail = card.querySelector('.rohd-card__detail');
      const cta = card.querySelector('.rohd-card__cta');
      const baseLabel = 'Reveal insight';
      const activeLabel = 'Hide insight';

      if (!toggle || !title || !detail || !cta) {
        return;
      }

      const rootToken = root.id || `rohd-root-${rootIndex}`;
      const titleId = title.id || `${rootToken}-title-${cardIndex}`;
      const detailId = detail.id || `${rootToken}-detail-${cardIndex}`;

      title.id = titleId;
      detail.id = detailId;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', detailId);
      toggle.setAttribute('aria-labelledby', titleId);
      toggle.setAttribute('aria-describedby', detailId);
      detail.setAttribute('aria-hidden', 'true');
      cta.setAttribute('tabindex', '-1');

      const setActive = (shouldActivate) => {
        card.classList.toggle('is-active', shouldActivate);
        toggle.setAttribute('aria-expanded', String(shouldActivate));
        toggle.querySelector('span').textContent = shouldActivate ? activeLabel : baseLabel;
        cta.setAttribute('tabindex', shouldActivate ? '0' : '-1');
        detail.setAttribute('aria-hidden', String(!shouldActivate));
      };

      const closeSiblings = () => {
        cards.forEach((sibling) => {
          if (sibling !== card) {
            sibling.classList.remove('is-active');
            const siblingToggle = sibling.querySelector('[data-rohd-toggle]');
            const siblingCta = sibling.querySelector('.rohd-card__cta');

            if (siblingToggle) {
              siblingToggle.setAttribute('aria-expanded', 'false');
              const siblingLabel = siblingToggle.querySelector('span');
              if (siblingLabel) {
                siblingLabel.textContent = baseLabel;
              }
            }

            if (siblingCta) {
              siblingCta.setAttribute('tabindex', '-1');
            }

            const siblingDetail = sibling.querySelector('.rohd-card__detail');
            if (siblingDetail) {
              siblingDetail.setAttribute('aria-hidden', 'true');
            }
          }
        });
      };

      toggle.addEventListener('click', () => {
        const nextState = !card.classList.contains('is-active');

        if (nextState) {
          closeSiblings();
        }

        setActive(nextState);
      });

      card.addEventListener('pointerenter', () => {
        if (prefersCoarsePointer.matches) {
          return;
        }

        setActive(true);
      });

      card.addEventListener('pointerleave', () => {
        if (prefersCoarsePointer.matches || card.matches(':focus-within')) {
          return;
        }

        setActive(false);
      });

      card.addEventListener('focusout', () => {
        window.setTimeout(() => {
          if (!card.matches(':focus-within') && !prefersCoarsePointer.matches) {
            setActive(false);
          }
        }, 0);
      });

      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') {
          return;
        }

        setActive(false);
        toggle.focus({ preventScroll: true });
      });
    });

    if (prefersCoarsePointer.matches) {
      root.addEventListener('click', (event) => {
        const target = event.target;
        const card = target.closest('[data-rohd-card]');

        if (!card) {
          cards.forEach((entry) => {
            entry.classList.remove('is-active');
            const entryToggle = entry.querySelector('[data-rohd-toggle]');
            const entryCta = entry.querySelector('.rohd-card__cta');

            if (entryToggle) {
              entryToggle.setAttribute('aria-expanded', 'false');
              const entryLabel = entryToggle.querySelector('span');
              if (entryLabel) {
                entryLabel.textContent = 'Reveal insight';
              }
            }

            if (entryCta) {
              entryCta.setAttribute('tabindex', '-1');
            }

            const entryDetail = entry.querySelector('.rohd-card__detail');
            if (entryDetail) {
              entryDetail.setAttribute('aria-hidden', 'true');
            }
          });
        }
      });
    }

    if (prefersReducedMotion.matches) {
      root.dataset.motion = 'reduced';
    }
  });
})();
