export const DEFAULTS = {
  durations: {
    focus: 25,
    shortBreak: 5,
    longBreak: 15
  },
  timer: {
    mode: 'focus',
    isRunning: false,
    remainingMs: 25 * 60 * 1000,
    startedAt: null,
    endsAt: null
  },
  audio: {
    enabled: true,
    muted: false,
    activeProfile: 'rain',
    masterVolume: 0.6,
    trackVolumes: {
      rain: 0.7,
      whiteNoise: 0.6,
      cyberHum: 0.4,
      cafe: 0.5
    }
  },
  prefs: {
    theme: 'system',
    focusMode: false,
    reducedMotion: 'system',
    shortcutsEnabled: true,
    notificationsEnabled: false
  },
  stats: {
    totalSessions: 0,
    totalFocusMinutes: 0,
    streak: 0,
    lastSessionDate: null,
    today: {
      date: null,
      sessions: 0,
      focusMinutes: 0
    },
    history: []
  }
};

export const AUDIO_PROFILES = [
  { id: 'rain', label: 'Rain', file: './assets/audio/rain.mp3' },
  { id: 'whiteNoise', label: 'White Noise', file: './assets/audio/white-noise.mp3' },
  { id: 'cyberHum', label: 'Cyber Hum', file: './assets/audio/cyber-hum.mp3' },
  { id: 'cafe', label: 'Cafe', file: './assets/audio/cafe.mp3' }
];

export const TIMER_MODES = [
  { id: 'focus', label: 'Focus' },
  { id: 'shortBreak', label: 'Short Break' },
  { id: 'longBreak', label: 'Long Break' }
];
