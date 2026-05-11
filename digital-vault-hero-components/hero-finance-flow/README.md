# Hero Finance Flow

A premium, reusable HERO package for fintech products, accounting suites, budgeting apps, payment platforms, and business finance dashboards.

## Use case

Hero Finance Flow is designed for teams that need a **secure and analytical first impression**. It combines conversion-focused messaging with dashboard-like UI elements so users immediately understand platform value:

- cash-flow visibility
- approvals and controls
- transaction monitoring
- trust and security posture

## File structure

- `index.html` — KP_Code Digital Vault selector panel with a direct link to the component.
- `hero-finance-flow.html` — the standalone HERO component page.
- `style.css` — scoped, reusable styling for selector and component.
- `hero-finance-flow.js` — progressive enhancement for interactions and animations.

## JavaScript interactions

`hero-finance-flow.js` adds lightweight behavior (no dependencies):

1. **Animated metric counters** for key dashboard values.
2. **Interactive period selector** (Week / Month / Quarter) using native buttons.
3. **Data-driven updates** for metrics and chart bars per selected period.
4. **Reveal animation** via `IntersectionObserver` for polished load-in.
5. **Reduced-motion support** to avoid motion-heavy effects when user preference is enabled.
6. **Defensive selector guards** so the script safely no-ops when elements are missing.

## Accessibility notes

- Period controls use native `<button>` elements.
- Active period is exposed with `aria-pressed`.
- Dashboard metrics live inside an `aria-live="polite"` region for readable updates.
- Clear `:focus-visible` states are included for keyboard users.
- Motion effects are minimized and disabled under `prefers-reduced-motion`.

## Reuse instructions

1. Copy the entire `hero-finance-flow` folder into your project.
2. Include `style.css` in the page `<head>`.
3. Use markup from `hero-finance-flow.html` where you want the HERO.
4. Include `hero-finance-flow.js` before `</body>`.
5. Update copy and period data in `hero-finance-flow.js` (`dataByPeriod`) to match your product context.

This package is standalone and works with plain HTML/CSS/JavaScript.
