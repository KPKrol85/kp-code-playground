import { getState, setState, subscribe, resetState } from './modules/state.js';
import { renderCommon, renderDashboard, renderSettings, bindSettingsForm, toast } from './modules/ui.js';
import { startTimer, pauseTimer, resetTimer, switchMode } from './modules/timer.js';
import { initAudio, syncAudioState, setMuted, ensureAudioUnlocked } from './modules/audio.js';
import { announce, openDialog, closeDialog } from './modules/a11y.js';
import { bindShortcuts } from './modules/shortcuts.js';
import { markCurrentNav } from './modules/router.js';
import { normalizeToday, recordSession, resetAllStats, resetTodayStats } from './modules/stats.js';
import { clearState, exportState, importState } from './modules/storage.js';

const page = document.body.dataset.page;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

markCurrentNav();
normalizeToday();
renderCommon();

if (page === 'dashboard') setupDashboard();
if (page === 'settings') setupSettings();

subscribe(() => {
  renderCommon();
  if (page === 'dashboard') renderDashboard();
  if (page === 'settings') renderSettings();
  syncAudioState();
});

function setupDashboard() {
  renderDashboard();
  initAudio();

  document.querySelector('#toggle-timer')?.addEventListener('click', () => toggleTimer());
  document.querySelector('#reset-timer')?.addEventListener('click', () => {
    if (getState().timer.isRunning && !confirm('Reset the active timer?')) return;
    resetTimer();
    announce('Timer reset');
  });
  document.querySelector('#toggle-focus')?.addEventListener('click', () => toggleFocusMode());
  document.querySelector('#toggle-fullscreen')?.addEventListener('click', async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  });

  document.querySelector('#mode-buttons')?.addEventListener('click', (event) => {
    const mode = event.target.closest('button')?.dataset.mode;
    if (!mode) return;
    switchMode(mode);
    announce(`${mode} mode selected`);
  });

  document.querySelector('#sound-profile')?.addEventListener('change', async (event) => {
    await ensureAudioUnlocked();
    setState((draft) => {
      draft.audio.activeProfile = event.target.value;
      return draft;
    });
  });

  document.querySelector('#master-volume')?.addEventListener('input', (event) => {
    const value = Number(event.target.value);
    setState((draft) => {
      draft.audio.masterVolume = value;
      return draft;
    });
  });

  document.querySelector('#toggle-mute')?.addEventListener('click', () => setMuted(!getState().audio.muted));
  document.querySelector('#reset-today')?.addEventListener('click', () => {
    resetTodayStats();
    toast('Today stats reset.');
  });
  document.querySelector('#reset-all')?.addEventListener('click', () => {
    if (!confirm('Reset all stats and session history?')) return;
    resetAllStats();
    toast('All stats reset.');
  });

  document.querySelector('#export-data')?.addEventListener('click', () => {
    const blob = new Blob([exportState(getState())], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ambient-dev-panel-backup.json';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.querySelector('#import-data')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = importState(await file.text());
      resetState(parsed);
      toast('Backup imported successfully.');
    } catch {
      toast('Import failed. The JSON file is invalid.');
    }
  });

  const dialog = document.querySelector('#shortcuts-dialog');
  document.querySelector('#open-shortcuts')?.addEventListener('click', () => openDialog(dialog));
  document.querySelector('#close-shortcuts')?.addEventListener('click', () => closeDialog(dialog));

  bindShortcuts({
    toggleTimer,
    resetTimer: () => document.querySelector('#reset-timer')?.click(),
    focusMode: toggleFocusMode,
    toggleMute: () => setMuted(!getState().audio.muted),
    toggleTheme,
    shortcuts: () => openDialog(dialog),
    escape: () => {
      if (dialog.open) return closeDialog(dialog);
      if (getState().prefs.focusMode) toggleFocusMode();
    }
  }, getState().prefs.shortcutsEnabled);
}

function setupSettings() {
  renderSettings();
  bindSettingsForm();
  document.querySelector('#reset-storage')?.addEventListener('click', () => {
    if (!confirm('Clear all local data and reset to defaults?')) return;
    clearState();
    location.reload();
  });
}

function toggleTimer() {
  if (getState().timer.isRunning) {
    pauseTimer();
    announce('Timer paused');
    return;
  }
  startTimer(async (mode, durationMs) => {
    recordSession(mode, durationMs);
    toast(`${mode} session completed.`);
    announce(`${mode} session completed`);
    if (getState().prefs.notificationsEnabled && Notification.permission === 'granted') {
      new Notification('Night Dev Panel', { body: `${mode} session complete.` });
    }
  });
  announce('Timer started');
}

function toggleTheme() {
  setState((draft) => {
    const current = draft.prefs.theme === 'system' ? 'dark' : draft.prefs.theme;
    draft.prefs.theme = current === 'dark' ? 'light' : 'dark';
    return draft;
  });
}

function toggleFocusMode() {
  setState((draft) => {
    draft.prefs.focusMode = !draft.prefs.focusMode;
    return draft;
  });
}

document.querySelector('#enable-notifications')?.addEventListener('click', async () => {
  if (!('Notification' in window)) return toast('Web notifications are not supported.');
  const permission = await Notification.requestPermission();
  setState((draft) => {
    draft.prefs.notificationsEnabled = permission === 'granted';
    return draft;
  });
  toast(permission === 'granted' ? 'Notifications enabled.' : 'Notification permission denied.');
});
