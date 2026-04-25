# Frontend Quality Checklist — HTML/CSS/JS przed pokazaniem projektu

## 1. Wprowadzenie

Ta checklista służy do praktycznego przeglądu jakości frontendowej **przed pokazaniem projektu klientowi, publikacją w portfolio lub wdrożeniem statycznej strony**. To nie jest formalny audyt — to produkcyjne „ostatnie sito”, które pomaga wychwycić realne ryzyka jakościowe.

Używaj jej jako karty handoff/pre-publish: oznacz statusy konkretnie, dodawaj notatki i zapisuj decyzje techniczne.

---

## 2. Dane projektu

- **Nazwa projektu:** 
- **Typ projektu:** 
- **Adres lokalny / środowisko testowe:** 
- **Adres produkcyjny (jeśli dostępny):** 
- **Data przeglądu:** 
- **Osoba wykonująca przegląd:** 
- **Branch / commit reference:** 

---

## 3. Status checklisty

- **OK** — element jest gotowy i sprawdzony.
- **Do poprawy** — element wymaga pracy przed pokazaniem projektu.
- **Nie dotyczy** — element nie ma zastosowania w tym projekcie.
- **Notatki** — miejsce na decyzję, problem, link do poprawki, commit lub ticket.

---

## 4. Semantic HTML i struktura dokumentu

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 4. Semantic HTML i struktura dokumentu | Poprawna struktura HTML5 i brak błędnych zagnieżdżeń. | ☐ | ☐ | ☐ | |
| 4. Semantic HTML i struktura dokumentu | Jeden logiczny `<main>` na stronie. | ☐ | ☐ | ☐ | |
| 4. Semantic HTML i struktura dokumentu | Landmarki `header/nav/main/section/footer` użyte zgodnie z przeznaczeniem. | ☐ | ☐ | ☐ | |
| 4. Semantic HTML i struktura dokumentu | Hierarchia nagłówków jest logiczna i wspiera czytanie oraz SEO. | ☐ | ☐ | ☐ | |
| 4. Semantic HTML i struktura dokumentu | Linki i przyciski użyte zgodnie z przeznaczeniem interakcji. | ☐ | ☐ | ☐ | |
| 4. Semantic HTML i struktura dokumentu | Brak pustych lub dekoracyjnych elementów używanych jako treść. | ☐ | ☐ | ☐ | |
| 4. Semantic HTML i struktura dokumentu | Poprawne `lang`, `title` i metadane tam, gdzie to istotne. | ☐ | ☐ | ☐ | |

## 5. BEM i spójność nazewnictwa

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 5. BEM i spójność nazewnictwa | Konsekwentne nazewnictwo klas. | ☐ | ☐ | ☐ | |
| 5. BEM i spójność nazewnictwa | Brak przypadkowych nazw typu `box1`, `test`, `new-style`. | ☐ | ☐ | ☐ | |
| 5. BEM i spójność nazewnictwa | Czytelny podział blok / element / modyfikator. | ☐ | ☐ | ☐ | |
| 5. BEM i spójność nazewnictwa | Brak niepotrzebnego nadpisywania selektorów. | ☐ | ☐ | ☐ | |
| 5. BEM i spójność nazewnictwa | Klasy opisują strukturę lub komponent, nie chwilowy wygląd. | ☐ | ☐ | ☐ | |
| 5. BEM i spójność nazewnictwa | Łatwo znaleźć powiązania między HTML i CSS. | ☐ | ☐ | ☐ | |

## 6. Architektura CSS i design tokens

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 6. Architektura CSS i design tokens | Zmienne CSS dla kolorów, spacingu, fontów i breakpointów. | ☐ | ☐ | ☐ | |
| 6. Architektura CSS i design tokens | Brak magic numbers bez uzasadnienia. | ☐ | ☐ | ☐ | |
| 6. Architektura CSS i design tokens | Spójny rytm odstępów. | ☐ | ☐ | ☐ | |
| 6. Architektura CSS i design tokens | Spójna skala typografii. | ☐ | ☐ | ☐ | |
| 6. Architektura CSS i design tokens | Brak nadmiernej specyficzności. | ☐ | ☐ | ☐ | |
| 6. Architektura CSS i design tokens | Brak nieużywanych/martwych reguł CSS. | ☐ | ☐ | ☐ | |
| 6. Architektura CSS i design tokens | Rozdzielenie warstw base/layout/components/utilities tam, gdzie to potrzebne. | ☐ | ☐ | ☐ | |

## 7. Responsive design i stabilność layoutu

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 7. Responsive design i stabilność layoutu | Mobile-first behavior jest utrzymany. | ☐ | ☐ | ☐ | |
| 7. Responsive design i stabilność layoutu | Brak poziomego scrolla. | ☐ | ☐ | ☐ | |
| 7. Responsive design i stabilność layoutu | Czytelne odstępy na mobile/tablet/desktop. | ☐ | ☐ | ☐ | |
| 7. Responsive design i stabilność layoutu | Breakpointy są adekwatne do układu. | ☐ | ☐ | ☐ | |
| 7. Responsive design i stabilność layoutu | Media mają zarezerwowane wymiary lub `aspect-ratio`. | ☐ | ☐ | ☐ | |
| 7. Responsive design i stabilność layoutu | Nawigacja działa na małych ekranach. | ☐ | ☐ | ☐ | |
| 7. Responsive design i stabilność layoutu | Karty/siatki nie łamią layoutu. | ☐ | ☐ | ☐ | |
| 7. Responsive design i stabilność layoutu | Brak CLS od obrazów, fontów i późnych przesunięć. | ☐ | ☐ | ☐ | |

## 8. JavaScript i progressive enhancement

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 8. JavaScript i progressive enhancement | JavaScript nie blokuje podstawowego dostępu do treści. | ☐ | ☐ | ☐ | |
| 8. JavaScript i progressive enhancement | Interakcje mają bezpieczne fallbacki. | ☐ | ☐ | ☐ | |
| 8. JavaScript i progressive enhancement | Brak błędów w konsoli. | ☐ | ☐ | ☐ | |
| 8. JavaScript i progressive enhancement | Obsługa wielu instancji komponentów (jeśli dotyczy). | ☐ | ☐ | ☐ | |
| 8. JavaScript i progressive enhancement | Brak sztywnego uzależnienia od jednego ID bez potrzeby. | ☐ | ☐ | ☐ | |
| 8. JavaScript i progressive enhancement | Event listenery są kontrolowane i nie dublują się. | ☐ | ☐ | ☐ | |
| 8. JavaScript i progressive enhancement | Obsługa resize / Escape / click outside tam, gdzie potrzebne. | ☐ | ☐ | ☐ | |
| 8. JavaScript i progressive enhancement | Kod jest modularny i czytelny. | ☐ | ☐ | ☐ | |

## 9. Ruch, reduced motion i jakość interakcji

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 9. Ruch, reduced motion i jakość interakcji | Animacje są subtelne i celowe. | ☐ | ☐ | ☐ | |
| 9. Ruch, reduced motion i jakość interakcji | `prefers-reduced-motion` jest obsłużone tam, gdzie występuje ruch. | ☐ | ☐ | ☐ | |
| 9. Ruch, reduced motion i jakość interakcji | Hover/focus/active states są spójne. | ☐ | ☐ | ☐ | |
| 9. Ruch, reduced motion i jakość interakcji | Brak `transition: all`. | ☐ | ☐ | ☐ | |
| 9. Ruch, reduced motion i jakość interakcji | Animacje nie powodują layout thrashing. | ☐ | ☐ | ☐ | |
| 9. Ruch, reduced motion i jakość interakcji | Mikrointerakcje nie przeszkadzają w używaniu strony. | ☐ | ☐ | ☐ | |

## 10. Przegląd dostępności (a11y)

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 10. Przegląd dostępności (a11y) | Pełna obsługa klawiatury. | ☐ | ☐ | ☐ | |
| 10. Przegląd dostępności (a11y) | Widoczne focus states. | ☐ | ☐ | ☐ | |
| 10. Przegląd dostępności (a11y) | Sensowne teksty linków. | ☐ | ☐ | ☐ | |
| 10. Przegląd dostępności (a11y) | Poprawne powiązanie `label` i pól formularza. | ☐ | ☐ | ☐ | |
| 10. Przegląd dostępności (a11y) | Komunikaty błędów i sukcesu dla formularzy. | ☐ | ☐ | ☐ | |
| 10. Przegląd dostępności (a11y) | Odpowiedni kontrast. | ☐ | ☐ | ☐ | |
| 10. Przegląd dostępności (a11y) | Alt text dla istotnych obrazów. | ☐ | ☐ | ☐ | |
| 10. Przegląd dostępności (a11y) | ARIA tylko tam, gdzie potrzebne. | ☐ | ☐ | ☐ | |
| 10. Przegląd dostępności (a11y) | Test ścieżki Tab / Shift+Tab / Enter / Escape wykonany. | ☐ | ☐ | ☐ | |

## 11. Performance i Lighthouse

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 11. Performance i Lighthouse | Zoptymalizowane obrazy. | ☐ | ☐ | ☐ | |
| 11. Performance i Lighthouse | Brak niepotrzebnie ciężkich assetów. | ☐ | ☐ | ☐ | |
| 11. Performance i Lighthouse | Lokalne fonty lub świadoma strategia fontów. | ☐ | ☐ | ☐ | |
| 11. Performance i Lighthouse | `font-display` tam, gdzie ma znaczenie. | ☐ | ☐ | ☐ | |
| 11. Performance i Lighthouse | Lazy loading dla mediów niekrytycznych. | ☐ | ☐ | ☐ | |
| 11. Performance i Lighthouse | Ograniczenie render-blocking resources. | ☐ | ☐ | ☐ | |
| 11. Performance i Lighthouse | Podstawowa weryfikacja Lighthouse. | ☐ | ☐ | ☐ | |
| 11. Performance i Lighthouse | Świadomość wpływu LCP, CLS, INP. | ☐ | ☐ | ☐ | |
| 11. Performance i Lighthouse | Brak zbędnych bibliotek dla prostych funkcji. | ☐ | ☐ | ☐ | |

## 12. SEO i metadane

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 12. SEO i metadane | Unikalny `<title>`. | ☐ | ☐ | ☐ | |
| 12. SEO i metadane | Meta description. | ☐ | ☐ | ☐ | |
| 12. SEO i metadane | Open Graph / social preview. | ☐ | ☐ | ☐ | |
| 12. SEO i metadane | Canonical URL tam, gdzie to istotne. | ☐ | ☐ | ☐ | |
| 12. SEO i metadane | Logiczna struktura nagłówków. | ☐ | ☐ | ☐ | |
| 12. SEO i metadane | Opisowe linki wewnętrzne. | ☐ | ☐ | ☐ | |
| 12. SEO i metadane | Sitemap/robots tam, gdzie wymagane. | ☐ | ☐ | ☐ | |
| 12. SEO i metadane | `noindex` tylko tam, gdzie intencjonalnie wymagane. | ☐ | ☐ | ☐ | |

## 13. Formularze i walidacja (jeśli dotyczy)

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 13. Formularze i walidacja | Poprawne typy pól. | ☐ | ☐ | ☐ | |
| 13. Formularze i walidacja | Required fields są sensownie ustawione. | ☐ | ☐ | ☐ | |
| 13. Formularze i walidacja | Walidacja po stronie klienta. | ☐ | ☐ | ☐ | |
| 13. Formularze i walidacja | Jasne błędy i komunikaty sukcesu. | ☐ | ☐ | ☐ | |
| 13. Formularze i walidacja | Honeypot lub podstawowa ochrona antyspamowa (gdzie potrzebna). | ☐ | ☐ | ☐ | |
| 13. Formularze i walidacja | Disabled/loading state podczas submit. | ☐ | ☐ | ☐ | |
| 13. Formularze i walidacja | Notatka o prywatności danych przy formularzu. | ☐ | ☐ | ☐ | |
| 13. Formularze i walidacja | Test realnego przepływu formularza. | ☐ | ☐ | ☐ | |

## 14. Netlify / gotowość deploymentu

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 14. Netlify / gotowość deploymentu | Poprawny folder publikacji. | ☐ | ☐ | ☐ | |
| 14. Netlify / gotowość deploymentu | Build command tylko jeśli potrzebny. | ☐ | ☐ | ☐ | |
| 14. Netlify / gotowość deploymentu | Brak deployowania źle zbudowanej wersji. | ☐ | ☐ | ☐ | |
| 14. Netlify / gotowość deploymentu | Działające redirecty (jeśli dotyczy). | ☐ | ☐ | ☐ | |
| 14. Netlify / gotowość deploymentu | Strona 404 (jeśli dotyczy). | ☐ | ☐ | ☐ | |
| 14. Netlify / gotowość deploymentu | Cache/security headers tam, gdzie skonfigurowane. | ☐ | ☐ | ☐ | |
| 14. Netlify / gotowość deploymentu | Environment variables nie są eksponowane po stronie klienta. | ☐ | ☐ | ☐ | |
| 14. Netlify / gotowość deploymentu | Production URL przetestowany ręcznie. | ☐ | ☐ | ☐ | |
| 14. Netlify / gotowość deploymentu | Deployment nie generuje zbędnego szumu rebuildów. | ☐ | ☐ | ☐ | |

## 15. README i jakość dokumentacji

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 15. README i jakość dokumentacji | Opis projektu. | ☐ | ☐ | ☐ | |
| 15. README i jakość dokumentacji | Stack technologiczny. | ☐ | ☐ | ☐ | |
| 15. README i jakość dokumentacji | Struktura folderów. | ☐ | ☐ | ☐ | |
| 15. README i jakość dokumentacji | Komendy uruchomienia/build/test (jeśli dotyczy). | ☐ | ☐ | ☐ | |
| 15. README i jakość dokumentacji | Notatki deploymentowe. | ☐ | ☐ | ☐ | |
| 15. README i jakość dokumentacji | Notatki a11y/SEO/performance. | ☐ | ☐ | ☐ | |
| 15. README i jakość dokumentacji | Known limitations. | ☐ | ☐ | ☐ | |
| 15. README i jakość dokumentacji | Next steps. | ☐ | ☐ | ☐ | |
| 15. README i jakość dokumentacji | Brak nieaktualnych lub mylących instrukcji. | ☐ | ☐ | ☐ | |

## 16. Higiena Git i handoff projektu

| Obszar | Kryterium jakości | OK | Do poprawy | Nie dotyczy | Notatki / poprawki |
|---|---|---|---|---|---|
| 16. Higiena Git i handoff projektu | Clean working tree przed handoffem. | ☐ | ☐ | ☐ | |
| 16. Higiena Git i handoff projektu | Sensowne commity. | ☐ | ☐ | ☐ | |
| 16. Higiena Git i handoff projektu | Brak przypadkowych plików tymczasowych. | ☐ | ☐ | ☐ | |
| 16. Higiena Git i handoff projektu | Brak sekretów/API keys. | ☐ | ☐ | ☐ | |
| 16. Higiena Git i handoff projektu | Nazwa brancha ma sens. | ☐ | ☐ | ☐ | |
| 16. Higiena Git i handoff projektu | PR description jest jasny (jeśli używany). | ☐ | ☐ | ☐ | |
| 16. Higiena Git i handoff projektu | Zmiany są scoped i reviewable. | ☐ | ☐ | ☐ | |
| 16. Higiena Git i handoff projektu | Finalny diff sprawdzony ręcznie. | ☐ | ☐ | ☐ | |

---

## 17. Final readiness assessment

- **Liczba elementów OK:** 
- **Liczba elementów do poprawy:** 
- **Liczba elementów „nie dotyczy”:** 
- **Najważniejsze ryzyka:** 
  - 
  - 
  - 

**Decyzja końcowa (zaznacz jedną):**

- [ ] Gotowe do pokazania
- [ ] Gotowe po drobnych poprawkach
- [ ] Wymaga większego dopracowania

---

## 18. Priorytetowe poprawki i kolejne kroki

### 3 najważniejsze poprawki przed pokazaniem projektu
1. 
2. 
3. 

### Szybkie poprawki jakościowe
- 
- 

### Rzeczy do zaplanowania później
- 
- 

### Notatki dla developera lub klienta
- 
- 

---

## 19. Notatki końcowe

- 
- 
- 

---

**KP_Code Digital Vault — praktyczne zasoby cyfrowe dla lepszych stron internetowych.**
