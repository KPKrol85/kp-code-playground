import storage from './storage.js';

const STORAGE_KEY = 'ambient-dev-panel:sounds';

const TRACKS = {
  rain: { mode: 'rain', preview: 'assets/audio/rain.svg' },
  'white-noise': { mode: 'white-noise', preview: 'assets/audio/white-noise.svg' },
  'cyber-ambience': { mode: 'cyber-ambience', preview: 'assets/audio/cyber-ambience.svg' },
};

export function createSoundPanel({ panelElement }) {
  const saved = storage.get(STORAGE_KEY, {});
  const state = {
    open: saved.open ?? true,
    active: saved.active ?? null,
    volumes: saved.volumes ?? {},
  };

  const rowElements = [...panelElement.querySelectorAll('.sound__item')];
  const togglePanelBtn = panelElement.querySelector('[data-action="toggle-sounds"]');
  const listElement = panelElement.querySelector('[data-sound-list]');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const players = {};

  const createRainNode = () => {
    const sampleSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, sampleSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < sampleSize; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1300;
    source.connect(filter);
    return { source, output: filter };
  };

  const createWhiteNoiseNode = () => {
    const sampleSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, sampleSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < sampleSize; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return { source, output: source };
  };

  const createCyberNode = () => {
    const osc1 = audioContext.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 110;
    const osc2 = audioContext.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 220;
    const mix = audioContext.createGain();
    mix.gain.value = 0.6;
    osc1.connect(mix);
    osc2.connect(mix);
    return {
      source: {
        start: () => {
          osc1.start();
          osc2.start();
        },
        stop: () => {
          osc1.stop();
          osc2.stop();
        },
      },
      output: mix,
    };
  };

  const createTrack = (key) => {
    const gain = audioContext.createGain();
    gain.gain.value = 0;
    gain.connect(audioContext.destination);

    let node;
    if (TRACKS[key].mode === 'rain') node = createRainNode();
    else if (TRACKS[key].mode === 'white-noise') node = createWhiteNoiseNode();
    else node = createCyberNode();

    node.output.connect(gain);

    return {
      gain,
      start: () => node.source.start(),
      stop: () => node.source.stop(),
      started: false,
      playing: false,
    };
  };

  const persist = () => storage.set(STORAGE_KEY, state);

  const applyVolume = (key) => {
    const row = panelElement.querySelector(`.sound__item[data-sound="${key}"]`);
    const volumeInput = row?.querySelector('[data-action="sound-volume"]');
    const volume = typeof state.volumes[key] === 'number' ? state.volumes[key] : Number(volumeInput?.value ?? 0.4);
    state.volumes[key] = volume;
    const player = players[key];
    if (player) {
      player.gain.gain.setTargetAtTime(player.playing ? volume : 0, audioContext.currentTime, 0.05);
    }
    if (volumeInput) volumeInput.value = String(volume);
  };

  const stopAll = () => {
    Object.keys(players).forEach((key) => {
      const player = players[key];
      player.playing = false;
      player.gain.gain.setTargetAtTime(0, audioContext.currentTime, 0.05);
    });
    state.active = null;
    syncButtons();
    persist();
  };

  const toggleTrack = async (key) => {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    if (state.active === key) {
      stopAll();
      return;
    }

    stopAll();

    if (!players[key]) {
      players[key] = createTrack(key);
    }

    const player = players[key];
    if (!player.started) {
      player.start();
      player.started = true;
    }

    player.playing = true;
    applyVolume(key);
    state.active = key;
    syncButtons();
    persist();
  };

  const syncButtons = () => {
    rowElements.forEach((row) => {
      const key = row.dataset.sound;
      const btn = row.querySelector('[data-action="sound-toggle"]');
      const active = state.active === key;
      btn.textContent = active ? 'Pause' : 'Play';
      btn.setAttribute('aria-pressed', String(active));
    });
  };

  const applyPanelVisibility = () => {
    listElement.hidden = !state.open;
    togglePanelBtn.textContent = state.open ? 'Hide' : 'Show';
    togglePanelBtn.setAttribute('aria-expanded', String(state.open));
  };

  rowElements.forEach((row) => {
    const key = row.dataset.sound;
    const volumeInput = row.querySelector('[data-action="sound-volume"]');
    applyVolume(key);

    volumeInput?.addEventListener('input', () => {
      state.volumes[key] = Number(volumeInput.value);
      applyVolume(key);
      persist();
    });
  });

  panelElement.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('[data-action="sound-toggle"]')) {
      const row = target.closest('.sound__item');
      if (!row?.dataset.sound) return;
      toggleTrack(row.dataset.sound);
    }

    if (target.matches('[data-action="toggle-sounds"]')) {
      state.open = !state.open;
      applyPanelVisibility();
      persist();
    }
  });

  applyPanelVisibility();
  syncButtons();

  return {
    togglePanel() {
      state.open = !state.open;
      applyPanelVisibility();
      persist();
    },
  };
}
