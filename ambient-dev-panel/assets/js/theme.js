import storage from './storage.js';

const STORAGE_KEY = 'ambient-dev-panel:theme';

export function createThemeController({ root, toggleButton }) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const saved = storage.get(STORAGE_KEY, null);

  let theme = saved || (media.matches ? 'dark' : 'light');

  const apply = () => {
    if (theme === 'dark') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    toggleButton.textContent = `Theme: ${theme}`;
    storage.set(STORAGE_KEY, theme);
  };

  const toggle = () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    apply();
  };

  media.addEventListener('change', (event) => {
    if (storage.get(STORAGE_KEY, null)) return;
    theme = event.matches ? 'dark' : 'light';
    apply();
  });

  apply();

  return { toggle };
}
