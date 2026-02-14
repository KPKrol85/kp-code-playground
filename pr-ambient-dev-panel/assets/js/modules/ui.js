import { getState, setState } from './state.js';
import { TIMER_MODES, AUDIO_PROFILES } from '../data/defaults.js';

export function renderCommon() {
  const state = getState();
  document.documentElement.dataset.theme = resolveTheme(state.prefs.theme);
  document.documentElement.dataset.motion = resolveMotion(state.prefs.reducedMotion);
}

export function renderDashboard() {
  const state = getState();
  const timer = state.timer;
  const modeDuration = state.durations[timer.mode] * 60 * 1000;
  const pct = 100 - (timer.remainingMs / modeDuration) * 100;

  setText('#timer-display', formatTime(timer.remainingMs));
  setText('#timer-mode', labelForMode(timer.mode));
  setText('#stats-total-sessions', `${state.stats.totalSessions}`);
  setText('#stats-today-sessions', `${state.stats.today.sessions}`);
  setText('#stats-total-focus', `${state.stats.totalFocusMinutes} min`);
  setText('#stats-today-focus', `${state.stats.today.focusMinutes} min`);
  setText('#stats-streak', `${state.stats.streak} day${state.stats.streak === 1 ? '' : 's'}`);
  const progress = document.querySelector('#progress-bar');
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, pct)).toFixed(2)}%`;

  const history = document.querySelector('#session-history');
  if (history) {
    history.innerHTML = state.stats.history.map((entry) => (
      `<li class="history__item"><span>${labelForMode(entry.mode)}</span><span>${entry.durationMinutes} min</span><time>${new Date(entry.timestamp).toLocaleString()}</time></li>`
    )).join('') || '<li class="history__item">No sessions yet.</li>';
  }

  const modeButtons = document.querySelector('#mode-buttons');
  if (modeButtons && !modeButtons.childElementCount) {
    TIMER_MODES.forEach((mode) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'button button--ghost';
      btn.dataset.mode = mode.id;
      btn.textContent = mode.label;
      modeButtons.appendChild(btn);
    });
  }

  const profiles = document.querySelector('#sound-profile');
  if (profiles && !profiles.childElementCount) {
    AUDIO_PROFILES.forEach((profile) => {
      const opt = document.createElement('option');
      opt.value = profile.id;
      opt.textContent = profile.label;
      profiles.appendChild(opt);
    });
  }

  if (profiles) profiles.value = state.audio.activeProfile;
  const master = document.querySelector('#master-volume');
  if (master) master.value = state.audio.masterVolume;
  const audioHint = document.querySelector('#audio-hint');
  if (audioHint) audioHint.hidden = document.body.dataset.audioError !== 'true';
  document.body.classList.toggle('focus-mode', state.prefs.focusMode);
}

export function renderSettings() {
  const state = getState();
  setValue('#duration-focus', state.durations.focus);
  setValue('#duration-short', state.durations.shortBreak);
  setValue('#duration-long', state.durations.longBreak);
  setValue('#setting-theme', state.prefs.theme);
  setValue('#setting-motion', state.prefs.reducedMotion);
  setChecked('#setting-shortcuts', state.prefs.shortcutsEnabled);
  setChecked('#setting-notifications', state.prefs.notificationsEnabled);
}

export function bindSettingsForm() {
  document.querySelector('#settings-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    setState((draft) => {
      draft.durations.focus = Number(document.querySelector('#duration-focus').value);
      draft.durations.shortBreak = Number(document.querySelector('#duration-short').value);
      draft.durations.longBreak = Number(document.querySelector('#duration-long').value);
      draft.prefs.theme = document.querySelector('#setting-theme').value;
      draft.prefs.reducedMotion = document.querySelector('#setting-motion').value;
      draft.prefs.shortcutsEnabled = document.querySelector('#setting-shortcuts').checked;
      draft.prefs.notificationsEnabled = document.querySelector('#setting-notifications').checked;
      return draft;
    });
    toast('Settings saved.');
  });
}

export function toast(message) {
  const container = document.querySelector('#toast');
  if (!container) return;
  container.textContent = message;
  container.hidden = false;
  clearTimeout(container._timer);
  container._timer = setTimeout(() => {
    container.hidden = true;
  }, 2400);
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}
function setValue(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.value = value;
}
function setChecked(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.checked = value;
}
function formatTime(ms) {
  const totalSec = Math.ceil(ms / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const ss = String(totalSec % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}
function labelForMode(mode) {
  return TIMER_MODES.find((m) => m.id === mode)?.label || mode;
}
function resolveTheme(pref) {
  if (pref !== 'system') return pref;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
function resolveMotion(pref) {
  if (pref !== 'system') return pref;
  return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'normal';
}
