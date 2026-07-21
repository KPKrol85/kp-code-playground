# Digital Vault Polish Tax Calculator

Statyczny, przeglądarkowy kalkulator orientacyjny wynagrodzeń i obciążeń dla Polski. Aplikacja przyjmuje kwotę brutto albo docelowe netto, oblicza uproszczone wyniki i porównuje dostępne formy współpracy. Jest to działający prototyp/portfolio project, a nie produkt gotowy do podejmowania rzeczywistych decyzji podatkowych.

## Zakres obecnej wersji

Kod zawiera model oznaczony jako `PL-2026-simplified-v1` i rok `2026`. Konfiguracja nie zawiera źródeł urzędowych ani audytu reguł, dlatego oznaczenie roku opisuje dane zapisane w projekcie, **nie** potwierdzoną zgodność z aktualnym prawem.

W obecnej wersji można:

- obliczać uproszczone przejście brutto → netto i wyszukiwać przybliżoną kwotę netto → brutto;
- wybrać okres miesięczny albo roczny; tryb roczny dzieli wartość wejściową przez 12, stosuje model miesięczny i annualizuje wynik;
- wybrać: umowę o pracę, umowę zlecenie, umowę o dzieło, B2B na skali, B2B liniowo albo B2B ryczałt;
- użyć opcji wieku poniżej 26 lat, PPK, PIT-2 i KUP, gdy interfejs dopuszcza je dla wybranego typu umowy;
- dla B2B wybrać preset ZUS albo wpisać własne składki społeczne i zdrowotną;
- wyświetlić netto, brutto, obciążenie, koszt pracodawcy tam, gdzie model go wylicza, oraz szczegóły potrąceń i tabelę porównawczą;
- przywrócić część stanu kalkulacji z parametrów URL, wydrukować poprawnie obliczone podsumowanie i zapisać wyłącznie preferencję motywu w `localStorage`.

## Ograniczenia i założenia

- Model jest uproszczony i jego stawki, progi, limity, kolejność obliczeń oraz zaokrąglenia nie zostały w tym repozytorium zweryfikowane z oficjalnymi źródłami.
- B2B nie modeluje kosztów działalności, VAT, księgowości, urlopu, chorobowego ani prywatnych ubezpieczeń. Przełącznik płatnika VAT ma wyłącznie charakter informacyjny i nie zmienia wyniku.
- Ryczałt B2B zawsze korzysta z zapisanej w konfiguracji stawki IT 12%; interfejs nie udostępnia wyboru stawki.
- Zlecenie w formularzu nie udostępnia dobrowolnej składki chorobowej. Własne składki B2B są przyjmowane jako dodatnie miesięczne wartości.
- Wynik nie jest poradą podatkową, prawną, księgową ani finansową. Przed użyciem wyniku w realnej decyzji należy sprawdzić aktualne zasady w źródłach urzędowych lub skonsultować się ze specjalistą.

## Technologia i uruchomienie

Projekt to statyczna aplikacja HTML, CSS i JavaScript z modułami ES. Nie ma zależności npm ani skryptu budowania. Zainstalowany lokalnie font Inter znajduje się w `assets/fonts/`.

Do uruchomienia potrzebny jest serwer HTTP, ponieważ aplikacja używa modułów ES. Z katalogu projektu można użyć na przykład:

```bash
npx serve .
```

Następnie otwórz adres podany przez serwer. Można też użyć dowolnego innego lokalnego serwera statycznego wskazującego ten katalog.

## Testy

Lekki harness Node.js sprawdza bieżące zachowanie funkcji kalkulacyjnych: przypadki smoke dla sześciu typów umów, wybrane wartości regresyjne, tolerancję odwróconego wyszukiwania i rozmiar porównania.

```bash
npm run test:calculations
```

Testy nie są walidacją reguł podatkowych z oficjalnymi przykładami i nie obejmują interfejsu, URL, druku ani dostępności.

## Struktura projektu

```text
.
├── index.html                    # formularz, wyniki i tabela porównawcza
├── css/style.css                 # motywy, układ responsywny i style druku
├── js/
│   ├── tax-config.js             # dane oraz założenia uproszczonego modelu
│   ├── calculations.js           # funkcje obliczeń i porównania
│   ├── main.js                   # obsługa formularza, renderowanie i URL
│   └── utils.js                  # formatowanie, parsowanie i przeliczenie okresu
├── scripts/test-calculations.js  # dependency-free harness Node.js
├── assets/fonts/InterVariable.woff2
├── PLAN.md                       # zweryfikowana mapa dalszych prac
└── CHANGELOG.md                  # udokumentowane zmiany i historia repozytorium
```

## Prywatność, dostępność i responsywność

Obliczenia są wykonywane w przeglądarce przez lokalny kod aplikacji. W kodzie nie ma integracji sieciowej ani mechanizmu zapisu danych kalkulacji; `localStorage` służy wyłącznie do zapisu wybranego motywu. Interfejs zawiera etykiety formularza, grupy `fieldset`/`legend`, obszary `aria-live`, komunikat błędu kwoty, style widocznego fokusu, preferencję ograniczonego ruchu oraz responsywną prezentację tabeli. Te podstawy nie zastępują pełnego audytu dostępności.

## Dokumentacja projektu

- [PLAN.md](PLAN.md) zawiera zweryfikowany stan, wymagane prace, zalecenia i opcjonalne kierunki rozwoju.
- [CHANGELOG.md](CHANGELOG.md) rejestruje wyłącznie udokumentowane zmiany; nie zawiera planowanych funkcji.
