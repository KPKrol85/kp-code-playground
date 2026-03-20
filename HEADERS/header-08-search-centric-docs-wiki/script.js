const root = document.documentElement;
const body = document.body;
const header = document.querySelector('[data-header]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const versionSwitcher = document.querySelector('[data-version-switcher]');
const versionTrigger = versionSwitcher?.querySelector('.docs-header__version-trigger');
const versionMenu = document.getElementById('version-menu');
const versionOptions = [...document.querySelectorAll('.docs-header__version-option')];
const searchOverlay = document.querySelector('[data-search-overlay]');
const searchOpenButtons = [...document.querySelectorAll('[data-open-search]')];
const searchCloseButtons = [...document.querySelectorAll('[data-close-search]')];
const searchInput = document.querySelector('[data-search-input]');
const searchResults = [...document.querySelectorAll('[data-result]')];
const searchPanel = searchOverlay?.querySelector('.docs-search-modal__panel');
const searchForm = document.querySelector('[data-search-form]');
const progressBar = document.querySelector('[data-reading-progress]');
const statusToast = document.querySelector('[data-status]');
const copyLinkButton = document.querySelector('[data-copy-link]');

let activeResultIndex = 0;
let lastFocusedElement = null;
let statusTimeout = null;

const setTheme = (theme) => {
  const isLight = theme === 'light';

  root.dataset.theme = theme;
  themeToggle?.setAttribute('aria-pressed', String(isLight));
  themeToggle?.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  localStorage.setItem('kp-docs-theme', theme);
};

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('kp-docs-theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  setTheme(savedTheme || preferredTheme);
};

const showStatus = (message) => {
  if (!statusToast) return;

  statusToast.textContent = message;
  statusToast.classList.add('is-visible');

  window.clearTimeout(statusTimeout);
  statusTimeout = window.setTimeout(() => {
    statusToast.classList.remove('is-visible');
  }, 2200);
};

const closeVersionMenu = () => {
  if (!versionMenu || !versionTrigger) return;
  versionMenu.hidden = true;
  versionTrigger.setAttribute('aria-expanded', 'false');
};

const openVersionMenu = () => {
  if (!versionMenu || !versionTrigger) return;
  versionMenu.hidden = false;
  versionTrigger.setAttribute('aria-expanded', 'true');
};

const updateVersionSelection = (selectedOption) => {
  versionOptions.forEach((option) => {
    const isSelected = option === selectedOption;
    option.classList.toggle('is-current', isSelected);
    option.setAttribute('aria-selected', String(isSelected));
  });

  const versionValue = selectedOption.dataset.version || 'v2.4.1';
  const versionBadge = versionTrigger?.querySelector('.docs-header__version-badge');
  const versionLabel = versionTrigger?.querySelector('.docs-header__version-label');
  const nextLabel = selectedOption.querySelector('span')?.textContent || 'Stable';

  if (versionBadge) versionBadge.textContent = versionValue;
  if (versionLabel) versionLabel.textContent = nextLabel;

  showStatus(`Version context switched to ${versionValue}.`);
  closeVersionMenu();
};

const getVisibleResults = () => searchResults.filter((result) => !result.hidden);

const setActiveResult = (nextIndex) => {
  const visibleResults = getVisibleResults();
  if (!visibleResults.length) return;

  activeResultIndex = (nextIndex + visibleResults.length) % visibleResults.length;
  searchResults.forEach((result) => {
    result.classList.remove('is-active');
    result.setAttribute('aria-selected', 'false');
  });

  const activeResult = visibleResults[activeResultIndex];
  activeResult.classList.add('is-active');
  activeResult.setAttribute('aria-selected', 'true');
};

const closeSearchOverlay = () => {
  if (!searchOverlay || searchOverlay.hidden) return;

  searchOverlay.hidden = true;
  body.classList.remove('docs-modal-open');
  searchOpenButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
  lastFocusedElement?.focus();
};

const openSearchOverlay = () => {
  if (!searchOverlay) return;

  lastFocusedElement = document.activeElement;
  searchOverlay.hidden = false;
  body.classList.add('docs-modal-open');
  searchOpenButtons.forEach((button) => button.setAttribute('aria-expanded', 'true'));
  if (searchInput) {
    searchInput.value = '';
  }
  searchResults.forEach((result) => {
    result.hidden = false;
  });
  setActiveResult(0);

  requestAnimationFrame(() => {
    searchInput?.focus();
    searchInput?.select();
  });
};

const handleSearchShortcuts = (event) => {
  const isCtrlK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
  const isSlashShortcut =
    event.key === '/' &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '');

  if (isCtrlK || isSlashShortcut) {
    event.preventDefault();
    openSearchOverlay();
  }

  if (event.key === 'Escape') {
    closeVersionMenu();
    closeSearchOverlay();
  }

  if (searchOverlay?.hidden === false) {
    const visibleResults = getVisibleResults();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveResult(activeResultIndex + 1);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveResult(activeResultIndex - 1);
    }

    if (event.key === 'Enter' && document.activeElement === searchInput) {
      event.preventDefault();
      visibleResults[activeResultIndex]?.click();
    }

    if (event.key === 'Tab' && searchPanel) {
      const focusable = [...searchPanel.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])')].filter((node) => !node.hidden && !node.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  }
};

const updateReadingProgress = () => {
  if (!progressBar || !header) return;

  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0;

  progressBar.style.width = `${progress}%`;
};

initializeTheme();
updateReadingProgress();
setActiveResult(0);

window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('keydown', handleSearchShortcuts);

searchOpenButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openSearchOverlay();
  });
});

searchCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeSearchOverlay();
  });
});

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  openSearchOverlay();
});

searchOverlay?.addEventListener('click', (event) => {
  if (event.target === searchOverlay) {
    closeSearchOverlay();
  }
});

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
  showStatus(`Theme changed to ${nextTheme} mode.`);
});

versionTrigger?.addEventListener('click', () => {
  const shouldOpen = versionMenu?.hidden;
  if (shouldOpen) {
    openVersionMenu();
  } else {
    closeVersionMenu();
  }
});

versionOptions.forEach((option) => {
  option.addEventListener('click', () => {
    updateVersionSelection(option);
  });
});

searchResults.forEach((result, index) => {
  result.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
  result.addEventListener('mouseenter', () => {
    const visibleIndex = getVisibleResults().indexOf(result);
    if (visibleIndex >= 0) {
      setActiveResult(visibleIndex);
    }
  });
  result.addEventListener('click', async () => {
    const title = result.querySelector('.docs-search-result__title')?.textContent?.trim() || 'Result';

    if (title === 'Copy API base URL') {
      try {
        await navigator.clipboard.writeText('https://api.kpcode.dev/v2');
        showStatus('API base URL copied.');
      } catch {
        showStatus('Clipboard access unavailable in this preview.');
      }
    } else {
      showStatus(`Opened ${title}.`);
    }

    closeSearchOverlay();
  });
});

copyLinkButton?.addEventListener('click', async () => {
  const deepLink = `${window.location.href.split('#')[0]}#article-title`;

  try {
    await navigator.clipboard.writeText(deepLink);
    showStatus('Article deep link copied.');
  } catch {
    showStatus('Clipboard access unavailable in this preview.');
  }
});

document.addEventListener('click', (event) => {
  if (!versionSwitcher?.contains(event.target)) {
    closeVersionMenu();
  }
});

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  searchResults.forEach((result) => {
    const matches = result.textContent.toLowerCase().includes(query);
    result.hidden = !matches;
  });

  const visibleResults = getVisibleResults();

  if (!visibleResults.length) {
    activeResultIndex = 0;
    return;
  }

  setActiveResult(0);
});
