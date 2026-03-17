(() => {
  const root = document.querySelector('[data-ai-command-tabs]');
  if (!root) return;

  const bar = root.querySelector('[data-command-bar]');
  const tablist = root.querySelector('[data-tablist]');
  const tabs = Array.from(root.querySelectorAll('[data-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-panel]'));
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const panelTimers = new WeakMap();

  let activeTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];

  function clearPanelTimer(panel) {
    const timer = panelTimers.get(panel);
    if (timer) {
      window.clearTimeout(timer);
      panelTimers.delete(panel);
    }
  }

  function setPanelState(tab) {
    const targetId = tab.getAttribute('aria-controls');
    const shouldAnimate = !reduceMotionQuery.matches;

    panels.forEach((panel) => {
      clearPanelTimer(panel);
      const isTarget = panel.id === targetId;

      if (isTarget) {
        panel.hidden = false;
        if (shouldAnimate) {
          window.requestAnimationFrame(() => panel.classList.add('is-active'));
        } else {
          panel.classList.add('is-active');
        }
      } else {
        panel.classList.remove('is-active');
        if (!shouldAnimate) {
          panel.hidden = true;
          return;
        }
        const timer = window.setTimeout(() => {
          panel.hidden = true;
          panelTimers.delete(panel);
        }, 250);
        panelTimers.set(panel, timer);
      }
    });
  }

  function activateTab(nextTab, { setFocus = false } = {}) {
    if (!nextTab) return;

    tabs.forEach((tab) => {
      const isActive = tab === nextTab;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    activeTab = nextTab;
    setPanelState(nextTab);

    if (setFocus) nextTab.focus();
  }

  function moveFocusByKey(currentTab, key) {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < 0) return null;

    if (key === 'ArrowRight') return tabs[(currentIndex + 1) % tabs.length];
    if (key === 'ArrowLeft') return tabs[(currentIndex - 1 + tabs.length) % tabs.length];
    if (key === 'Home') return tabs[0];
    if (key === 'End') return tabs[tabs.length - 1];

    return null;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', (event) => {
      const nextTab = moveFocusByKey(tab, event.key);
      if (nextTab) {
        event.preventDefault();
        activateTab(nextTab, { setFocus: true });
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateTab(tab, { setFocus: true });
      }
    });
  });

  function syncFromMarkup() {
    if (!activeTab) return;
    activateTab(activeTab);
    root.classList.add('is-ready');
  }

  function handlePointerMove(event) {
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    bar.style.setProperty('--mx', `${x.toFixed(2)}%`);
    bar.style.setProperty('--my', `${y.toFixed(2)}%`);
  }

  if (bar) {
    bar.addEventListener('pointerenter', () => bar.classList.add('is-reactive'));
    bar.addEventListener('pointermove', handlePointerMove);
    bar.addEventListener('pointerleave', () => bar.classList.remove('is-reactive'));
  }

  if (reduceMotionQuery.addEventListener) {
    reduceMotionQuery.addEventListener('change', syncFromMarkup);
  } else {
    reduceMotionQuery.addListener(syncFromMarkup);
  }

  window.addEventListener('resize', () => {
    if (!tablist || !activeTab) return;
    tablist.scrollTo({ left: Math.max(activeTab.offsetLeft - 24, 0), behavior: 'auto' });
  });

  syncFromMarkup();
})();
