# Atelier No.02 — Review-ready project documentation

## PL 🇵🇱

### Przegląd projektu
Atelier No.02 to wielostronicowy front-end restauracji fine dining (strona główna + podstrony: menu, galeria, o nas, strony prawne), z naciskiem na responsywność, semantyczny HTML, PWA i podstawowe mechanizmy offline.

### Kluczowe funkcje (potwierdzone w repo)
- Wielostronicowy serwis statyczny: `index.html`, `about.html`, `menu.html`, `gallery.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `404.html`, `offline.html`.
- Dynamiczne renderowanie sekcji menu z `data/menu.json` oraz filtrowanie kategorii po stronie klienta.
- Galeria z lightboxem, obsługą klawiatury i trybem pełnoekranowym.
- Przełączanie motywu (light/dark) z utrwaleniem wyboru w `localStorage`.
- Service Worker (`sw.js`) oraz manifest PWA (`manifest.webmanifest`).
- Pipeline build dla CSS/JS i optymalizacji obrazów (`postcss`, `esbuild`, `sharp`).

### Tech stack
- HTML5
- CSS3 (modułowa struktura plików + PostCSS/CSSNano)
- JavaScript (modułowy ES)
- Node.js tooling: `esbuild`, `postcss-cli`, `sharp`, `fast-glob`, `http-server`

### Struktura projektu (skrót)
```txt
pr-02-atelier/
├── *.html
├── css/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── utilities/
│   └── style.css
├── js/
│   ├── app/
│   ├── core/
│   ├── features/
│   └── script.js
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── img-optimized/
├── data/menu.json
├── scripts/images/build-images.js
├── package.json
├── postcss.config.js
├── sw.js
└── manifest.webmanifest
```

### Setup i uruchomienie
1. Instalacja zależności:
   ```bash
   npm ci
   ```
2. Lokalny serwer statyczny:
   ```bash
   npm run dev:server
   ```
3. Build CSS + JS:
   ```bash
   npm run build
   ```
4. Generowanie obrazów:
   ```bash
   npm run images:build
   ```

### Build i wdrożenie
- Projekt jest przygotowany do hostingu statycznego (np. Netlify) z plikami `_headers`, `robots.txt`, `sitemap.xml` i `manifest.webmanifest`.
- Ważne: HTML odwołuje się do `css/style.min.css` i `js/script.min.js`; przed wdrożeniem należy wykonać build, aby te pliki istniały.
- W repo występuje `_redirects.txt`; na Netlify standardowo oczekiwany jest plik `_redirects` (bez rozszerzenia).

### Dostępność (A11y)
**Zaimplementowane:**
- Skip link, landmarki (`header`, `nav`, `main`, `footer`), etykiety formularza, stany `aria-*` dla elementów interaktywnych.
- Komunikaty live (`aria-live`) dla statusów sieci i formularza.
- Lightbox z obsługą klawiatury (Esc, strzałki, Home/End).

**Luki / ryzyka:**
- Link „Pobierz menu PDF” wskazuje na brakujący plik `assets/docs/menu.pdf`, co pogarsza UX i dostępność zadania użytkownika.
- Brak automatycznej walidacji kontrastu w pipeline (warto dodać narzędziowy check).

### SEO
**Zaimplementowane:**
- `title`, `meta description`, `canonical`, OpenGraph/Twitter oraz JSON-LD na stronach.
- `robots.txt` i `sitemap.xml`.

**Luki / ryzyka:**
- `gallery.html` ma błędne metadane SEO skopiowane z `about.html` (canonical i `og:url` kierują do `about.html`, a treści OG/Twitter są „O nas”).
- `offline.html` nie ma canonical/robots (nie musi, ale warto jawnie ustawić `noindex`).

### Wydajność
- Plusy: wiele obrazów w AVIF/WebP/JPG, preloading fontów, minifikacja w skryptach build.
- Ryzyka: jeśli build nie został uruchomiony, strona ładuje nieistniejące pliki minifikowane (twarda regresja wydajności i funkcjonalności).

### Roadmap
1. Naprawić i zautomatyzować kontrolę poprawności ścieżek assetów (404 check w CI).
2. Dodać test linków i metadanych SEO per podstrona.
3. Dodać pipeline lint/test (np. ESLint + HTML validator + Lighthouse CI).
4. Uporządkować konfigurację Netlify (`_redirects`, walidacja `_headers`).
5. Ograniczyć wstrzykiwanie HTML z JSON (bezpieczne escapowanie danych).

### Licencja
Projekt używa licencji MIT (zgodnie z `package.json`) oraz repo zawiera `LICENSE` na poziomie głównym.

---

## EN 🇬🇧

### Project overview
Atelier No.02 is a multi-page fine-dining restaurant front-end (home + menu, gallery, about, legal pages) focused on responsiveness, semantic HTML, PWA basics, and offline support.

### Key features (verified in repository)
- Static multi-page site: `index.html`, `about.html`, `menu.html`, `gallery.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `404.html`, `offline.html`.
- Client-side menu rendering from `data/menu.json` with category filtering.
- Gallery lightbox with keyboard support and fullscreen mode.
- Light/dark theme switching persisted in `localStorage`.
- Service Worker (`sw.js`) and PWA manifest (`manifest.webmanifest`).
- Build pipeline for CSS/JS and image optimization (`postcss`, `esbuild`, `sharp`).

### Tech stack
- HTML5
- CSS3 (modular stylesheet architecture + PostCSS/CSSNano)
- JavaScript (modular ES)
- Node.js tooling: `esbuild`, `postcss-cli`, `sharp`, `fast-glob`, `http-server`

### Project structure (brief)
```txt
pr-02-atelier/
├── *.html
├── css/
├── js/
├── assets/
├── data/menu.json
├── scripts/images/build-images.js
├── package.json
├── postcss.config.js
├── sw.js
└── manifest.webmanifest
```

### Setup & run
1. Install dependencies:
   ```bash
   npm ci
   ```
2. Start local static server:
   ```bash
   npm run dev:server
   ```
3. Build CSS + JS:
   ```bash
   npm run build
   ```
4. Generate optimized images:
   ```bash
   npm run images:build
   ```

### Build & deployment notes
- This is deployable as a static site (e.g., Netlify) with `_headers`, `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`.
- Important: HTML references `css/style.min.css` and `js/script.min.js`; run build before deployment.
- Repository contains `_redirects.txt`; Netlify expects `_redirects` (without extension).

### Accessibility notes
**Implemented:**
- Skip link, semantic landmarks (`header`, `nav`, `main`, `footer`), labeled form fields, `aria-*` states for interactive UI.
- `aria-live` status announcements for network and form feedback.
- Keyboard-enabled lightbox navigation.

**Missing / risk areas:**
- “Download menu PDF” points to a missing `assets/docs/menu.pdf`, breaking a key user flow.
- No automated contrast/accessibility auditing in the current build pipeline.

### SEO notes
**Implemented:**
- `title`, `meta description`, `canonical`, OpenGraph/Twitter metadata, and JSON-LD across pages.
- `robots.txt` and `sitemap.xml`.

**Missing / risk areas:**
- `gallery.html` has copied metadata from `about.html` (canonical and `og:url` point to `about.html`, OG/Twitter content mismatch).
- `offline.html` has no explicit canonical/robots directives (optional but recommended to set `noindex`).

### Performance notes
- Strengths: AVIF/WebP/JPG image variants, font preloading, minification scripts.
- Risk: without build output files present, referenced minified assets are missing (hard runtime/deployment failure).

### Roadmap
1. Add automated asset path validation (404 checks in CI).
2. Add SEO metadata checks per page.
3. Add lint/test pipeline (ESLint + HTML validation + Lighthouse CI).
4. Normalize Netlify config (`_redirects`, validate `_headers` syntax).
5. Replace unsafe string-based HTML rendering with escaped templating.

### License
MIT license (declared in `package.json`), with `LICENSE` available at repository root.
