# Smart Menu (`pr-smart-menu`)

Smart Menu is a product-grade, reusable adaptive navigation component built with semantic HTML, modern CSS, and vanilla JavaScript modules. It learns from user interactions and prioritizes links without any backend or external tracking.

> **Privacy statement:** All data stays in your browser. No tracking. No backend.

## Product pitch

This project demonstrates an explainable “AI-like” nav experience driven by deterministic signals:
- counts how often users activate menu items
- factors in recency of usage
- surfaces quick links in a Frequently used row
- allows users to control behavior (mode toggle, sorting mode, pin settings, reset/export/import)

## How it learns

### Signals stored per menu item
- `clickCount`
- `firstUsedAt`
- `lastUsedAt`
- `visitsCount` (reserved in schema for future extension)

### Score model
Configurable scoring modes:
1. **Frequency + Recency** (default)
2. **Frequency only**
3. **Recency only**

Reorder safeguards:
- Home remains first by default
- pinned items remain at top (in original order) when pinning is enabled
- reordering starts only after threshold interactions (default: 3)
- stable sorting on ties by original index
- debounced rerendering avoids mid-action jitter

## Controls

- **Smart Mode ON/OFF**: OFF restores original static order
- **Reset learning data**: clears learned metrics with confirmation
- **Export JSON**: downloads local learned data
- **Import JSON**: loads data after versioned schema validation (`schemaVersion: 1`)

Invalid import payloads are rejected gracefully with inline status copy.

## Accessibility notes

- semantic nav structure and control labels
- keyboard activation tracking for Enter/Space
- visible focus styles with `:focus-visible`
- `aria-current="page"` for active link
- polite live announcements when reorder occurs
- reduced-motion support by disabling transitions

## Reusable API

```js
SmartMenu.init(navElement, {
  storageKey: 'pr-smart-menu-learning',
  mode: 'frequency-recency',
  pinnedItems: ['services'],
  threshold: 3,
  maxFrequent: 3,
  pinnedEnabled: true,
  homeId: 'home'
});
```

## Project structure

```
/pr-smart-menu
  index.html
  pages/
  assets/
    css/
    js/
      modules/
  README.md
  CHANGELOG.md
```

## Smoke test checklist

- Click menu items and confirm Frequent row + reorder after threshold.
- Toggle Smart Mode OFF and verify original order is restored.
- Keep a pinned item active and verify it stays pinned near top.
- Export JSON and re-import it to restore learned state.
- Enable reduced motion in system settings and verify reorder animations are disabled.

## Running

Open `pr-smart-menu/index.html` directly in a browser, or run any static server from repository root.
