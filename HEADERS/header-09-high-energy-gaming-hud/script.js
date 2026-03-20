const header = document.querySelector('.hud-header');
const menuToggle = document.querySelector('.hud-menu-toggle');
const rgbToggle = document.querySelector('[data-rgb-toggle]');
const soundToggle = document.querySelector('[data-sound-toggle]');
const rgbLabel = document.querySelector('[data-rgb-label]');
const soundLabel = document.querySelector('[data-sound-label]');
const statusText = document.querySelector('[data-status-text]');
const statusPill = document.querySelector('[data-status-pill]');
const playerCount = document.querySelector('[data-player-count]');
const playerDelta = document.querySelector('[data-player-delta]');
const prizePool = document.querySelector('[data-prize-pool]');
const progressFill = document.querySelector('[data-progress-fill]');
const progressValue = document.querySelector('[data-progress-value]');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const statusModes = [
  { label: 'ONLINE', pill: 'Stable', state: 'online' },
  { label: 'ONLINE', pill: 'Queue surge', state: 'busy' },
  { label: 'SYNCED', pill: 'Latency 21ms', state: 'online' },
];

let statusIndex = 0;
let currentPlayers = 128420;
let currentPrizePool = 2.84;
let currentProgress = 72;
let soundEnabled = false;
let glitchTimer = null;

const setStatusState = (mode) => {
  if (!statusText || !statusPill) return;

  statusText.textContent = mode.label;
  statusPill.textContent = mode.pill;
  statusPill.style.borderColor = mode.state === 'busy' ? 'rgba(255, 200, 87, 0.36)' : 'rgba(98, 255, 185, 0.32)';
  statusPill.style.background = mode.state === 'busy' ? 'rgba(255, 200, 87, 0.12)' : 'rgba(98, 255, 185, 0.1)';
  statusPill.style.color = mode.state === 'busy' ? '#ffe5ab' : '#b5ffe2';
};

const formatPlayers = (count) => new Intl.NumberFormat('en-US').format(count);

const playUiTone = (frequency = 660, duration = 0.04, type = 'triangle') => {
  if (!soundEnabled) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  if (!playUiTone.audioContext) {
    playUiTone.audioContext = new AudioContextClass();
  }

  const context = playUiTone.audioContext;
  if (context.state === 'suspended') {
    context.resume().catch(() => {});
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const now = context.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.02, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.01);
};

const pulseGlitch = () => {
  if (!header || prefersReducedMotion.matches) return;

  header.dataset.glitch = 'active';
  window.clearTimeout(glitchTimer);
  glitchTimer = window.setTimeout(() => {
    header.dataset.glitch = 'idle';
  }, 220);
};

const tickHudData = () => {
  statusIndex = (statusIndex + 1) % statusModes.length;
  setStatusState(statusModes[statusIndex]);

  currentPlayers += Math.floor(Math.random() * 220) - 40;
  currentPlayers = Math.max(currentPlayers, 127900);
  const queueGain = 180 + Math.floor(Math.random() * 140);

  currentPrizePool += Math.random() * 0.04;
  currentPrizePool = Math.min(currentPrizePool, 3.25);

  currentProgress += Math.random() > 0.5 ? 1 : 0;
  currentProgress = Math.min(currentProgress, 86);

  if (playerCount) {
    playerCount.textContent = formatPlayers(currentPlayers);
  }

  if (playerDelta) {
    playerDelta.textContent = `+${queueGain} in matchmaking`;
  }

  if (prizePool) {
    prizePool.textContent = `$${currentPrizePool.toFixed(2)}M`;
  }

  if (progressFill && progressValue) {
    progressFill.style.width = `${currentProgress}%`;
    progressValue.textContent = `${currentProgress}%`;
    progressFill.parentElement?.setAttribute('aria-label', `Season battle pass ${currentProgress} percent complete`);
  }

  pulseGlitch();
};

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  header?.setAttribute('data-mobile-nav', expanded ? 'closed' : 'open');
  playUiTone(480, 0.05, 'square');
});

rgbToggle?.addEventListener('click', () => {
  const isOn = rgbToggle.getAttribute('aria-pressed') === 'true';
  const nextState = !isOn;
  rgbToggle.setAttribute('aria-pressed', String(nextState));
  header?.setAttribute('data-rgb-mode', nextState ? 'on' : 'off');
  if (rgbLabel) {
    rgbLabel.textContent = nextState ? 'Active' : 'Off';
  }
  playUiTone(nextState ? 720 : 520, 0.05, 'sawtooth');
  pulseGlitch();
});

soundToggle?.addEventListener('click', async () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute('aria-pressed', String(soundEnabled));
  if (soundLabel) {
    soundLabel.textContent = soundEnabled ? 'Armed' : 'Muted';
  }
  playUiTone(soundEnabled ? 820 : 360, 0.05, 'triangle');
});

window.setInterval(tickHudData, 3200);
window.setInterval(() => {
  if (!prefersReducedMotion.matches) {
    pulseGlitch();
  }
}, 8600);

setStatusState(statusModes[statusIndex]);
header?.setAttribute('data-mobile-nav', 'closed');
header?.setAttribute('data-glitch', 'idle');
