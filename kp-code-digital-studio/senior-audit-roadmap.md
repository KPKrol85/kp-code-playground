# Senior Audit Roadmap — KP_Code Digital Studio

## Krótka ocena stanu projektu

Projekt jest na bardzo dobrym poziomie jak na statyczny serwis usługowy: ma czytelną architekturę source/build, spójny system tokenów CSS, modularny vanilla JS, sensowne zabezpieczenia i progressive enhancement formularza kontaktowego, a także własny zestaw QA dla jakości outputu `dist/`. To buduje wiarygodność techniczną i „production mindset”.

Największa przestrzeń do dalszej profesjonalizacji nie dotyczy rewolucji UI, tylko domknięcia warstwy operacyjnej: głębszych guardrailów jakości, silniejszego SEO technicznego, szerszej dostępności, formalizacji standardów treści/metadanych oraz dopracowania odporności runtime (PWA, analityka zdarzeń, obserwowalność formularza).

## 20 konkretnych usprawnień

1. **Wprowadzić repozytoryjny „quality gate” CI (build + QA + format:check) uruchamiany przy każdym push/PR.**  
   Dlaczego warto: obecnie skrypty QA są dobre, ale lokalne; automatyzacja w CI zabezpieczy jakość w skali czasu i przy większej liczbie zmian, utrzymując wiarygodność projektu jako referencji produkcyjnej.

2. **Rozszerzyć QA o automatyczny audyt semantyki i dostępności (np. axe-core/pa11y dla kluczowych stron).**  
   Dlaczego warto: projekt ma już mocne podstawy a11y (skip-link, focus management, aria), więc automatyczne testy pozwolą szybko wychwycić regresje bez ręcznego przeglądu każdej strony.

3. **Dodać QA dla spójności metadanych „brand hierarchy” (Studio vs Digital Vault vs KP_Code System).**  
   Dlaczego warto: repo zawiera strony o różnych poziomach narracji marki; automatyczny check pomoże uniknąć przypadkowego mieszania ról (szczególnie przy przyszłych edycjach treści i JSON-LD).

4. **Uzupełnić walidację QA o kontrolę `srcset/sizes` i istnienia wariantów obrazów dla wszystkich `<picture>`.**  
   Dlaczego warto: projekt mocno opiera się na responsywnych grafikach AVIF/WebP/JPG; ten obszar łatwo „rozjechać” przy dodawaniu kolejnych realizacji, co wpływa na CWV i wiarygodność wdrożenia.

5. **Dodać sitemap QA sprawdzający pełne pokrycie indexowalnych URL oraz zgodność z canonical.**  
   Dlaczego warto: build generuje `sitemap.xml`, ale dodatkowy guardrail na poziomie relacji `canonical ↔ sitemap` minimalizuje błędy SEO technicznego przy rozbudowie sekcji `services/` i `projects/`.

6. **Wzmocnić strategię Service Workera o wersjonowanie strategii cache per typ zasobu i fallback dla krytycznych assetów.**  
   Dlaczego warto: obecny SW jest poprawny i lekki, ale shell-only; bardziej świadoma polityka cache poprawi odporność runtime oraz doświadczenie użytkownika przy słabszym łączu.

7. **Sformalizować politykę bezpieczeństwa HTTP (CSP, Referrer-Policy, Permissions-Policy) w dokumentacji deploy + przykładach nagłówków.**  
   Dlaczego warto: jako projekt referencyjny studio powinien pokazywać nie tylko estetykę i UX, ale też dojrzałe security posture wdrożenia.

8. **Dodać kontrolę spójności danych strukturalnych (typy schema, `@id`, relacje Organization/Person/WebSite/Service).**  
   Dlaczego warto: JSON-LD jest już obecny na wielu stronach; kolejny krok to jakość semantyczna i przewidywalność, co zwiększa wiarygodność SEO i łatwość utrzymania.

9. **Zaprojektować checklistę „Definition of Done” dla nowych podstron usług/projektów.**  
   Dlaczego warto: pozwoli zachować powtarzalny standard (meta, OG, breadcrumbs, sekcje CTA, obrazki, JSON-LD, linkowanie wewnętrzne), co jest kluczowe przy portfolio rozwijanym iteracyjnie.

10. **Dodać mierniki eventowe dla kluczowych konwersji (klik kontakt, submit formularza, klik CTA usług).**  
   Dlaczego warto: serwis jest usługowy, więc decyzje UX/treści powinny być oparte o sygnały konwersyjne; to zwiększa biznesową „produkcyjność” projektu.

11. **Rozbudować formularz kontaktowy o jawne mapowanie kodów błędów backendu na komunikaty i telemetrię błędów.**  
   Dlaczego warto: obecna obsługa błędów jest dobra, ale głębsza klasyfikacja (rate-limit, guard token, SMTP/runtime) przyspieszy diagnozę incydentów i poprawi utrzymanie.

12. **Wprowadzić lekkie testy kontraktowe dla endpointu `contact-submit.php` (scenariusze sukces/błąd/abuse).**  
   Dlaczego warto: formularz to główny punkt leadowy; testy kontraktowe ograniczą ryzyko cichych regresji przy zmianach w PHP lub konfiguracji środowiska.

13. **Dodać repozytoryjny standard treści dla altów, leadów i CTA (tone-of-voice + długości + intencja).**  
   Dlaczego warto: obecne treści są mocne, ale standaryzacja redakcyjna utrzyma spójność jakości i poprawi skalowalność przy dodawaniu nowych case’ów.

14. **Wzmocnić wewnętrzne linkowanie kontekstowe między usługami i realizacjami (service ↔ case relevance).**  
   Dlaczego warto: poprawi UX ścieżek decyzyjnych i SEO topical authority bez zmiany architektury serwisu; to naturalny krok dla strony usługowej.

15. **Rozszerzyć stronę `offline.html` o klarowną ścieżkę odzyskania (powrót, kontakt alternatywny, stan połączenia).**  
   Dlaczego warto: skoro PWA/offline jest częścią projektu, warto dopracować scenariusz „awaryjny” jako element profesjonalnego doświadczenia użytkownika.

16. **Dodać kontrolę spójności identyfikatorów i kotwic (`id`, `aria-describedby`, linki #fragment) w source QA.**  
   Dlaczego warto: przy rozbudowie formularzy i sekcji łatwo o drobne niespójności wpływające na a11y oraz nawigację klawiaturą.

17. **Wprowadzić lekki changelog techniczny (np. `docs/changes.md`) dla zmian architektury source/build/runtime.**  
   Dlaczego warto: projekt ma ambicję referencyjną; czytelna historia decyzji podnosi jego wartość audytową i ułatwia onboarding kolejnych wykonawców.

18. **Zdefiniować i monitorować „performance budget” dla CSS/JS oraz kluczowych obrazów.**  
   Dlaczego warto: obecna optymalizacja jest dobra, ale budżet liczbowy daje twarde progi jakości i zapobiega stopniowemu puchnięciu zasobów.

19. **Uspójnić i zautomatyzować walidację stron pomocniczych (`404`, `in-progress`, `thank-you`, `offline`) pod kątem meta/noindex i linków.**  
   Dlaczego warto: strony pomocnicze często „wypadają” z procesu jakości, a mają wpływ na UX, crawl budget i postrzeganą jakość marki.

20. **Przygotować mini „operational playbook” dla deployu i awarii formularza (checklisty: SMTP, env, fallback, logi).**  
   Dlaczego warto: wzmacnia to gotowość produkcyjną całego serwisu i redukuje czas reakcji przy problemach w najbardziej krytycznym punkcie biznesowym.
