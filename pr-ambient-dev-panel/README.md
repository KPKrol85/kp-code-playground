# pr-ambient-dev-panel — Night Dev Panel

A local-first, installable PWA for deep work sessions: focus timer, ambient audio, streaks, and keyboard-first control.

## Run
- Open `index.html` directly, or
- Serve with static server: `python3 -m http.server 4173`

## Features
- Focus / Short Break / Long Break timer with timestamp-based accuracy.
- Focus mode, optional fullscreen, in-app toast + optional web notifications.
- Ambient profiles (Rain, White Noise, Cyber Hum, Cafe) with persisted mixer settings.
- Session stats: totals, daily counters, streak, and last 20 sessions.
- Local backup: export/import JSON.
- Accessible UX: skip link, focus-visible states, aria-live updates, modal focus trap.
- PWA: manifest + service worker offline cache.

## Keyboard shortcuts
- `Space` start/pause
- `R` reset timer
- `F` focus mode
- `M` mute
- `T` theme
- `S` settings
- `?` shortcuts modal
- `Esc` exit focus mode / close modal

## Smoke test checklist
1. Start a focus session, verify timer counts down without visible drift.
2. Enable sound profile, adjust volume, mute/unmute.
3. Toggle focus mode and fullscreen, then exit with `Esc`.
4. Complete a session (or shorten duration in settings), verify stats/history update.
5. Change settings, reload page, verify persistence.
6. Export JSON backup; clear data; import backup and verify restoration.
7. Visit with service worker enabled, then test offline reload.

## Privacy
**All data stays in your browser. No tracking. No backend.**
