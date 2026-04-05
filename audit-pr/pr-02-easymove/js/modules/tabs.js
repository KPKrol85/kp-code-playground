export const initTabs = () => {
  const tabLists = document.querySelectorAll('[data-tabs]');
  if (!tabLists.length) return;

  tabLists.forEach((tabList) => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll(`[data-tab-panel="${tabList.dataset.tabs}"]`);

    const setActiveTab = (activeTab) => {
      tabs.forEach((tab) => {
        const isActive = tab === activeTab;

        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach((panel) => {
        const isActivePanel = panel.id && activeTab.getAttribute('aria-controls') === panel.id;

        panel.classList.toggle('tabs__panel--active', isActivePanel);
        panel.setAttribute('aria-hidden', isActivePanel ? 'false' : 'true');
        panel.toggleAttribute('hidden', !isActivePanel);
      });
    };

    const initialActiveTab = Array.from(tabs).find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (!initialActiveTab) return;

    setActiveTab(initialActiveTab);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        setActiveTab(tab);
      });
    });
  });
};
