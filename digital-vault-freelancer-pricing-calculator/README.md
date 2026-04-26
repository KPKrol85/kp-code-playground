# Freelancer Website Pricing Calculator

A standalone KP_Code Digital Vault mini product that helps freelancers produce a clear, structured website project estimate in PLN.

## Who this is for

- Freelance web designers and developers
- Small digital studios
- Consultants preparing fast first-pass website quotes

## What problem it solves

Freelancers often need a repeatable way to scope and price website projects without rebuilding quote logic each time. This calculator provides a transparent framework so pricing discussions start with clear assumptions.

## Included files

- `index.html` — full standalone calculator UI and content structure
- `styles.css` — dark professional Digital Vault styling, responsive layout, accessible focus states
- `script.js` — pricing logic, validation, live recalculation, PLN formatting, reset behavior
- `README.md` — product guide and customization notes

## Calculator fields

1. Website type
   - Simple landing page
   - Small business website
   - Portfolio website
   - Service website
   - Extended company website
2. Number of pages (1–30)
3. Contact form (yes/no)
4. CMS integration (yes/no)
5. SEO starter setup (yes/no)
6. Revision rounds (1, 2, 3, 4+)
7. Express deadline (yes/no)
8. Business margin (0%–50%)

## Pricing logic overview

### Base prices

- Simple landing page: 1200 PLN
- Small business website: 2200 PLN
- Portfolio website: 1800 PLN
- Service website: 2600 PLN
- Extended company website: 3800 PLN

### Additional scope costs

- Each additional page after page 1: +250 PLN
- Contact form: +300 PLN
- CMS integration: +1200 PLN
- SEO starter setup: +600 PLN
- Revision rounds:
  - 1 round: +0 PLN
  - 2 rounds: +250 PLN
  - 3 rounds: +500 PLN
  - 4+ rounds: +900 PLN
- Express deadline: +25% of subtotal before margin

### Margin logic

- Business margin is applied last.
- Margin amount = subtotal × selected margin (%)
- Final estimate = subtotal + margin amount

## How to customize prices

Open `script.js` and edit the `pricingConfig` object:

- `basePrices` for website-type baselines
- `extras` for feature and revision costs
- `expressMultiplier` for rush fee percentage
- `limits` for input ranges
- `defaults` for the initial calculator state

All values are centralized to keep updates fast and maintainable.

## Suggested usage

- Use this tool during discovery calls for a fast scope-based estimate.
- Export or copy results into your proposal document.
- Reconfirm final price after detailed requirements and technical review.

## Important estimate note

This calculator provides an indicative estimate only. It is not a legal offer, final commercial quote, or contract. Final pricing should always be confirmed in a formal proposal and signed agreement.

## KP_Code Digital Vault note

This product is designed as a practical, reusable building block for the KP_Code Digital Vault library of professional freelance tools.
