import { createTimer } from './timer.js';
import { createSoundPanel } from './audio.js';
import { createThemeController } from './theme.js';
import { createStatsController } from './stats.js';
import { createFocusMode } from './focus-mode.js';
import { setupShortcuts } from './shortcuts.js';

const panel = document.querySelector('.panel');

if (panel) {
  const timerDisplay = document.querySelector('[data-timer-display]');
  const timerLive = document.querySelector('[data-timer-live]');
  const durationInput = document.querySelector('[data-duration-input]');
  const progressCircle = document.querySelector('.timer__ring-progress');
  const startPauseButton = document.querySelector('[data-action="start-pause"]');
  const resetButton = document.querySelector('[data-action="reset"]');
  const soundPanelElement = document.querySelector('[data-sound-panel]');
  const themeButton = document.querySelector('[data-action="toggle-theme"]');
  const focusButton = document.querySelector('[data-action="toggle-focus"]');

  const stats = createStatsController({
    todayElement: document.querySelector('[data-stat="today"]'),
    totalElement: document.querySelector('[data-stat="total"]'),
  });

  const timer = createTimer({
    displayElement: timerDisplay,
    liveElement: timerLive,
    durationInput,
    progressCircle,
    startPauseButton,
    onSessionComplete: stats.increment,
  });

  const soundPanel = createSoundPanel({ panelElement: soundPanelElement });
  const theme = createThemeController({ root: document.documentElement, toggleButton: themeButton });
  const focusMode = createFocusMode({ panelElement: panel, toggleButton: focusButton });

  startPauseButton.addEventListener('click', timer.toggle);
  resetButton.addEventListener('click', timer.reset);

  themeButton.addEventListener('click', theme.toggle);
  focusButton.addEventListener('click', focusMode.toggle);

  setupShortcuts({ timer, soundPanel, theme, focusMode });
}
