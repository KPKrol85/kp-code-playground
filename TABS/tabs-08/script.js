(() => {
  const root = document.querySelector('[data-component="split-hero-tabs"]');
  if (!root) return;

  const tablist = root.querySelector('[role="tablist"]');
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  const setActiveTab = (nextTab, { focus = true } = {}) => {
    tabs.forEach((tab) => {
      const isSelected = tab === nextTab;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      tab.classList.toggle('is-active', isSelected);
    });

    panels.forEach((panel) => {
      const isTarget = panel.id === nextTab.getAttribute('aria-controls');
      panel.classList.toggle('is-active', isTarget);

      if (isTarget) {
        panel.hidden = false;
        panel.classList.add('is-entering');

        if (prefersReducedMotion) {
          panel.classList.remove('is-entering');
        } else {
          requestAnimationFrame(() => {
            panel.classList.remove('is-entering');
          });
        }
      } else {
        panel.hidden = true;
      }
    });

    if (focus) nextTab.focus();
  };

  const getTabByOffset = (currentIndex, offset) => {
    const count = tabs.length;
    return tabs[(currentIndex + offset + count) % count];
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setActiveTab(tab, { focus: false }));

    tab.addEventListener('keydown', (event) => {
      let targetTab = null;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        targetTab = getTabByOffset(index, 1);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        targetTab = getTabByOffset(index, -1);
      }

      if (event.key === 'Home') {
        targetTab = tabs[0];
      }

      if (event.key === 'End') {
        targetTab = tabs[tabs.length - 1];
      }

      if (targetTab) {
        event.preventDefault();
        setActiveTab(targetTab);
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActiveTab(tab);
      }
    });
  });

  const initialTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') ?? tabs[0];
  if (initialTab) setActiveTab(initialTab, { focus: false });

  tablist?.setAttribute('aria-orientation', window.matchMedia('(min-width: 64rem)').matches ? 'vertical' : 'horizontal');
})();
