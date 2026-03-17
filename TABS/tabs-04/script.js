(function initSoftTabs() {
  const root = document.querySelector('[data-soft-tabs]');
  if (!root) return;

  const tabList = root.querySelector('[role="tablist"]');
  const tabs = Array.from(root.querySelectorAll('[data-tab-trigger]'));
  const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));

  if (!tabList || tabs.length === 0 || panels.length === 0) return;

  const activateTab = (nextTab, { focusPanel = false } = {}) => {
    tabs.forEach((tab) => {
      const selected = tab === nextTab;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      const shouldShow = panel.id === nextTab.getAttribute('aria-controls');
      panel.classList.remove('is-entering');

      if (shouldShow) {
        panel.hidden = false;
        panel.removeAttribute('aria-hidden');
        requestAnimationFrame(() => panel.classList.add('is-entering'));
        if (focusPanel) panel.focus();
      } else {
        panel.hidden = true;
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  };

  const moveFocus = (currentIndex, direction) => {
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
  };

  tabList.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab-trigger]');
    if (!tab) return;
    activateTab(tab);
  });

  tabList.addEventListener('keydown', (event) => {
    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    if (currentIndex < 0) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        moveFocus(currentIndex, 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        moveFocus(currentIndex, -1);
        break;
      case 'Home':
        event.preventDefault();
        tabs[0].focus();
        break;
      case 'End':
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        activateTab(document.activeElement, { focusPanel: true });
        break;
      default:
        break;
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener('focus', () => {
      if (tab.getAttribute('aria-selected') === 'false') {
        activateTab(tab);
      }
    });
  });

  const initialTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
  activateTab(initialTab);
})();
