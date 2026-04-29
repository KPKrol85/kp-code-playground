# Pricing Comparison Accordion

A premium, standalone accordion component that blends pricing-card clarity with expandable comparison details. It is built for KP_Code Digital Vault use cases such as freelancer offers, studio service pages, SaaS launch plans, and retainers.

## Component purpose

This component helps visitors compare packages without leaving the page by presenting:

- Package name, positioning statement, price range, and a compact status badge in collapsed view.
- Structured expanded details including inclusions, exclusions, best-fit profile, timeline, support, SEO coverage, and handoff notes.
- A focused CTA per package to drive inquiries or booking flows.

## File structure

- `index.html` — semantic markup for header, accordion list, triggers, and detail panels.
- `style.css` — scoped premium visual system with responsive layout, badges, comparison rows, and reduced-motion support.
- `script.js` — lightweight accordion logic with one-open-at-a-time behavior and ARIA state sync.
- `README.md` — usage and customization notes.

## Accessibility notes

- Uses native `button` elements as accordion triggers.
- Pairs each trigger and panel with `aria-expanded`, `aria-controls`, and `aria-labelledby`.
- Supports natural keyboard tab navigation through triggers and CTA links.
- Includes clear `:focus-visible` outlines for interactive controls.
- Preserves readable static content structure and avoids dependency-heavy scripts.
- Respects `prefers-reduced-motion` to minimize transition effects.

## Customization ideas

- Replace package content with your own offers, deliverables, and SLA language.
- Adjust CSS custom properties in `:root` for brand colors, spacing scale, and elevation style.
- Swap CTA links to route into your scheduling, checkout, or contact workflow.
- Add or remove comparison rows (e.g., analytics depth, CRO support, integrations).
- Change the default open item by updating the initial `aria-expanded` state in markup.

## Fit within KP_Code Digital Vault

This package fills a practical, commercial niche between classic FAQ accordions and static pricing cards. It is designed as a conversion-focused UI asset for teams that need premium presentation plus actionable delivery detail in one reusable component.
