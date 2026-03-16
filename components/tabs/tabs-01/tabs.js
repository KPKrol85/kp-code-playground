(function initAdvancedTabs() {
  const tabsRoot = document.querySelector('[data-tabs]');

  if (!tabsRoot) {
    return;
  }

  const tabs = Array.from(tabsRoot.querySelectorAll('[data-tabs-tab]'));
  const panels = Array.from(tabsRoot.querySelectorAll('[data-tabs-panel]'));
  const indicator = tabsRoot.querySelector('[data-tabs-indicator]');
  const tabList = tabsRoot.querySelector('[data-tabs-list]');

  if (!tabs.length || !panels.length || !indicator || !tabList) {
    return;
  }

  const keyboardActions = {
    ArrowRight: 1,
    ArrowLeft: -1,
  };

  function getPanelForTab(tab) {
    const panelId = tab.getAttribute('aria-controls');
    return panelId ? tabsRoot.querySelector(`#${panelId}`) : null;
  }

  function setIndicator(tab) {
    const tabLeft = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;

    indicator.style.transform = `translateX(${tabLeft}px)`;
    indicator.style.width = `${tabWidth}px`;
  }

  function activateTab(nextTab, { moveFocus = true } = {}) {
    tabs.forEach((tab) => {
      const isSelected = tab === nextTab;

      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;

      const panel = getPanelForTab(tab);

      if (panel) {
        panel.hidden = !isSelected;
      }
    });

    setIndicator(nextTab);
    nextTab.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });

    if (moveFocus) {
      nextTab.focus();
    }
  }

  function handleTabClick(event) {
    const clickedTab = event.currentTarget;
    activateTab(clickedTab, { moveFocus: false });
  }

  function handleTabKeydown(event) {
    const currentIndex = tabs.indexOf(event.currentTarget);

    if (event.key in keyboardActions) {
      event.preventDefault();

      const step = keyboardActions[event.key];
      const nextIndex = (currentIndex + step + tabs.length) % tabs.length;
      activateTab(tabs[nextIndex]);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      activateTab(tabs[0]);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      activateTab(tabs[tabs.length - 1]);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', handleTabClick);
    tab.addEventListener('keydown', handleTabKeydown);
  });

  window.addEventListener('resize', () => {
    const activeTab = tabsRoot.querySelector('[data-tabs-tab][aria-selected="true"]');

    if (activeTab) {
      setIndicator(activeTab);
    }
  });

  const activeTab = tabsRoot.querySelector('[data-tabs-tab][aria-selected="true"]') || tabs[0];
  activateTab(activeTab, { moveFocus: false });
})();
