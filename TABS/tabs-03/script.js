(() => {
  const root = document.querySelector('[data-tabs]');
  if (!root) return;

  const track = root.querySelector('.tabs__track');
  const glider = root.querySelector('.tabs__glider');
  const tabs = Array.from(root.querySelectorAll('[data-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-panel]'));

  let activeTab = tabs.find((tab) => tab.classList.contains('is-active')) || tabs[0];

  function updateGlider(tab) {
    if (!tab || !glider || !track) return;

    const trackRect = track.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    const offsetX = tabRect.left - trackRect.left;
    glider.style.width = `${tabRect.width}px`;
    glider.style.transform = `translateX(${offsetX}px)`;
  }

  function setPanelState(nextTab) {
    const nextPanelId = nextTab.getAttribute('aria-controls');

    panels.forEach((panel) => {
      const isTarget = panel.id === nextPanelId;
      panel.hidden = !isTarget;
      panel.classList.toggle('is-active', isTarget);
    });
  }

  function activateTab(nextTab, { setFocus = false } = {}) {
    if (!nextTab || nextTab === activeTab) {
      updateGlider(activeTab);
      return;
    }

    tabs.forEach((tab) => {
      const isActive = tab === nextTab;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    activeTab = nextTab;
    setPanelState(nextTab);
    updateGlider(nextTab);

    if (setFocus) nextTab.focus();
  }

  function getTabByDirection(currentTab, key) {
    const index = tabs.indexOf(currentTab);
    if (index < 0) return null;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      return tabs[(index + 1) % tabs.length];
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      return tabs[(index - 1 + tabs.length) % tabs.length];
    }
    if (key === 'Home') {
      return tabs[0];
    }
    if (key === 'End') {
      return tabs[tabs.length - 1];
    }

    return null;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', (event) => {
      const directionalTab = getTabByDirection(tab, event.key);
      if (directionalTab) {
        event.preventDefault();
        activateTab(directionalTab, { setFocus: true });
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateTab(tab);
      }
    });

    tab.addEventListener('pointerdown', () => {
      track.dataset.pressing = 'true';
    });
  });

  ['pointerup', 'pointercancel', 'lostpointercapture', 'pointerleave'].forEach((type) => {
    track.addEventListener(type, () => {
      delete track.dataset.pressing;
    });
  });

  const sync = () => {
    updateGlider(activeTab);
    setPanelState(activeTab);
  };

  document.addEventListener('DOMContentLoaded', sync);
  window.addEventListener('load', sync);
  window.addEventListener('resize', () => {
    window.requestAnimationFrame(() => updateGlider(activeTab));
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      window.requestAnimationFrame(() => updateGlider(activeTab));
    });
  }

  sync();
})();
