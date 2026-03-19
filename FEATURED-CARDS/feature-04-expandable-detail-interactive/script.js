(() => {
  const roots = document.querySelectorAll('[data-fdc-root]');

  if (!roots.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const CLOSE_DELAY = prefersReducedMotion.matches ? 0 : 280;

  roots.forEach((root, rootIndex) => {
    const cards = [...root.querySelectorAll('[data-fdc-card]')];
    const singleMode = (root.dataset.fdcAccordion || 'single') !== 'multi';
    let openCard = null;

    cards.forEach((card, cardIndex) => {
      const button = card.querySelector('[data-fdc-toggle]');
      const buttonLabel = button?.querySelector('.fdc-toggle__label');
      const panel = card.querySelector('[data-fdc-panel]');
      const title = card.querySelector('.fdc-card__title');
      let hideTimer = null;

      if (!button || !buttonLabel || !panel || !title) {
        return;
      }

      const rootToken = root.id || `fdc-root-${rootIndex}`;
      const panelId = `${rootToken}-panel-${cardIndex}`;
      const buttonId = `${rootToken}-toggle-${cardIndex}`;
      const labelId = `${rootToken}-title-${cardIndex}`;

      title.id = title.id || labelId;
      button.id = button.id || buttonId;
      panel.id = panel.id || panelId;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', title.id);
      button.setAttribute('aria-controls', panel.id);
      button.setAttribute('aria-expanded', 'false');

      const setOpen = (shouldOpen, { moveFocus = false } = {}) => {
        if (hideTimer) {
          window.clearTimeout(hideTimer);
          hideTimer = null;
        }

        if (shouldOpen) {
          panel.hidden = false;
        }

        card.classList.toggle('is-open', shouldOpen);
        button.setAttribute('aria-expanded', String(shouldOpen));
        buttonLabel.textContent = shouldOpen ? 'Hide detail' : 'View detail';

        if (shouldOpen) {
          openCard = card;
          queueVisibility(card);

          if (moveFocus) {
            button.focus({ preventScroll: true });
          }

          return;
        }

        hideTimer = window.setTimeout(() => {
          if (!card.classList.contains('is-open')) {
            panel.hidden = true;
          }
        }, CLOSE_DELAY);

        if (openCard === card) {
          openCard = null;
        }

        if (moveFocus) {
          button.focus({ preventScroll: true });
        }
      };

      button.addEventListener('click', () => {
        const isOpen = card.classList.contains('is-open');

        if (singleMode) {
          cards.forEach((sibling) => {
            if (sibling !== card) {
              closeCard(sibling);
            }
          });
        }

        setOpen(!isOpen);
      });

      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !card.classList.contains('is-open')) {
          return;
        }

        event.stopPropagation();
        setOpen(false, { moveFocus: true });
      });

      card.__fdcSetOpen = setOpen;
    });

    function closeCard(card, options) {
      if (!card || typeof card.__fdcSetOpen !== 'function') {
        return;
      }

      card.__fdcSetOpen(false, options);
    }

    function queueVisibility(card) {
      if (prefersReducedMotion.matches) {
        return;
      }

      const panel = card.querySelector('[data-fdc-panel]');
      if (!panel) {
        return;
      }

      window.requestAnimationFrame(() => {
        const rect = panel.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const overflow = rect.bottom - viewportHeight;

        if (overflow > 48) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    root.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !openCard) {
        return;
      }

      event.preventDefault();
      const currentCard = openCard;
      closeCard(currentCard, { moveFocus: true });
    });
  });
})();
