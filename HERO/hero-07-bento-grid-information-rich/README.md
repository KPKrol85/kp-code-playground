# Bento Grid Information Rich

A premium standalone bento-grid hero designed for modern SaaS, AI, fintech, and advanced digital products that need to communicate multiple value signals at once without turning the top of the page into a dashboard.

## Component concept

This package uses a modular bento-grid composition to tell a product story in layers:

- a **dominant anchor tile** introduces the primary message, supporting copy, and CTA group
- **supporting evidence tiles** add proof, trust, workflow clarity, and assurance cues
- a **visually richer media tile** creates a premium interface moment with restrained motion
- a **summary tile** closes the composition and reinforces why the hero feels coherent rather than fragmented

The result is intentionally information-rich, but every tile has a distinct role so the section remains sharp and readable.

## Grid and tile hierarchy strategy

The layout is built on a 12-column desktop grid that preserves a strong bento identity:

- the anchor tile spans two rows and remains the dominant visual entry point
- two compact tiles sit alongside it to provide fast-scanning proof and trust signals
- the lower row introduces workflow depth, richer media treatment, and product assurance
- the final full-width tile ties the composition together with a concise framing statement

At tablet widths the grid compresses to 8 columns while preserving anchor dominance. On mobile, the layout becomes a deliberate one-column narrative with the anchor tile first and supporting tiles following in logical order.

## Tile roles and interaction behavior

### Anchor tile
- carries the overline, main headline, supporting copy, CTA pair, and three compact KPIs
- includes animated count-up metrics as a progressive enhancement
- remains fully useful even if JavaScript is unavailable

### Metric tile
- highlights ecosystem coverage using a circular signal treatment
- adds restrained motion only when reduced-motion is not requested

### Trust tile
- presents premium example logo-style labels to communicate adoption and credibility

### Workflow tile
- shows a three-step product narrative for how one signal becomes a guided play
- includes the trigger for the optional expanded detail panel

### Media tile
- introduces a layered UI panel with a chart fragment and a subtle pulse animation
- keeps the hero feeling like a premium software surface without becoming a full dashboard mockup

### Assurance and summary tiles
- reinforce compliance, governance, and clarity so buyers understand both capability and control

## Optional expansion logic

The workflow tile can open an additive detail drawer:

- it uses native buttons for open and close actions
- it exposes `aria-expanded`, `aria-controls`, and `aria-hidden` states
- it supports Escape to dismiss and returns focus to the triggering control
- the expanded content is supplemental only, so the hero remains understandable without opening it

This keeps the interaction premium and useful without making expansion mandatory for comprehension.

## Accessibility decisions

- semantic `section`, `article`, heading, list, and description list structure
- native links and buttons for all interactive controls
- strong custom `:focus-visible` styling across controls
- hover behavior mirrored by keyboard focus with `:focus-within`
- optional motion disabled or minimized under `prefers-reduced-motion`
- dialog-like drawer behavior includes keyboard dismissal and focus return
- content hierarchy remains intact even when JavaScript is disabled

## Responsive strategy

- **Desktop:** multi-span bento layout with a dominant anchor tile and distinct supporting roles
- **Tablet:** compressed multi-column layout that maintains hierarchy without visual clutter
- **Mobile:** one-column story flow with the anchor tile first, then proof, workflow, media, and assurance tiles

## Customization guidance

1. Replace the product name, headline, proof points, and CTA labels in `index.html`.
2. Adjust accent colors, surface balance, and tile spans in `style.css` to fit a new brand.
3. Swap the demo metrics and trust labels for your real product story.
4. Edit the drawer content if you want the expandable tile to highlight another workflow or feature.
5. Keep tile content concise so the grid retains its premium rhythm across breakpoints.
