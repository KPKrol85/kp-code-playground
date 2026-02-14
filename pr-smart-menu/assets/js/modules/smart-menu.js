import { announce, setCurrentLink } from './a11y.js';
import { reorderItems, topFrequent } from './scoring.js';
import { getDefaultState, loadState, mergeItems, saveState } from './storage.js';
import { isValidSchema } from './schema.js';
import { createFrequentMarkup, readFileAsJson, renderExplain, renderFrequentList, renderMenuList } from './ui.js';
import { debounce, downloadJson, now } from './utils.js';

const defaults = {
  storageKey: 'smart-menu-data',
  mode: 'frequency-recency',
  pinnedItems: ['services'],
  threshold: 3,
  maxFrequent: 3,
  pinnedEnabled: true,
  homeId: 'home'
};

export const SmartMenu = {
  init(navElement, options = {}) {
    const config = { ...defaults, ...options };
    const menuList = navElement.querySelector('[data-smart-menu-list]');
    const liveRegion = navElement.querySelector('[data-live-region]');
    const explainList = navElement.querySelector('[data-explain-list]');
    const frequentSection = createFrequentMarkup(menuList);
    const frequentList = frequentSection.querySelector('[data-frequent-list]');

    const baseItems = Array.from(menuList.querySelectorAll('a[data-menu-id]')).map((link) => ({
      id: link.dataset.menuId,
      label: link.dataset.label || link.textContent.trim(),
      href: link.getAttribute('href')
    }));

    let state = loadState(config.storageKey);
    state.items = mergeItems(state.items, baseItems);
    state.settings.sortMode ||= config.mode;
    state.settings.maxFrequent ||= config.maxFrequent;
    state.settings.pinnedEnabled ??= config.pinnedEnabled;

    const controls = buildControls(navElement, state);

    const rerender = debounce((announceChange = false) => {
      const totalInteractions = state.items.reduce((sum, item) => sum + item.clickCount, 0);
      const sorted = reorderItems({
        baseItems,
        metrics: state.items,
        pinnedIds: config.pinnedItems,
        homeId: config.homeId,
        threshold: config.threshold,
        totalInteractions,
        mode: state.settings.sortMode,
        smartMode: state.settings.smartMode,
        pinnedEnabled: state.settings.pinnedEnabled
      }).map((item) => ({ ...item, isPinned: config.pinnedItems.includes(item.id) && state.settings.pinnedEnabled }));

      renderMenuList(menuList, sorted);
      setCurrentLink(menuList, window.location.pathname);

      const frequent = topFrequent({
        baseItems,
        metrics: state.items,
        maxFrequent: state.settings.maxFrequent,
        mode: state.settings.sortMode,
        homeId: config.homeId
      });
      renderFrequentList(frequentList, frequent);
      renderExplain(explainList, frequent);

      if (announceChange) {
        announce(liveRegion, 'Menu updated based on your activity.');
      }

      saveState(config.storageKey, state);
    }, 200);

    const trackClick = (menuId) => {
      const item = state.items.find((entry) => entry.id === menuId);
      if (!item) return;
      const timestamp = now();
      item.clickCount += 1;
      item.lastUsedAt = timestamp;
      item.firstUsedAt ??= timestamp;
      rerender(true);
    };

    navElement.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-menu-id]');
      if (!link) return;
      trackClick(link.dataset.menuId);
    });

    navElement.addEventListener('keydown', (event) => {
      const link = event.target.closest('a[data-menu-id]');
      if (!link) return;
      if (event.key === 'Enter' || event.key === ' ') {
        trackClick(link.dataset.menuId);
      }
    });

    controls.smartMode.addEventListener('change', () => {
      state.settings.smartMode = controls.smartMode.checked;
      rerender(false);
    });

    controls.sortMode.addEventListener('change', () => {
      state.settings.sortMode = controls.sortMode.value;
      rerender(true);
    });

    controls.maxFrequent.addEventListener('change', () => {
      state.settings.maxFrequent = Number(controls.maxFrequent.value);
      rerender(true);
    });

    controls.pinnedEnabled.addEventListener('change', () => {
      state.settings.pinnedEnabled = controls.pinnedEnabled.checked;
      rerender(true);
    });

    controls.resetButton.addEventListener('click', () => {
      if (!window.confirm('Reset all Smart Menu learning data?')) return;
      state = getDefaultState();
      state.items = mergeItems(state.items, baseItems);
      state.settings.sortMode = config.mode;
      state.settings.maxFrequent = config.maxFrequent;
      state.settings.pinnedEnabled = config.pinnedEnabled;
      controls.status.textContent = 'Learning data reset.';
      syncControls(state, controls);
      rerender(true);
    });

    controls.exportButton.addEventListener('click', () => {
      downloadJson('smart-menu-data.json', state);
      controls.status.textContent = 'Exported Smart Menu data.';
    });

    controls.importInput.addEventListener('change', async () => {
      const file = controls.importInput.files?.[0];
      if (!file) return;
      controls.status.textContent = '';
      try {
        const parsed = await readFileAsJson(file);
        if (!isValidSchema(parsed)) {
          controls.status.textContent = 'Import failed: invalid schema payload.';
          return;
        }
        state = parsed;
        state.items = mergeItems(state.items, baseItems);
        syncControls(state, controls);
        rerender(true);
        controls.status.textContent = 'Imported Smart Menu data.';
      } catch {
        controls.status.textContent = 'Import failed: file is not valid JSON.';
      } finally {
        controls.importInput.value = '';
      }
    });

    syncControls(state, controls);
    rerender(false);
  }
};

function buildControls(navElement, state) {
  return {
    smartMode: navElement.querySelector('[data-control-smart-mode]'),
    sortMode: navElement.querySelector('[data-control-sort-mode]'),
    maxFrequent: navElement.querySelector('[data-control-max-frequent]'),
    pinnedEnabled: navElement.querySelector('[data-control-pinned]'),
    resetButton: navElement.querySelector('[data-control-reset]'),
    exportButton: navElement.querySelector('[data-control-export]'),
    importInput: navElement.querySelector('[data-control-import]'),
    status: navElement.querySelector('[data-control-status]')
  };
}

function syncControls(state, controls) {
  controls.smartMode.checked = state.settings.smartMode;
  controls.sortMode.value = state.settings.sortMode;
  controls.maxFrequent.value = String(state.settings.maxFrequent);
  controls.pinnedEnabled.checked = state.settings.pinnedEnabled;
}
