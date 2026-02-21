# AUDIT.md — Atelier No.02

## 1. Executive summary
Projekt prezentuje dobrą jakość architektury front-endowej: modularny CSS zgodny z podejściem token-first, sensowny podział JS na moduły funkcjonalne oraz kompletną podstawę SEO/PWA. W audycie nie wykryto ryzyk P0. Najważniejsze obszary do poprawy dotyczą spójności produkcyjnych assetów (minified vs source), duplikacji inline skryptów i drobnych usprawnień maintainability.

## 2. P0 — Critical risks (real issues only)
Brak krytycznych ryzyk P0 wykrytych w przeanalizowanych plikach.

## 3. Strengths
- Spójna, profesjonalna struktura CSS (`base`, `layout`, `components`, `pages`, `utilities`) oraz centralne tokeny.
- BEM-like naming i konsekwentne rozdzielenie odpowiedzialności między komponentami.
- Dostępność interakcji: skip link, zarządzanie ARIA, focus trap i obsługa klawiatury w elementach interaktywnych.
- Dobrze przygotowana warstwa SEO: canonical, OpenGraph, Twitter, JSON-LD na kluczowych stronach.
- Dobre podstawy performance: formaty AVIF/WebP/JPEG, lazy loading, width/height, preload fontów.
- Gotowe artefakty deploymentowe: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `sw.js`.

## 4. P1 — 5 improvements worth doing next

### 1) Ujednolicić produkcyjne ładowanie CSS/JS
- **Reason:** Główne strony ładują `css/style.css` i `js/script.js`, podczas gdy build i service worker bazują na `style.min.css` / `script.min.js`.
- **Suggested improvement:** Ustawić spójnie produkcyjne referencje w HTML na pliki `.min` albo zmienić strategię cache/SW tak, by obejmowała realnie ładowane entry.

### 2) Zredukować duplikację inline bootstrap scripts
- **Reason:** Ten sam blok inicjalizacji motywu i rejestracji SW jest powielony na wielu podstronach, co zwiększa koszt utrzymania.
- **Suggested improvement:** Wydzielić wspólny bootstrap do jednego pliku JS ładowanego globalnie.

### 3) Dodać `action`/fallback UX dla formularza
- **Reason:** Formularz polega na konfiguracji Netlify; bez odpowiedniego środowiska hostingowego ścieżka wysyłki nie jest jawna.
- **Suggested improvement:** Dodać jawne `action` (lub komentarz integracyjny) i komunikat fallback dla środowisk bez Netlify Forms.

### 4) Doprecyzować politykę cache dla HTML vs assetów
- **Reason:** `_headers` ustawia restrykcyjny cache dla HTML i revalidation dla CSS/JS, ale wersjonowanie plików nie jest oparte o hash nazw.
- **Suggested improvement:** Wdrożyć fingerprinting buildów lub spójne wersjonowanie query/hash przy zmianach release.

### 5) Rozszerzyć automatyczne kontrole jakości
- **Reason:** W projekcie nie wykryto konfiguracji automatycznych testów a11y/link-check/lint w CI.
- **Suggested improvement:** Dodać pipeline CI z walidacją HTML, sprawdzaniem linków, i podstawowym audytem dostępności.

## 5. Future enhancements — 5 realistic ideas
1. Dodać budowanie critical CSS dla hero i above-the-fold.
2. Rozdzielić bundle JS per typ strony (home/menu/gallery/legal).
3. Wdrożyć automatyczną walidację JSON-LD i meta SEO w CI.
4. Dodać monitorowanie Core Web Vitals dla środowiska produkcyjnego.
5. Rozszerzyć SW o strategię stale-while-revalidate dla wybranych obrazów.

## 6. Compliance checklist (pass / fail)
- **headings valid:** pass
- **no broken links:** pass
- **no console.log:** pass
- **aria attributes valid:** pass
- **images have width/height:** pass
- **no-JS baseline usable:** pass
- **sitemap present (if expected):** pass
- **robots present:** pass
- **OG image exists:** pass
- **JSON-LD valid:** pass

## 7. Architecture Score (0–10)
- **BEM consistency:** 8.8/10
- **token usage:** 9.3/10
- **accessibility:** 8.9/10
- **performance:** 8.6/10
- **maintainability:** 8.5/10

**Overall Architecture Score:** **8.8/10**

## 8. Senior rating (1–10)
**8.7/10** — Solidny, portfolio-grade front-end z właściwą strukturą i dobrą jakością implementacji. Projekt zyska najwięcej po domknięciu spójności produkcyjnych assetów i redukcji powielonej logiki bootstrapującej.
