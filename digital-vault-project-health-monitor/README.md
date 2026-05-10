# Project Health Monitor

Project Health Monitor is a premium static Digital Vault mini-tool for assessing the operational health of active client delivery projects.

## Who this is for
- Freelancers
- Web designers and developers
- Small studios managing client website/app delivery

## When to use it
Use it during active delivery to evaluate health before milestones, revision rounds, and launch decisions.

## Main features
- Project snapshot capture
- 9-category health assessment (45 questions)
- Live score (0-90) and percentage
- Health status: Critical / At Risk / Watch / Healthy
- Risk radar detection by weak categories
- Recommended corrective actions
- Internal Project Health Report generator
- Client-facing status update draft generator
- Copy report/client draft, print PDF-friendly output
- Save/load locally via localStorage
- Safe reset flow

## Project health categories
1. Communication Health
2. Content & Asset Delivery
3. Scope Control
4. Timeline & Milestones
5. Feedback Quality
6. Payment & Agreement Health
7. Technical Delivery Health
8. Client Decision Health
9. Launch Readiness

## Scoring system
- Each question: 0 (blocked), 1 (attention), 2 (healthy)
- 45 questions total
- Maximum score: 90
- Unanswered questions are treated as 0

## Health status explanation
- 0–39%: Critical
- 40–64%: At Risk
- 65–84%: Watch
- 85–100%: Healthy

## Risk radar
Weak category scores trigger specific operational risks (communication delay, content blocker, scope creep, timeline, feedback chaos, payment, technical access, decision bottleneck, launch readiness).

## Client status draft
Generates a calm, neutral, and professional message you can quickly refine and send to clients.

## Privacy note
All data stays locally in your browser (localStorage). No external services are used.

## Technical stack
- HTML
- CSS
- Vanilla JavaScript

## File structure
- `index.html`
- `assets/css/style.css`
- `assets/js/main.js`
- `docs/project-health-monitor.md`

## Quick testing
1. Open `index.html` in a browser.
2. Fill project snapshot fields.
3. Score questions in each category.
4. Review live summary, risks, recommendations, and generated report text.
5. Test copy buttons, save/load locally, print, and reset.
