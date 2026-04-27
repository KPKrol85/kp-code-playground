# Client Red Flag Detector

A standalone **KP_Code Digital Vault** utility that helps freelancers and small studios evaluate potential client cooperation risk before committing to a project.

## Files

- `index.html` – semantic page structure, content sections, checklist form, and live result panel
- `styles.css` – responsive mobile-first styling with CSS custom properties and accessible focus states
- `script.js` – vanilla JavaScript risk scoring logic, live updates, and reset behavior

## Risk scoring model

Each red flag has a weighted score:

- Mild: 1–2 points
- Medium: 3 points
- Severe: 4–5 points

Risk bands:

- **Low risk:** 0–6
- **Medium risk:** 7–15
- **High risk:** 16+

## Usage

Open `index.html` in a browser. Check and uncheck red flags to see the cooperation risk level update live.

## Notes

- Fully static: no framework, build tools, storage, or external assets.
- Educational decision-support tool only (not legal/financial advice).
