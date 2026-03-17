# Feature 04 — Editorial Premium Stats Cards

## Component purpose
This standalone component presents high-confidence business outcomes through a stat-first layout. It is designed for product marketing, SaaS credibility sections, analytics pages, and case-study storytelling where numbers are the primary conversion signal.

## File structure
- `index.html` — semantic section, intro copy, and four metric cards.
- `style.css` — scoped editorial styling, rigid grid, typography hierarchy, responsive layout.
- `script.js` — optional progressive enhancement for one-time counter animation on visibility.
- `README.md` — implementation notes and reuse guidance.

## Content anatomy
Each card follows a disciplined hierarchy:
1. Oversized metric as the lead element.
2. Concise title framing business meaning.
3. Brief supporting copy for context.
4. Footnote-style credibility hint.
5. Lightweight text link for secondary action.

## Typographic hierarchy
- Metrics use large, dense sizing with slight negative letter-spacing to emphasize impact.
- Titles are compact and assertive.
- Supporting copy uses controlled line length and relaxed line-height.
- Footnotes are reduced in size and separated by a thin rule to preserve hierarchy.

## Stat presentation strategy
- Primary storytelling is numerical (%, x, uptime).
- A ghost index numeral in each card provides subtle editorial layering.
- Accent color is applied sparingly (eyebrow label and interactive focus/hover moments) to preserve premium monochrome discipline.
- The JS counter is enhancement-only; static readable values are present in HTML by default.

## Accessibility considerations
- Semantic heading and article structure supports screen readers.
- Strong contrast is maintained against a monochrome palette.
- `:focus-visible` styles are explicit for keyboard users.
- Counter animation is disabled under `prefers-reduced-motion`.
- Links remain textual and descriptive for assistive technologies.

## Responsive behavior
- Mobile-first: single-column stack for easy scanning.
- Tablet/desktop: two-column grid with hard divider lines and consistent card rhythm.
- Fluid spacing and type sizing use `clamp()` for balanced scaling.

## Reuse recommendations
- Duplicate cards by copying an existing `<article>` block and updating data attributes.
- For additional metrics, keep copy brief and maintain a short line length.
- If counters are unnecessary, remove `data-counter` attributes and the script still degrades gracefully.
- For brand adaptation, change `--fc-accent` only; keep neutral base tones for editorial integrity.
