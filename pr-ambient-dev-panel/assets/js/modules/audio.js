import { AUDIO_PROFILES } from '../data/defaults.js';
import { getState, setState } from './state.js';

const context = new (window.AudioContext || window.webkitAudioContext)();
const tracks = new Map();
let gainMaster;

export async function initAudio() {
  if (gainMaster) return;
  gainMaster = context.createGain();
  gainMaster.connect(context.destination);

  await Promise.all(AUDIO_PROFILES.map(async (profile) => {
    try {
      const resp = await fetch(profile.file);
      const data = await resp.arrayBuffer();
      const buffer = await context.decodeAudioData(data);
      tracks.set(profile.id, { buffer, source: null, gain: context.createGain() });
      tracks.get(profile.id).gain.connect(gainMaster);
    } catch {
      document.body.dataset.audioError = 'true';
    }
  }));
  syncAudioState();
}

export async function ensureAudioUnlocked() {
  if (context.state === 'suspended') await context.resume();
}

export function syncAudioState() {
  if (!gainMaster) return;
  const { audio } = getState();
  gainMaster.gain.value = audio.muted ? 0 : audio.masterVolume;

  for (const [id, track] of tracks.entries()) {
    const target = audio.trackVolumes[id] ?? 0;
    track.gain.gain.linearRampToValueAtTime(target, context.currentTime + 0.2);
    if (audio.activeProfile === id && audio.enabled && !track.source) {
      const source = context.createBufferSource();
      source.buffer = track.buffer;
      source.loop = true;
      source.connect(track.gain);
      source.start(0);
      track.source = source;
    } else if ((audio.activeProfile !== id || !audio.enabled) && track.source) {
      fadeOutAndStop(track);
    }
  }
}

function fadeOutAndStop(track) {
  track.gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.2);
  setTimeout(() => {
    track.source?.stop();
    track.source = null;
  }, 220);
}

export function setMuted(muted) {
  setState((draft) => {
    draft.audio.muted = muted;
    return draft;
  });
  syncAudioState();
}
