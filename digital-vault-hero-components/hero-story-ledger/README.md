# Hero Story Ledger

Hero Story Ledger is a premium storytelling HERO package for report launches, founder narratives, product transformation stories, and case-study editorial landing pages. It emphasizes clear narrative sequencing, trust-building metrics, and high-signal executive context in a compact hero footprint.

## Use Case

Use this component when you need a top-of-page experience that:
- frames a complex story with concise editorial structure,
- previews chapter progression for stakeholders,
- pairs strategic insights with a leadership quote,
- invites deeper reading through focused calls to action.

## File Structure

```text
hero-story-ledger/
├── index.html
├── hero-story-ledger.html
├── style.css
├── hero-story-ledger.js
└── README.md
```

## Timeline Interaction

The timeline in `hero-story-ledger.html` is implemented with native `button` controls for strong accessibility and keyboard support.

- Selecting a chapter updates:
  - the key insight cards,
  - the featured quote,
  - the quote attribution.
- `aria-pressed` reflects the selected chapter state.
- Arrow keys (`←`, `→`, `↑`, `↓`) move between chapters and update content.
- A reading progress bar tracks hero scroll progression.
- Reveal effects run through `IntersectionObserver` and automatically reduce motion when the user prefers reduced motion.

## Copy & Reuse Workflow

1. Duplicate this folder into a new hero package name.
2. Replace the narrative eyebrow, headline, and lead paragraph in `hero-story-ledger.html`.
3. Update chapter labels and timeline content entries in `hero-story-ledger.js` (`timelineData`).
4. Tune brand colors/spacing in `style.css` while preserving `.hero-story-ledger-*` scope.
5. Keep selector card metadata in `index.html` aligned with the component narrative.

This package is standalone and dependency-free, so it can be dropped directly into the KP_Code Digital Vault HERO catalog.
