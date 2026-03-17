# pricing-04 — Service packages pricing section

## Purpose
`pricing-04` is a standalone, reusable premium pricing section built for service businesses (agencies, freelancers, and studios). It focuses on project scope clarity, deliverables, timelines, revisions/support, and conversion-ready CTA hierarchy.

## Included files
- `pricing.html` — semantic section markup with intro, three package cards, and trust row.
- `pricing.css` — mobile-first styling with strict BEM naming and required breakpoints.
- `pricing.js` — lightweight progressive enhancement for focus-based active package emphasis.
- `README.md` — implementation and reuse guidance.

## Structure overview
- Section wrapper: `.pricing-service`
- Intro: `.pricing-service__intro`
- Card grid: `.pricing-service__grid`
- Package card: `.pricing-service__card` (`.pricing-service__card--featured` for highlighted plan)
- Package details: header, price block, deliverables list, meta notes, CTA actions
- Trust row: `.pricing-service__trust`

## Editing package content
1. Open `pricing.html` and locate each `.pricing-service__card`.
2. Update package identity (`.pricing-service__package`) and audience line (`.pricing-service__audience`).
3. Update price text in `.pricing-service__price-block` while keeping context labels (`Starting at`, `From`, `project-based`, etc.).
4. Edit service scope in `.pricing-service__deliverables`.
5. Update delivery expectations in `.pricing-service__meta` (`Timeline`, `Revisions & support`).
6. Point CTA links to your own contact, scheduler, or quote routes.
7. Keep one card marked as `.pricing-service__card--featured` and optional badge `.pricing-service__badge` for hierarchy.

## Breakpoint behavior
- Base (mobile first): stacked cards and full-width tap-friendly CTAs.
- `min-width: 480px`: improved spacing and two-column action button rhythm.
- `min-width: 760px`: balanced two-column card grid and stronger featured-card composition.
- `min-width: 1024px`: premium three-column layout and four-column trust detail row.

## Accessibility and performance notes
- Semantic heading structure with an explicit section label via `aria-labelledby`.
- Keyboard-friendly links and visible focus states via `:focus-visible`.
- Deliverables and trust details use list semantics for scanability.
- JavaScript enhancement initializes only when component exists.
- Motion is reduced when `prefers-reduced-motion: reduce` is active.
- No external libraries or heavy visual effects.

## Reuse guidance
- Copy all four files into the target project and include CSS/JS once.
- Preserve BEM class names unless intentionally re-theming all selectors.
- Safe for agency/service contexts such as branding projects, landing-page builds, design system setup, and CMS-driven web delivery.
- For custom scopes, duplicate a card pattern and keep the same order: package name → price → deliverables → timeline/support → primary CTA.
