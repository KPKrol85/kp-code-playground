# Status + Version Footer

A premium, compact, telemetry-style footer component for **KP_Code Digital Vault**. This component is intended for technical products that need release confidence and system transparency visible at a glance, without looking like a legal-heavy footer or a terminal mockup.

## Purpose

Use this component to communicate:

- Product identity (`KP_Code Digital Vault`)
- Release metadata (`Version`, `Last updated`, `Build status`, `System status`)
- Operational confidence indicators (`Online`, `Stable`, `Beta-ready`, `Updated`)
- Product-resource navigation (`Changelog`, `Roadmap`, `Release notes`, `Docs`, `Support`)
- Compact legal utilities (`Privacy`, `Terms`, `License`)

It is optimized for developer-facing tools, dashboards, panels, beta products, and technical product pages where metadata clarity matters.

## File structure

```text
components/footer/status-version-footer/
├── index.html   # Standalone component preview
├── style.css    # Scoped premium telemetry styling
├── script.js    # Optional progressive enhancement logic
└── README.md    # Documentation
```

## Markup and status patterns

- Uses semantic `<footer>` as component root.
- Includes clearly grouped sections:
  - Product identity
  - Metadata row (pill-style)
  - Product links
  - Status badge row
  - Bottom legal/copyright row
- Every status indicator includes readable text labels; dots are decorative only.
- Metadata remains visible in HTML and is not hidden behind JavaScript interactions.

## Accessibility behavior

- Link and button interactions include strong `:focus-visible` treatment.
- Status badges use text labels to avoid color-only communication.
- Demo refresh feedback is announced via a live region (`role="status"`, `aria-live="polite"`).
- Native elements (`<a>`, `<button>`) are used for keyboard accessibility.
- Motion-sensitive users are supported via `prefers-reduced-motion`.

## Responsive behavior

- **Mobile-first:** stacked groups with wrapped metadata and links.
- **Tablet:** compact dual-row arrangement (identity/meta and links/status behavior).
- **Desktop:** telemetry-bar style organization:
  - Left: product identity
  - Center: version/update/build/system metadata
  - Right: product links
  - Bottom: legal utility row
- Prevents horizontal overflow and keeps tap targets usable.

## Optional demo status refresh

`script.js` contains optional, local-only progressive enhancement:

- Auto-sets the current year in the copyright line.
- "Refresh status (demo)" button updates a local timestamp.
- Announces a clear **demo-only** status message in the live region.
- No external APIs, monitoring, tracking, analytics, or storage.

If you do not need this demo behavior, you can remove `script.js` and the component still presents all important metadata.

## Customization points

Update these values in `index.html` (and optionally styles in `style.css`):

- Product name (`KP_Code Digital Vault`)
- Version string (`1.0.0`)
- Last updated value (`2026`)
- Build status value (`Stable`)
- System status value (`Online`)
- Badge labels (`Online`, `Stable`, `Beta-ready`, `Updated`)
- Product links (`Changelog`, `Roadmap`, `Release notes`, `Docs`, `Support`)
- Utility links (`Privacy`, `Terms`, `License`)
- Copyright brand text (`KP_Code`)

You can also adjust CSS custom properties for color tokens, spacing, border radii, typography, focus styles, and transitions to match other component-library assets.
