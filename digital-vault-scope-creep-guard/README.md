# Scope Creep Guard

**Scope Creep Guard** is a standalone KP_Code Digital Vault mini product for quickly classifying client requests and choosing the right response path.

## Who this is for

- Freelance web designers and developers
- Small web studios
- Project leads handling client communication and delivery scope

## What problem it solves

Freelancers and studios often receive requests that sound small but can expand effort, timeline, and budget. This tool provides a consistent scoring framework so you can make calm, professional, and defensible scope decisions in minutes.

## Included files

- `index.html` — standalone product interface and content sections
- `styles.css` — dark, professional KP_Code Digital Vault styling
- `script.js` — live scoring logic, category outputs, reset behavior, and copy response feature
- `README.md` — product guide and customization notes

## Assessment fields

The tool evaluates requests using these fields:

1. Request type
2. Included in original agreement
3. Estimated effort
4. Timeline impact
5. Price impact
6. New client assets/decisions required
7. Project phase
8. Internal request notes

## Scoring logic overview

Each field maps to a point value. Higher totals indicate greater scope risk.

### Core scoring

- **Agreement:** yes (0), partly (2), unclear (3), no (4)
- **Effort:** less than 30 minutes (0), 30 minutes to 2 hours (1), half day (3), full day or more (5)
- **Timeline:** no (0), slightly (1), unknown (2), yes (3)
- **Price:** no (0), maybe (2), unknown (2), yes (4)
- **Client assets/decisions:** no (0), unclear (1), yes (2)

### Modifiers

- **Request type:**
  - content change (0)
  - design change (1)
  - technical fix (1)
  - SEO or analytics request (2)
  - new page or section (3)
  - integration (4)
  - new feature (5)
  - post-launch support (4)
- **Project phase:** discovery (0), design (1), development (2), review (3), pre-launch (4), post-launch (5)

## Result categories

- **0–3 points:** Included / low risk
  - Action: handle within current scope
- **4–7 points:** Minor scope risk
  - Action: clarify before implementation
- **8–12 points:** Change request
  - Action: document and approve before work
- **13+ points:** Out of scope
  - Action: estimate separately before implementation

Each category includes a practical suggested client response in a professional, calm, and clear tone.

## How to customize scoring

Open `script.js` and adjust:

- `scores` object to change point values for each field option
- `categories` array to tune thresholds, labels, and recommended actions
- Response templates if you want a different voice for your brand or client type

## Suggested usage in freelance or studio workflow

1. Assess every non-trivial request before scheduling implementation.
2. Share the suggested response with slight edits for project context.
3. For 8+ scores, log a formal change request before starting work.
4. Reconfirm timeline and budget impacts in writing.
5. Keep assessment notes in your project management tool for delivery history.

## Important note

This tool supports internal decision-making and client communication discipline. It does **not** replace your contract terms, legal review, or professional legal advice.

## KP_Code Digital Vault note

Scope Creep Guard is designed as a practical, reusable product asset that can fit directly into the broader KP_Code Digital Vault library of professional delivery tools.
