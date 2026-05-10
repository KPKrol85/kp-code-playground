# Freelancer Offer Builder

Professional static mini-tool for freelancers, web designers, developers, and small studios to prepare clear client-facing service offers.

## When to use
Use it when preparing website/product offers with scoped deliverables, optional add-ons, timeline assumptions, collaboration terms, responsibilities, exclusions, and proposal-ready messaging.

## Main features
- Offer context capture (client/project/business data)
- Package selection (Starter, Business, Premium, Custom)
- Core deliverables by category
- Optional add-ons with tags
- Timeline, milestones, revisions, launch window
- Payment/collaboration terms (practical, non-legal framing)
- Client responsibilities and exclusions
- Tone-adaptive generated offer and email intro
- Complexity scoring (scope complexity only, no automatic pricing)
- Automatic attention/risk notes
- Internal freelancer notes output
- Copy full offer / copy email intro / print / save locally / reset

## Package types
Starter, Business, Premium, Custom.

## Deliverable categories
Strategy & Planning, Design/UI, Development, SEO/Performance, Deployment, Handoff.

## Optional add-ons
Content, design, development, SEO, integration, maintenance, and custom add-ons are included as selectable options.

## Complexity scoring
Weighted by selected deliverables/add-ons/milestones/terms:
- 0–20: Simple Offer
- 21–45: Standard Offer
- 46–75: Advanced Offer
- 76+: Custom / High-Complexity Offer

## Attention/risk notes
Automatically highlights scope, content, technical, revision, payment, legal/content ownership, and maintenance attention areas based on selected options.

## Generated outputs
- Client-facing structured offer
- Client email intro
- Internal freelancer notes block

## Privacy
All data is stored locally in your browser via `localStorage`. No external requests or backend storage.

## Stack
- HTML
- CSS
- Vanilla JavaScript

## File structure
```text
digital-vault-freelancer-offer-builder/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── docs/
    └── freelancer-offer-builder.md
```

## Quick test
1. Open `index.html` in a browser.
2. Fill context fields, choose package, and select scope options.
3. Check live summary, complexity, risk notes, and generated outputs.
4. Test copy buttons, print, save locally, reload, and reset.
