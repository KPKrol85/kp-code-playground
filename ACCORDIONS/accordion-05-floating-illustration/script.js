(() => {
  const accordion = document.querySelector('[data-fi-accordion]');

  if (!accordion) {
    return;
  }

  const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
  const triggers = items.map((item) => item.querySelector('[data-accordion-trigger]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarsePointer = window.matchMedia('(pointer: coarse)');
  const animationWindow = 420;

  const setOpenItem = (nextItem) => {
    items.forEach((item) => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const panel = item.querySelector('[data-accordion-panel]');
      const isOpen = item === nextItem;

      item.classList.toggle('is-active', isOpen);
      item.classList.add('is-animating');
      trigger.setAttribute('aria-expanded', String(isOpen));
      panel.hidden = !isOpen;

      window.clearTimeout(item._animationTimer);
      item._animationTimer = window.setTimeout(() => {
        item.classList.remove('is-animating');
      }, reduceMotion.matches ? 1 : animationWindow);
    });
  };

  const syncInitialState = () => {
    const activeItem =
      items.find((item) => item.classList.contains('is-active')) ||
      items.find((item) => item.querySelector('[data-accordion-trigger]').getAttribute('aria-expanded') === 'true') ||
      items[0];

    setOpenItem(activeItem);
  };

  const moveFocus = (currentIndex, direction) => {
    const nextIndex = (currentIndex + direction + triggers.length) % triggers.length;
    triggers[nextIndex].focus();
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      setOpenItem(items[index]);
    });

    trigger.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          moveFocus(index, 1);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          moveFocus(index, -1);
          break;
        case 'Home':
          event.preventDefault();
          triggers[0].focus();
          break;
        case 'End':
          event.preventDefault();
          triggers[triggers.length - 1].focus();
          break;
        default:
          break;
      }
    });
  });

  const attachParallax = (item) => {
    const media = item.querySelector('[data-parallax-root]');

    if (!media || reduceMotion.matches || coarsePointer.matches) {
      return;
    }

    const reset = () => {
      media.style.setProperty('--parallax-x', '0px');
      media.style.setProperty('--parallax-y', '0px');
    };

    item.addEventListener('pointermove', (event) => {
      if (!item.classList.contains('is-active')) {
        reset();
        return;
      }

      const bounds = media.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
      media.style.setProperty('--parallax-x', `${x.toFixed(2)}px`);
      media.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
    });

    item.addEventListener('pointerleave', reset);
  };

  items.forEach(attachParallax);
  syncInitialState();
})();
