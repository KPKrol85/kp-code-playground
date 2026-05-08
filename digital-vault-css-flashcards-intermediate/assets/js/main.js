document.addEventListener('DOMContentLoaded', () => {
  const el = {
    categoryFilter: document.getElementById('categoryFilter'), difficultyFilter: document.getElementById('difficultyFilter'), challengeToggle: document.getElementById('challengeToggle'),
    cardCounter: document.getElementById('cardCounter'), cardCategory: document.getElementById('cardCategory'), cardDifficulty: document.getElementById('cardDifficulty'),
    cardQuestion: document.getElementById('cardQuestion'), cardAnswerWrap: document.getElementById('cardAnswerWrap'), cardAnswer: document.getElementById('cardAnswer'),
    cardCode: document.getElementById('cardCode'), cardCodeInner: document.querySelector('#cardCode code'), cardNote: document.getElementById('cardNote'),
    statTotal: document.getElementById('statTotal'), statKnown: document.getElementById('statKnown'), statLeft: document.getElementById('statLeft'), statProgress: document.getElementById('statProgress'),
    statCategory: document.getElementById('statCategory'), statDifficulty: document.getElementById('statDifficulty'),
    prevBtn: document.getElementById('prevBtn'), nextBtn: document.getElementById('nextBtn'), flipBtn: document.getElementById('flipBtn'), randomBtn: document.getElementById('randomBtn'), knownBtn: document.getElementById('knownBtn'), resetBtn: document.getElementById('resetBtn'), emptyState: document.getElementById('emptyState')
  };
  if (Object.values(el).some((node) => !node)) return;

  const cards = [];
  const add = (category, difficulty, question, answer, code = '', note = '') => cards.push({ id: cards.length + 1, category, difficulty, question, answer, code, note });
  const defs = [
    ['Box model w praktyce', ['Po co używać box-sizing: border-box globalnie?', 'Ułatwia kontrolę szerokości elementów, bo padding i border wchodzą do width/height.', '*,*::before,*::after{box-sizing:border-box;}', 'Zmniejsza niespodzianki przy responsywnych komponentach.'],['Czym różni się margin od gap?', 'Margin dotyczy pojedynczego elementu, a gap zarządza odstępem między dziećmi kontenera flex/grid.', 'display:grid; gap:1rem;', 'gap daje bardziej przewidywalny layout.']],
    ['Specyficzność i kaskada', ['Kiedy warstwa @layer pomaga?', 'Gdy chcesz kontrolować kolejność grup stylów bez zwiększania specyficzności.', '@layer reset, base, components, utilities;', 'Przydatne w większych design systemach.'],['Dlaczego !important to ostateczność?', 'Utrudnia debugowanie i skalowanie stylów, bo omija normalną kaskadę.', '', 'Najpierw popraw selektor lub architekturę CSS.']],
    ['Flexbox', ['Jak działa flex-basis?', 'Ustala bazowy rozmiar elementu przed rozdzielaniem wolnego miejsca.', '.item{flex:1 1 240px;}', 'Dobrze łączyć z min-width dla stabilności.'],['Kiedy użyć align-items vs align-content?', 'align-items wyrównuje elementy w pojedynczej linii, align-content działa przy wielu liniach.', '.wrap{display:flex;flex-wrap:wrap;align-content:start;}', 'Częsty błąd: align-content bez flex-wrap.']],
    ['CSS Grid', ['Do czego służy minmax()?', 'Pozwala ustawić elastyczny zakres rozmiaru toru gridu.', 'grid-template-columns:repeat(3,minmax(12rem,1fr));', 'Chroni layout przed zbyt wąskimi kolumnami.'],['Kiedy grid jest lepszy od flexa?', 'Gdy kontrolujesz jednocześnie wiersze i kolumny, np. dashboard.', '', 'Flex zwykle lepszy do osi 1D.']],
    ['Responsive design', ['Co daje clamp() w typografii?', 'Łączy minimalny, preferowany i maksymalny rozmiar, tworząc płynne skalowanie.', 'font-size:clamp(1rem,2vw+0.5rem,1.5rem);', 'Lepsze niż wiele breakpointów dla fontów.'],['Mobile-first: dlaczego to podejście?', 'Bazowe style na małe ekrany są prostsze, a rozszerzenia idą przez min-width.', '@media (min-width: 48rem){...}', 'Mniej nadpisywania kodu.']],
    ['Jednostki i sizing', ['Dlaczego rem bywa lepszy niż px?', 'Szanuje ustawienia użytkownika i ułatwia skalowanie całego interfejsu.', 'padding:1rem;', 'Lepsze dla dostępności.'],['Kiedy użyć min(), max(), clamp()?','Do kontroli responsywnych limitów bez złożonych media queries.','width:min(100%,70ch);','Szczególnie przy treści tekstowej.']],
    ['Pozycjonowanie', ['absolute vs fixed — różnica?', 'absolute pozycjonuje względem najbliższego positioned ancestor, fixed względem viewportu.', '.tooltip{position:absolute;}', 'fixed przy sticky CTA może zasłaniać treść.'],['Kiedy użyć position: sticky?', 'Gdy element ma „przyklejać się” po przekroczeniu offsetu w kontenerze przewijania.', '.toc{position:sticky;top:1rem;}', 'Upewnij się, że rodzic nie ma overflow ukrywającego.']],
    ['Pseudo-klasy i pseudo-elementy', [':focus-visible po co?', 'Pokazuje focus głównie dla nawigacji klawiaturą, poprawiając UX i dostępność.', 'button:focus-visible{outline:2px solid #2d5bff;}', 'Nie usuwaj focus bez alternatywy.'],['::before i ::after — kiedy?', 'Do dekoracji i drobnych markerów, nie do treści krytycznej.', '.link::after{content:"↗";}', 'Czytniki ekranu mogą inaczej traktować pseudo-elementy.']],
    ['Przejścia i transformacje', ['Dlaczego animować transform i opacity?', 'Są tańsze dla renderingu niż width/top/left.', '.card{transition:transform .2s ease;}', 'Mniejsze ryzyko janków.'],['Po co will-change ostrożnie?', 'Może pomóc przy ciężkich animacjach, ale nadużycie zwiększa zużycie pamięci.', '.panel{will-change:transform;}', 'Dodawaj tylko tam, gdzie faktycznie potrzeba.']],
    ['Zmienne CSS', ['Do czego służą custom properties?', 'Do tokenów designu i dynamicznej zmiany motywu.', ':root{--space-md:1rem;}', 'Dają spójność i łatwiejsze utrzymanie.'],['Fallback w var() jak działa?', 'Drugi argument jest używany, gdy zmienna nie istnieje.', 'color:var(--text,#172033);', 'Pomaga przy stopniowej migracji kodu.']],
    ['Formularze i stany UI', ['Jak stylować :disabled?', 'Pokazuj brak aktywności kontrastem i kursorem, ale zostaw czytelność.', 'button:disabled{opacity:.55;cursor:not-allowed;}', 'Nie ukrywaj całkiem istotnych akcji.'],['Czym jest :user-invalid?', 'Pseudo-klasa reagująca na realną interakcję użytkownika, nie od razu po renderze.', 'input:user-invalid{border-color:#b42335;}', 'Mniej agresywne walidacje wizualne.']],
    ['Podstawy dostępności w CSS', ['Minimalny kontrast tekstu?', 'Dla normalnego tekstu celuj co najmniej w 4.5:1.', '', 'Sprawdzaj kontrast narzędziem, nie „na oko”.'],['Dlaczego nie blokować zoomu?', 'Użytkownicy ze słabszym wzrokiem potrzebują skalowania interfejsu.', '', 'Unikaj sztywnych wysokości i px-only layoutu.']],
    ['Stylowanie komponentów', ['Co daje BEM w praktyce?', 'Czytelne nazwy i mniejsze ryzyko kolizji między komponentami.', '.card__title--muted{}', 'Dobre przy pracy zespołowej.'],['Kiedy wyodrębnić utility class?', 'Gdy mała reguła powtarza się często i jest semantycznie neutralna.', '.u-visually-hidden{}', 'Nie przesadzaj z utility kosztem czytelności.']],
    ['CSS wydajnościowy', ['Dlaczego unikać zbyt głębokich selektorów?', 'Są trudniejsze w utrzymaniu i bardziej kruche przy zmianach HTML.', '.menu__item > a{}', 'Preferuj płaskie, komponentowe selektory.'],['Czy wszystkie media queries są złe?', 'Nie, ale warto ograniczać je do realnych punktów łamania komponentów.', '', 'Myśl komponentowo, nie „na urządzenia”.']],
    ['Debugowanie CSS', ['Od czego zacząć debug layoutu?', 'Sprawdź model pudełkowy, computed styles i źródło reguł w DevTools.', '', 'Najpierw obserwacja, potem poprawka.'],['Dlaczego outline pomaga debugować?', 'Szybko pokazuje granice elementów bez wpływu na układ.', '*{outline:1px solid rgba(0,0,0,.1);}', 'Używaj tymczasowo lokalnie.']]
  ];

  defs.forEach(([cat, pair]) => {
    for (let i = 0; i < 3; i += 1) {
      pair.forEach((p, idx) => add(cat, idx ? 'Trudniejszy' : 'Średni', `${p[0]} (${i + 1})`, p[1], p[2], p[3]));
    }
  });
  while (cards.length < 100) {
    add('Debugowanie CSS', cards.length % 2 ? 'Trudniejszy' : 'Średni', `Jak znaleźć konflikt kaskady? (${cards.length + 1})`, 'Porównaj specyficzność, kolejność reguł i źródło stylu w panelu Styles.', '', 'Wyłączaj reguły pojedynczo, aby zawęzić problem.');
  }

  const state = {
    known: new Set(JSON.parse(localStorage.getItem('cssKnownCards') || '[]')),
    currentId: Number(localStorage.getItem('cssCurrentCard') || cards[0].id),
    category: localStorage.getItem('cssCategoryFilter') || 'all',
    difficulty: localStorage.getItem('cssDifficultyFilter') || 'all',
    challenge: localStorage.getItem('cssChallengeMode') === 'true',
    flipped: false
  };

  const categories = ['all', ...new Set(cards.map((c) => c.category))];
  el.categoryFilter.innerHTML = categories.map((c) => `<option value="${c}">${c === 'all' ? 'Wszystkie' : c}</option>`).join('');
  el.categoryFilter.value = categories.includes(state.category) ? state.category : 'all';
  el.difficultyFilter.value = ['all', 'Średni', 'Trudniejszy'].includes(state.difficulty) ? state.difficulty : 'all';
  el.challengeToggle.checked = state.challenge;

  const filtered = () => cards.filter((c) => (state.category === 'all' || c.category === state.category) && (state.difficulty === 'all' || c.difficulty === state.difficulty));
  const findIndex = (list) => Math.max(0, list.findIndex((c) => c.id === state.currentId));

  function render() {
    const list = filtered();
    el.statTotal.textContent = String(list.length);
    const knownInSet = list.filter((c) => state.known.has(c.id)).length;
    el.statKnown.textContent = String(knownInSet);
    el.statLeft.textContent = String(Math.max(0, list.length - knownInSet));
    el.statProgress.textContent = `${list.length ? Math.round((knownInSet / list.length) * 100) : 0}%`;
    if (!list.length) {
      el.emptyState.hidden = false; el.cardQuestion.textContent = 'Brak fiszek'; el.cardAnswerWrap.hidden = true; el.cardCounter.textContent = 'Fiszka 0 / 0';
      return;
    }
    el.emptyState.hidden = true;
    const idx = findIndex(list);
    const card = list[idx];
    state.currentId = card.id;
    el.cardCounter.textContent = `Fiszka ${idx + 1} / ${list.length}`;
    el.cardQuestion.textContent = card.question;
    el.cardAnswer.textContent = card.answer;
    el.cardCode.hidden = !card.code; el.cardCodeInner.textContent = card.code || '';
    el.cardNote.hidden = !card.note; el.cardNote.textContent = card.note || '';
    const hideMeta = state.challenge && !state.flipped;
    el.cardCategory.textContent = hideMeta ? '???' : card.category;
    el.cardDifficulty.textContent = hideMeta ? '???' : card.difficulty;
    el.statCategory.textContent = hideMeta ? 'Ukryta' : card.category;
    el.statDifficulty.textContent = hideMeta ? 'Ukryty' : card.difficulty;
    el.cardAnswerWrap.hidden = !state.flipped;
    el.knownBtn.textContent = state.known.has(card.id) ? 'Oznaczone jako znam' : 'Oznacz jako znam';
    localStorage.setItem('cssCurrentCard', String(state.currentId));
  }

  const shift = (step) => { const list = filtered(); if (!list.length) return; const i = findIndex(list); state.currentId = list[(i + step + list.length) % list.length].id; state.flipped = false; render(); };
  el.prevBtn.addEventListener('click', () => shift(-1));
  el.nextBtn.addEventListener('click', () => shift(1));
  el.flipBtn.addEventListener('click', () => { state.flipped = !state.flipped; render(); });
  el.randomBtn.addEventListener('click', () => { const list = filtered(); if (!list.length) return; state.currentId = list[Math.floor(Math.random() * list.length)].id; state.flipped = false; render(); });
  el.knownBtn.addEventListener('click', () => { if (state.known.has(state.currentId)) state.known.delete(state.currentId); else state.known.add(state.currentId); localStorage.setItem('cssKnownCards', JSON.stringify([...state.known])); render(); });
  el.resetBtn.addEventListener('click', () => { state.known.clear(); state.currentId = cards[0].id; state.flipped = false; localStorage.removeItem('cssKnownCards'); localStorage.setItem('cssCurrentCard', String(state.currentId)); render(); });

  el.categoryFilter.addEventListener('change', (e) => { state.category = e.target.value; state.flipped = false; localStorage.setItem('cssCategoryFilter', state.category); render(); });
  el.difficultyFilter.addEventListener('change', (e) => { state.difficulty = e.target.value; state.flipped = false; localStorage.setItem('cssDifficultyFilter', state.difficulty); render(); });
  el.challengeToggle.addEventListener('change', (e) => { state.challenge = e.target.checked; localStorage.setItem('cssChallengeMode', String(state.challenge)); render(); });

  render();
});
