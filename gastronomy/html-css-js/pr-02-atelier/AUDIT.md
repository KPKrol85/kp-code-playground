# AUDIT — Atelier No.02

## 1. Executive summary
Projekt prezentuje dojrzałą, modularną architekturę front-endową: separację warstw CSS, spójny podział JS na feature modules, wdrożone mechanizmy dostępności i dobre podstawy SEO/performance. Strona jest gotowa jako portfolio produkcyjne, ale wymaga kilku korekt jakościowych, głównie w obszarach semantyki a11y i higieny produkcyjnej JS.

## 2. P0 — Critical risks (real issues only)
- **Brak krytycznych ryzyk P0 wykrytych podczas audytu.**

## 3. Strengths
- **Modularna architektura CSS**: wyraźny podział na `base`, `layout`, `components`, `pages`, `utilities` oraz centralny entrypoint przez `@import`.  
- **Design tokens**: spójne tokeny kolorów, spacingu, promieni i motywów light/dark (`css/base/tokens.css`).
- **Dostępność interakcji**: menu mobilne i modal mają focus trap, `aria-expanded`, obsługę ESC i zarządzanie fokusem (`js/features/nav.js`, `js/features/demo-modal.js`).
- **Obsługa reduced motion**: animacje reveal są wyłączane przy `prefers-reduced-motion: reduce` w logice JS (`js/features/reveal.js`).
- **SEO i dane strukturalne**: canonical, OG, Twitter oraz JSON-LD obecne na głównych podstronach (`index.html`, `about.html`, `menu.html`, `gallery.html`, strony prawne).
- **Performance baseline**: `<picture>` z AVIF/WebP/JPEG, lazy loading i preload krytycznych zasobów (`index.html`, `js/features/menu.js`).

## 4. P1 — 5 improvements worth doing next
1. **Ujednolicić `aria-current` dla scrollspy**: obecnie ustawiane jest `aria-current="true"`; zalecane tokeny (`page`/`location`) poprawiają semantykę i czytelność dla AT. (`js/core/scrollspy.js`)
2. **Usunąć produkcyjne logi z rejestracji SW**: `console.log` pozostaje inline na wielu stronach. (`index.html`, `about.html`, `menu.html`, `gallery.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `404.html`)
3. **Doprecyzować focus style dla formularzy**: globalny fokus dotyczy głównie `a` i `button`; warto domknąć `input/select/textarea` dla pełnej spójności. (`css/base/globals.css`)
4. **Zredukować ładowanie jednolitego bundla na każdej podstronie**: wszystkie strony ładują `js/script.min.js`; per-page split obniży transfer dla lżejszych podstron prawnych. (`*.html`, `js/script.min.js`)
5. **Wzmocnić SEO strony offline**: dla `offline.html` canonical i OpenGraph not detected in project; warto dodać minimalne meta/noindex. (`offline.html`)

## 5. Future enhancements — 5 realistic ideas
1. Dodać automatyczny audyt Lighthouse/Pa11y w CI dla każdej zmiany.
2. Wdrożyć krytyczny CSS inline dla above-the-fold home hero.
3. Dodać fallback font-display monitoring (np. metryki CLS/FOUT) i raporty Web Vitals.
4. Rozszerzyć strategię SW o stale-while-revalidate dla wybranych assetów obrazów.
5. Dodać testy e2e kluczowych ścieżek klawiaturowych (menu mobilne, lightbox, modal prawny).

## 6. Architecture Score (0–10)
- **BEM consistency:** 8.8/10  
- **Token usage:** 9.4/10  
- **Accessibility:** 8.6/10  
- **Performance:** 8.5/10  
- **Maintainability:** 9.0/10  

**Overall Architecture Score: 8.9/10**

## 7. Senior rating (1–10)
**8.8/10** — projekt jest portfolio-grade i technicznie solidny. Największy potencjał wzrostu to drobne domknięcia semantyki a11y, usunięcie logów produkcyjnych oraz lepszy podział JS per-page.
