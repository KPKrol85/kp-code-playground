import { isTypingTarget } from './a11y.js';

export function bindShortcuts(handlers, enabled = true) {
  const onKey = (event) => {
    if (!enabled || isTypingTarget(event.target)) return;
    const k = event.key.toLowerCase();
    if (k === ' ') {
      event.preventDefault();
      handlers.toggleTimer();
    } else if (k === 'r') {
      handlers.resetTimer();
    } else if (k === 'f') {
      handlers.focusMode();
    } else if (k === 'm') {
      handlers.toggleMute();
    } else if (k === 't') {
      handlers.toggleTheme();
    } else if (k === 's') {
      window.location.href = './settings.html';
    } else if (k === '?') {
      handlers.shortcuts();
    } else if (event.key === 'Escape') {
      handlers.escape();
    }
  };
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
}
