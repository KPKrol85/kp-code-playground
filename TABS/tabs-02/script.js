(function initGlassTabs() {
  const root = document.querySelector('[data-glass-tabs]');
  if (!root) return;

  const tablist = root.querySelector('[role="tablist"]');
  const tabs = Array.from(root.querySelectorAll('[data-tab-trigger]'));
  const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));

  if (!tablist || tabs.length === 0 || panels.length === 0) return;


  const setActiveTab = (nextTab, { focusPanel = false } = {}) => {
    tabs.forEach((tab) => {
      const isActive = tab === nextTab;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
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
        panel.setAttribute('aria-hidden', 'true');
        panel.hidden = true;
      }
    });
  };

  const moveFocus = (currentIndex, direction) => {
    const total = tabs.length;
    const nextIndex = (currentIndex + direction + total) % total;
    tabs[nextIndex].focus();
  };

  tablist.addEventListener('click', (event) => {
    const target = event.target.closest('[data-tab-trigger]');
    if (!target) return;
    setActiveTab(target);
  });

  tablist.addEventListener('keydown', (event) => {
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
        if (document.activeElement.matches('[data-tab-trigger]')) {
          setActiveTab(document.activeElement, { focusPanel: true });
        }
        break;
      default:
        break;
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener('focus', () => {
      if (tab.getAttribute('aria-selected') === 'false') {
        setActiveTab(tab);
      }
    });
  });

  const shell = root.querySelector('.tabs-shell');
  if (shell) {
    shell.addEventListener('pointermove', (event) => {
      const rect = shell.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      shell.style.setProperty('--pointer-x', `${x}px`);
      shell.style.setProperty('--pointer-y', `${y}px`);
      shell.classList.add('is-hovered');
    });

    shell.addEventListener('pointerleave', () => {
      shell.classList.remove('is-hovered');
    });
  }

  const selectedTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
  setActiveTab(selectedTab);
})();
