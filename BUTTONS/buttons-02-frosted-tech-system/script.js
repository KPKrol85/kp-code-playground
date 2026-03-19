const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const toast = document.querySelector('[data-toast]');
const copyButtons = document.querySelectorAll('[data-copy]');
const loadingButton = document.querySelector('[data-loading-button]');
const segmentButtons = document.querySelectorAll('.segment-control__button');

let toastTimeout;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1800);
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

    const label = themeToggle.querySelector('.mode-switch__label');
    if (label) {
      label.textContent = isDark ? 'Dark mode' : 'Light mode';
    }
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Theme switched to ${nextTheme} mode`);
  });
}

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.dataset.copy;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
      showToast(`${text} copied`);
    } catch {
      showToast(`Label ready: ${text}`);
    }
  });
});

if (loadingButton) {
  loadingButton.addEventListener('click', () => {
    if (loadingButton.getAttribute('aria-busy') === 'true') return;

    const label = loadingButton.querySelector('.button__label');
    loadingButton.setAttribute('aria-busy', 'true');
    loadingButton.disabled = true;

    if (label) {
      label.textContent = 'Syncing…';
    }

    window.setTimeout(() => {
      loadingButton.removeAttribute('aria-busy');
      loadingButton.disabled = false;
      if (label) {
        label.textContent = 'Sync dataset';
      }
      showToast('Dataset sync complete');
    }, 1800);
  });
}

segmentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    segmentButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    showToast(`${button.textContent.trim()} density selected`);
  });
});

applyTheme(root.dataset.theme || 'dark');
