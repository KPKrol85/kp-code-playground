(function initFloatingCardAccordion() {
  const accordion = document.querySelector('[data-accordion]');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
  const triggers = items.map((item) => item.querySelector('.fc-item__trigger')).filter(Boolean);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const comfortableOffset = 24;

  const syncDimming = () => {
    const hasOpenItem = items.some((item) => item.classList.contains('is-open'));
    accordion.classList.toggle('is-dimmed', hasOpenItem);
  };

  const setItemState = (item, expand) => {
    const trigger = item.querySelector('.fc-item__trigger');
    const panel = item.querySelector('.fc-item__panel');
    if (!trigger || !panel) return;

    trigger.setAttribute('aria-expanded', String(expand));
    item.classList.toggle('is-open', expand);

    if (expand) {
      panel.removeAttribute('hidden');
    } else {
      const delay = reduceMotion ? 0 : 290;
      window.setTimeout(() => {
        if (!item.classList.contains('is-open')) {
          panel.setAttribute('hidden', '');
        }
      }, delay);
    }
  };

  const openItem = (nextItem, shouldScroll) => {
    items.forEach((item) => setItemState(item, item === nextItem));
    syncDimming();

    if (!shouldScroll) return;

    const trigger = nextItem.querySelector('.fc-item__trigger');
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const topThreshold = 12;
    const lowerThreshold = window.innerHeight * 0.32;
    const isComfortable = rect.top >= topThreshold && rect.top <= lowerThreshold;

    if (!isComfortable) {
      const absoluteTop = window.scrollY + rect.top;
      window.scrollTo({
        top: Math.max(absoluteTop - comfortableOffset, 0),
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    }
  };

  const closeItem = (item) => {
    setItemState(item, false);
    syncDimming();
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      const item = items[index];
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeItem(item);
        return;
      }
      openItem(item, true);
    });

    trigger.addEventListener('keydown', (event) => {
      const currentIndex = triggers.indexOf(trigger);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        triggers[(currentIndex + 1) % triggers.length].focus();
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        triggers[(currentIndex - 1 + triggers.length) % triggers.length].focus();
        return;
      }

      if (event.key === 'Escape') {
        const item = items[currentIndex];
        if (item.classList.contains('is-open')) {
          event.preventDefault();
          closeItem(item);
        }
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        trigger.click();
      }
    });
  });

  const firstOpenItem = items.find((item) => item.classList.contains('is-open'));
  if (!firstOpenItem && items[0]) {
    setItemState(items[0], true);
  }
  syncDimming();
})();
