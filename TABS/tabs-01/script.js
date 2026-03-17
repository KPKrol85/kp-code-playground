const tabsRoot = document.querySelector('[data-tabs-root]');

if (tabsRoot) {
  const tabsList = tabsRoot.querySelector('[data-tabs-list]');
  const indicator = tabsRoot.querySelector('[data-tabs-indicator]');
  const tabs = Array.from(tabsRoot.querySelectorAll('[data-tab]'));
  const panels = Array.from(tabsRoot.querySelectorAll('[data-panel]'));

  const setActivePanel = (activeTab) => {
    const targetPanelId = activeTab.getAttribute('aria-controls');

    tabs.forEach((tab) => {
      const isSelected = tab === activeTab;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isTarget = panel.id === targetPanelId;
      panel.hidden = !isTarget;

      if (isTarget) {
        // Restart animation for subtle transition on tab switch.
        panel.style.animation = 'none';
        void panel.offsetHeight;
        panel.style.animation = '';
      }
    });
  };

  const positionIndicator = (activeTab) => {
    if (!tabsList || !indicator || !activeTab) return;

    const tabRect = activeTab.getBoundingClientRect();
    const listRect = tabsList.getBoundingClientRect();

    const x = tabRect.left - listRect.left + tabsList.scrollLeft;
    indicator.style.transform = `translateX(${Math.round(x)}px)`;
    indicator.style.width = `${Math.round(tabRect.width)}px`;
    indicator.style.opacity = '1';
  };

  const activateTab = (nextTab, { setFocus = false } = {}) => {
    if (!nextTab) return;

    setActivePanel(nextTab);
    positionIndicator(nextTab);
    nextTab.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });

    if (setFocus) {
      nextTab.focus();
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', (event) => {
      const key = event.key;
      const currentIndex = index;
      let nextIndex = null;

      if (key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (key === 'Home') {
        nextIndex = 0;
      } else if (key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(tabs[nextIndex], { setFocus: true });
      }
    });
  });

  let resizeFrame = null;
  window.addEventListener('resize', () => {
    if (resizeFrame) cancelAnimationFrame(resizeFrame);

    resizeFrame = requestAnimationFrame(() => {
      const activeTab = tabsRoot.querySelector('[data-tab][aria-selected="true"]');
      positionIndicator(activeTab);
    });
  });

  tabsList?.addEventListener('scroll', () => {
    const activeTab = tabsRoot.querySelector('[data-tab][aria-selected="true"]');
    positionIndicator(activeTab);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const defaultActive = tabsRoot.querySelector('[data-tab][aria-selected="true"]') || tabs[0];
    activateTab(defaultActive);
  });
}
