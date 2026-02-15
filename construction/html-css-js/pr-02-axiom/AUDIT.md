# AUDIT — Axiom Construction (senior front-end review)

## 1. Executive summary
Projekt ma dojrzałą bazę techniczną: modularny CSS/JS, wielostronicową strukturę, poprawne podstawy SEO/PWA, sensowną semantykę oraz rozbudowane mechanizmy UI (menu mobilne, lightbox, formularz, cookies, theme toggle).

W obecnym stanie do naprawy wymagane są dwa realne problemy klasy P0: niedziałające linki do dokumentów certyfikatów oraz błędny anchor w formularzu kontaktowym. Dodatkowo występują istotne obszary P1 dotyczące jakości SEO (JSON-LD), no-JS baseline formularza i spójności architektonicznej.

---

## 2. P0 — Critical risks

### P0-1: Niedziałające linki do plików certyfikatów
- **Impact:** użytkownik trafia na 404 z podstrony legalnej; spadek wiarygodności i jakości UX; ryzyko odrzucenia portfolio w review produkcyjnym.
- **Evidence:** `legal/certyfikaty.html` odwołuje się do `../assets/certyfikaty/*.pdf|*.jpg`, ale katalog `assets/certyfikaty` nie istnieje w repozytorium. Przykładowe odwołania: `sep-e.pdf`, `sep-d.pdf`, `f-gazy.pdf`, `bhp.pdf`, `etics.pdf`. 
- **Fix:** dodać brakujące pliki do `assets/certyfikaty/` **albo** usunąć linki i zastąpić je neutralnym komunikatem (`Dokument na życzenie`) do czasu dostarczenia zasobów.
- **Effort:** **S**

### P0-2: Uszkodzony link kotwicy w zgodzie formularza
- **Impact:** nawigacja kontekstowa w formularzu jest błędna (klik w „Polityka prywatności” nie prowadzi do celu), co obniża czytelność zgody i może być traktowane jako błąd dostępności/UX.
- **Evidence:** w `index.html` użyto `href="#polityka"`, ale w dokumencie nie ma elementu o `id="polityka"`.
- **Fix:** podmienić link na realny adres dokumentu, np. `legal/polityka-prywatnosci.html` (lub dodać rzeczywisty anchor, jeśli intencją była nawigacja wewnętrzna).
- **Effort:** **S**

---

## 3. Strengths
- Dobra separacja warstw CSS: tokeny, baza, layout, komponenty, sekcje.
- Rozsądny podział JS na `core/components/sections/utils`.
- Responsywne obrazy z AVIF/WEBP/JPG i `srcset`.
- Obecny skip-link, focus-visible, aria-expanded/aria-current, obsługa `Escape` i fokusu w menu/lightbox.
- Obecne elementy deployment/PWA: `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`.

---

## 4. P1 — 5 improvements worth doing next

### 1) JSON-LD inline zamiast `src` w tagu `application/ld+json`
- **Reason:** obecnie dane strukturalne są referowane zewnętrznie (`<script type="application/ld+json" src="...">`), co bywa mniej niezawodne dla parserów SEO.
- **Suggested improvement:** wstrzykiwać JSON-LD inline na każdej stronie (build-time include lub statyczne osadzenie treści).

### 2) No-JS baseline formularza kontaktowego
- **Reason:** formularz jest zależny od walidacji JS i reCAPTCHA; przy wyłączonym JS ścieżka wysyłki jest ograniczona.
- **Suggested improvement:** zapewnić pełny fallback bez JS (np. serwerowa walidacja + honeypot + alternatywna ochrona antyspamowa).

### 3) Spójność architektury nazw klas (BEM)
- **Reason:** struktura jest modularna, ale nazewnictwo klas jest mieszane (BEM + klasy ogólne), co utrudnia utrzymanie konsekwencji na większą skalę.
- **Suggested improvement:** dodać jawny standard naming convention i doprowadzić nowe/kluczowe komponenty do jednego wzorca.

### 4) Uporządkowanie treści demo na stronach legal
- **Reason:** sekcja certyfikatów zawiera placeholdery (`[NR-DOKUMENTU]`, `[DD.MM.RRRR]`), co osłabia produkcyjny charakter portfolio.
- **Suggested improvement:** zastąpić placeholdery realistycznym contentem lub oznaczyć sekcję jako „przykładową” bez martwych odwołań.

### 5) Precyzyjniejsza polityka cachowania SW
- **Reason:** cache naming oparty o stałą wersję wymaga ręcznej aktualizacji; łatwo o niekontrolowane stany cache po deployu.
- **Suggested improvement:** dodać wersjonowanie cache generowane w buildzie (hash/revision) oraz regułę czyszczenia wszystkich cache poprzednich wersji.

---

## 5. Future enhancements — 5 realistic ideas
1. Dodać automatyczne testy linków/anchorów w CI (np. html-validate + custom checker).
2. Wprowadzić visual regression dla kluczowych podstron (homepage + 2 podstrony usługowe).
3. Dodać `WebPage`/`BreadcrumbList` schema dla wszystkich podstron usług i legal.
4. Rozszerzyć analitykę o event taxonomy dla CTA (kontakt, call, mapa, formularz).
5. Dodać audyt bundle size do pipeline (`build budget`) i alarm przy regresji.

---

## 6. Compliance checklist (pass / fail)
- **headings valid:** **PASS**
- **no broken links:** **FAIL** (linki do `assets/certyfikaty/*` nie istnieją; anchor `#polityka` nie istnieje)
- **no console.log:** **FAIL** (`console.log` w skrypcie narzędziowym `tools/images/build-images.mjs`)
- **aria attributes valid:** **PASS**
- **images have width/height:** **FAIL** (np. `img.lb__img` w lightboxie bez wymiarów)
- **no-JS baseline usable:** **FAIL** (formularz kontaktowy ma ograniczoną ścieżkę bez JS/reCAPTCHA)
- **sitemap present (if expected):** **PASS**
- **robots present:** **PASS**
- **OG image exists:** **PASS**
- **JSON-LD valid:** **PASS** (pliki JSON poprawne składniowo)

---

## 7. Architecture Score (0–10)
- **BEM consistency:** 7.0/10
- **token usage:** 8.5/10
- **accessibility:** 7.5/10
- **performance:** 8.0/10
- **maintainability:** 7.5/10

**Overall Architecture Score: 7.7 / 10**

---

## 8. Senior rating (1–10)
**Senior rating: 7.5 / 10**

Projekt jest technicznie solidny i ma dobrą bazę pod portfolio produkcyjne, ale wymaga domknięcia krytycznych detali jakościowych (broken links/anchor) oraz dopracowania warstwy SEO/no-JS, aby spełnić standard „production-grade without caveats”.
