# Tabs 02 — Glassmorphic Modern SaaS Variant

A standalone premium tabs component package designed for product-library reuse in KP_Code Digital Vault.

## Files
- `index.html` — semantic tabs markup and demo content.
- `style.css` — mobile-first glassmorphic styling, depth, and motion.
- `script.js` — accessible tabs behavior and lightweight premium pointer highlight enhancement.

## Implementation highlights
- Semantic tabs pattern using `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
- Correct `aria-selected`, `aria-controls`, `aria-labelledby`, keyboard navigation, and focus-visible support.
- Layered background gradients to support realistic glass blur/saturation behavior.
- Reusable glass design tokens in CSS custom properties:
  - `--glass-blur`
  - `--glass-opacity`
  - `--glass-border`
  - `--accent-glow`
- Polished glass container with:
  - `backdrop-filter: blur(...) saturate(...)`
  - directional translucent gradients
  - subtle inner and outer shadow depth
  - clipped overflow for clean rounded-corner effects
- Active tab treatment with elevated brightness, soft glow, and subtle vertical lift.
- Panel transitions using soft fade + slight upward motion and restrained spring-like easing.
- Hidden panel handling via `hidden`/`aria-hidden` to avoid initialization flashes and layout issues.
- Extra premium touch: pointer-reactive ambient highlight constrained inside the glass shell.

## Accessibility behavior
- Arrow keys navigate between tabs.
- `Home` and `End` jump to first/last tab.
- `Enter` / `Space` activate focused tab and optionally move focus to the panel.
- Focused tabs also auto-activate for fast keyboard scanning.
- Clear high-contrast `:focus-visible` rings remain readable on translucent backgrounds.

## Customization
Update design tokens in `:root` to retheme quickly:
- Glass intensity: `--glass-blur`, `--glass-opacity`, `--glass-border`
- Accent style: `--accent-rgb`, `--accent-glow`
- Corner language: `--radius-xl`, `--radius-md`
- Motion feel: `--panel-ease`

## Notes for product integration
The JavaScript structure keeps tab activation isolated (`setActiveTab`) so deferred panel hydration/lazy content loading can be introduced later without changing markup semantics.
