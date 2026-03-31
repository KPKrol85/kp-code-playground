export const initTabs = () => {
  const tabLists = document.querySelectorAll('[data-tabs]');
  if (!tabLists.length) return;

  tabLists.forEach((tabList) => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll(`[data-tab-panel="${tabList.dataset.tabs}"]`);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((btn) => btn.setAttribute('aria-selected', 'false'));
        panels.forEach((panel) => panel.classList.remove('tabs__panel--active'));

        tab.setAttribute('aria-selected', 'true');

        const targetPanelId = tab.getAttribute('aria-controls');
        const targetPanel = targetPanelId ? document.getElementById(targetPanelId) : null;
        if (targetPanel) {
          targetPanel.classList.add('tabs__panel--active');
        }
      });
    });
  });
};
