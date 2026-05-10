# Website Scope Builder

A professional static mini-tool for defining clear website project scope before proposals, contracts, and production.

## Who it is for
Freelancers, web designers, developers, and small studios.

## When to use it
Use during discovery and pre-proposal planning to align pages, features, responsibilities, and delivery scope.

## Main features
- Project basics intake
- Config-driven scope modules (pages, content, design, features, e-commerce, SEO, technical, accessibility, handoff, maintenance)
- Complexity scoring with category assignment
- Automatic risk detection and recommended next steps
- Proposal-friendly scope report generation
- Copy to clipboard, print/PDF output, local save/load, and safe reset

## Complexity scoring
Each scope item has a weighted impact:
- Simple = 1
- Medium = 2
- Advanced = 3
- High-impact/custom = 5
- Custom pages add 2 points each

## Scope categories
- **0–20**: Starter Scope
- **21–45**: Standard Website Scope
- **46–75**: Advanced Website Scope
- **76+**: Complex / Custom Project Scope

## Risk detection
The tool flags practical risks for content ownership, e-commerce/payment flows, timeline pressure, technical access/deployment, legal/privacy needs, and custom functionality.

## Privacy note
All data stays in the browser via localStorage. Nothing is sent to external services.

## Technical stack
- HTML
- CSS
- Vanilla JavaScript (no dependencies)

## File structure
```
digital-vault-website-scope-builder/
├── index.html
├── README.md
├── assets/
│   ├── css/style.css
│   └── js/main.js
└── docs/website-scope-builder.md
```

## Quick testing
1. Open `index.html` in a browser.
2. Fill project basics and select scope items.
3. Verify live score/category/risk updates.
4. Click **Copy scope report** and paste into a text editor.
5. Click **Print / save as PDF** and confirm print-friendly report.
6. Click **Save locally**, refresh page, confirm values load.
7. Click **Reset builder** and confirm state clears after confirmation.
