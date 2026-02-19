# Atelier No.02 — demonstracyjna strona restauracji fine dining

Statyczny projekt front-end (HTML/CSS/JS) prezentujący stronę restauracji Atelier No.02 z podstronami, trybem ciemnym, dynamicznym renderowaniem menu, galerią lightbox oraz wsparciem PWA/offline.

## Tech stack
- HTML5 (wiele stron statycznych)
- CSS3 (architektura modułowa: base/layout/components/pages/utilities)
- JavaScript (ES modules + bundling przez esbuild)
- PostCSS (`postcss-import` + `cssnano`)
- Service Worker + `manifest.webmanifest`

## Struktura projektu
```text
pr-02-atelier/
├── index.html
├── about.html
├── menu.html
├── gallery.html
├── cookies.html
├── polityka-prywatnosci.html
├── regulamin.html
├── offline.html
├── 404.html
├── css/
│   ├── style.css
│   ├── style.min.css
│   ├── base/
│   ├── layout/
│   ├── components/
│   ├── pages/
│   └── utilities/
├── js/
│   ├── script.js
│   ├── script.min.js
│   ├── app/
│   ├── core/
│   └── features/
├── data/
│   └── menu.json
├── assets/
│   ├── fonts/
│   ├── icons/
│   ├── img/
│   ├── img-src/
│   └── img-optimized/
├── scripts/
│   └── images/build-images.js
├── manifest.webmanifest
├── sw.js
├── robots.txt
├── sitemap.xml
├── _headers
├── package.json
├── package-lock.json
└── postcss.config.js
```

## Uruchomienie lokalne
Wymagany jest Node.js oraz npm (wersja Node nie jest jawnie zadeklarowana w plikach projektu).

1. Instalacja zależności:
   ```bash
   npm install
   ```
2. Serwer deweloperski:
   ```bash
   npm run dev:server
   ```
   Domyślnie aplikacja działa na `http://localhost:5173`.
3. Build assetów CSS/JS:
   ```bash
   npm run build
   ```
4. Generowanie zoptymalizowanych obrazów:
   ```bash
   npm run images:build
   ```

## Skrypty npm
- `build:css` — minifikacja `css/style.css` do `css/style.min.css`.
- `build:js` — bundling + minifikacja `js/script.js` do `js/script.min.js`.
- `build` — uruchamia `build:css` i `build:js`.
- `images:build` — generuje obrazy do `assets/img-optimized`.
- `dev:server` — uruchamia statyczny serwer HTTP.

## Dostępność
- Skip linki do treści głównej.
- Nawigacja mobilna z obsługą klawiatury i pułapką fokusa.
- Modal i lightbox z obsługą ESC, fokusowaniem i atrybutami ARIA.
- Widoczne style `:focus-visible`.
- Obsługa `prefers-reduced-motion` dla animacji reveal.

## Wydajność
- Fonty lokalne (`woff2`) z `font-display: swap`.
- `preload` dla kluczowych fontów.
- Responsywne obrazy (`avif/webp/jpg`, `srcset`, `sizes`, `loading="lazy"`).
- Minifikowane bundle CSS/JS (`*.min.*`).

## PWA / offline
- `manifest.webmanifest` z ikonami i ustawieniami instalowalnej aplikacji.
- `sw.js` cache’uje kluczowe zasoby i posiada fallback do `offline.html` dla nawigacji.
- Rejestracja Service Workera wykonywana po `load` na stronach HTML.

## Deployment
- W repo znajduje się plik `_headers` sugerujący konfigurację dla Netlify (cache + security headers).

## Licencja i autor
- Licencja: MIT.
- Autor: Kamil Król | KP_Code.
