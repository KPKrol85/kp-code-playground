# Header AI Signal

Header AI Signal is a premium, standalone, mobile-first header component designed for AI tooling, automation products, and future-tech SaaS interfaces in the KP_Code Digital Vault.

## Intended use cases
- AI tool and agent platform marketing surfaces
- Workflow automation and orchestration products
- Prompt productivity and model-integrated product shells
- No-code AI builder interfaces requiring clear global navigation

## File list
- `index.html` — standalone demo page with the full header, layered mobile AI panel, overlay, and contextual automation content.
- `style.css` — component tokens, theme variables, responsive layout, interaction styling, signal accents, and reduced-motion support.
- `script.js` — mobile panel controller, focus management, scroll lock, keyboard support, responsive reset behavior, and AI/Human theme persistence.
- `README.md` — package guidance and integration notes.

## Key features
- AI/signal-oriented brand mark with scalable inline SVG
- Desktop navigation with signal-inspired active state (`aria-current="page"`)
- Compact non-misleading status indicator (`Signal active`)
- AI/Human mode toggle mapped to dark/light theme
- Layered signal hamburger menu icon for mobile
- Right-side layered AI control panel with overlay/backdrop
- Mobile panel layers for Input, Reasoning, Automation, and Review
- Sticky header with subtle scrolled elevation treatment

## Accessibility notes
- Semantic landmarks (`header`, `nav`, `main`, `aside`)
- Visible skip link for keyboard navigation
- Menu button with `aria-expanded` and `aria-controls`
- Dialog semantics for mobile panel sheet
- Escape key close, overlay close, and link-click close
- Focus trap while panel is open and focus return on close
- Hidden panel content made non-focusable while closed
- Reduced-motion media query disables decorative motion
- Active states use structural indicators beyond color alone

## Customization notes
- Theme is controlled via `html[data-theme="light"]` and `html[data-theme="dark"]`
- Theme persistence key: `header-ai-signal-theme`
- Desktop breakpoint is set at `56.25rem` (900px)
- Color accents and spacing are tokenized with custom properties
- Panel width uses `min(24rem, 88vw)` for responsive containment

## Digital Vault integration notes
- Component is framework-free and build-tool free for easy reuse across Digital Vault packages.
- Class names are scoped to `ai-header`, `ai-panel`, and `ai-demo` blocks to reduce collisions.
- JavaScript is encapsulated in an IIFE to avoid global namespace pollution.
- Demo content is illustrative only and does **not** perform real AI automation, model inference, or live workflow execution.
