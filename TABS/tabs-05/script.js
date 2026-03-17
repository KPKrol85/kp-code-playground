(() => {
  const root = document.querySelector('[data-sidebar-tabs]');
  if (!root) return;

  const tablist = root.querySelector('[data-tablist]');
  const indicator = root.querySelector('.tabs05__indicator');
  const tabs = Array.from(root.querySelectorAll('[data-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-panel]'));
  const desktopQuery = window.matchMedia('(min-width: 900px)');
  const panelTimers = new WeakMap();

  let activeTab = tabs.find((tab) => tab.classList.contains('is-active') && !tab.disabled) || tabs.find((tab) => !tab.disabled);

  function enabledTabs() {
    return tabs.filter((tab) => !tab.disabled && tab.getAttribute('aria-disabled') !== 'true');
  }

  function updateOrientation() {
    tablist.setAttribute('aria-orientation', desktopQuery.matches ? 'vertical' : 'horizontal');
  }

  function updateIndicator(tab) {
    if (!tab || !indicator || !tablist) return;

    const listRect = tablist.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    if (desktopQuery.matches) {
      indicator.style.height = `${tabRect.height}px`;
      indicator.style.width = '4px';
      indicator.style.transform = `translateY(${tabRect.top - listRect.top}px)`;
      return;
    }

    indicator.style.width = `${tabRect.width}px`;
    indicator.style.height = '3px';
    indicator.style.transform = `translateX(${tabRect.left - listRect.left}px)`;
  }

  function setPanelState(nextTab) {
    const nextPanelId = nextTab.getAttribute('aria-controls');

    panels.forEach((panel) => {
      const timer = panelTimers.get(panel);
      if (timer) {
        window.clearTimeout(timer);
        panelTimers.delete(panel);
      }

      const isTarget = panel.id === nextPanelId;

      if (isTarget) {
        panel.hidden = false;
        window.requestAnimationFrame(() => {
          panel.classList.add('is-active');
        });
      } else {
        panel.classList.remove('is-active');
        const hideTimer = window.setTimeout(() => {
          panel.hidden = true;
          panelTimers.delete(panel);
        }, 220);
        panelTimers.set(panel, hideTimer);
      }
    });
  }

  function activateTab(nextTab, { setFocus = false } = {}) {
    if (!nextTab || nextTab.disabled || nextTab.getAttribute('aria-disabled') === 'true') return;

    tabs.forEach((tab) => {
      const isActive = tab === nextTab;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    activeTab = nextTab;
    setPanelState(nextTab);
    updateIndicator(nextTab);

    if (setFocus) nextTab.focus();
  }

  function moveByKey(currentTab, key) {
    const candidates = enabledTabs();
    const currentIndex = candidates.indexOf(currentTab);
    if (currentIndex < 0) return null;

    const horizontal = !desktopQuery.matches;

    const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = horizontal ? 'ArrowLeft' : 'ArrowUp';

    if (key === nextKey) {
      return candidates[(currentIndex + 1) % candidates.length];
    }
    if (key === prevKey) {
      return candidates[(currentIndex - 1 + candidates.length) % candidates.length];
    }
    if (key === 'Home') {
      return candidates[0];
    }
    if (key === 'End') {
      return candidates[candidates.length - 1];
    }

    return null;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateTab(tab, { setFocus: false });
    });

    tab.addEventListener('keydown', (event) => {
      const destination = moveByKey(tab, event.key);
      if (destination) {
        event.preventDefault();
        activateTab(destination, { setFocus: true });
        return;
      }

      if ((event.key === 'Enter' || event.key === ' ') && !tab.disabled) {
        event.preventDefault();
        activateTab(tab, { setFocus: true });
      }
    });
  });

  const sync = () => {
    updateOrientation();
    if (!activeTab) return;
    activateTab(activeTab);
    root.classList.add('is-ready');
  };

  const resyncIndicator = () => {
    window.requestAnimationFrame(() => updateIndicator(activeTab));
  };

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', sync);
  } else {
    desktopQuery.addListener(sync);
  }

  window.addEventListener('resize', resyncIndicator);
  window.addEventListener('load', sync);
  document.addEventListener('DOMContentLoaded', sync);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(resyncIndicator);
  }

  sync();
})();
