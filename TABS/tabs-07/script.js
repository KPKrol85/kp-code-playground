const root = document.querySelector('[data-component="split-hero-tabs"]');

if (root) {
  const tablist = root.querySelector('[role="tablist"]');
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
  const mediaMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setActiveTab = (targetTab, { moveFocus = false } = {}) => {
    const targetPanelId = targetTab.getAttribute('aria-controls');

    tabs.forEach((tab) => {
      const isActive = tab === targetTab;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === targetPanelId;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);

      if (isActive && !mediaMotionQuery.matches) {
        panel.animate(
          [
            { opacity: 0, transform: 'translateY(8px) scale(0.995)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          {
            duration: 360,
            easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
          }
        );
      }
    });

    if (moveFocus) {
      targetTab.focus();
    }
  };

  const getTabIndex = (tab) => tabs.indexOf(tab);

  const getNextTab = (currentTab, direction) => {
    const currentIndex = getTabIndex(currentTab);
    if (currentIndex === -1) return tabs[0];

    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    return tabs[nextIndex];
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setActiveTab(tab);
    });

    tab.addEventListener('keydown', (event) => {
      let nextTab = null;

      switch (event.key) {
        case 'ArrowRight':
          nextTab = getNextTab(tab, 1);
          break;
        case 'ArrowLeft':
          nextTab = getNextTab(tab, -1);
          break;
        case 'Home':
          nextTab = tabs[0];
          break;
        case 'End':
          nextTab = tabs[tabs.length - 1];
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          setActiveTab(tab);
          return;
        default:
          return;
      }

      event.preventDefault();
      if (nextTab) {
        nextTab.focus();
      }
    });
  });

  const syncFromMarkup = () => {
    const selectedTab =
      tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];

    setActiveTab(selectedTab);
  };

  const stage = root.querySelector('.hero-stage');

  const updatePointerGlow = (event) => {
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    stage.style.setProperty('--pointer-x', `${Math.min(Math.max(x, 0), 100)}%`);
    stage.style.setProperty('--pointer-y', `${Math.min(Math.max(y, 0), 100)}%`);
  };

  stage?.addEventListener('pointermove', (event) => {
    if (mediaMotionQuery.matches) return;
    updatePointerGlow(event);
  });

  window.addEventListener('resize', () => {
    const selectedTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  });

  syncFromMarkup();
}
