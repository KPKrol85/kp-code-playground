# Website Launch Checklist

**Profesjonalna checklista przed publikacją strony internetowej**

Ten dokument pomaga właścicielowi strony, freelancerowi lub zespołowi projektowemu zweryfikować, czy serwis jest gotowy do publikacji. Zaznacz status każdego punktu i dodaj notatki tam, gdzie potrzebna jest poprawka lub decyzja klienta.

## 1. SEO basics

| Element do weryfikacji | Done | Needs review | Notes |
|---|---|---|---|
| Każda podstrona ma unikalny i trafny title. | ☐ | ☐ |  |
| Każda istotna podstrona ma meta description. | ☐ | ☐ |  |
| Hierarchia nagłówków (H1-H2-H3) jest logiczna i spójna. | ☐ | ☐ |  |
| Ustawiono canonical URL dla stron, które tego wymagają. | ☐ | ☐ |  |
| Sitemap.xml i robots.txt istnieją i są poprawnie skonfigurowane. | ☐ | ☐ |  |
| Open Graph / social preview działa dla kluczowych podstron. | ☐ | ☐ |  |
| Strona jest indeksowalna (brak przypadkowego noindex). | ☐ | ☐ |  |

## 2. Accessibility

| Element do weryfikacji | Done | Needs review | Notes |
|---|---|---|---|
| Nawigacja klawiaturą działa na wszystkich kluczowych ścieżkach. | ☐ | ☐ |  |
| Focus states są widoczne i czytelne. | ☐ | ☐ |  |
| Obrazy mają adekwatne atrybuty alt (lub puste alt, gdy dekoracyjne). | ☐ | ☐ |  |
| Pola formularzy są poprawnie powiązane z etykietami (label). | ☐ | ☐ |  |
| Kontrast kolorów spełnia minimalne wymagania WCAG. | ☐ | ☐ |  |
| Uwzględniono preferencję reduced motion, jeśli występują animacje. | ☐ | ☐ |  |
| Użyto semantycznych landmarków (header, main, nav, footer). | ☐ | ☐ |  |

## 3. Performance

| Element do weryfikacji | Done | Needs review | Notes |
|---|---|---|---|
| Obrazy są zoptymalizowane i mają adekwatny rozmiar. | ☐ | ☐ |  |
| Lazy loading użyto tam, gdzie ma sens (obrazy/iframe poniżej folda). | ☐ | ☐ |  |
| Assety produkcyjne są zminimalizowane tam, gdzie to możliwe. | ☐ | ☐ |  |
| Brak nieużywanych, ciężkich skryptów i bibliotek. | ☐ | ☐ |  |
| Podstawy Core Web Vitals są sprawdzone (LCP, CLS, INP). | ☐ | ☐ |  |
| Skonfigurowano podstawowe cache'owanie zasobów statycznych. | ☐ | ☐ |  |

## 4. Forms and contact flow

| Element do weryfikacji | Done | Needs review | Notes |
|---|---|---|---|
| Wymagane pola są jasno oznaczone i poprawnie walidowane. | ☐ | ☐ |  |
| Walidacja pokazuje czytelne komunikaty błędu i ich lokalizację. | ☐ | ☐ |  |
| Po wysłaniu formularza wyświetla się zrozumiały komunikat sukcesu. | ☐ | ☐ |  |
| Działa ochrona antyspamowa (np. honeypot / captcha / rate limiting). | ☐ | ☐ |  |
| Dostarczanie wiadomości e-mail lub endpoint API działa w produkcji. | ☐ | ☐ |  |
| Przy formularzu jest informacja o prywatności przetwarzania danych. | ☐ | ☐ |  |

## 5. Legal pages and trust elements

| Element do weryfikacji | Done | Needs review | Notes |
|---|---|---|---|
| Opublikowano aktualną politykę prywatności. | ☐ | ☐ |  |
| Opublikowano regulamin / terms (jeśli wymagane dla oferty). | ☐ | ☐ |  |
| Wdrożono komunikat cookies, jeśli jest prawnie wymagany. | ☐ | ☐ |  |
| Dane firmy i kontakt są łatwe do znalezienia i aktualne. | ☐ | ☐ |  |
| Opis usług/oferty jest jasny i zgodny z tym, co sprzedajesz. | ☐ | ☐ |  |
| Certyfikat SSL jest aktywny i poprawnie skonfigurowany. | ☐ | ☐ |  |

## 6. Responsive design

| Element do weryfikacji | Done | Needs review | Notes |
|---|---|---|---|
| Układ działa poprawnie na ekranach mobilnych. | ☐ | ☐ |  |
| Układ działa poprawnie na tabletach. | ☐ | ☐ |  |
| Układ działa poprawnie na desktopie. | ☐ | ☐ |  |
| Nawigacja jest intuicyjna i wygodna na każdym urządzeniu. | ☐ | ☐ |  |
| Rozmiary tekstu i odstępy są czytelne na różnych viewportach. | ☐ | ☐ |  |
| Brak poziomego przewijania i overflow na kluczowych stronach. | ☐ | ☐ |  |

## 7. Security basics

| Element do weryfikacji | Done | Needs review | Notes |
|---|---|---|---|
| Cała strona działa przez HTTPS (bez mixed content). | ☐ | ☐ |  |
| Formularze przesyłają dane bezpiecznie i do właściwych endpointów. | ☐ | ☐ |  |
| Brak sekretów i kluczy API ujawnionych w kodzie frontendowym. | ☐ | ☐ |  |
| Sprawdzono zależności/komponenty pod kątem podstawowych ryzyk. | ☐ | ☐ |  |
| Skonfigurowano podstawowe nagłówki bezpieczeństwa na serwerze/CDN. | ☐ | ☐ |  |

## 8. Deployment and final verification

| Element do weryfikacji | Done | Needs review | Notes |
|---|---|---|---|
| Zweryfikowano finalny produkcyjny adres URL. | ☐ | ☐ |  |
| Strona 404 istnieje i prowadzi użytkownika dalej. | ☐ | ☐ |  |
| Ustawiono przekierowania (301/302), jeśli były zmiany URL. | ☐ | ☐ |  |
| Analityka działa tylko wtedy, gdy została celowo wdrożona. | ☐ | ☐ |  |
| Wykonano manualne testy w głównych przeglądarkach. | ☐ | ☐ |  |
| Backup i/lub stan wersjonowania są potwierdzone przed publikacją. | ☐ | ☐ |  |
| Klient potwierdził ostateczną akceptację publikacji. | ☐ | ☐ |  |

## 9. Client notes / additional observations

Miejsce na decyzje, ryzyka, zależności i notatki po finalnym przeglądzie.

---

KP_Code Digital Vault — practical digital resources for better websites.
