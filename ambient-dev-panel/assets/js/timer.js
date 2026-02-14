export function createTimer({
  displayElement,
  liveElement,
  durationInput,
  progressCircle,
  startPauseButton,
  onSessionComplete,
}) {
  const CIRCUMFERENCE = 2 * Math.PI * 54;
  progressCircle.style.strokeDasharray = `${CIRCUMFERENCE}`;

  let durationMs = Number(durationInput.value) * 60 * 1000;
  let remainingMs = durationMs;
  let endTime = null;
  let tickId = null;
  let isRunning = false;

  const formatTime = (ms) => {
    const clamped = Math.max(0, ms);
    const totalSeconds = Math.ceil(clamped / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const setProgress = () => {
    const ratio = durationMs ? remainingMs / durationMs : 0;
    progressCircle.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - ratio)}`;
  };

  const updateUI = () => {
    displayElement.textContent = formatTime(remainingMs);
    setProgress();
  };

  const announce = () => {
    const minutes = Math.ceil(remainingMs / 60000);
    liveElement.textContent = `Timer running: ${minutes} minute${minutes === 1 ? '' : 's'} remaining.`;
  };

  const stopTick = () => {
    if (tickId) {
      window.clearInterval(tickId);
      tickId = null;
    }
  };

  const completeSession = () => {
    isRunning = false;
    stopTick();
    remainingMs = 0;
    startPauseButton.textContent = 'Start';
    updateUI();
    liveElement.textContent = 'Session complete. Great work.';
    onSessionComplete();
  };

  const tick = () => {
    if (!isRunning || !endTime) {
      return;
    }
    remainingMs = endTime - Date.now();
    if (remainingMs <= 0) {
      completeSession();
      return;
    }
    updateUI();
  };

  const syncDurationFromInput = () => {
    const minutes = Math.min(180, Math.max(1, Number(durationInput.value) || 25));
    durationInput.value = String(minutes);
    durationMs = minutes * 60 * 1000;
    remainingMs = durationMs;
    updateUI();
    liveElement.textContent = `Timer ready at ${minutes} minute${minutes === 1 ? '' : 's'}.`;
  };

  const start = () => {
    if (isRunning) return;
    isRunning = true;
    endTime = Date.now() + remainingMs;
    startPauseButton.textContent = 'Pause';
    announce();
    tick();
    tickId = window.setInterval(tick, 250);
  };

  const pause = () => {
    if (!isRunning) return;
    isRunning = false;
    remainingMs = Math.max(0, endTime - Date.now());
    endTime = null;
    startPauseButton.textContent = 'Start';
    stopTick();
    updateUI();
    liveElement.textContent = 'Timer paused.';
  };

  const reset = () => {
    isRunning = false;
    stopTick();
    syncDurationFromInput();
    startPauseButton.textContent = 'Start';
  };

  durationInput.addEventListener('change', reset);

  updateUI();

  return {
    start,
    pause,
    reset,
    toggle() {
      if (isRunning) pause();
      else start();
    },
    isRunning: () => isRunning,
  };
}
