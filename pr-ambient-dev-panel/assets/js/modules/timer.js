import { setState, getState } from './state.js';

let ticker;

export function modeDurationMs(mode, state = getState()) {
  const map = {
    focus: state.durations.focus,
    shortBreak: state.durations.shortBreak,
    longBreak: state.durations.longBreak
  };
  return (map[mode] || state.durations.focus) * 60 * 1000;
}

export function switchMode(mode) {
  const duration = modeDurationMs(mode);
  setState((draft) => {
    draft.timer.mode = mode;
    draft.timer.isRunning = false;
    draft.timer.remainingMs = duration;
    draft.timer.startedAt = null;
    draft.timer.endsAt = null;
    return draft;
  });
}

export function startTimer(onComplete) {
  const now = Date.now();
  setState((draft) => {
    draft.timer.isRunning = true;
    draft.timer.startedAt = now;
    draft.timer.endsAt = now + draft.timer.remainingMs;
    return draft;
  });
  clearInterval(ticker);
  ticker = setInterval(() => tick(onComplete), 250);
}

export function pauseTimer() {
  clearInterval(ticker);
  setState((draft) => {
    if (!draft.timer.isRunning) return draft;
    draft.timer.remainingMs = Math.max(0, draft.timer.endsAt - Date.now());
    draft.timer.isRunning = false;
    draft.timer.endsAt = null;
    draft.timer.startedAt = null;
    return draft;
  });
}

export function resetTimer() {
  const state = getState();
  clearInterval(ticker);
  setState((draft) => {
    draft.timer.isRunning = false;
    draft.timer.startedAt = null;
    draft.timer.endsAt = null;
    draft.timer.remainingMs = modeDurationMs(state.timer.mode, state);
    return draft;
  });
}

function tick(onComplete) {
  const state = getState();
  if (!state.timer.isRunning) return;
  const remaining = Math.max(0, state.timer.endsAt - Date.now());
  if (remaining === 0) {
    clearInterval(ticker);
    setState((draft) => {
      draft.timer.isRunning = false;
      draft.timer.remainingMs = 0;
      draft.timer.endsAt = null;
      draft.timer.startedAt = null;
      return draft;
    });
    onComplete?.(state.timer.mode, modeDurationMs(state.timer.mode, state));
    return;
  }
  setState((draft) => {
    draft.timer.remainingMs = remaining;
    return draft;
  });
}
