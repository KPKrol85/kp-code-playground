export const initTabs = () => {
  const tabLists = document.querySelectorAll('[data-tabs]');
  if (!tabLists.length) return;

  tabLists.forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = document.querySelectorAll(`[data-tab-panel="${tabList.dataset.tabs}"]`);

    if (!tabs.length) return;

    const activateTab = (nextTab, shouldFocus = false) => {
      tabs.forEach((tab) => {
        const isActive = tab === nextTab;
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach((panel) => panel.classList.remove('tabs__panel--active'));

      const targetPanelId = nextTab.getAttribute('aria-controls');
      const targetPanel = targetPanelId ? document.getElementById(targetPanelId) : null;
      if (targetPanel) {
        targetPanel.classList.add('tabs__panel--active');
      }

      if (shouldFocus) {
        nextTab.focus();
      }
    };

    const initialActiveTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    activateTab(initialActiveTab);

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        activateTab(tab);
      });

      tab.addEventListener('keydown', (event) => {
        const { key } = event;
        const lastIndex = tabs.length - 1;
        let targetIndex = null;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
          targetIndex = index === lastIndex ? 0 : index + 1;
        } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
          targetIndex = index === 0 ? lastIndex : index - 1;
        } else if (key === 'Home') {
          targetIndex = 0;
        } else if (key === 'End') {
          targetIndex = lastIndex;
        }

        if (targetIndex === null) return;

        event.preventDefault();
        activateTab(tabs[targetIndex], true);
      });
    });
  });
};
