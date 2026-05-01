# Improvements

## 2026-05-01 — Accessibility / Navigation

- Implemented the existing `trapFocus` utility for the mobile navigation drawer.
- The focus trap is active only while the mobile menu is open, releases on close or desktop resize, and returns focus to the menu toggle through the existing close flow.
- Verification: `npm run build` passed.
