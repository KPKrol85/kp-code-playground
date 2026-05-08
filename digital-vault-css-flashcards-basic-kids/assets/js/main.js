document.addEventListener('DOMContentLoaded', () => {
  const flashcards = [
    { id: 1, category: 'Czym jest CSS?', question: 'Co to jest CSS?', answer: 'CSS to język stylów. Opisuje, jak elementy HTML mają wyglądać na stronie.', example: 'p { color: blue; }' },
    { id: 2, category: 'Czym jest CSS?', question: 'Do czego służy CSS?', answer: 'CSS służy do zmiany wyglądu: kolorów, rozmiarów, układu i odstępów.' },
    { id: 3, category: 'Czym jest CSS?', question: 'Czy CSS tworzy treść strony?', answer: 'Nie. Treść tworzy HTML, a CSS ją stylizuje.' },
    { id: 4, category: 'Czym jest CSS?', question: 'Co oznacza skrót CSS?', answer: 'Cascading Style Sheets, czyli kaskadowe arkusze stylów.' },
    { id: 5, category: 'Czym jest CSS?', question: 'Dlaczego warto znać CSS?', answer: 'Bo dzięki CSS strona jest czytelna, ładna i wygodna dla użytkownika.' },
    { id: 6, category: 'Czym jest CSS?', question: 'Gdzie można zapisać style CSS?', answer: 'W osobnym pliku .css, w sekcji <style> lub bezpośrednio w atrybucie style.' },
    { id: 7, category: 'Czym jest CSS?', question: 'Co znaczy "kaskadowe" w CSS?', answer: 'Gdy kilka reguł dotyczy elementu, CSS wybiera tę o wyższym priorytecie.' },
    { id: 8, category: 'Selektory', question: 'Co to jest selektor?', answer: 'Selektor wskazuje, które elementy HTML mają dostać styl.' },
    { id: 9, category: 'Selektory', question: 'Jak wybrać wszystkie paragrafy?', answer: 'Użyj selektora elementu.', example: 'p { line-height: 1.5; }' },
    { id: 10, category: 'Selektory', question: 'Jak wybrać element o klasie karta?', answer: 'Użyj kropki przed nazwą klasy.', example: '.karta { padding: 1rem; }' },
    { id: 11, category: 'Selektory', question: 'Jak wybrać element o id naglowek?', answer: 'Użyj znaku # przed id.', example: '#naglowek { background: #fff; }' },
    { id: 12, category: 'Selektory', question: 'Do czego służy gwiazdka * w CSS?', answer: 'To selektor uniwersalny — wybiera wszystkie elementy.' },
    { id: 13, category: 'Selektory', question: 'Co robi selektor potomka, np. nav a?', answer: 'Wybiera linki a, które są wewnątrz elementu nav.' },
    { id: 14, category: 'Selektory', question: 'Czy można łączyć selektory?', answer: 'Tak, np. .menu li a wybierze linki w listach menu.' },
    { id: 15, category: 'Kolory', question: 'Co robi właściwość color?', answer: 'Ustawia kolor tekstu.' },
    { id: 16, category: 'Kolory', question: 'Co robi background-color?', answer: 'Ustawia kolor tła elementu.' },
    { id: 17, category: 'Kolory', question: 'Czy kolor można zapisać słowem?', answer: 'Tak, np. red, blue, green.' },
    { id: 18, category: 'Kolory', question: 'Co to jest kod HEX koloru?', answer: 'To zapis koloru, np. #ff0000 dla czerwonego.' },
    { id: 19, category: 'Kolory', question: 'Co to jest rgb( )?', answer: 'To zapis koloru przez czerwony, zielony i niebieski, np. rgb(255, 0, 0).' },
    { id: 20, category: 'Kolory', question: 'Dlaczego kontrast jest ważny?', answer: 'Dobry kontrast ułatwia czytanie i poprawia dostępność strony.' },
    { id: 21, category: 'Tekst i fonty', question: 'Co robi font-size?', answer: 'Ustawia rozmiar tekstu.' },
    { id: 22, category: 'Tekst i fonty', question: 'Co robi font-family?', answer: 'Wybiera krój pisma, np. Arial lub sans-serif.' },
    { id: 23, category: 'Tekst i fonty', question: 'Co robi font-weight?', answer: 'Ustawia grubość tekstu, np. normal albo bold.' },
    { id: 24, category: 'Tekst i fonty', question: 'Co robi text-align?', answer: 'Wyrównuje tekst: do lewej, środka lub prawej.' },
    { id: 25, category: 'Tekst i fonty', question: 'Co robi line-height?', answer: 'Ustawia wysokość linii i wpływa na czytelność tekstu.' },
    { id: 26, category: 'Tekst i fonty', question: 'Co robi text-decoration?', answer: 'Dodaje lub usuwa dekorację tekstu, np. podkreślenie.' },
    { id: 27, category: 'Tekst i fonty', question: 'Czy duży tekst zawsze jest lepszy?', answer: 'Nie zawsze. Rozmiar powinien pasować do roli tekstu i ekranu.' },
    { id: 28, category: 'Odstępy', question: 'Co robi margin?', answer: 'Tworzy zewnętrzny odstęp wokół elementu.' },
    { id: 29, category: 'Odstępy', question: 'Co robi padding?', answer: 'Tworzy wewnętrzny odstęp między treścią a krawędzią elementu.' },
    { id: 30, category: 'Odstępy', question: 'Czym różni się margin od padding?', answer: 'Margin jest na zewnątrz elementu, a padding wewnątrz.' },
    { id: 31, category: 'Odstępy', question: 'Co oznacza skrót margin: 10px 20px?', answer: '10px góra/dół i 20px lewo/prawo.' },
    { id: 32, category: 'Odstępy', question: 'Po co stosować odstępy?', answer: 'Aby treść była czytelna i elementy nie były zlepione.' },
    { id: 33, category: 'Odstępy', question: 'Czy padding wpływa na tło?', answer: 'Tak. Tło zwykle obejmuje też obszar paddingu.' },
    { id: 34, category: 'Rozmiary', question: 'Co robi width?', answer: 'Ustawia szerokość elementu.' },
    { id: 35, category: 'Rozmiary', question: 'Co robi height?', answer: 'Ustawia wysokość elementu.' },
    { id: 36, category: 'Rozmiary', question: 'Co daje max-width?', answer: 'Ogranicza maksymalną szerokość, co pomaga na dużych ekranach.' },
    { id: 37, category: 'Rozmiary', question: 'Co daje min-height?', answer: 'Ustala minimalną wysokość elementu.' },
    { id: 38, category: 'Rozmiary', question: 'Co to są jednostki px?', answer: 'To piksele — stała jednostka rozmiaru na ekranie.' },
    { id: 39, category: 'Rozmiary', question: 'Co to są jednostki %?', answer: 'Procenty oznaczają część rozmiaru elementu rodzica.' },
    { id: 40, category: 'Rozmiary', question: 'Co to jest rem?', answer: 'rem zależy od rozmiaru czcionki elementu głównego html.' },
    { id: 41, category: 'Obramowania', question: 'Co robi border?', answer: 'Dodaje obramowanie wokół elementu.' },
    { id: 42, category: 'Obramowania', question: 'Jak ustawić grubość, styl i kolor ramki?', answer: 'Możesz użyć skrótu border.', example: 'border: 2px solid #333;' },
    { id: 43, category: 'Obramowania', question: 'Co robi border-radius?', answer: 'Zaokrągla rogi elementu.' },
    { id: 44, category: 'Obramowania', question: 'Co robi border-color?', answer: 'Ustawia kolor obramowania.' },
    { id: 45, category: 'Obramowania', question: 'Co robi border-style?', answer: 'Ustawia styl linii, np. solid, dashed lub dotted.' },
    { id: 46, category: 'Obramowania', question: 'Kiedy używać subtelnych ramek?', answer: 'Gdy chcesz delikatnie oddzielić sekcje bez ciężkiego wyglądu.' },
    { id: 47, category: 'Tła', question: 'Co robi background-image?', answer: 'Ustawia obraz jako tło elementu.' },
    { id: 48, category: 'Tła', question: 'Co robi background-repeat?', answer: 'Określa, czy tło ma się powtarzać.' },
    { id: 49, category: 'Tła', question: 'Co robi background-position?', answer: 'Ustawia pozycję tła, np. center.' },
    { id: 50, category: 'Tła', question: 'Co robi background-size: cover?', answer: 'Skaluje tło, aby pokryło cały element.' },
    { id: 51, category: 'Tła', question: 'Czy można mieć kolor i obraz tła?', answer: 'Tak. Kolor może być zapasowy, gdy obraz się nie wczyta.' },
    { id: 52, category: 'Tła', question: 'Co robi linear-gradient?', answer: 'Tworzy płynne przejście między kolorami.' },
    { id: 53, category: 'Display basics', question: 'Co robi display: block?', answer: 'Element zajmuje całą szerokość i zaczyna nową linię.' },
    { id: 54, category: 'Display basics', question: 'Co robi display: inline?', answer: 'Element układa się w linii i zajmuje tylko tyle miejsca, ile trzeba.' },
    { id: 55, category: 'Display basics', question: 'Co robi display: inline-block?', answer: 'Element jest w linii, ale można ustawić jego szerokość i wysokość.' },
    { id: 56, category: 'Display basics', question: 'Co robi display: none?', answer: 'Ukrywa element — nie zajmuje miejsca na stronie.' },
    { id: 57, category: 'Display basics', question: 'Co to jest flex?', answer: 'To sposób wygodnego układania elementów w rzędzie lub kolumnie.' },
    { id: 58, category: 'Display basics', question: 'Co to jest grid?', answer: 'To układ w wierszach i kolumnach, jak tabela do projektowania.' },
    { id: 59, category: 'Model pudełkowy', question: 'Co to jest box model?', answer: 'Każdy element to pudełko: treść, padding, border, margin.' },
    { id: 60, category: 'Model pudełkowy', question: 'Co robi box-sizing: border-box?', answer: 'Szerokość i wysokość zawierają padding i border, łatwiej liczyć układ.' },
    { id: 61, category: 'Model pudełkowy', question: 'Dlaczego box model jest ważny?', answer: 'Pomaga przewidzieć rozmiar elementu i uniknąć bałaganu w układzie.' },
    { id: 62, category: 'Model pudełkowy', question: 'Co jest najbliżej treści w box modelu?', answer: 'Padding jest bezpośrednio wokół treści.' },
    { id: 63, category: 'Model pudełkowy', question: 'Która część jest najbardziej zewnętrzna?', answer: 'Margin jest najbardziej zewnętrznym odstępem.' },
    { id: 64, category: 'Model pudełkowy', question: 'Czy border wpływa na rozmiar elementu?', answer: 'Tak, chyba że używasz border-box.' },
    { id: 65, category: 'Proste układy', question: 'Jak wycentrować blok z max-width?', answer: 'Ustaw margin-left i margin-right na auto.', example: '.box { max-width: 600px; margin: 0 auto; }' },
    { id: 66, category: 'Proste układy', question: 'Co robi justify-content w flex?', answer: 'Rozmieszcza elementy wzdłuż głównej osi kontenera.' },
    { id: 67, category: 'Proste układy', question: 'Co robi align-items w flex?', answer: 'Wyrównuje elementy w poprzek osi głównej.' },
    { id: 68, category: 'Proste układy', question: 'Co robi gap?', answer: 'Ustawia odstęp między elementami w flex lub grid.' },
    { id: 69, category: 'Proste układy', question: 'Kiedy użyć kolumny w flex?', answer: 'Gdy elementy mają iść jeden pod drugim.' },
    { id: 70, category: 'Proste układy', question: 'Czy każdy układ wymaga skomplikowanych reguł?', answer: 'Nie. Często kilka prostych reguł daje świetny efekt.' },
    { id: 71, category: 'Hover i focus', question: 'Co robi :hover?', answer: 'Stosuje styl, gdy wskaźnik myszy jest nad elementem.' },
    { id: 72, category: 'Hover i focus', question: 'Co robi :focus?', answer: 'Stosuje styl, gdy element ma fokus, np. po kliknięciu lub tabulatorze.' },
    { id: 73, category: 'Hover i focus', question: 'Dlaczego styl :focus jest ważny?', answer: 'Pomaga osobom korzystającym z klawiatury widzieć aktywny element.' },
    { id: 74, category: 'Hover i focus', question: 'Czy :hover działa na telefonie tak samo?', answer: 'Nie zawsze. Dlatego ważne są też style bez hover oraz :focus.' },
    { id: 75, category: 'Hover i focus', question: 'Co to jest :active?', answer: 'Styl w krótkim momencie kliknięcia elementu.' },
    { id: 76, category: 'Hover i focus', question: 'Jak dodać bezpieczny efekt przycisku?', answer: 'Użyj subtelnej zmiany koloru i krótkiej animacji.' },
    { id: 77, category: 'Responsywność', question: 'Co to znaczy, że strona jest responsywna?', answer: 'Dopasowuje się do różnych ekranów: telefonu, tabletu i komputera.' },
    { id: 78, category: 'Responsywność', question: 'Po co jest meta viewport?', answer: 'Pozwala poprawnie skalować stronę na urządzeniach mobilnych.' },
    { id: 79, category: 'Responsywność', question: 'Co to jest media query?', answer: 'Warunek CSS zależny od rozmiaru ekranu.' },
    { id: 80, category: 'Responsywność', question: 'Przykład media query?', answer: 'Dla większych ekranów można zwiększyć siatkę kolumn.', example: '@media (min-width: 768px) { .grid { grid-template-columns: 1fr 1fr; } }' },
    { id: 81, category: 'Responsywność', question: 'Dlaczego max-width pomaga w mobile?', answer: 'Element nie wyjdzie poza ekran i zachowa czytelność.' },
    { id: 82, category: 'Responsywność', question: 'Co robi flex-wrap?', answer: 'Pozwala elementom przechodzić do nowego wiersza, gdy brakuje miejsca.' },
    { id: 83, category: 'Dobre nawyki', question: 'Dlaczego warto nazywać klasy jasno?', answer: 'Łatwiej zrozumieć kod i szybciej go poprawiać.' },
    { id: 84, category: 'Dobre nawyki', question: 'Po co trzymać style w osobnym pliku?', answer: 'Kod jest czystszy i prostszy w utrzymaniu.' },
    { id: 85, category: 'Dobre nawyki', question: 'Czy warto grupować style tematami?', answer: 'Tak, bo łatwiej znaleźć właściwą regułę.' },
    { id: 86, category: 'Dobre nawyki', question: 'Dlaczego unikać zbyt wielu !important?', answer: 'Utrudnia to kontrolę nad stylem i prowadzi do konfliktów.' },
    { id: 87, category: 'Dobre nawyki', question: 'Co dają komentarze w CSS?', answer: 'Pomagają wyjaśnić trudniejsze fragmenty kodu.' },
    { id: 88, category: 'Dobre nawyki', question: 'Czy trzeba testować stronę na telefonie?', answer: 'Tak, bo wielu użytkowników korzysta głównie z telefonu.' },
    { id: 89, category: 'Dobre nawyki', question: 'Dlaczego warto dbać o kontrast i focus?', answer: 'To zwiększa dostępność i wygodę dla wszystkich.' },
    { id: 90, category: 'Dobre nawyki', question: 'Czy małe kroki w nauce są dobre?', answer: 'Tak, regularna praktyka daje trwałe efekty.' },
    { id: 91, category: 'Dobre nawyki', question: 'Co warto zrobić po poznaniu nowej właściwości?', answer: 'Od razu sprawdź ją w małym przykładzie.' },
    { id: 92, category: 'Dobre nawyki', question: 'Dlaczego warto czytać kod na głos myślami?', answer: 'Pomaga zrozumieć logikę reguł i szybciej znaleźć błędy.' },
    { id: 93, category: 'Dobre nawyki', question: 'Czy kopiowanie bez zrozumienia pomaga?', answer: 'Na chwilę tak, ale prawdziwa nauka wymaga testowania i pytań "dlaczego".' },
    { id: 94, category: 'Dobre nawyki', question: 'Po co robić porządek w plikach?', answer: 'Łatwiej rozwijać projekt i współpracować z innymi.' },
    { id: 95, category: 'Dobre nawyki', question: 'Co robić, gdy styl nie działa?', answer: 'Sprawdź selektor, literówki i czy reguła nie jest nadpisana.' },
    { id: 96, category: 'Dobre nawyki', question: 'Dlaczego warto używać narzędzi deweloperskich?', answer: 'Możesz szybko testować style i widzieć zmiany na żywo.' },
    { id: 97, category: 'Dobre nawyki', question: 'Czy jedna dobra praktyka dziennie wystarczy?', answer: 'Tak, małe stałe kroki budują mocne umiejętności.' },
    { id: 98, category: 'Dobre nawyki', question: 'Co daje plan nauki CSS?', answer: 'Pomaga uczyć się spokojnie i bez chaosu.' },
    { id: 99, category: 'Dobre nawyki', question: 'Czy warto wracać do starszych fiszek?', answer: 'Tak, powtórki utrwalają wiedzę.' },
    { id: 100, category: 'Dobre nawyki', question: 'Jaka jest najlepsza metoda nauki CSS?', answer: 'Ucz się krótko, regularnie i zawsze testuj na własnych przykładach.' }
  ];

  const storageKeys = {
    known: 'kpCssKnownCards',
    current: 'kpCssCurrentCard',
    category: 'kpCssCategoryFilter'
  };

  const elements = {
    filter: document.getElementById('categoryFilter'), totalCards: document.getElementById('totalCards'), knownCards: document.getElementById('knownCards'), leftCards: document.getElementById('leftCards'), progressPercent: document.getElementById('progressPercent'), currentCategory: document.getElementById('currentCategory'), cardPosition: document.getElementById('cardPosition'), cardTotal: document.getElementById('cardTotal'), cardCategory: document.getElementById('cardCategory'), cardQuestion: document.getElementById('cardQuestion'), cardAnswerWrap: document.getElementById('cardAnswerWrap'), cardAnswer: document.getElementById('cardAnswer'), cardExample: document.getElementById('cardExample'), prevBtn: document.getElementById('prevBtn'), nextBtn: document.getElementById('nextBtn'), flipBtn: document.getElementById('flipBtn'), randomBtn: document.getElementById('randomBtn'), knownBtn: document.getElementById('knownBtn'), resetBtn: document.getElementById('resetBtn'), printSheet: document.getElementById('printSheet')
  };

  if (Object.values(elements).some((el) => !el)) return;

  const categories = ['Wszystkie', ...new Set(flashcards.map((card) => card.category))];
  let knownIds = new Set(JSON.parse(localStorage.getItem(storageKeys.known) || '[]'));
  let selectedCategory = localStorage.getItem(storageKeys.category) || 'Wszystkie';
  let filteredCards = [];
  let currentIndex = Number(localStorage.getItem(storageKeys.current) || 0);
  let isFlipped = false;

  const saveState = () => {
    localStorage.setItem(storageKeys.known, JSON.stringify([...knownIds]));
    localStorage.setItem(storageKeys.current, String(currentIndex));
    localStorage.setItem(storageKeys.category, selectedCategory);
  };

  const refreshFilteredCards = () => {
    filteredCards = selectedCategory === 'Wszystkie'
      ? flashcards
      : flashcards.filter((card) => card.category === selectedCategory);
    if (!filteredCards.length) {
      filteredCards = flashcards;
      selectedCategory = 'Wszystkie';
    }
    if (currentIndex >= filteredCards.length) currentIndex = 0;
  };

  const updateDashboard = () => {
    const total = filteredCards.length;
    const knownInFilter = filteredCards.filter((card) => knownIds.has(card.id)).length;
    const left = total - knownInFilter;
    const percent = total ? Math.round((knownInFilter / total) * 100) : 0;

    elements.totalCards.textContent = String(total);
    elements.knownCards.textContent = String(knownInFilter);
    elements.leftCards.textContent = String(left);
    elements.progressPercent.textContent = `${percent}%`;
    elements.currentCategory.textContent = selectedCategory;
    elements.cardTotal.textContent = String(total);
  };

  const updateCardView = () => {
    const card = filteredCards[currentIndex];
    if (!card) return;
    elements.cardPosition.textContent = String(currentIndex + 1);
    elements.cardCategory.textContent = card.category;
    elements.cardQuestion.textContent = card.question;
    elements.cardAnswer.textContent = card.answer;

    if (card.example) {
      elements.cardExample.textContent = card.example;
      elements.cardExample.classList.remove('is-hidden');
    } else {
      elements.cardExample.textContent = '';
      elements.cardExample.classList.add('is-hidden');
    }

    elements.knownBtn.textContent = knownIds.has(card.id) ? 'Oznacz jako nieznaną' : 'Oznacz jako znaną';

    elements.cardAnswerWrap.classList.toggle('is-hidden', !isFlipped);
    elements.cardQuestion.classList.toggle('is-hidden', isFlipped);
  };

  const populateFilter = () => {
    elements.filter.innerHTML = categories
      .map((category) => `<option value="${category}">${category}</option>`)
      .join('');
    if (categories.includes(selectedCategory)) {
      elements.filter.value = selectedCategory;
    } else {
      selectedCategory = 'Wszystkie';
      elements.filter.value = selectedCategory;
    }
  };

  const renderPrintSheet = () => {
    elements.printSheet.innerHTML = flashcards.map((card) => `
      <article class="print-sheet__card">
        <h3>${card.id}. ${card.category}</h3>
        <p><strong>Pytanie:</strong> ${card.question}</p>
        <p><strong>Odpowiedź:</strong> ${card.answer}</p>
        ${card.example ? `<p><strong>Przykład:</strong> <code>${card.example}</code></p>` : ''}
      </article>
    `).join('');
  };

  const goToCard = (index) => {
    if (!filteredCards.length) return;
    currentIndex = (index + filteredCards.length) % filteredCards.length;
    isFlipped = false;
    updateCardView();
    updateDashboard();
    saveState();
  };

  elements.prevBtn.addEventListener('click', () => goToCard(currentIndex - 1));
  elements.nextBtn.addEventListener('click', () => goToCard(currentIndex + 1));
  elements.flipBtn.addEventListener('click', () => {
    isFlipped = !isFlipped;
    updateCardView();
  });
  elements.randomBtn.addEventListener('click', () => {
    if (filteredCards.length < 2) return;
    let randomIndex = currentIndex;
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * filteredCards.length);
    }
    goToCard(randomIndex);
  });

  elements.knownBtn.addEventListener('click', () => {
    const active = filteredCards[currentIndex];
    if (!active) return;
    if (knownIds.has(active.id)) knownIds.delete(active.id);
    else knownIds.add(active.id);
    updateCardView();
    updateDashboard();
    saveState();
  });

  elements.resetBtn.addEventListener('click', () => {
    const shouldReset = window.confirm('Czy na pewno chcesz wyzerować postęp?');
    if (!shouldReset) return;
    knownIds = new Set();
    currentIndex = 0;
    isFlipped = false;
    updateCardView();
    updateDashboard();
    saveState();
  });

  elements.filter.addEventListener('change', (event) => {
    selectedCategory = event.target.value;
    currentIndex = 0;
    isFlipped = false;
    refreshFilteredCards();
    updateCardView();
    updateDashboard();
    saveState();
  });

  populateFilter();
  refreshFilteredCards();
  renderPrintSheet();
  goToCard(currentIndex);
});
