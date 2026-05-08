document.addEventListener('DOMContentLoaded', () => {
  const categories = [
    'Cascade, layers i specificity', 'CSS architecture', 'Design tokens', 'Nowoczesne selektory',
    'Container queries', 'Advanced Grid', 'Advanced Flexbox', 'Fluid typography i spacing',
    'Logical properties', 'Accessibility-focused CSS', 'Performance i rendering', 'Animation strategy',
    'Theming i dark mode', 'Print CSS', 'Maintainability i refactoring', 'Debugging złożonego CSS',
    'Production audit thinking'
  ];
  const difficulties = ['advanced', 'senior', 'expert'];
  const flashcards = [];
  for (let i = 1; i <= 100; i++) {
    const category = categories[(i - 1) % categories.length];
    const difficulty = difficulties[(i - 1) % difficulties.length];
    flashcards.push({
      id: i,
      category,
      difficulty,
      question: `#${i}: Jak podejść do tematu: ${category.toLowerCase()} w systemie produkcyjnym?`,
      answer: `Priorytetem jest przewidywalność. Ustal kontrakt stylowania (warstwy, tokeny, granice komponentów), ogranicz wyjątki i dokumentuj decyzje tak, aby onboarding i audyt były szybkie.`,
      code: i % 2 === 0 ? `/* Przykład ${i} */\n@layer reset, base, components, utilities;\n:where(.card){padding:var(--space-3);}\n@container (min-width:40rem){.card{display:grid;}}` : '',
      note: i % 3 === 0 ? 'Senior note: najpierw redukuj złożoność kaskady, potem dodawaj nowe reguły.' : ''
    });
  }

  const el = (id) => document.getElementById(id);
  const state = {
    currentIndex: Number(localStorage.getItem('dv_currentIndex') || 0),
    flipped: false,
    known: new Set(JSON.parse(localStorage.getItem('dv_known') || '[]')),
    category: localStorage.getItem('dv_category') || 'all',
    difficulty: localStorage.getItem('dv_difficulty') || 'all',
    focusMode: localStorage.getItem('dv_focus') === '1',
    interviewMode: localStorage.getItem('dv_interview') === '1'
  };

  const refs = {
    categoryFilter: el('categoryFilter'), difficultyFilter: el('difficultyFilter'), focusMode: el('focusMode'), interviewMode: el('interviewMode'),
    cardCounter: el('cardCounter'), cardCategory: el('cardCategory'), cardDifficulty: el('cardDifficulty'), cardQuestion: el('cardQuestion'),
    cardAnswerWrap: el('cardAnswerWrap'), cardAnswer: el('cardAnswer'), cardCode: el('cardCode'), cardNote: el('cardNote'), interviewHint: el('interviewHint'),
    totalCards: el('totalCards'), knownCards: el('knownCards'), leftCards: el('leftCards'), progressPercent: el('progressPercent'), readinessLabel: el('readinessLabel'),
    currentCategory: el('currentCategory'), currentDifficulty: el('currentDifficulty')
  };

  if (Object.values(refs).some((node) => !node)) return;

  const filteredCards = () => flashcards.filter((card) => (state.category === 'all' || card.category === state.category) && (state.difficulty === 'all' || card.difficulty === state.difficulty));
  const readiness = (p) => (p < 25 ? 'Start review' : p < 50 ? 'Building confidence' : p < 80 ? 'Strong progress' : 'Senior review mode');

  function persist() {
    localStorage.setItem('dv_currentIndex', String(state.currentIndex));
    localStorage.setItem('dv_known', JSON.stringify([...state.known]));
    localStorage.setItem('dv_category', state.category);
    localStorage.setItem('dv_difficulty', state.difficulty);
    localStorage.setItem('dv_focus', state.focusMode ? '1' : '0');
    localStorage.setItem('dv_interview', state.interviewMode ? '1' : '0');
  }

  function render() {
    const list = filteredCards();
    if (!list.length) {
      refs.cardCounter.textContent = 'Brak fiszek dla aktywnych filtrów';
      refs.cardQuestion.textContent = 'Zmień filtr kategorii lub poziomu.';
      refs.cardAnswerWrap.hidden = true;
      return;
    }
    if (state.currentIndex >= list.length) state.currentIndex = 0;
    const card = list[state.currentIndex];
    refs.cardCounter.textContent = `Karta ${state.currentIndex + 1} / ${list.length}`;
    refs.cardCategory.textContent = card.category;
    refs.cardDifficulty.textContent = card.difficulty;
    refs.cardQuestion.textContent = card.question;
    refs.cardAnswer.textContent = card.answer;
    refs.cardAnswerWrap.hidden = !state.flipped;
    refs.cardCode.hidden = !card.code || !state.flipped;
    refs.cardCode.textContent = card.code || '';
    refs.cardNote.hidden = !card.note || !state.flipped;
    refs.cardNote.textContent = card.note || '';
    refs.interviewHint.hidden = !(state.interviewMode && !state.flipped);

    const knownCount = flashcards.filter((c) => state.known.has(c.id)).length;
    const progress = Math.round((knownCount / flashcards.length) * 100);
    refs.totalCards.textContent = String(flashcards.length);
    refs.knownCards.textContent = String(knownCount);
    refs.leftCards.textContent = String(flashcards.length - knownCount);
    refs.progressPercent.textContent = `${progress}%`;
    refs.readinessLabel.textContent = readiness(progress);
    refs.currentCategory.textContent = state.category;
    refs.currentDifficulty.textContent = state.difficulty;
    document.body.classList.toggle('focus-mode', state.focusMode);
    persist();
  }

  categories.forEach((cat) => {
    const option = document.createElement('option');
    option.value = cat; option.textContent = cat; refs.categoryFilter.appendChild(option);
  });
  refs.categoryFilter.insertAdjacentHTML('afterbegin', '<option value="all">Wszystkie</option>');
  refs.categoryFilter.value = state.category;
  refs.difficultyFilter.value = state.difficulty;
  refs.focusMode.checked = state.focusMode;
  refs.interviewMode.checked = state.interviewMode;

  el('prevBtn').addEventListener('click', () => { state.flipped = false; state.currentIndex = Math.max(0, state.currentIndex - 1); render(); });
  el('nextBtn').addEventListener('click', () => { state.flipped = false; state.currentIndex += 1; if (state.currentIndex >= filteredCards().length) state.currentIndex = 0; render(); });
  el('flipBtn').addEventListener('click', () => { state.flipped = !state.flipped; render(); });
  el('randomBtn').addEventListener('click', () => { const len = filteredCards().length; if (!len) return; state.flipped = false; state.currentIndex = Math.floor(Math.random() * len); render(); });
  el('knownBtn').addEventListener('click', () => { const list = filteredCards(); if (!list.length) return; state.known.add(list[state.currentIndex].id); render(); });
  el('resetBtn').addEventListener('click', () => { state.known.clear(); state.currentIndex = 0; state.flipped = false; render(); });
  refs.categoryFilter.addEventListener('change', (e) => { state.category = e.target.value; state.currentIndex = 0; state.flipped = false; render(); });
  refs.difficultyFilter.addEventListener('change', (e) => { state.difficulty = e.target.value; state.currentIndex = 0; state.flipped = false; render(); });
  refs.focusMode.addEventListener('change', (e) => { state.focusMode = e.target.checked; render(); });
  refs.interviewMode.addEventListener('change', (e) => { state.interviewMode = e.target.checked; render(); });

  render();
});
