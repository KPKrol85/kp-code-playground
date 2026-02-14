# pr-command-palette

## Product pitch (what & why)
`pr-command-palette` is a Linear-style command palette MVP built with semantic HTML, token-based CSS, and vanilla JS modules. It is designed to be dropped into other KP_Code products (Digital Vault, dashboards, internal tools) where fast keyboard-driven navigation and actions improve productivity.

## Features
- Ctrl/Cmd + K open, Esc close, backdrop close, and opener focus restore.
- Reusable actions registry API.
- Deterministic search over labels and keywords with matched label highlighting.
- Arrow key navigation, Enter execution, and focus trap with Tab.
- Accessible dialog/listbox behavior with `aria-activedescendant` and polite live announcements.
- Dark-first theme with light override and compact mode.
- State export/import with schema validation.

## Project structure
```
/pr-command-palette
  index.html
  pages/
  assets/css/
  assets/js/
```

## Integration guide
1. Copy `assets/css/*` and `assets/js/modules/*` into your host project.
2. Include styles and boot script:
   ```html
   <link rel="stylesheet" href="assets/css/tokens.css" />
   <link rel="stylesheet" href="assets/css/base.css" />
   <link rel="stylesheet" href="assets/css/components.css" />
   <script type="module" src="assets/js/app.js"></script>
   ```
3. Add a polite live region to your HTML:
   ```html
   <div id="app-live-region" class="sr-only" aria-live="polite" aria-atomic="true"></div>
   ```
4. Register app-specific actions in `app.js` with the registry API.

## Registry API docs
From `createCommandPalette()`:
- `registerAction(action)`
- `registerActions(actions)`
- `unregisterAction(id)`
- `openPalette()`
- `closePalette()`

### Action schema
```js
{
  id: string,
  label: string,
  keywords: string[],
  group: string,
  shortcut?: string,
  run: () => void | Promise<void>
}
```

## Keyboard shortcuts
- `Ctrl+K` / `Cmd+K`: Open palette
- `Esc`: Close palette/modal
- `ArrowUp` / `ArrowDown`: Move selection
- `Enter`: Execute selected action
- `Tab`: Stay trapped within palette

## Accessibility notes
- Palette uses `role="dialog"`, `aria-modal="true"`, and labelled/described metadata.
- Results use a `listbox` with `option` rows and `aria-activedescendant` from the input.
- Live region announces open/close state changes.
- Focus ring is visible for keyboard users.

## Import/Export format
State export writes:
```json
{
  "schemaVersion": 1,
  "theme": "dark",
  "compactMode": false
}
```
Import validates:
- `schemaVersion === 1`
- `theme` is `"light"`, `"dark"`, or omitted/null
- `compactMode` is boolean

Invalid imports display inline error text in the import modal.

## Running
Open `index.html` directly, or serve statically:
```bash
python3 -m http.server 4173
```

## Smoke test checklist
- [ ] Ctrl/Cmd+K opens, Esc closes, focus returns
- [ ] Search filters and highlights matched label text
- [ ] Arrow/Enter/Tab keyboard navigation works
- [ ] Actions run (theme, compact, clipboard, modals)
- [ ] Export/import restores settings
- [ ] Reduced motion preference is respected
