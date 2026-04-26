# Project Payment Planner

**KP_Code Digital Vault** standalone product for freelancers and small web studios that need a clear way to plan deposits, milestone billing, and final project settlements.

## Who this product is for

- Freelance website developers
- Small design and web studios
- Client-service teams preparing project proposals and invoice plans

## What problem it solves

Project payment plans are often improvised, inconsistent, and hard to verify when VAT, milestones, and rounding are involved. This planner gives a transparent structure where percentages, invoice rows, and total amounts always reconcile.

## Included files

- `index.html` — standalone app interface with planner form, results panel, guidance sections, and branding
- `styles.css` — dark professional KP_Code Digital Vault styling and responsive layout
- `script.js` — vanilla JavaScript engine for payment, VAT, rounding, scheduling, validation, and copy export
- `README.md` — product guide and implementation notes

## Planner fields

1. Project total amount (PLN)
2. Payment model
3. Custom split percentages (deposit / milestone / final)
4. Number of milestones (0–3)
5. Project start date
6. Planned duration (1, 2, 4, 6, 8, 12 weeks)
7. VAT mode (none or +23%)
8. Invoice label prefix (default `KP-DV`)
9. Payment due days (0–60, default 7)

## Payment models

- `30 / 40 / 30`
- `40 / 40 / 20`
- `50 / 30 / 20`
- `50 / 50`
- `100 upfront`
- `custom split`

Custom split validation requires `deposit + milestone + final = 100` exactly. If invalid, the planner blocks schedule output so users do not receive misleading totals.

## VAT logic

- **No VAT / net amount only**: input amount is used directly as schedule total.
- **Add 23% VAT**: input amount is treated as net, VAT is calculated, and gross amount is used for all invoice rows.

## Rounding and accuracy rules

- All monetary calculations run in **integer grosze** (not floating-point PLN arithmetic).
- Project value is converted from PLN to grosze at input.
- Payment row amounts are generated in grosze.
- If rounding leaves any difference, the final row receives the exact adjustment in grosze.
- The sum of all rows always equals the planned project schedule total exactly.

## Schedule generation logic

- Deposit invoice uses project start date.
- Milestone invoices are spaced across the selected project duration.
- Final invoice uses project end date.
- Due date = issue date + selected due days.
- If no start date is selected, amounts still calculate but rows display `not scheduled yet` and a schedule reminder is shown.
- If milestone pool exists but user selects `0 milestones`, milestone value is moved into final payment with a visible note.

## How to customize payment models

In `script.js`, update the `MODEL_CONFIG` object with your own named split structures:

- `label`
- `depositPct`
- `milestonePct`
- `finalPct`

Keep values integer percentages and ensure each model totals 100 unless intentionally handling special logic.

## Suggested workflow usage

1. Start with net budget or quoted project amount.
2. Select a payment model based on project risk and delivery structure.
3. Set milestones and timeline.
4. Set due-day policy aligned with your invoice terms.
5. Copy the generated payment plan into a proposal, client brief, or project onboarding document.
6. Confirm legal/tax alignment before issuing real invoices.

## Compliance and professional note

This tool supports business planning and communication. It does **not** replace accounting, tax, legal, or contract advice.

## KP_Code Digital Vault note

This standalone planner is designed as a practical, production-style asset for the broader KP_Code Digital Vault product library.
