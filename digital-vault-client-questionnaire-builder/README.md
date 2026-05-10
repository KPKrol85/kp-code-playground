# Client Questionnaire Builder

A production-style static Digital Vault mini-tool for freelancers, web designers, developers, and small studios to generate tailored client discovery questionnaires before website projects.

## Who it is for
- Freelancers and studios handling website discovery and proposal workflows.

## When to use it
- Discovery calls
- Project brief prep
- Proposal planning
- Early client communication

## Main features
- Project context capture
- Config-driven module selection
- Depth-based question generation (Quick / Standard / Deep Discovery)
- Project-type-specific question injection
- Client intro message generator
- Internal freelancer notes and next steps
- Copy questionnaire / copy intro
- Print to PDF-friendly output
- Local save/load via browser storage

## Supported project types
Business website, Landing page, E-commerce, Portfolio, Blog / content site, Web app / dashboard, Existing website redesign, Personal brand website, Other.

## Depth model
- Quick: high-priority discovery questions
- Standard: balanced scoping set
- Deep Discovery: fuller planning questionnaire

## Modules
Ten selectable modules from strategy through technical access and decision process. All are selected by default.

## How it works
Questions are stored in structured JavaScript configuration objects and filtered dynamically by selected modules, depth, and project type.

## Privacy
All data stays locally in your browser (localStorage). No external services are used.

## Technical stack
- HTML
- CSS
- Vanilla JavaScript

## File structure
- `index.html`
- `assets/css/style.css`
- `assets/js/main.js`
- `docs/client-questionnaire-builder.md`

## Quick testing
1. Open `index.html` directly in a browser.
2. Fill project context and adjust module/depth settings.
3. Verify output changes and copy/print/save/reset actions.
