# Daily Audit — EasyMove Frontend

This audit reviews the current static HTML/CSS/JS implementation and lists practical, high-impact improvements for the next iteration. Findings are based only on the files currently in `pr-02-easymove`.

## Priority 1 — Should be addressed first

### Accessibility & semantic interaction
- **Accordion panels need explicit relationships (`aria-controls`/`aria-labelledby`) and hidden state management.**
  Add IDs for each panel, connect button ↔ panel, and toggle `hidden` (or `aria-hidden`) so screen readers get clear expanded/collapsed behavior.
- **Tabs are missing keyboard interaction expected for tab widgets.**
  Implement ArrowLeft/ArrowRight/Home/End navigation, manage roving `tabindex`, and sync `hidden` on inactive panels.
- **No visible focus style on hover-only interactive patterns inside cards/footer links in some contexts.**
  Ensure all clickable elements preserve strong keyboard focus parity with hover affordances.

### Content integrity / UX trust
- **Multiple production-visible placeholder links (`href="#"`) still exist (social/privacy/cookies).**
  Replace with real URLs or temporarily remove links until targets exist to avoid dead interactions.
- **Footer year is outdated (`© 2024`) across pages.**
  Update to current year or render dynamically during build to avoid trust/maintenance drift.
- **Contact/legal information appears as plain text in several places.**
  Convert phone/email to `tel:`/`mailto:` links for better mobile usability and accessibility.

## Priority 2 — Important maintainability improvements

### CSS architecture / consistency
- **Inline styles are repeated in many templates (`style="..."` for list styles, spacing, social wrappers).**
  Move these into reusable utility/component classes to reduce duplication and improve consistency.
- **Global anchor rule removes underlines from all links by default.**
  Keep underlines for content links (especially body/footer/legal) and use explicit button/link utility variants where needed.
- **Legacy hover-only affordances should include `:focus-visible` variants on components (`.button`, nav links, cards).**
  Standardize interactive states in one place to prevent regressions.

### JavaScript quality
- **Menu module attaches a global scroll listener unconditionally, even where header behavior may be unnecessary.**
  Scope listener setup to pages/components that require it, and consider an early return guard before binding.
- **Form validation is currently hardcoded and imperative.**
  Extract field config (name, validator, message) into a schema object to reduce duplication and simplify future field additions.
- **Tabs/accordion modules rely mostly on class toggling.**
  Add state updates for ARIA and hidden attributes in the same code path to keep visual and semantic states synchronized.

## Priority 3 — Performance and delivery refinements

### Performance
- **Fonts are loaded via CSS `@import` from Google Fonts.**
  Prefer `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>` to improve rendering start and reduce CSS blocking.
- **Open Graph image references SVG asset only.**
  Provide a dedicated raster social preview image (e.g., 1200×630 WebP/PNG) for predictable sharing previews across platforms.

### Build / project hygiene
- **Existing `AUDIT.md` appears out of sync with current project state (it reports missing SEO/robots/sitemap that now exist).**
  Refresh or archive outdated audit artifacts to keep project documentation reliable for future contributors.

---

## Most valuable next steps (suggested sequence)
1. Fix interaction accessibility primitives first: tabs + accordion semantics/keyboard.
2. Remove placeholder links and correct footer/legal trust markers.
3. Eliminate inline styles and normalize interactive/focus states in CSS.
4. Improve font loading and social preview asset strategy.
5. Update stale project audit docs so future audits start from accurate baseline.
