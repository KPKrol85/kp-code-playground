import { setState, getState } from './state.js';

const todayKey = () => new Date().toISOString().slice(0, 10);

export function normalizeToday() {
  const state = getState();
  const today = todayKey();
  if (state.stats.today.date === today) return;
  setState((draft) => {
    draft.stats.today = { date: today, sessions: 0, focusMinutes: 0 };
    return draft;
  });
}

export function recordSession(mode, durationMs) {
  const day = todayKey();
  const minutes = Math.round(durationMs / 60000);
  setState((draft) => {
    const isFocus = mode === 'focus';
    draft.stats.totalSessions += 1;
    draft.stats.today.date = day;
    draft.stats.today.sessions += 1;
    if (isFocus) {
      draft.stats.totalFocusMinutes += minutes;
      draft.stats.today.focusMinutes += minutes;
    }

    const lastDate = draft.stats.lastSessionDate;
    if (lastDate) {
      const prev = new Date(lastDate);
      const cur = new Date(day);
      const diff = Math.round((cur - prev) / 86400000);
      draft.stats.streak = diff === 1 ? draft.stats.streak + 1 : diff === 0 ? draft.stats.streak : 1;
    } else {
      draft.stats.streak = 1;
    }
    draft.stats.lastSessionDate = day;

    draft.stats.history.unshift({
      timestamp: new Date().toISOString(),
      mode,
      durationMinutes: minutes
    });
    draft.stats.history = draft.stats.history.slice(0, 20);
    return draft;
  });
}

export function resetTodayStats() {
  const day = todayKey();
  setState((draft) => {
    draft.stats.today = { date: day, sessions: 0, focusMinutes: 0 };
    return draft;
  });
}

export function resetAllStats() {
  setState((draft) => {
    draft.stats = {
      totalSessions: 0,
      totalFocusMinutes: 0,
      streak: 0,
      lastSessionDate: null,
      today: { date: todayKey(), sessions: 0, focusMinutes: 0 },
      history: []
    };
    return draft;
  });
}
