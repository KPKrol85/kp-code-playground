# AUDIT — Atelier No.02 (senior front-end review)

## 1) Executive summary
Projekt ma solidną bazę UX/A11y/SEO i czytelny podział kodu front-endowego, ale obecny stan repo zawiera kilka istotnych ryzyk wdrożeniowych (brak wygenerowanych assetów produkcyjnych, brakujący plik PDF, błędne metadane SEO na podstronie galerii, potencjalnie błędna konfiguracja Netlify).

## 2) P0 – Potential risks / critical issues
- **Brak plików produkcyjnych CSS/JS referowanych przez HTML**: wszystkie strony odwołują się do `css/style.min.css` i `js/script.min.js`, których nie ma w repo. Skutek: styl i logika mogą nie działać po deployu, jeśli build nie zostanie wykonany lub artefakty nie zostaną dołączone.
- **Niedziałający link biznesowy do pliku PDF**: `menu.html` linkuje do `assets/docs/menu.pdf`, ale plik nie istnieje. Skutek: twarde 404 w kluczowym CTA.
- **Błędna kanonikalizacja i social metadata w `gallery.html`**: canonical i `og:url` wskazują na `about.html`, a tytuły/opisy OG/Twitter są treściowo „O nas”. Skutek: konflikt indeksowania i błędne podglądy social.
- **Ryzyko niepoprawnej konfiguracji Netlify redirects/headers**: obecny plik to `_redirects.txt` (zamiast `_redirects`), a `_headers` zawiera niestandardowe wzorce (`/\*`, `/assets/_`, `Access-Control-Allow-Origin: _`) mogące nie działać zgodnie z intencją.

## 3) Strengths
- Dobrze rozdzielona architektura CSS (`base`, `components`, `layout`, `pages`, `utilities`) i modułowy JS (`core`, `features`, `app`).
- Dobre fundamenty dostępności: skip link, labelki formularza, komunikaty statusowe `aria-live`, nawigacja klawiaturą w lightboxie.
- PWA: obecny `manifest.webmanifest`, `sw.js`, ekran `offline.html` i obsługa statusu online/offline.
- Obrazy dostarczane w nowoczesnych formatach i wielu rozdzielczościach (AVIF/WebP/JPG), z pipeline `sharp`.
- Istnieją metadane SEO i dane strukturalne JSON-LD na wielu stronach.

## 4) P1 – 5 improvements worth doing next
- Dodać check CI, który wykrywa brakujące lokalne assety referowane w HTML (np. brak `style.min.css`, `script.min.js`, `assets/docs/menu.pdf`).
- Naprawić `gallery.html` (canonical, `og:url`, OG/Twitter title/description i JSON-LD breadcrumb), aby odpowiadały faktycznie galerii.
- Ustandaryzować tryb build/deploy: albo commit artefaktów `*.min.*`, albo podczas deployu zawsze wykonywać `npm run build`.
- Naprawić pliki platformowe Netlify: zmienić `_redirects.txt` → `_redirects` i przetestować składnię `_headers` w środowisku deploy.
- Ograniczyć składanie HTML przez konkatenację stringów (`menu.js` + `innerHTML`) i dodać escapowanie danych wejściowych (nawet dla lokalnego JSON).

## 5) Future enhancements – 5 ideas for the future
- Wprowadzić Lighthouse CI + budżety wydajności (LCP, CLS, transfer size) jako bramkę PR.
- Dodać i18n (PL/EN) z osobnymi metadanymi i `hreflang`.
- Rozszerzyć formularz o realny backend/API, walidację serwerową i ochronę antyspam.
- Dodać testy E2E krytycznych ścieżek (menu filter, lightbox, theme toggle, offline fallback).
- Rozwinąć CMS/headless source dla menu i galerii zamiast statycznego `menu.json`.

## 6) Senior rating
**7.5/10**

Kod front-endowy jest dobrze zorganizowany i zawiera wiele praktyk „production-minded” (modułowość, A11y, PWA, SEO, optymalizacja obrazów). Ocena spada przez konkretne ryzyka wdrożeniowe i SEO, które mogą realnie obniżyć jakość produkcyjną (brakujące artefakty, błędne canonical/OG, brakujący PDF, niepewna konfiguracja Netlify).
