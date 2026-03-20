# Centered Classic Magazine

A premium standalone editorial header package for blogs, digital magazines, journals, and long-form reading products. The component centers publication identity first, then supports discovery and article reading through a multi-row structure, a compact sticky state, and a discreet reading progress indicator.

## Component concept

This package is designed to feel like a composed magazine masthead rather than a generic product navbar. The visual language emphasizes a centered logo treatment, measured whitespace, fine separators, and a serif/sans pairing that signals an established editorial voice.

## Multi-row editorial architecture

The header is organized into four functional layers:

1. **Utility strip** for edition context, current date, weather/status cues, external links, and an optional reading-mode toggle.
2. **Centered masthead row** for publication branding, issue framing, and supporting editorial micro-copy.
3. **Navigation row** for category pathways, a mobile sections toggle, and a restrained subscribe CTA.
4. **Integrated progress rule** along the bottom edge to show reading progress without overpowering the design.

## Sticky reading behavior

The sticky logic is built for article use:

- At the top of the page, the full magazine header remains visible.
- While the reader scrolls downward, the expanded header can slide away to return visual focus to the article.
- When the reader scrolls upward after passing the threshold, a compact sticky bar appears with the publication name, article title, quick links, and subscribe access.
- On small screens, the compact sticky row is suppressed to avoid crowding, while the main navigation remains accessible through the sections toggle.

## Reading progress logic

The progress indicator is a thin line anchored to the bottom of the header. JavaScript calculates the document scroll ratio and updates the bar width in real time. The bar remains subtle in both default and sepia reading modes.

## Typography approach

The component uses a high-contrast editorial pairing:

- **A classic system serif stack** for the masthead and major article headings to create magazine-style gravitas without external dependencies.
- **A modern system sans-serif stack** for utility text, navigation, metadata, controls, and body copy for crisp readability.

Letterspacing, uppercase micro-labels, and generous line spacing are tuned to feel deliberate and publication-led.

## Accessibility decisions

- Includes a keyboard-accessible skip link.
- Uses semantic `<header>`, `<nav>`, `<main>`, `<article>`, and sectioning elements.
- Keeps interactive controls as native buttons and links.
- Applies visible `:focus-visible` styling for all key interactive elements.
- Supports keyboard-triggered section previews through link focus.
- Uses ARIA labels and state attributes for the primary navigation, sticky/preview regions, and theme toggle.
- Reduces animation and transition intensity under `prefers-reduced-motion`.

## Responsive strategy

- Desktop layouts preserve the full three-row editorial hierarchy with inline navigation and hover/focus previews.
- Tablet layouts rebalance spacing and stack supporting content more comfortably.
- Mobile layouts introduce a sections toggle, convert navigation into a vertical list, simplify sticky behavior, and keep all targets touch-friendly.

## Customization guidance

To adapt the package for another publication:

- Replace masthead copy, issue metadata, and article details in `index.html`.
- Update theme colors and spacing tokens in `style.css` under `:root`.
- Adjust preview section content and sticky thresholds in `script.js`.
- Swap or remove the reading-mode toggle if your product only needs one visual mode.
- Extend or trim category links while keeping the hierarchy clean and restrained.

## Included files

- `index.html`
- `style.css`
- `script.js`
- `README.md`
