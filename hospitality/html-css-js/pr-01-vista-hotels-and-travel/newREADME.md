# Vista — Hotels & Travel (PL)

## Opis projektu
Vista — Hotels & Travel to statyczny, wielostronicowy projekt front-end (HTML/CSS/JS) dla branży turystyczno-hotelarskiej. Projekt zawiera motyw jasny/ciemny/auto, PWA z trybem offline, galerie z lightboxem i filtrami, nawigację mobilną oraz formularz kontaktowy z walidacją po stronie klienta.

## Funkcje / Highlights
- Wielostronicowa struktura (m.in. strona główna, pokoje, oferty, galeria, kontakt, regulaminy).
- Motyw Light/Dark/Auto z zapisem preferencji.
- Nawigacja mobilna z aria-controls/aria-expanded i obsługą klawiatury.
- Formularz rezerwacyjny z walidacją oraz komunikatami błędów (aria-live).
- Galerie z filtrami i lightboxem.
- PWA: manifest, service worker, offline fallback.
- SEO: meta tags, OG/Twitter, canonical, robots.txt, sitemap.xml, JSON-LD.

## Tech stack
- HTML5
- CSS (PostCSS + modularne pliki CSS)
- Vanilla JavaScript (moduły ES)
- PWA (manifest + service worker)
- Netlify (_headers, _redirects)

## Struktura projektu
```
pr-01-vista-hotels-and-travel/
├─ assets/
├─ css/
│  ├─ modules/
│  └─ style.css
├─ js/
│  ├─ features/
│  └─ script.js
├─ netlify/
│  ├─ _headers
│  └─ _redirects
├─ pwa/
│  └─ service-worker.js
├─ scripts/
│  └─ optimize-images.mjs
├─ *.html
├─ site.webmanifest
├─ robots.txt
└─ sitemap.xml
```

## Uruchomienie lokalne
Jeśli chcesz tylko podejrzeć projekt, otwórz `index.html` w przeglądarce lub użyj prostego serwera statycznego.

Jeśli chcesz budować CSS/obrazy:
```bash
npm install
npm run css:watch
npm run build
```

## Dostępność (a11y)
Wdrożone:
- Skip link do głównej treści.
- Widoczne stany focus (`:focus-visible`).
- Nawigacja mobilna i lightbox z obsługą klawiatury.
- Formularz z komunikatami błędów (aria-live) i atrybutami ARIA.

Testy manualne:
- Klawiatura: Tab/Shift+Tab, Enter/Space, ESC.
- Screen reader: VoiceOver/NVDA – sprawdź nawigację, formularz oraz lightbox.

## Performance
Wdrożone:
- Responsywne obrazy (srcset, AVIF/WebP/JPG).
- Preload hero + `fetchpriority`.
- Lazy-loading dla większości obrazów.
- `font-display: swap`.

Rekomendacje:
- Dalsze ograniczanie krytycznego CSS oraz preloading kluczowych fontów.
- Weryfikacja LCP/CLS/INP w Lighthouse.

## SEO & Social
Wdrożone:
- Unikalne `<title>` i `meta description` na stronach.
- `canonical`, `robots.txt`, `sitemap.xml`.
- OG/Twitter cards.
- JSON-LD ładowany z plików w `assets/seo/`.

TODO:
- Ustalenie docelowych adresów (canonical/OG) dla środowiska produkcyjnego.
- Ewentualne rozszerzenie danych strukturalnych (np. ofert/FAQ).

## PWA / Offline
- `site.webmanifest` + ikony.
- Service Worker z cache dla HTML i assetów.
- Strona `offline.html` jako fallback.

## Deploy
- Konfiguracja Netlify: `_headers` i `_redirects`.
- Produkcyjny URL: [TODO]

## Roadmap
- Poprawa CSP pod inline style/third-party (np. mapy) i dodanie HSTS.
- Ujednolicenie obsługi preferencji motywu przed renderem (eliminacja potencjalnego FOUC).
- Optymalizacja obrazów hero pod LCP (bardziej agresywne formaty/rozmiary).
- Uzupełnienie braków w a11y (np. role/aria dla dodatkowych komponentów, testy kontrastu).

## License
MIT — zobacz główny plik `LICENSE` w repozytorium.

---

# Vista — Hotels & Travel (EN)

## Project description
Vista — Hotels & Travel is a static, multi‑page front‑end project (HTML/CSS/JS) for the hospitality and travel domain. It includes light/dark/auto theme support, PWA offline mode, galleries with lightbox and filters, mobile navigation, and a contact/booking form with client-side validation.

## Features / Highlights
- Multi‑page structure (home, rooms, offers, gallery, contact, legal pages).
- Light/Dark/Auto theme with persisted preference.
- Mobile navigation with aria-controls/aria-expanded and keyboard support.
- Booking form with validation and aria-live errors.
- Galleries with filters and lightbox.
- PWA: manifest, service worker, offline fallback.
- SEO: meta tags, OG/Twitter, canonical, robots.txt, sitemap.xml, JSON‑LD.

## Tech stack
- HTML5
- CSS (PostCSS + modular CSS files)
- Vanilla JavaScript (ES modules)
- PWA (manifest + service worker)
- Netlify (_headers, _redirects)

## Project structure
```
pr-01-vista-hotels-and-travel/
├─ assets/
├─ css/
│  ├─ modules/
│  └─ style.css
├─ js/
│  ├─ features/
│  └─ script.js
├─ netlify/
│  ├─ _headers
│  └─ _redirects
├─ pwa/
│  └─ service-worker.js
├─ scripts/
│  └─ optimize-images.mjs
├─ *.html
├─ site.webmanifest
├─ robots.txt
└─ sitemap.xml
```

## Local setup
To preview the project, open `index.html` in a browser or use any static server.

For CSS/image tooling:
```bash
npm install
npm run css:watch
npm run build
```

## Accessibility (a11y)
Implemented:
- Skip link to main content.
- Visible focus states (`:focus-visible`).
- Keyboard support for mobile navigation and lightbox.
- Form validation messages with ARIA.

Manual testing:
- Keyboard: Tab/Shift+Tab, Enter/Space, ESC.
- Screen reader: VoiceOver/NVDA – verify navigation, form, and lightbox behavior.

## Performance
Implemented:
- Responsive images (srcset, AVIF/WebP/JPG).
- Hero preload + `fetchpriority`.
- Lazy‑loading on most images.
- `font-display: swap`.

Recommendations:
- Reduce critical CSS further and preload key fonts.
- Verify LCP/CLS/INP in Lighthouse.

## SEO & Social
Implemented:
- Unique `<title>` and `meta description` per page.
- `canonical`, `robots.txt`, `sitemap.xml`.
- OG/Twitter cards.
- JSON‑LD loaded from `assets/seo/`.

TODO:
- Confirm production URLs for canonical/OG metadata.
- Extend structured data (e.g., offers/FAQ) if needed.

## PWA / Offline
- `site.webmanifest` + icons.
- Service Worker with HTML/static caching.
- `offline.html` fallback.

## Deploy
- Netlify configuration: `_headers` and `_redirects`.
- Production URL: [TODO]

## Roadmap
- Adjust CSP for inline styles/third‑party embeds and add HSTS.
- Apply theme preference before first paint (avoid potential FOUC).
- Optimize hero images for LCP.
- Extend a11y checks (roles/aria patterns, contrast testing).

## License
MIT — see the root `LICENSE` file in the repository.
