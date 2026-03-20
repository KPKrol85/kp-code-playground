const workspaceShell = document.querySelector('.workspace-shell');
const panelTriggers = [...document.querySelectorAll('[data-panel-trigger]')];
const panels = [...document.querySelectorAll('[data-panel]')];
const closeButtons = [...document.querySelectorAll('[data-close-panel]')];
const copyButton = document.querySelector('[data-copy-record]');
const recordValue = document.getElementById('workspace-record-value');
const liveRegion = document.getElementById('workspace-live-region');
const markReadButton = document.querySelector('[data-mark-read]');
const notificationList = document.querySelector('[data-notification-list]');
const notificationItems = () => [...document.querySelectorAll('[data-notification-item]')];
const notificationCount = document.querySelector('[data-notification-count]');
const emptyState = document.querySelector('[data-empty-state]');
const commandInput = document.querySelector('[data-command-input]');
const commandResults = document.querySelector('[data-command-results]');
const themeToggles = [...document.querySelectorAll('[data-theme-toggle]')];

const resultButtons = commandResults ? [...commandResults.querySelectorAll('button')] : [];
let openPanelName = null;
let lastTrigger = null;
let notificationTimerStarted = false;

const setAnnouncement = (message) => {
  if (!liveRegion) return;
  liveRegion.textContent = '';
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 60);
};

const getPanelByName = (name) => document.querySelector(`[data-panel="${name}"]`);
const getTriggerByName = (name) => document.querySelector(`[data-panel-trigger="${name}"]`);

const closePanel = (name, { returnFocus = true } = {}) => {
  const panel = getPanelByName(name);
  const trigger = getTriggerByName(name);

  if (!panel || !trigger) return;

  panel.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');

  if (returnFocus && lastTrigger === trigger) {
    trigger.focus();
  }

  if (openPanelName === name) {
    openPanelName = null;
  }
};

const closeAllPanels = (options = {}) => {
  panels.forEach((panel) => {
    if (!panel.hidden) {
      closePanel(panel.dataset.panel, options);
    }
  });
};

const openPanel = (name) => {
  const panel = getPanelByName(name);
  const trigger = getTriggerByName(name);
  if (!panel || !trigger) return;

  closeAllPanels({ returnFocus: false });

  panel.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  openPanelName = name;
  lastTrigger = trigger;

  if (name === 'command') {
    commandInput?.focus();
    return;
  }

  const firstFocusable = panel.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
  firstFocusable?.focus();
};

panelTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const { panelTrigger: name } = trigger.dataset;
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      closePanel(name);
      return;
    }

    openPanel(name);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closePanel(button.dataset.closePanel);
  });
});

document.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLElement)) return;

  const clickedInsidePanel = event.target.closest('[data-panel]');
  const clickedTrigger = event.target.closest('[data-panel-trigger]');

  if (!clickedInsidePanel && !clickedTrigger) {
    closeAllPanels({ returnFocus: false });
  }
});

document.addEventListener('keydown', (event) => {
  const isCommandShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';

  if (isCommandShortcut) {
    event.preventDefault();
    const trigger = getTriggerByName('command');
    const expanded = trigger?.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closePanel('command');
    } else {
      openPanel('command');
    }
  }

  if (event.key === 'Escape') {
    closeAllPanels();
  }
});

copyButton?.addEventListener('click', async () => {
  const text = recordValue?.textContent?.trim();
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = 'Copied';
    setAnnouncement(`Record identifier ${text} copied to clipboard.`);
  } catch {
    copyButton.textContent = 'Select';
    setAnnouncement(`Clipboard unavailable. Record identifier is ${text}.`);
  }

  window.setTimeout(() => {
    copyButton.textContent = 'Copy';
  }, 1600);
});

const updateNotificationsState = () => {
  const unreadCount = notificationItems().filter((item) => item.classList.contains('is-unread')).length;

  if (notificationCount) {
    notificationCount.textContent = unreadCount;
    notificationCount.hidden = unreadCount === 0;
  }

  if (emptyState) {
    emptyState.hidden = notificationItems().length !== 0;
  }
};

markReadButton?.addEventListener('click', () => {
  notificationItems().forEach((item) => item.classList.remove('is-unread'));
  updateNotificationsState();
  setAnnouncement('All notifications marked as read.');
});

notificationList?.addEventListener('click', (event) => {
  const notification = event.target instanceof HTMLElement ? event.target.closest('[data-notification-item]') : null;
  if (!notification) return;

  notification.classList.remove('is-unread');
  updateNotificationsState();
});

const sourceResults = resultButtons.map((button) => ({
  label: button.textContent.trim(),
}));

commandInput?.addEventListener('input', () => {
  const query = commandInput.value.trim().toLowerCase();
  commandResults.innerHTML = '';

  const matches = !query
    ? sourceResults
    : sourceResults.filter((item) => item.label.toLowerCase().includes(query));

  const itemsToRender = matches.length
    ? matches
    : [{ label: `No direct match for “${commandInput.value.trim()}”` }];

  itemsToRender.forEach((item) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'workspace-result-item';
    button.textContent = item.label;
    li.append(button);
    commandResults.append(li);
  });
});

const applyTheme = (theme) => {
  workspaceShell?.setAttribute('data-theme', theme);
  const isLight = theme === 'light';
  themeToggles.forEach((toggle) => {
    toggle.setAttribute('aria-pressed', String(isLight));
  });
  setAnnouncement(`${isLight ? 'Light' : 'Dark'} theme enabled.`);
};

themeToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const nextTheme = workspaceShell?.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
});

const syncWorkspaceDensity = () => {
  const shouldCondense = window.innerWidth < 1240 || window.innerHeight < 860;
  workspaceShell?.setAttribute('data-condensed', String(shouldCondense));
};

window.addEventListener('resize', syncWorkspaceDensity);
syncWorkspaceDensity();
updateNotificationsState();

const injectMockNotification = () => {
  if (!notificationList) return;

  const item = document.createElement('article');
  item.className = 'workspace-notification is-unread';
  item.dataset.notificationItem = '';
  item.dataset.type = 'info';
  item.tabIndex = -1;
  item.innerHTML = `
    <span class="workspace-notification__status" aria-hidden="true"></span>
    <div>
      <h3>Ops note from automation</h3>
      <p>Forecast snapshot refreshed after a successful warehouse reconciliation pass.</p>
      <span>Just now</span>
    </div>
  `;

  notificationList.prepend(item);
  updateNotificationsState();
  setAnnouncement('One new notification received.');
};

window.addEventListener('focus', () => {
  if (notificationTimerStarted) return;
  notificationTimerStarted = true;
  window.setTimeout(injectMockNotification, 5000);
}, { once: true });


const profileMenu = getPanelByName('profile');

profileMenu?.addEventListener('keydown', (event) => {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

  const menuItems = [...profileMenu.querySelectorAll('[role="menuitem"]')];
  const currentIndex = menuItems.indexOf(document.activeElement);
  if (currentIndex === -1) return;

  event.preventDefault();

  let nextIndex = currentIndex;

  if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % menuItems.length;
  if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = menuItems.length - 1;

  menuItems[nextIndex]?.focus();
});
