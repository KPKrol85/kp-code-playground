# Header Security Shield

A premium, trust-focused, mobile-first header component for the KP_Code Digital Vault library. It is designed for serious security and compliance-adjacent products where navigation clarity, protected-state signaling, and accessible control patterns are critical.

## Intended use cases

- Security platforms and cyber protection suites
- Privacy tooling and policy management products
- Compliance SaaS and audit workflows
- Monitoring, alerting, and secure developer platforms
- Backup and resilience product navigation shells

## Files

- `index.html` — standalone demo page with component, mobile secure access panel, overlay, and contextual demo content
- `style.css` — mobile-first theme system, component styling, responsive behavior, trust/status visuals, and motion controls
- `script.js` — mobile panel controller, focus trap, body scroll lock, resize cleanup, secure-mode theme persistence, and scroll state enhancement

## Key features

- Distinct shield-lock brand mark and mobile access iconography
- Desktop product navigation with clear active state (`aria-current="page"`)
- Protected trust badge for desktop signal clarity
- Secure mode light/dark theme toggle with localStorage persistence
- Mobile secure access panel with session status, trust indicators, nav links, and CTA
- Overlay click, Escape close, link-click close, and desktop-breakpoint state reset
- Focus management that supports trapped interaction when panel is open and safe restoration on close
- Sticky header with subtle scrolled state for structure and context

## Accessibility notes

- Includes a keyboard-visible skip link
- Uses semantic `header`, `nav`, `main`, and `aside` landmarks
- Uses a proper dialog-like mobile panel (`role="dialog"`, `aria-modal="true"`)
- Menu control supports `aria-expanded` + `aria-controls`
- Strong focus-visible states for links and buttons
- Active nav state is reinforced with border/weight, not color alone
- Reduced motion respected via `@media (prefers-reduced-motion: reduce)`

## Customization notes

- Update local design tokens in `:root` and `html[data-theme="dark"]` for palette and contrast tuning
- Adjust the responsive handoff in CSS and JS (`56.25rem` / `900px`) to match product shell breakpoints
- Replace nav labels, trust lines, and CTA destination URLs with product routes
- Shield/lock SVG can be swapped while preserving semantic brand structure and scaling behavior

## Digital Vault integration notes

- Component is standalone and framework-free for easy package-level review
- Uses scoped class naming for low collision risk in broader libraries
- Theme key: `header-security-shield-theme`
- Suitable as a foundational header variant for trust-focused product families distinct from command, glass, neon, editorial, commerce, minimal, or orbit-style headers
