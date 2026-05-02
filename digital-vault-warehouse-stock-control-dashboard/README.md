# Warehouse Stock Control Dashboard

## Purpose
A standalone SaaS-style prototype in the KP_Code Digital Vault ecosystem for monitoring stock health, inventory value, and purchasing priorities.

## Target users
Small businesses, warehouse operators, ecommerce operations teams, field/service businesses, and inventory coordinators.

## Core features
- KPI cards for stock exposure and value.
- Inventory status automation (OK, Low stock, Critical, Overstock, Stale stock, No supplier, Review needed).
- 0-100 risk scoring with severity labels.
- Data-driven restock recommendation engine.
- Purchase list generator with copy-to-clipboard plain text export.
- Add/edit/delete/reset inventory workflows.
- Search, filter, and sort controls.
- Decision-support insight panel.
- Local persistence via `localStorage`.

## File structure
- `index.html` – app shell, sections, controls, form, and accessibility live regions.
- `styles.css` – mobile-first SaaS visual system with CSS variables and responsive layouts.
- `script.js` – inventory model, status/risk logic, state management, rendering, and persistence.
- `README.md` – product and implementation documentation.

## Run locally
1. Open `index.html` in any modern browser.
2. No build tools, dependencies, or backend required.

## Data model
Each inventory item stores:
- `id`, `name`, `sku`, `category`
- `currentStock`, `minimumStock`, `optimalStock`
- `unitCost`, `supplier`, `leadTime`
- `lastMovement`, `location`, `notes`

## Scoring logic overview
Risk score (0-100) weighs:
- below-minimum or near-zero stock,
- long supplier lead time,
- stale movement date,
- missing supplier,
- high inventory value,
- overstock signals,
- weak notes/review indicators.

Risk labels:
- 0–25 Low risk
- 26–50 Medium risk
- 51–75 High risk
- 76–100 Critical risk

## localStorage behavior
- Inventory persists under `kpcode_warehouse_stock_dashboard_v1`.
- App loads saved inventory if present; otherwise demo data.
- Reset removes saved state and restores seeded demo items.

## Accessibility notes
- Semantic sections and table structure.
- Labelled form controls.
- `aria-live` regions for insights, form feedback, and copy status.
- Action controls use proper buttons.
- Responsive card layout for smaller screens.
- Reduced-motion support.

## Future SaaS upgrade ideas
- CSV import/export
- PDF purchase report
- Barcode scanner mode
- Supplier database
- Multi-warehouse support
- User accounts
- Backend/API integration
- Email low-stock alerts
- AI restock assistant
- Role-based access
- Charts and trend analysis

## KP_Code Digital Vault positioning
This product is an operational dashboard concept for the KP_Code ecosystem: a practical, extensible business module that can grow into a multi-tenant SaaS inventory platform.
