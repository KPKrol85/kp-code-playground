# pr-feature-flags-dashboard

A reusable, front-end Feature Flag Dashboard for KP_Code projects.

## What are feature flags?

Feature flags (also called feature toggles) are runtime switches that let teams enable or disable functionality without redeploying code. They help you:

- release gradually
- test experimental experiences safely
- quickly disable problematic UI behavior
- keep one codebase while supporting multiple rollout states

This dashboard provides a local, product-style control panel backed by `localStorage` for development and prototype workflows.

## Included capabilities

- Feature flags engine with `init/get/set/toggle/reset`
- Typed registry with metadata (`id`, `label`, `description`, `category`, optional `beta`)
- Grouped SaaS-like settings panel with accessible switches
- Live preview simulation to reflect flag state changes instantly
- JSON import/export with `schemaVersion` validation
- `aria-live` announcements and keyboard interactions

## Integrating into other KP_Code products

You can copy the `assets/js/modules` folder into another project and import the engine + registry:

```js
import { FeatureFlags } from './modules/feature-flags.js';
import { FEATURE_REGISTRY } from './modules/registry.js';

FeatureFlags.init();

if (FeatureFlags.get('commandPalette')) {
  mountCommandPalette();
}
```

### Suggested integration approach

1. Keep a single registry file shared across your app.
2. Initialize flags once at app boot (`FeatureFlags.init()`).
3. Read flags close to the UI behavior they control.
4. Subscribe with `FeatureFlags.onChange()` when a view should react live.
5. Use export/import in developer tooling to replicate environments.

## API examples

```js
import { FeatureFlags } from './modules/feature-flags.js';

// Initialize from localStorage or defaults
FeatureFlags.init();

// Read
const isCompact = FeatureFlags.get('compactMode');

// Set explicitly
FeatureFlags.set('formEngine', true);

// Toggle
FeatureFlags.toggle('experimentalUI');

// Reset all flags to defaults
FeatureFlags.reset();

// Subscribe to state updates
const unsubscribe = FeatureFlags.onChange(({ type, state }) => {
  console.log(type, state);
});

unsubscribe();
```

## Smoke test checklist

- [ ] Load the dashboard and verify all five flags are visible.
- [ ] Toggle each flag and confirm live preview card updates.
- [ ] Navigate to switches with keyboard (`Tab`) and toggle using `Enter` and `Space`.
- [ ] Refresh the page and verify values persist from `localStorage`.
- [ ] Export JSON and validate `schemaVersion` + flags payload.
- [ ] Import the exported JSON and verify states are restored.
- [ ] Try importing an invalid JSON schema and verify failure announcement appears.
- [ ] Click **Reset** and confirm all flags return to `false`.
