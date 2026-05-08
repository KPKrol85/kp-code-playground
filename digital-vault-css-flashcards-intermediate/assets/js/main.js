document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEYS = {
    known: 'kp_css_intermediate_known',
    index: 'kp_css_intermediate_index',
    category: 'kp_css_intermediate_category',
    difficulty: 'kp_css_intermediate_difficulty',
    mode: 'kp_css_intermediate_mode'
  };

  const flashcards = [
    ...Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }))
  ];

  const content = [
    ['Box model w praktyce','medium','Czym różni się content-box od border-box?','content-box dodaje padding i border do deklarowanej szerokości, a border-box wlicza je do środka.','*{box-sizing:border-box;}','W projektach UI najczęściej ustawiasz border-box globalnie.'],
    ['Box model w praktyce','medium','Po co używać box-sizing:border-box globalnie?','Ułatwia przewidywanie wymiarów komponentów i zmniejsza liczbę poprawek layoutu.',null,'Mniej „niespodzianek” przy paddingu.'],
    ['Box model w praktyce','harder','Kiedy padding lepiej niż margin?','Padding zwiększa obszar klikalny i tło elementu; margin tworzy odstęp na zewnątrz.',null,null],
    ['Box model w praktyce','medium','Co robi overflow:auto w kontenerze?','Dodaje scroll tylko gdy zawartość przekracza rozmiar kontenera.',null,null],
    ['Box model w praktyce','harder','Dlaczego margin-collapse bywa problemem?','Pionowe marginesy bloków mogą się łączyć i dawać inny odstęp niż oczekiwany.',null,'Użyj paddingu rodzica lub flex/grid, by uniknąć collapse.'],
    ['Specyficzność i kaskada','medium','Co wygrywa: klasa czy selektor elementu?','Klasa ma wyższą specyficzność niż sam selektor elementu.',null,null],
    ['Specyficzność i kaskada','harder','Kiedy warto użyć :where()?','Gdy chcesz pisać selektory o zerowej specyficzności i łatwiej je nadpisywać.','nav :where(a.active){...}',null],
    ['Specyficzność i kaskada','harder','Czemu !important szkodzi skalowalności?','Łamie naturalną kaskadę i utrudnia dalsze nadpisania oraz debugowanie.',null,null],
    ['Specyficzność i kaskada','medium','Jak działa kolejność reguł o tej samej specyficzności?','Wygrywa reguła zdefiniowana później w arkuszu.',null,null],
    ['Specyficzność i kaskada','harder','Co daje @layer?','Pozwala kontrolować kolejność warstw stylów niezależnie od kolejności importu.','@layer reset,base,components,utilities;',null],
    ['Flexbox','medium','Jak działa flex-basis?','To bazowy rozmiar elementu flex przed podziałem wolnej przestrzeni.',null,null],
    ['Flexbox','medium','Różnica między justify-content a align-items?','justify-content wyrównuje w osi głównej, align-items w osi poprzecznej.',null,null],
    ['Flexbox','harder','Do czego służy flex:1 1 0?','Pozwala elementowi rosnąć i kurczyć się, startując od bazy 0.',null,'Przydatne w równych kolumnach.'],
    ['Flexbox','medium','Po co używać gap we flexie?','Tworzy spójne odstępy między elementami bez hacków na margin.',null,null],
    ['Flexbox','harder','Kiedy flex-wrap jest konieczny?','Gdy elementy powinny przechodzić do kolejnego wiersza na mniejszych szerokościach.',null,null],
    ['CSS Grid','medium','Kiedy Grid jest lepszy od Flexboxa?','Przy layoutach dwuwymiarowych: rzędy i kolumny jednocześnie.',null,null],
    ['CSS Grid','medium','Co robi grid-template-columns?','Definiuje liczbę i rozmiary kolumn siatki.',null,null],
    ['CSS Grid','harder','Co robi minmax() w Grid?','Ustala minimalny i maksymalny rozmiar toru siatki.','grid-template-columns:repeat(3,minmax(12rem,1fr));',null],
    ['CSS Grid','harder','Do czego służy auto-fit vs auto-fill?','auto-fit zwija puste kolumny, auto-fill je rezerwuje.',null,null],
    ['CSS Grid','medium','Po co area names w grid-template-areas?','Ułatwiają czytelne mapowanie układu i szybkie zmiany sekcji.',null,null],
    ['Responsive design','medium','Co oznacza mobile-first?','Najpierw stylujesz małe ekrany, potem rozszerzasz przez min-width.',null,null],
    ['Responsive design','medium','Dlaczego używać min-width media queries?','Lepsza progresja layoutu i prostsze nadpisania.',null,null],
    ['Responsive design','harder','Kiedy container queries są lepsze od media queries?','Gdy komponent ma reagować na swój kontener, nie cały viewport.',null,null],
    ['Responsive design','harder','Po co clamp() w typografii?','Daje płynną skalę z granicami min/max bez wielu breakpointów.','font-size:clamp(1rem,2vw,1.25rem);',null],
    ['Responsive design','medium','Jak testować realną responsywność?','Sprawdzaj różne szerokości, orientacje, zoom, długie słowa i dynamiczne dane.',null,null],
    ['Jednostki i sizing','medium','Dlaczego rem często lepsze niż px?','Szanuje ustawienia użytkownika i poprawia dostępność rozmiaru tekstu.',null,null],
    ['Jednostki i sizing','medium','Kiedy używać em?','Dla rozmiarów zależnych od kontekstu komponentu, np. padding przycisku.',null,null],
    ['Jednostki i sizing','harder','Czym różnią się vw i %?','vw odnosi się do viewportu, a % do rozmiaru rodzica.',null,null],
    ['Jednostki i sizing','harder','Po co min-height zamiast height?','Pozwala rosnąć przy większej zawartości i zmniejsza ryzyko overflow.',null,null],
    ['Jednostki i sizing','medium','Co daje aspect-ratio?','Utrzymuje proporcję elementu bez sztuczek z paddingiem.',null,null],
    ['Pozycjonowanie','medium','Różnica absolute vs fixed?','absolute pozycjonuje względem najbliższego pozycjonowanego przodka, fixed względem viewportu.',null,null],
    ['Pozycjonowanie','medium','Co robi position:sticky?','Element zachowuje normalny flow, a po progu „przykleja się” do krawędzi.',null,null],
    ['Pozycjonowanie','harder','Co wpływa na stackowanie z-index?','Nowe contexty stackowania tworzą m.in. position+z-index, opacity<1, transform.',null,null],
    ['Pozycjonowanie','harder','Dlaczego top/left mogą psuć wydajność animacji?','Zmieniają layout; lepiej animować transform i opacity.',null,null],
    ['Pozycjonowanie','medium','Po co inset w absolute?','Skraca zapis top/right/bottom/left i poprawia czytelność.',null,null],
    ['Pseudo-klasy i pseudo-elementy','medium','Czym różni się :focus od :focus-visible?',':focus-visible pokazuje fokus głównie przy nawigacji klawiaturą.',null,null],
    ['Pseudo-klasy i pseudo-elementy','medium','Kiedy używać :not()?','Gdy chcesz wykluczyć konkretne przypadki bez powielania selektorów.',null,null],
    ['Pseudo-klasy i pseudo-elementy','harder','Po co ::before i ::after?','Do dekoracji i mikroelementów bez dodatkowego HTML.',null,'Nie wkładaj tam treści krytycznej semantycznie.'],
    ['Pseudo-klasy i pseudo-elementy','harder','Co robi :is()?','Upraszcza długie listy selektorów, zachowując najwyższą specyficzność z listy.',null,null],
    ['Pseudo-klasy i pseudo-elementy','medium','Jak stylować stany linków?','Zadbaj o hover, focus-visible, active i visited z czytelnym kontrastem.',null,null],
    ['Transition i transform','medium','Jak działa transition?','Płynnie interpoluje zmianę wybranych właściwości w czasie.',null,null],
    ['Transition i transform','medium','Po co transform:translate zamiast margin-left?','translate nie przebudowuje layoutu i zwykle jest płynniejszy.',null,null],
    ['Transition i transform','harder','Kiedy używać will-change ostrożnie?','Tylko przed animacją i punktowo, bo może zwiększać użycie pamięci.',null,null],
    ['Transition i transform','harder','Dlaczego transform tworzy nowy stacking context?','Browser optymalizuje renderowanie warstwy, co zmienia relacje z-index.',null,null],
    ['Transition i transform','medium','Jak respektować prefers-reduced-motion?','Wyłącz lub skróć animacje dla użytkowników wrażliwych na ruch.',null,null],
    ['Zmienne CSS','medium','Do czego służą custom properties?','Do tokenów design systemu: kolory, odstępy, radius, typografia.',':root{--space-3:1rem;}',null],
    ['Zmienne CSS','medium','Jak działa fallback w var()?','Jeśli zmienna nie istnieje, użyty zostanie drugi argument.', 'color:var(--text,#111);',null],
    ['Zmienne CSS','harder','Czy zmienne CSS dziedziczą się?','Tak, domyślnie dziedziczą i mogą być nadpisywane lokalnie.',null,null],
    ['Zmienne CSS','harder','Kiedy token lokalny zamiast globalnego?','Gdy komponent ma unikalny wariant, ale nadal bazuje na globalnych zasadach.',null,null],
    ['Zmienne CSS','medium','Co daje tematyzacja przez data-attribute?','Pozwala przełączać motywy bez duplikowania całych arkuszy.',null,null],
    ['Formularze i stany UI','medium','Po co :disabled i :enabled?','Ułatwiają spójne komunikowanie interaktywności kontrolek.',null,null],
    ['Formularze i stany UI','medium','Jak stylować :invalid bez przesady?','Wskazuj błąd czytelnie, ale nie agresywnie; dodaj też stan poprawny.',null,null],
    ['Formularze i stany UI','harder','Kiedy użyć accent-color?','Do prostego dopasowania checkboxów/radio/range do identyfikacji wizualnej.',null,null],
    ['Formularze i stany UI','harder','Dlaczego placeholder nie zastępuje label?','Placeholder znika i jest mniej dostępny; label daje trwały kontekst.',null,null],
    ['Formularze i stany UI','medium','Po co cursor:not-allowed na disabled?','Wspiera komunikację stanu, ale nie zastępuje semantyki disabled.',null,null],
    ['Dostępność CSS','medium','Jak poprawić widoczność focus?','Stosuj wyraźny outline z odpowiednim kontrastem i offsetem.',null,null],
    ['Dostępność CSS','medium','Czemu nie usuwać outline bez zamiennika?','Użytkownik klawiatury straci informację, gdzie jest fokus.',null,null],
    ['Dostępność CSS','harder','Jak kontrast wpływa na UX?','Niski kontrast obniża czytelność i męczy wzrok, szczególnie na mobile.',null,null],
    ['Dostępność CSS','harder','Czy uppercase zawsze jest dobre?','Nadmierne uppercase pogarsza skanowanie tekstu przy dłuższych etykietach.',null,null],
    ['Dostępność CSS','medium','Jak stylować linki, by były rozpoznawalne?','Nie opieraj się tylko na kolorze; użyj podkreślenia lub innego wyróżnika.',null,null],
    ['Stylowanie komponentów','medium','Po co BEM w większym projekcie?','Zmniejsza konflikty nazw i poprawia czytelność odpowiedzialności klas.',null,null],
    ['Stylowanie komponentów','medium','Kiedy używać modyfikatorów komponentu?','Gdy wariant zmienia wygląd, ale zachowuje tę samą strukturę.',null,null],
    ['Stylowanie komponentów','harder','Jak unikać nadmiernego zagnieżdżania selektorów?','Trzymaj selektory płytkie i klasowe, nie wiąż ich mocno z drzewem DOM.',null,null],
    ['Stylowanie komponentów','harder','Co daje podejście utility + komponenty?','Szybkość implementacji plus kontrola semantyki bazowych bloków UI.',null,null],
    ['Stylowanie komponentów','medium','Dlaczego ograniczać style globalne?','Mniej efektów ubocznych i łatwiejsza refaktoryzacja modułów.',null,null],
    ['Wydajny CSS','medium','Które właściwości animować najczęściej?','Transform i opacity, bo rzadziej wywołują kosztowny layout.',null,null],
    ['Wydajny CSS','medium','Czy bardzo długie selektory są dobre?','Są trudniejsze w utrzymaniu i zwiększają złożoność debugowania.',null,null],
    ['Wydajny CSS','harder','Jak ograniczyć repainty?','Unikaj częstych zmian cienia, filtrów i dużych obszarów półprzezroczystości.',null,null],
    ['Wydajny CSS','harder','Po co contain w komponentach?','Może izolować obliczenia layoutu/paint i poprawiać wydajność sekcji.',null,null],
    ['Wydajny CSS','medium','Jak ograniczyć „martwy CSS”?','Regularny audyt, usuwanie nieużywanych klas i porządek w architekturze.',null,null],
    ['Debugowanie CSS','medium','Od czego zacząć debug layoutu?','Sprawdź model pudełkowy, display, pozycjonowanie i wymiary rodzica.',null,null],
    ['Debugowanie CSS','medium','Jak używać panelu Computed?','Zobacz finalne wartości i która reguła je nadpisuje.',null,null],
    ['Debugowanie CSS','harder','Po co tymczasowy outline debug?','Szybko pokazuje granice elementów i źródła overflow.', '*{outline:1px solid rgba(255,0,0,.2);}',null],
    ['Debugowanie CSS','harder','Jak znaleźć źródło overflow-x?','Przejrzyj elementy szersze niż viewport i sprawdź fixed width oraz translate.',null,null],
    ['Debugowanie CSS','medium','Czemu warto testować przy 200% zoom?','Wykryjesz problemy czytelności, łamania tekstu i responsywności.',null,null],
    ['Box model w praktyce','medium','Kiedy użyć max-width na kontenerze?','Aby ograniczyć długość linii i poprawić czytelność na dużych ekranach.',null,null],
    ['Specyficzność i kaskada','medium','Czy selektor ID powinien być częsty?','Lepiej unikać w CSS komponentowym; utrudnia nadpisania.',null,null],
    ['Flexbox','harder','Jak działa align-self?','Pozwala pojedynczemu elementowi nadpisać align-items kontenera.',null,null],
    ['CSS Grid','harder','Kiedy grid-auto-flow:dense ma sens?','Przy galerii kart o różnych wysokościach, gdy akceptujesz zmianę kolejności wizualnej.',null,null],
    ['Responsive design','medium','Po co breakpointy oparte na treści?','UI łamie się przez treść, nie przez konkretne urządzenie.',null,null],
    ['Jednostki i sizing','harder','Co daje ch w polach tekstowych?','Pozwala ustawić szerokość zgodnie z liczbą znaków.',null,null],
    ['Pozycjonowanie','medium','Do czego position:relative bez przesunięć?','Tworzy punkt odniesienia dla absolutnie pozycjonowanych dzieci.',null,null],
    ['Pseudo-klasy i pseudo-elementy','harder','Kiedy :has() jest przydatne?','Gdy styl rodzica zależy od stanu dziecka, np. pole z błędem.',null,null],
    ['Transition i transform','medium','Co robi transform-origin?','Ustala punkt, wokół którego wykonywana jest transformacja.',null,null],
    ['Zmienne CSS','harder','Czy można zmieniać zmienne w media query?','Tak, to wygodny sposób skalowania spacingu i typografii responsywnie.',null,null],
    ['Formularze i stany UI','medium','Po co stylować :focus-within?','Podkreśla aktywny blok formularza, nie tylko pojedynczy input.',null,null],
    ['Dostępność CSS','harder','Jak unikać migotania animacji?','Ogranicz częstotliwość i amplitudę ruchu, dodaj reduced-motion fallback.',null,null],
    ['Stylowanie komponentów','medium','Co to „single responsibility” w CSS?','Klasa powinna mieć jasny cel: struktura, wygląd albo stan.',null,null],
    ['Wydajny CSS','harder','Kiedy unikać dużych blur i filter?','Na słabszych urządzeniach mogą powodować spadki płynności.',null,null],
    ['Debugowanie CSS','medium','Jak porównać dwa stany komponentu?','Użyj narzędzi DevTools do wymuszania :hover/:focus/:active.',null,null],
    ['Box model w praktyce','harder','Dlaczego line-height bez jednostki jest praktyczny?','Skaluje się proporcjonalnie do font-size potomków.',null,null],
    ['Specyficzność i kaskada','harder','Co daje selektor atrybutu zamiast dodatkowej klasy?','Pozwala stylować wariant po danych, ale nie nadużywaj dla złożonych stanów.',null,null],
    ['Flexbox','medium','Jak wyrównać element na koniec osi?','Użyj margin-left:auto lub align-self zależnie od osi.',null,null],
    ['CSS Grid','medium','Różnica gap vs margin w gridzie?','gap działa między trackami i nie „wypływa” poza kontener jak margin.',null,null],
    ['Responsive design','harder','Jak wykorzystać clamp dla odstępów?','Twórz płynny spacing zależny od viewportu z granicami min/max.', 'padding:clamp(.75rem,2vw,1.5rem);',null],
    ['Jednostki i sizing','medium','Kiedy użyć fit-content()?','Gdy element ma rosnąć do treści, ale nie przekraczać limitu.',null,null],
    ['Pozycjonowanie','harder','Dlaczego sticky nie działa czasem?','Rodzic z overflow lub brak top może blokować efekt przyklejenia.',null,null],
    ['Pseudo-klasy i pseudo-elementy','medium','Co robi :nth-child(odd)?','Wybiera co drugi element nieparzysty wśród rodzeństwa.',null,null],
    ['Transition i transform','harder','Jak łączyć wiele transform?','W jednej deklaracji, bo kolejne nadpisują poprzednie.', 'transform:translateY(-2px) scale(1.02);',null],
    ['Zmienne CSS','medium','Po co nazwy semantyczne zmiennych?','Łatwiej zmienić motyw bez szukania „blue-500” w całym projekcie.',null,null],
  ];

  flashcards.forEach((card, i) => {
    const [category, difficulty, question, answer, codeExample, note] = content[i];
    Object.assign(card, { category, difficulty, question, answer, codeExample, note });
  });

  const el = id => document.getElementById(id);
  const knownSet = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.known) || '[]'));
  let currentIndex = Number(localStorage.getItem(STORAGE_KEYS.index) || 0);
  let selectedCategory = localStorage.getItem(STORAGE_KEYS.category) || 'all';
  let selectedDifficulty = localStorage.getItem(STORAGE_KEYS.difficulty) || 'all';
  let challengeMode = localStorage.getItem(STORAGE_KEYS.mode) === 'challenge';
  let flipped = false;

  const state = { filtered: [] };

  function persist() {
    localStorage.setItem(STORAGE_KEYS.known, JSON.stringify([...knownSet]));
    localStorage.setItem(STORAGE_KEYS.index, String(currentIndex));
    localStorage.setItem(STORAGE_KEYS.category, selectedCategory);
    localStorage.setItem(STORAGE_KEYS.difficulty, selectedDifficulty);
    localStorage.setItem(STORAGE_KEYS.mode, challengeMode ? 'challenge' : 'normal');
  }

  function applyFilters() {
    state.filtered = flashcards.filter(card => (selectedCategory === 'all' || card.category === selectedCategory) && (selectedDifficulty === 'all' || card.difficulty === selectedDifficulty));
    if (currentIndex >= state.filtered.length) currentIndex = 0;
  }

  function renderCategories() {
    const select = el('categoryFilter');
    if (!select) return;
    const cats = ['all', ...new Set(flashcards.map(c => c.category))];
    select.innerHTML = cats.map(c => `<option value="${c}">${c === 'all' ? 'Wszystkie' : c}</option>`).join('');
    select.value = selectedCategory;
  }

  function updateDashboard(card) {
    const total = flashcards.length;
    const known = knownSet.size;
    const left = total - known;
    const pct = Math.round((known / total) * 100);
    el('totalCards').textContent = String(total);
    el('knownCards').textContent = String(known);
    el('leftCards').textContent = String(left);
    el('progressPct').textContent = `${pct}%`;
    el('currentCategory').textContent = card ? card.category : '—';
    el('currentDifficulty').textContent = card ? card.difficulty : '—';
  }

  function renderCard() {
    const empty = el('emptyState');
    const cardWrap = el('card');
    const card = state.filtered[currentIndex];
    if (!card) {
      empty.hidden = false;
      cardWrap.hidden = true;
      el('cardCounter').textContent = '0 / 0';
      updateDashboard(null);
      return;
    }
    empty.hidden = true;
    cardWrap.hidden = false;
    el('cardCounter').textContent = `${currentIndex + 1} / ${state.filtered.length}`;
    el('cardCategory').textContent = challengeMode && !flipped ? 'Kategoria ukryta' : card.category;
    el('cardDifficulty').textContent = challengeMode && !flipped ? 'Trudność ukryta' : card.difficulty;
    el('cardQuestion').textContent = card.question;
    el('cardAnswer').textContent = card.answer;
    const answerWrap = el('cardAnswerWrap');
    answerWrap.hidden = !flipped;

    const code = el('cardCode');
    const note = el('cardNote');
    if (card.codeExample) {
      code.hidden = false;
      code.querySelector('code').textContent = card.codeExample;
    } else code.hidden = true;
    if (card.note) {
      note.hidden = false;
      note.textContent = `Notatka praktyczna: ${card.note}`;
    } else note.hidden = true;

    el('knownBtn').textContent = knownSet.has(card.id) ? 'Oznacz jako nieznaną' : 'Oznacz jako znaną';
    updateDashboard(card);
  }

  function move(step) {
    if (!state.filtered.length) return;
    currentIndex = (currentIndex + step + state.filtered.length) % state.filtered.length;
    flipped = false;
    persist();
    renderCard();
  }

  renderCategories();
  applyFilters();
  renderCard();
  el('difficultyFilter').value = selectedDifficulty;
  el('modeToggle').textContent = challengeMode ? 'Włączony' : 'Wyłączony';
  el('modeToggle').setAttribute('aria-pressed', String(challengeMode));

  el('prevBtn').addEventListener('click', () => move(-1));
  el('nextBtn').addEventListener('click', () => move(1));
  el('flipBtn').addEventListener('click', () => { flipped = !flipped; renderCard(); });
  el('randomBtn').addEventListener('click', () => {
    if (!state.filtered.length) return;
    currentIndex = Math.floor(Math.random() * state.filtered.length);
    flipped = false;
    persist();
    renderCard();
  });
  el('knownBtn').addEventListener('click', () => {
    const card = state.filtered[currentIndex];
    if (!card) return;
    knownSet.has(card.id) ? knownSet.delete(card.id) : knownSet.add(card.id);
    persist();
    renderCard();
  });
  el('resetBtn').addEventListener('click', () => {
    knownSet.clear();
    currentIndex = 0;
    flipped = false;
    persist();
    renderCard();
  });
  el('categoryFilter').addEventListener('change', e => {
    selectedCategory = e.target.value;
    currentIndex = 0;
    flipped = false;
    applyFilters();
    persist();
    renderCard();
  });
  el('difficultyFilter').addEventListener('change', e => {
    selectedDifficulty = e.target.value;
    currentIndex = 0;
    flipped = false;
    applyFilters();
    persist();
    renderCard();
  });
  el('modeToggle').addEventListener('click', () => {
    challengeMode = !challengeMode;
    el('modeToggle').textContent = challengeMode ? 'Włączony' : 'Wyłączony';
    el('modeToggle').setAttribute('aria-pressed', String(challengeMode));
    persist();
    renderCard();
  });
});
