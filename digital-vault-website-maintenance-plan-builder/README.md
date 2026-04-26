# Website Maintenance Plan Builder

A standalone **KP_Code Digital Vault** mini product for building transparent, professional website maintenance plans for recurring care services.

## Who this is for

- Freelancers providing ongoing website support.
- Small studios packaging maintenance retainers.
- Service providers planning monthly website care offers.

## What problem it solves

It helps convert service assumptions into a structured maintenance plan with:

- transparent tier recommendation,
- estimated monthly starting pricing,
- clear included service scope,
- ready-to-copy client-facing summary language.

This speeds up proposal preparation and helps avoid vague maintenance packages.

## Included files

- `index.html` — standalone product UI with form, live result panel, guidance sections, and footer.
- `styles.css` — dark professional KP_Code Digital Vault styling with responsive layout and accessible focus states.
- `script.js` — vanilla JavaScript scoring, tier recommendation, pricing estimation, summary generation, and copy behavior.
- `README.md` — product documentation and customization guide.

## Builder fields

The builder includes:

1. Website type
2. Update frequency
3. Backup policy
4. Monitoring level
5. Monthly support hours
6. Custom support hours (0–40, shown when custom selected)
7. Minor content edits
8. Technical updates
9. Monthly report
10. SEO check
11. Priority support
12. Emergency fixes
13. Client-facing tone

## Tier recommendation logic

The recommendation is points-based and fully visible in code.

### Scoring inputs

- **Website type:** 1 / 3 / 5 / 6 points
- **Update frequency:** 1 / 2 / 4 / 6 points
- **Backup policy:** 0 / 1 / 2 / 4 points
- **Monitoring:** 0 / 1 / 3 / 5 points
- **Support hours:**
  - fixed options use predefined points,
  - custom uses `min(customHours, 10)`.
- **Checkboxes:**
  - minor content edits +1
  - technical updates +2
  - monthly report +1
  - SEO check +2
  - priority support +3
  - emergency fixes +4

### Thresholds

- **0–6:** Essential Care
- **7–13:** Growth Care
- **14–21:** Pro Care
- **22+:** Priority Care

## Monthly price logic

The estimator uses tier base pricing (PLN):

- Essential Care: 350 PLN
- Growth Care: 750 PLN
- Pro Care: 1400 PLN
- Priority Care: 2400 PLN

Then modifiers are applied:

- Website type adders (WordPress/ecommerce/custom)
- Backup adders (weekly/daily)
- Monitoring adders
- `supportHours * 120 PLN`
- Optional adders: SEO check, priority support, emergency fixes, monthly report

Currency output uses `Intl.NumberFormat('pl-PL', { currency: 'PLN' })`.

> Displayed value is an **estimated monthly starting price**, not a guaranteed final offer.

## Included services logic

The included services list is generated from selected options and always reflects:

- update cadence,
- backup policy,
- monitoring level,
- monthly support hours,
- selected optional items.

This gives a practical client-facing service checklist.

## Generated summary behavior

The summary adapts to selected tone:

- **Clear and simple** — plain language.
- **Premium and professional** — business-oriented wording.
- **Technical and detailed** — explicit technical scope language.

Each summary includes:

- recommended tier,
- estimated monthly starting price,
- included scope,
- support hours,
- exclusions / out-of-scope note,
- reminder to confirm exact terms in writing.

## Copy feature

The **Copy maintenance plan** button copies:

- product title,
- recommended plan name,
- estimated monthly price,
- selected included services,
- generated summary,
- disclaimer text.

Clipboard API is used first, with `document.execCommand('copy')` fallback.

## How to customize tiers, scoring, prices, and templates

Open `script.js` and edit the central `config` object:

- `config.scoring` for points,
- `config.tiers` for thresholds and base prices,
- `config.priceModifiers` for service adders,
- `config.tones` for summary templates,
- `config.labels` for display naming.

This keeps product adaptation fast for regional pricing, niche service lines, or agency model changes.

## Suggested usage in freelancer / studio workflow

1. Use during discovery to align expected support scope.
2. Generate draft plan internally for margin and risk checks.
3. Copy summary into proposal drafts and onboarding docs.
4. Finalize SLA/contract terms separately.
5. Re-run when client scope grows.

## Suggested connection to future KP_Code Digital Studio services

This builder can act as a front-layer planning product for broader recurring services such as:

- website maintenance retainers,
- technical support subscriptions,
- quality monitoring packages,
- incident and escalation care plans.

It can evolve into a larger KP_Code Digital Studio service calculator and packaging assistant.

## Important notes

This product supports planning and communication only.
It **does not replace**:

- a written commercial offer,
- accounting or tax advice,
- legal advice,
- SLA definitions,
- signed service contract terms.

## KP_Code Digital Vault note

This product is intentionally standalone, practical, and reusable so it can fit naturally into the future **KP_Code Digital Vault** product library.
