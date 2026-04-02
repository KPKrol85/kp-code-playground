# AUDIT — Easy Move (`audit-pr/pr-02-easymove`)

## 1) Executive summary
Projekt jest spójną, statyczną implementacją front-endową z czytelną separacją CSS i JS oraz przewidywalnym buildem do `dist/`. Nie wykryto krytycznych błędów runtime ani lokalnych martwych odwołań do plików. Największe luki dotyczą warstwy SEO (brak metadanych i plików indeksacyjnych), semantyki aktywnej nawigacji (`aria-current`), placeholderów prawnych/social oraz częściowej implementacji wzorca tabów WAI-ARIA.

## 2) P0 — Critical risks
Brak wykrytych problemów klasy P0 (runtime/deployment blocker/accessibility blocker) na podstawie statycznej analizy repozytorium.

## 3) Strengths
- Modularny entrypoint JS z bezpiecznym bootstrapem po `DOMContentLoaded` i warunkowym uruchamianiem funkcji zależnych od obecności elementów. Dowód: `js/main.js:1-23`, `js/modules/*.js`.
- Dostępność focus i nawigacji klawiaturą jest zaadresowana (skip-link, `:focus-visible`, trap focus w menu mobilnym, Escape close). Dowód: `index.html:10`, `css/base.css:49-68`, `js/modules/menu.js:29-97`.
- Obsługa preferencji ruchu (`prefers-reduced-motion`) jest zaimplementowana zarówno w CSS, jak i JS fallbacku reveal. Dowód: `css/tokens.css:56-60`, `css/base.css:92-95`, `css/components.css:227-232`, `js/modules/reveal.js:5-10`.
- Formularz kontaktowy ma walidację pól, `aria-invalid`, podsumowanie błędów i komunikat statusowy. Dowód: `kontakt.html:103-178`, `js/modules/form.js:9-113`.
- Build pipeline jest jawny i powtarzalny (PostCSS + Terser + kopiowanie HTML/assets). Dowód: `package.json:6-14`, `scripts/build.mjs:14-30`, `postcss.config.cjs:1-3`.

## 4) P1 — Improvements worth doing next (exactly 5)
1. **Brak technicznych metadanych SEO na stronach** — wykryto `title`, ale brak `meta name="description"`, `link rel="canonical"`, OG i JSON-LD. Dowód: `index.html:3-8`, analogicznie pozostałe strony (`*.html` sekcje `<head>`).
2. **Brak `robots.txt` i `sitemap.xml` w repozytorium** — ogranicza kontrolę indeksacji i crawl budget. Dowód: lista plików repo (`rg --files`) nie zawiera tych zasobów.
3. **Aktywna nawigacja jest tylko wizualna (`nav__link--active`) bez `aria-current`** — stan aktywnej strony nie jest jawnie komunikowany AT. Dowód: np. `cennik.html:31`, `faq.html:33`, brak `aria-current` globalnie.
4. **Linki placeholder (`href="#"`) w obszarach prawnych/social** — ryzyko użyteczności i zgodności (privacy/cookies). Dowód: np. `cennik.html:152`, `cennik.html:158`, `cennik.html:197`, analogicznie w innych stopkach.
5. **Taby nie implementują pełnego wzorca klawiaturowego WAI-ARIA** — brak logiki strzałek/Home/End, brak zarządzania `tabindex`, panele nie są explicite ukrywane atrybutem (`hidden`/`aria-hidden`). Dowód: `cennik.html:77-113`, `js/modules/tabs.js:1-24`.

## 5) P2 — Minor refinements
- Import fontów Google przez `@import` w CSS może zwiększać opóźnienie renderowania względem `preconnect` + `<link>` w `<head>`. Dowód: `css/main.css:1`.
- Istnieją linie `console.log` w skrypcie narzędziowym do konwersji obrazów (nie w runtime przeglądarkowym), co obniża czystość narzędzi CI/CD. Dowód: `scripts/convert-images.mjs:20`, `scripts/convert-images.mjs:33`.
- Część kontaktowa w stopce używa surowego tekstu zamiast linków `mailto:`/`tel:`. Dowód: np. `kontakt.html:230-233`, `faq.html:158-161`.

## 6) Future enhancements (exactly 5)
1. Dodać zestaw metatagów SEO + społeczne preview (`description`, canonical, OG/Twitter) w każdym dokumencie.
2. Dodać `robots.txt` i `sitemap.xml` oraz uwzględnić je w artefaktach `dist/`.
3. Uzupełnić linki prawne i społecznościowe o rzeczywiste URL oraz polityki.
4. Rozszerzyć komponent tabs o pełny keyboard model i atrybuty semantyczne zgodne z APG.
5. Zastąpić import fontów `@import` strategią w `<head>` z `preconnect`/`font-display` optymalizującą start renderowania.

## 7) Compliance checklist
- **Headings valid:** ✅ Pass (spójna hierarchia sekcji treści; brak krytycznego chaosu nagłówków). Dowód: `index.html:75-233`, `cennik.html:74-135`, `kontakt.html:74-177`.
- **No broken links (excluding intentional minification strategy):** ✅ Pass (lokalne odwołania istnieją; weryfikacja skryptem ścieżek).
- **No console.log:** ❌ Fail (`scripts/convert-images.mjs` zawiera `console.log`).
- **ARIA attributes valid:** ✅ Pass (używane atrybuty są syntaktycznie poprawne: `aria-expanded`, `aria-pressed`, `aria-live`, `aria-label`). Dowód: `kontakt.html:103-176`, `cennik.html:78-83`, `index.html:36-44`.
- **Images have width/height:** ✅ Pass (brak `<img>`; użyte SVG inline z wymiarami tam, gdzie zadeklarowane). Dowód: np. `index.html:101-109`, `faq.html:123-133`.
- **No-JS baseline usable:** ✅ Pass (linki i treść dostępne bez JS; menu desktopowe ukrywane dopiero po dodaniu `.js-enabled`). Dowód: `js/modules/theme.js:39-42`, `css/layout.css:243-260`.
- **Sitemap present if expected:** ❌ Fail (nie wykryto `sitemap.xml`).
- **Robots present:** ❌ Fail (nie wykryto `robots.txt`).
- **OG image exists:** ❌ Fail (brak implementacji OG, więc brak referencji do `og:image`).
- **JSON-LD valid:** ❌ Fail (JSON-LD nie wykryto w projekcie).

## 8) Architecture score (0–10)
**8.0 / 10**
- **BEM consistency:** 8.5/10 — nazewnictwo klas jest konsekwentne (`block__element--modifier`).
- **Token usage:** 8.5/10 — centralne tokeny kolorów, spacingu, cieni i promieni w `tokens.css`.
- **Accessibility:** 8.0/10 — dobra baza (skip link, focus, keyboard menu, form status), ale bez `aria-current` i z częściowym tab pattern.
- **Performance:** 7.5/10 — modułowy JS i lekka struktura, ale font strategy przez `@import` i brak warstwy SEO/deploy assets.
- **Maintainability:** 7.5/10 — dobra separacja plików; obszar do poprawy w checklistach SEO/compliance i domknięciu placeholderów.

## 9) Senior rating (1–10)
**8 / 10** — solidna, produkcyjnie bliska baza front-endowa z poprawnymi fundamentami dostępności i architektury modułowej. Główne braki są naprawialne bez przebudowy rdzenia: SEO technical baseline, komplet semantyki nawigacji i finalizacja linków prawno-informacyjnych.
