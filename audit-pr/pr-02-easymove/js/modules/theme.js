const STORAGE_KEY = 'easy-move-theme-v1';

const getStoredTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    if (parsed?.version === 1 && (parsed.theme === 'light' || parsed.theme === 'dark')) {
      return parsed.theme;
    }
  } catch {
    return null;
  }

  return null;
};

const applyTheme = (root, theme) => {
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
    return;
  }

  root.removeAttribute('data-theme');
};

const setToggleState = (themeToggle, theme) => {
  if (!themeToggle) return;

  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));

  const label = themeToggle.querySelector('span');
  if (label) {
    label.textContent = theme === 'dark' ? 'Tryb jasny' : 'Tryb ciemny';
  }
};

export const initTheme = () => {
  const root = document.documentElement;
  root.classList.add('js-enabled');

  const themeToggle = document.querySelector('[data-theme-toggle]');
  const storedTheme = getStoredTheme();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme ?? (prefersDark ? 'dark' : 'light');

  applyTheme(root, initialTheme);
  setToggleState(themeToggle, initialTheme);

  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    applyTheme(root, next);
    setToggleState(themeToggle, next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, theme: next }));
  });
};
