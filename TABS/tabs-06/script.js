(() => {
  const root = document.querySelector('[data-tabs-root]');
  if (!root) return;

  const tablist = root.querySelector('[data-tablist]');
  const navWrap = root.querySelector('[data-nav-wrap]');
  const tabs = Array.from(root.querySelectorAll('[data-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-panel]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true')
  );

  const syncSpotlight = (tab) => {
    if (!tab || !navWrap) return;
    const tabRect = tab.getBoundingClientRect();
    const wrapRect = navWrap.getBoundingClientRect();
    const x = tabRect.left - wrapRect.left + navWrap.scrollLeft;

    navWrap.style.setProperty('--tab-x', `${x}px`);
    navWrap.style.setProperty('--tab-w', `${tabRect.width}px`);
  };

  const activateTab = (nextIndex, { focusTab = true } = {}) => {
    if (nextIndex < 0 || nextIndex >= tabs.length) return;

    activeIndex = nextIndex;

    tabs.forEach((tab, index) => {
      const isActive = index === activeIndex;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && focusTab) {
        tab.focus({ preventScroll: true });
      }
    });

    panels.forEach((panel) => {
      panel.hidden = panel.getAttribute('aria-labelledby') !== tabs[activeIndex].id;
    });

    tabs[activeIndex].scrollIntoView({
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });

    syncSpotlight(tabs[activeIndex]);
  };

  tablist?.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab]');
    if (!tab) return;
    activateTab(tabs.indexOf(tab), { focusTab: false });
  });

  tablist?.addEventListener('keydown', (event) => {
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let targetIndex = null;

    if (event.key === 'ArrowRight') targetIndex = (currentIndex + 1) % tabs.length;
    if (event.key === 'ArrowLeft') targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') targetIndex = 0;
    if (event.key === 'End') targetIndex = tabs.length - 1;

    if (targetIndex !== null) {
      event.preventDefault();
      tabs[targetIndex].focus();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateTab(currentIndex, { focusTab: false });
    }
  });

  navWrap?.addEventListener('pointermove', (event) => {
    const rect = navWrap.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    root.style.setProperty('--pointer-x', `${x.toFixed(2)}%`);
    root.style.setProperty('--pointer-y', `${y.toFixed(2)}%`);
  });

  navWrap?.addEventListener('pointerleave', () => {
    root.style.setProperty('--pointer-x', '50%');
    root.style.setProperty('--pointer-y', '0%');
  });

  window.addEventListener('resize', () => syncSpotlight(tabs[activeIndex]));
  navWrap?.addEventListener('scroll', () => syncSpotlight(tabs[activeIndex]), { passive: true });

  activateTab(activeIndex, { focusTab: false });
})();
