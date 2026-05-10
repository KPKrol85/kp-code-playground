# Client Readiness Scorecard

A production-ready KP_Code Digital Vault mini-tool to evaluate whether a website client is truly prepared to start a project.

## Who this is for
- Freelancers
- Web designers and developers
- Small studios and agencies

## Main features
- Client/project information intake form
- 8-category readiness scorecard (40 questions total)
- Automatic score, percentage, and status calculation
- Category-level strengths and weaknesses
- Smart recommendations based on weak areas
- Report generation with risks, next steps, and notes
- Copy report to clipboard
- Print-friendly report (PDF-ready)
- Local save/load via browser localStorage
- Safe full reset with confirmation

## How to use
1. Open `index.html` in any modern browser.
2. Fill in client/project details.
3. Score each question from 0 to 2.
4. Review the live summary panel and recommendations.
5. Use **Copy report** or **Print report** for handoff.
6. Use **Save locally** to persist progress in your browser.

## Scoring system
- Each question uses:
  - `0` = not ready / missing
  - `1` = partially ready
  - `2` = ready
- 8 categories × 5 questions × 2 points = **80 max score**.
- Final percentage = `(total score / 80) × 100`.

## Readiness status levels
- **0–39%**: High Risk Client
- **40–69%**: Needs Preparation
- **70–84%**: Almost Ready
- **85–100%**: Ready to Start

## Privacy note
All data remains in the browser and is stored locally using `localStorage`. No external services are used.

## Technical stack
- HTML5
- CSS3 (custom properties, grid/flex, responsive + print styles)
- Vanilla JavaScript (configuration-driven rendering and scoring logic)

## File structure
```
digital-vault-client-readiness-scorecard/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── docs/
    └── client-readiness-scorecard.md
```
